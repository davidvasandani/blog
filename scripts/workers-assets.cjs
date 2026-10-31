// Validate required generated assets before deploying.
const fs = require('node:fs');
if (!fs.existsSync('_site/resume/David_Vasandani_CV.pdf')) {
  throw new Error('Render the resume before deploying the Worker.');
}
