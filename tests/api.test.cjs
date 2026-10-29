const { test } = require('node:test');
const assert = require('node:assert/strict');
const { handler } = require('../.test-dist/api.js');
const request = (path, extra = {}) => handler({
  httpMethod: 'GET', path, headers: { host: 'localhost', 'x-test': 'local' },
  queryStringParameters: {}, body: null, isBase64Encoded: false, ...extra
}, {});

test('serverless hello and HEAD contracts', async () => {
  const result = await request('/api/hello');
  assert.equal(result.statusCode, 200);
  assert.equal(result.body, 'Hello World!');
  assert.match(result.headers['content-type'], /text\/html/);
  assert.equal((await request('/api/hello', { httpMethod: 'HEAD' })).body, '');
});

test('serverless echo preserves request metadata and repeated query values', async () => {
  const result = await request('/api/echo', {
    queryStringParameters: { message: 'hello world', 'filter[status]': 'published' },
    multiValueQueryStringParameters: { tag: ['one', 'two'] }
  });
  assert.equal(result.statusCode, 200);
  assert.match(result.headers['content-type'], /application\/json/);
  const body = JSON.parse(result.body);
  assert.equal(body.path, '/echo');
  assert.equal(body.method, 'GET');
  assert.equal(body.hostname, 'localhost');
  assert.equal(body.headers['x-test'], 'local');
  assert.equal(body.query.message, 'hello world');
  assert.deepEqual(body.query.filter, { status: 'published' });
  assert.deepEqual(body.query.tag, ['one', 'two']);
  assert.equal(typeof body.os.hostname, 'string');
});

// Replaces fetch for one test and records each call's URL and parsed body.
function mockFetch(t, respond) {
  const calls = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), body: JSON.parse(init.body) });
    return respond(String(url));
  };
  t.after(() => { globalThis.fetch = original; });
  return calls;
}

