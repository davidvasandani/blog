// Audit every public HTML file, excluding the remote CMS application.
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const pa11y = require('pa11y');
const puppeteer = require('puppeteer');

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
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const failures = [];
    for (const file of files) {
      const result = await pa11y(pathToFileURL(file).href, { browser, timeout: 30000 });
      const errors = result.issues.filter(issue => issue.type === 'error');
      if (errors.length) failures.push(`${file}: ${errors.map(issue => issue.message).join('; ')}`);
    }
    if (failures.length) throw new Error(`accessibility issues found:\n${failures.join('\n')}`);
    console.log(`Public-page accessibility audit passed (${files.length} pages).`);
  } finally {
    await browser.close();
  }
}
module.exports = { audit };
if (require.main === module) audit(path.resolve('_site')).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
