// Keep Puppeteer's browser download inside node_modules, which Netlify caches
// between builds; its default (~/.cache/puppeteer) is not cached. Used by the
// netlify-plugin-a11y (Pa11y) audit. CI and local tests may instead point
// PUPPETEER_EXECUTABLE_PATH at a system Chrome. Vercel builds (VERCEL=1) run
// no browser audit, so they skip the download.
const { join } = require('node:path');

module.exports = {
  cacheDirectory: join(__dirname, 'node_modules', '.cache', 'puppeteer'),
  skipDownload: Boolean(process.env.VERCEL),
};
