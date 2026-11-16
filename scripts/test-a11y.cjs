// Audit every public HTML file, excluding the remote CMS application.
// Set A11Y_CDP_URL to audit in an existing Chrome, local or remote, instead of
// launching one. Puppeteer then answers that browser's requests for the pages
// over the DevTools connection, so the browser needs no route back to this host.
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const pa11y = require('pa11y');
const puppeteer = require('puppeteer');

const origin = 'http://a11y.invalid';
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };

async function servedPage(browser, directory) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (!request.url().startsWith(`${origin}/`)) return request.continue();
    const file = path.join(directory, decodeURIComponent(new URL(request.url()).pathname));
    if (!file.startsWith(directory + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      return request.respond({ status: 404, body: '' });
    }
    return request.respond({ status: 200, contentType: types[path.extname(file)] || 'application/octet-stream', body: fs.readFileSync(file) });
  });
  return page;
}

async function audit(directory) {
  const files = [];
  function collect(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (file !== path.join(directory, 'admin')) collect(file);
      } else if (entry.name.endsWith('.html')) files.push(file);
    }
  }
  collect(directory);
  if (!files.length) throw new Error('No public HTML files found for accessibility audit.');
  const cdpUrl = process.env.A11Y_CDP_URL;
  const browser = cdpUrl
    ? await puppeteer.connect({ browserURL: cdpUrl })
    : await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const pageUrl = file => cdpUrl
    ? `${origin}/${path.relative(directory, file).split(path.sep).map(encodeURIComponent).join('/')}`
    : pathToFileURL(file).href;
  try {
    const failures = [];
    for (const file of files) {
      // pa11y's cleanup removes every request listener from a page it is given, so
      // each file gets a fresh page with its own interception.
      const page = cdpUrl && await servedPage(browser, directory);
      let result;
      try {
        result = await pa11y(pageUrl(file), page ? { browser, page, timeout: 30000 } : { browser, timeout: 30000 });
      } finally {
        if (page) await page.close();
      }
      const errors = result.issues.filter(issue => issue.type === 'error');
      if (errors.length) failures.push(`${file}: ${errors.map(issue => issue.message).join('; ')}`);
    }
    if (failures.length) throw new Error(`accessibility issues found:\n${failures.join('\n')}`);
    console.log(`Public-page accessibility audit passed (${files.length} pages).`);
  } finally {
    if (cdpUrl) await browser.disconnect();
    else await browser.close();
  }
}
module.exports = { audit };
if (require.main === module) audit(path.resolve('_site')).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
