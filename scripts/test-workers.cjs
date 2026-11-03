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
    // Miniflare's MF-CF-Blob header sets request.cf locally; production ignores it.
    const netflix = { 'MF-CF-Blob': JSON.stringify({ asn: 55095 }) };
    const other = { 'MF-CF-Blob': JSON.stringify({ asn: 13335 }) };
    // A browser holding the generic copy revalidates with its real ETag; Netflix must still get a 200.
    const etag = (await worker.fetch('/', { headers: other })).headers.get('etag');
    assert.ok(etag);
    assert.equal((await worker.fetch('/', { headers: { ...other, 'if-none-match': etag } })).status, 304);
    const home = await worker.fetch('/', { headers: { ...netflix, 'if-none-match': etag } });
    assert.equal(home.status, 200);
    assert.equal(home.headers.get('cache-control'), 'private, no-store');
    assert.equal(home.headers.get('etag'), null);
    assert.match(await home.text(), /<main><h1[^>]*>Hi, Netflix<\/h1>/);
    assert.match(await (await worker.fetch('/resume/', { headers: netflix })).text(),
      /<h1>Resume<\/h1><p class="resume-target">Applying to Netflix for the Solutions Engineer 5 role in Content Promotion &amp; Distribution\.<\/p>/);
    for (const path of ['/', '/resume/']) {
      const text = await (await worker.fetch(path, { headers: other })).text();
      assert.doesNotMatch(text, /Hi, Netflix|resume-target/, path);
    }
    assert.match(await (await worker.fetch('/', { headers: other })).text(), />Welcome </);
    const pdf = await worker.fetch('/resume/David_Vasandani_CV.pdf');
    assert.equal(pdf.status, 200);
    assert.match(pdf.headers.get('content-type'), /application\/pdf/);
    assert.equal(Buffer.from(await pdf.arrayBuffer()).subarray(0, 5).toString(), '%PDF-');
    assert.equal(await (await worker.fetch('/hello')).text(), 'Hello, world!');
    const probe = await worker.fetch('/debug/slack-headers?n=1', { headers: { 'user-agent': 'Probe <test>', cookie: 'secret=1' } });
    assert.equal(probe.headers.get('cache-control'), 'no-store');
    const probeHtml = await probe.text();
    assert.match(probeHtml, /content="Page fetched by: Probe &#60;test&#62;"/);
    assert.match(probeHtml, /og:image" content="http:\/\/[^"]+\/debug\/slack-headers\.jpg\?n=1"/);
    const probeImage = await worker.fetch('/debug/slack-headers.jpg?n=1');
    assert.equal(probeImage.status, 200);
    assert.equal(probeImage.headers.get('content-type'), 'image/jpeg');
    assert.deepEqual([...Buffer.from(await probeImage.arrayBuffer()).subarray(0, 2)], [0xff, 0xd8]);
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
