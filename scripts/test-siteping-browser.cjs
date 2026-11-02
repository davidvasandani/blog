// Run after npm run build, with the same browser configuration as test:a11y.
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
const feedbackApi = request => {
  if (!request.url().includes('/api/siteping')) return request.continue();
  const authenticated = request.headers().authorization === 'Bearer localtest';
  return request.respond({ status: authenticated ? 200 : 401, contentType: 'application/json', body: JSON.stringify(request.url().includes('/session') ? { login: 'editor' } : { feedbacks: [], total: 0, protocol: 1, capabilities: { comments: true, deleteComments: true }, permissions: { canDeleteAll: true } }) });
};
(async () => {
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const file = path.join(process.cwd(), '_site', pathname.endsWith('/') ? `${pathname}index.html` : pathname);
    if (!file.startsWith(path.join(process.cwd(), '_site') + path.sep)) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : 'text/html');
    fs.createReadStream(file).on('error', () => res.writeHead(404).end()).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await puppeteer.launch({ executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setRequestInterception(true);
    page.on('request', feedbackApi);
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

    // SitePing puts its annotate toolbar and comment popup in the page, so the
    // Blog's form-control rules must not reach them (task 91b3).
    const phone = await browser.newPage();
    await phone.emulate(puppeteer.KnownDevices['iPhone 15 Pro']);
    phone.on('pageerror', error => errors.push(error.message));
    // The widget's shadow root is closed; open it so the test can use the menu.
    await phone.evaluateOnNewDocument(() => {
      const attach = Element.prototype.attachShadow;
      Element.prototype.attachShadow = function (init) { return attach.call(this, { ...init, mode: 'open' }); };
    });
    await phone.setRequestInterception(true);
    phone.on('request', feedbackApi);
    await phone.goto(url, { waitUntil: 'networkidle0' });
    await phone.evaluate(() => localStorage.setItem('decap-cms-user', JSON.stringify({ token: 'localtest' })));
    await phone.reload({ waitUntil: 'networkidle0' });
    await phone.waitForFunction(() => document.querySelector('siteping-widget')?.shadowRoot?.querySelector('.sp-fab'));
    await phone.evaluate(() => document.querySelector('siteping-widget').shadowRoot.querySelector('.sp-fab').click());
    await phone.waitForFunction(() => document.querySelector('siteping-widget').shadowRoot.querySelector('[data-item-id="annotate"]'));
    await phone.evaluate(() => document.querySelector('siteping-widget').shadowRoot.querySelector('[data-item-id="annotate"]').click());
    const toolbarHandle = await phone.waitForFunction(() => [...document.querySelectorAll('body > [data-siteping-ignore]')].find(el => el.querySelector(':scope > button')));
    const toolbar = await toolbarHandle.evaluate(el => {
      const width = node => node.getBoundingClientRect().width;
      return { toolbar: width(el), cancel: width(el.querySelector(':scope > button')), instruction: Math.max(...[...el.querySelectorAll(':scope > span')].map(width)) };
    });
    assert.ok(toolbar.cancel < toolbar.toolbar / 2, `Cancel fills the annotate toolbar: ${JSON.stringify(toolbar)}`);
    assert.ok(toolbar.instruction >= 200, `annotate instruction is squeezed: ${JSON.stringify(toolbar)}`);
    await phone.goto(`${url}contact/`, { waitUntil: 'networkidle0' });
    const contact = await phone.evaluate(() => ({ form: document.querySelector('form[name="contact"]').clientWidth, button: document.querySelector('form[name="contact"] button').getBoundingClientRect().width }));
    assert.equal(Math.round(contact.button), contact.form, `contact form button lost its full width: ${JSON.stringify(contact)}`);
    assert.deepEqual(errors, []);
    console.log('On a phone the annotate toolbar keeps a compact Cancel and a readable instruction; the contact form keeps its styles.');
  } finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
