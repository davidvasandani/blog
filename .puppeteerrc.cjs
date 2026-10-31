// Cache the accessibility audit browser with local dependencies.
// PUPPETEER_EXECUTABLE_PATH can select a system browser.
const { join } = require('node:path');
module.exports = { cacheDirectory: join(__dirname, 'node_modules', '.cache', 'puppeteer') };