function setEnv(t, values) {
  const previous = Object.fromEntries(Object.keys(values).map(key => [key, process.env[key]]));
  Object.assign(process.env, values);
  t.after(() => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
}

const cookieHeader = result => [result.headers['set-cookie'], result.multiValueHeaders?.['set-cookie']].flat().filter(Boolean).join('\n');
const site = { host: 'blog.example', 'x-forwarded-proto': 'https' };

test('CMS sign-in redirects to GitHub with a state cookie scoped to the callback', async t => {
  setEnv(t, { GITHUB_CLIENT_ID: 'client-id' });
  const result = await request('/api/auth', { headers: site, queryStringParameters: { provider: 'github' } });
  assert.equal(result.statusCode, 302);
  const location = new URL(result.headers.location);
  assert.equal(location.origin + location.pathname, 'https://github.com/login/oauth/authorize');
  assert.equal(location.searchParams.get('client_id'), 'client-id');
  assert.equal(location.searchParams.get('redirect_uri'), 'https://blog.example/api/callback');
  assert.equal(location.searchParams.get('scope'), 'public_repo');
  const state = location.searchParams.get('state');
  assert.match(state, /^[0-9a-f]{32}$/);
  const cookie = cookieHeader(result);
  assert.match(cookie, new RegExp(`cms_oauth_state=${state};`));
  for (const flag of ['Path=/api/callback', 'HttpOnly', 'Secure', 'SameSite=Lax']) assert.ok(cookie.includes(flag), flag);
});

test('CMS sign-in reports when no GitHub OAuth App is configured', async t => {
  setEnv(t, { GITHUB_CLIENT_ID: '' });
  assert.equal((await request('/api/auth', { headers: site })).statusCode, 503);
});

test('CMS callback rejects a missing or mismatched state without calling GitHub', async t => {
  const calls = mockFetch(t, () => { throw new Error('GitHub must not be called'); });
  for (const [cookie, state] of [[undefined, 'aaaa'], ['cms_oauth_state=bbbb', 'aaaa'], ['cms_oauth_state=aaaa', 'aaaé']]) {
    const result = await request('/api/callback', {
      headers: { ...site, ...(cookie && { cookie }) },
      queryStringParameters: { code: 'code', state }
    });
    assert.equal(result.statusCode, 200);
    assert.match(result.body, /authorization:github:error:/);
    assert.doesNotMatch(result.body, /authorization:github:success/);
  }
  assert.equal(calls.length, 0);
});

test('CMS callback exchanges the code and hands the token only to this origin', async t => {
  setEnv(t, { GITHUB_CLIENT_ID: 'client-id', GITHUB_CLIENT_SECRET: 'client-secret' });
  const calls = mockFetch(t, () => Response.json({ access_token: 'gho_token' }));
  const result = await request('/api/callback', {
    headers: { ...site, cookie: 'other=1; cms_oauth_state=abcd' },
    queryStringParameters: { code: 'the-code', state: 'abcd' }
  });
  assert.deepEqual(calls, [{
    url: 'https://github.com/login/oauth/access_token',
    body: { client_id: 'client-id', client_secret: 'client-secret', code: 'the-code', redirect_uri: 'https://blog.example/api/callback' }
  }]);
  assert.equal(result.headers['cache-control'], 'no-store');
  assert.ok(result.body.includes(JSON.stringify(`authorization:github:success:${JSON.stringify({ token: 'gho_token', provider: 'github' })}`)));
  assert.match(result.body, /event\.origin === location\.origin/);
  assert.match(result.body, /postMessage\("authorizing:github", location\.origin\)/);
  assert.match(cookieHeader(result), /cms_oauth_state=;/);
});

test('CMS callback escapes GitHub error text inside the script', async t => {
  setEnv(t, { GITHUB_CLIENT_ID: 'client-id', GITHUB_CLIENT_SECRET: 'client-secret' });
  mockFetch(t, () => Response.json({ error_description: '</script><script>alert(1)</script>' }));
  const result = await request('/api/callback', {
    headers: { ...site, cookie: 'cms_oauth_state=abcd' },
    queryStringParameters: { code: 'bad', state: 'abcd' }
  });
  assert.match(result.body, /authorization:github:error:/);
  assert.equal(result.body.match(/<\/script>/g).length, 1);
});

const contact = (fields, extra = {}) => request('/api/contact', {
  httpMethod: 'POST',
  headers: { ...site, 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(fields).toString(),
  ...extra
});
const message = { name: 'Ada <Lovelace>', email: 'ada@example.com', message: 'Hi & <!channel>' };

test('contact form posts an escaped message to Slack and redirects to the thanks page', async t => {
  setEnv(t, { SLACK_WEBHOOK_URL: 'https://hooks.slack.test/services/x' });
  const calls = mockFetch(t, () => new Response('ok'));
  const result = await contact(message);
  assert.equal(result.statusCode, 303);
  assert.equal(result.headers.location, '/contact/thanks/');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://hooks.slack.test/services/x');
  assert.equal(calls[0].body.text, 'New message from Ada &lt;Lovelace&gt; (ada@example.com) via the contact form:\n>>> Hi &amp; &lt;!channel&gt;');
  assert.equal(calls[0].body.unfurl_links, false);
});

test('contact form drops honeypot submissions without calling Slack', async t => {
  setEnv(t, { SLACK_WEBHOOK_URL: 'https://hooks.slack.test/services/x' });
  const calls = mockFetch(t, () => new Response('ok'));
  const result = await contact({ ...message, company: 'Spam Inc' });
  assert.equal(result.statusCode, 303);
  assert.equal(calls.length, 0);
});

test('contact form rejects missing or oversized fields', async t => {
  setEnv(t, { SLACK_WEBHOOK_URL: 'https://hooks.slack.test/services/x' });
  const calls = mockFetch(t, () => new Response('ok'));
  for (const fields of [{ ...message, name: ' ' }, { name: 'Ada', email: 'ada@example.com' }, { ...message, message: 'x'.repeat(5001) }]) {
    assert.equal((await contact(fields)).statusCode, 400);
  }
  assert.equal(calls.length, 0);
});

test('contact form reports a failure when Slack is unset or rejects the message', async t => {
  setEnv(t, { SLACK_WEBHOOK_URL: '' });
  assert.equal((await contact(message)).statusCode, 502);
  process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.test/services/x';
  mockFetch(t, () => new Response('invalid_token', { status: 403 }));
  assert.equal((await contact(message)).statusCode, 502);
});

test('missing routes and unsupported mutations return 404', async () => {
  for (const [url, method] of [['/api/missing', 'GET'], ['/hello', 'GET'], ['/api/hello', 'POST']]) {
    assert.equal((await request(url, { httpMethod: method })).statusCode, 404);
  }
});

test('native Netlify hello function returns a web Response', async () => {
  const { default: hello } = await import('../.test-dist/hello/hello.mjs');
  const result = await hello(new Request('http://localhost/hello'), {});
  assert.equal(result.status, 200);
  assert.equal(await result.text(), 'Hello, world!');
});
