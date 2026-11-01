const { test } = require('node:test');
const assert = require('node:assert/strict');
const { build } = require('esbuild');
const vm = require('node:vm');
const { Miniflare, convertV4MiniflareOptions } = require('miniflare');
const { mkdtemp, rm } = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

async function moduleFor(file) {
  const result = await build({ entryPoints: [file], bundle: true, format: 'cjs', platform: 'node', write: false });
  const context = { exports: {}, module: { exports: {} }, require, Response, Request, AbortSignal, URL };
  vm.runInNewContext(result.outputFiles[0].text, context);
  return context.module.exports;
}

test('editor authorization rejects absent, forged, revoked, read-only and cross-origin credentials', async () => {
  const { authorizeEditor } = await moduleFor('workers/siteping-auth.ts');
  let calls = 0;
  const mock = async url => { calls++; return Response.json(url.endsWith('/user') ? { login: 'editor' } : { permissions: { push: true } }); };
  const req = (headers = {}) => new Request('https://blog.example/api/siteping', { headers });
  assert.equal((await authorizeEditor(req(), mock)).status, 401);
  assert.equal(calls, 0);
  assert.equal((await authorizeEditor(req({ authorization: 'Bearer fake', origin: 'https://evil.example' }), mock)).status, 403);
  assert.equal(await authorizeEditor(req({ authorization: 'Bearer valid' }), mock), 'editor');
  assert.equal((await authorizeEditor(req({ authorization: 'Bearer revoked' }), async () => new Response(null, { status: 401 }))).status, 401);
  assert.equal((await authorizeEditor(req({ authorization: 'Bearer reader' }), async () => Response.json({ permissions: { push: false } }))).status, 403);
  const offline = await authorizeEditor(req({ authorization: 'Bearer valid' }), async () => { throw Error('offline'); });
  assert.equal(offline.status, 503);
  assert.equal(offline.headers.get('cache-control'), 'no-store');
});

test('browser only loads widget for verified CMS login and removes it on logout or failed verification', async () => {
  const { startFeedback } = await moduleFor('src/siteping.js');
  let stored = null, status = 200, mounts = 0, destroys = 0, options, interval;
  const events = {};
  const win = {
    localStorage: { getItem: () => stored }, location: { pathname: '/posts/hello/' },
    fetch: async () => Response.json({ login: 'editor' }, { status }),
    addEventListener: (event, fn) => { events[event] = fn; }, removeEventListener: event => { delete events[event]; },
    setInterval: fn => { interval = fn; return 1; }, clearInterval: () => {},
  };
  const stop = startFeedback(win, async () => ({ initSiteping: config => { mounts++; options = config; return { destroy: () => destroys++ }; } }));
  await new Promise(setImmediate);
  assert.equal(mounts, 0);
  stored = JSON.stringify({ token: 'valid', login: 'forged' });
  await events.focus();
  assert.equal(mounts, 1);
  assert.equal(options.identity.name, 'editor');
  assert.equal(options.headers().authorization, 'Bearer valid');
  assert.equal(options.enableScreenshot, false);
  stored = null;
  events.storage({ key: 'decap-cms-user' });
  assert.equal(destroys, 1);
  assert.throws(() => options.headers());
  stored = JSON.stringify({ token: 'valid' });
  await events.focus();
  assert.equal(mounts, 2);
  status = 401;
  await interval();
  assert.equal(destroys, 2);
  stop();
});

test('shared feedback persists across runtime restarts, deduplicates and enforces the project boundary', async () => {
  const bundle = await build({ entryPoints: ['workers/index.ts'], banner: { js: "import { createRequire } from 'node:module'; const require = createRequire('file:///worker.js');" }, bundle: true, format: 'esm', platform: 'node', external: ['cloudflare:*'], write: false });
  const directory = await mkdtemp(path.join(os.tmpdir(), 'blog-feedback-test-'));
  const config = { outboundService: async request => {
    assert.equal(new URL(request.url).origin, 'https://api.github.com');
    if (request.headers.get('authorization') !== 'Bearer editor') return new Response(null, { status: 401 });
    return Response.json(request.url.endsWith('/user') ? { login: 'editor' } : { permissions: { push: true } });
  }, name: 'blog-test', modules: true, script: bundle.outputFiles[0].text, compatibilityDate: '2026-10-29', compatibilityFlags: ['nodejs_compat'], durableObjects: { BLOG_FEEDBACK: { className: 'BlogFeedback', useSQLite: true } }, unsafeEnableSharedStorage: true, resourcePersistencePath: directory, isolatedResourcePersistencePath: directory };
  let mf = new Miniflare(convertV4MiniflareOptions(config));
  const send = (method = 'GET', body, editor = 'editor', project = 'david-vasandani-blog') => mf.dispatchFetch(`https://blog.example/api/siteping?projectName=${project}`, { method, headers: { 'content-type': 'application/json', ...(editor ? { authorization: `Bearer ${editor}`, 'x-blog-editor': 'forged' } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  try {
    assert.equal((await send('GET', null, null)).status, 401);
    assert.equal((await send('GET', null, 'revoked')).status, 401);
    assert.equal((await send('GET', null, 'editor', 'other')).status, 403);
    const payload = { projectName: 'david-vasandani-blog', type: 'bug', message: 'Shared test', url: '/posts/hello/', viewport: '1280x720', userAgent: 'test', authorName: 'forged', authorEmail: 'forged@example.com', clientId: crypto.randomUUID(), annotations: [] };
    const created = await send('POST', payload);
    const createdBody = await created.json();
    assert.equal(created.status, 201, JSON.stringify(createdBody));
    const listed = await (await send()).json();
    assert.equal(listed.feedbacks.length, 1);
    assert.equal(listed.feedbacks[0].authorName, 'editor');
    const id = listed.feedbacks[0].id;
    await send('POST', payload);
    assert.equal((await (await send()).json()).feedbacks.length, 1);
    assert.equal((await send('PATCH', { id, projectName: 'other', status: 'resolved' })).status, 403);
    assert.equal((await send('PATCH', { id, projectName: 'david-vasandani-blog', status: 'resolved' })).status, 200);
    await mf.dispose();
    mf = new Miniflare(convertV4MiniflareOptions(config));
    const after = await (await send()).json();
    assert.equal(after.feedbacks[0].status, 'resolved');
    assert.equal(after.feedbacks[0].id, id);
    assert.equal((await send('DELETE', { id, projectName: 'david-vasandani-blog' })).status, 200);
    assert.equal((await (await send()).json()).feedbacks.length, 0);
  } finally { await mf.dispose(); await rm(directory, { recursive: true, force: true }); }
});
