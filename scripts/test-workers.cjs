// Exercise the actual Workers runtime with test-only OAuth configuration.
// No valid contact submission or external OAuth exchange is made.
const assert = require('node:assert/strict');
const { unstable_dev } = require('wrangler');

(async () => {
  const worker = await unstable_dev('workers/index.ts', {
    config: 'wrangler.jsonc',
    vars: { GITHUB_CLIENT_ID: 'local-test-client' },
    experimental: { disableExperimentalWarning: true },
  });
  try {
    for (const path of ['/', '/resume/', '/contact/', '/contact/thanks/', '/admin/']) {
      const response = await worker.fetch(path);
      assert.equal(response.status, 200, path);
    }
    const pdf = await worker.fetch('/resume/David_Vasandani_CV.pdf');
    assert.equal(pdf.status, 200);
    assert.match(pdf.headers.get('content-type'), /application\/pdf/);
    assert.equal(Buffer.from(await pdf.arrayBuffer()).subarray(0, 5).toString(), '%PDF-');
    assert.equal(await (await worker.fetch('/hello')).text(), 'Hello, world!');
    assert.equal(await (await worker.fetch('/api/hello')).text(), 'Hello World!');
    assert.equal(await (await worker.fetch('/api/hello', { method: 'HEAD' })).text(), '');
    const echo = await (await worker.fetch('/api/echo?tag=one&tag=two&filter[status]=published')).json();
    assert.deepEqual(echo.query, { tag: ['one', 'two'], filter: { status: 'published' } });
    const auth = await worker.fetch('/api/auth', { redirect: 'manual' });
    assert.equal(auth.status, 302);
    const location = new URL(auth.headers.get('location'));
    assert.equal(location.origin, 'https://github.com');
    assert.equal(location.searchParams.get('client_id'), 'local-test-client');
    assert.match(auth.headers.get('set-cookie'), /HttpOnly.*Secure.*SameSite=Lax/);
    const callback = await worker.fetch('/api/callback?code=bad&state=bad');
    assert.match(await callback.text(), /authorization:github:error:/);
    const spam = await worker.fetch('/api/contact', {
      method: 'POST', redirect: 'manual',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'company=spam',
    });
    assert.equal(spam.status, 303);
    assert.equal(spam.headers.get('location'), '/contact/thanks/');
    assert.equal((await worker.fetch('/api/contact', { method: 'POST' })).status, 400);
    assert.equal((await worker.fetch('/api/missing')).status, 404);
    assert.equal((await worker.fetch('/missing-page')).status, 404);
    console.log('Workers runtime: static pages, Express routes, OAuth state and contact validation passed.');
  } finally {
    await worker.stop();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
