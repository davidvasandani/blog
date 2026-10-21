// Run the same blocking public-page audit used by Netlify.
const path = require('node:path');
const plugin = require('netlify-plugin-a11y');

plugin.onPostBuild({
  inputs: { checkPaths: ['/'], ignoreDirectories: ['admin'], resultMode: 'error', debugMode: false },
  constants: { PUBLISH_DIR: path.resolve('_site') },
  utils: { build: { failBuild(message, { error } = {}) { throw new Error(message, { cause: error }); } } },
}).then(() => console.log('Public-page accessibility audit passed.')).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
