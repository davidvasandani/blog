// Call the pinned postinstall routine directly so a rejected download exits nonzero.
import { downloadBrowsers } from 'puppeteer/internal/node/install.js';

await downloadBrowsers();
