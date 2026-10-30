// Netlify's forced redirects (301!) are not valid Workers asset redirects.
// The apex stays on Netlify during migration, where these rules still apply.
const fs = require('node:fs');
fs.rmSync('_site/_redirects', { force: true });
if (!fs.existsSync('_site/resume/David_Vasandani_CV.pdf')) {
  throw new Error('Render the resume before deploying the Worker.');
}
