// Run after npm run build, with the same browser configuration as test:a11y.
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
(async () => {
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const file = path.join(process.cwd(), '_site', pathname === '/' ? 'index.html' : pathname);
    if (!file.startsWith(path.join(process.cwd(), '_site') + path.sep)) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : 'text/html');
    fs.createReadStream(file).on('error', () => res.writeHead(404).end()).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await puppeteer.launch({ executablePath: process.env.PUPPETEER_EXECUTABLE_PATH });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.url().includes('/api/siteping')) {
        const authenticated = request.headers().authorization === 'Bearer localtest';
        return request.respond({ status: authenticated ? 200 : 401, contentType: 'application/json', body: JSON.stringify(request.url().includes('/session') ? { login: 'editor' } : { feedbacks: [], total: 0, protocol: 1, capabilities: { comments: true, deleteComments: true }, permissions: { canDeleteAll: true } }) });
      }
      return request.continue();
    });
    const url = `http://127.0.0.1:${server.address().port}/`;
    await page.goto(url, { waitUntil: 'networkidle0' });
    assert.equal(await page.$('siteping-widget'), null);
    await page.evaluate(() => localStorage.setItem('decap-cms-user', JSON.stringify({ token: 'localtest' })));
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForSelector('siteping-widget');
    const other = await browser.newPage();
    await other.goto(url);
    await other.evaluate(() => localStorage.removeItem('decap-cms-user'));
    await page.waitForFunction(() => !document.querySelector('siteping-widget'));
    assert.deepEqual(errors, []);
    console.log('Built widget mounts after CMS verification and disappears on cross-tab logout; anonymous page has no widget.');
  } finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
