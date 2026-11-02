const fs = require('node:fs');
const path = require('node:path');

const versionFile = path.join(__dirname, '..', 'resume', 'VERSION');
const renderedVersionFile = path.join(__dirname, '..', 'resume', 'rendercv_output', 'resume-version.txt');

function readVersion(file = versionFile) {
  let version;
  try {
    version = fs.readFileSync(file, 'utf8').trim();
  } catch (error) {
    throw new Error(`Cannot read resume version from ${file}. Check resume/VERSION and run npm run resume.`, { cause: error });
  }
  if (!/^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/.test(version)) {
    throw new Error(`Invalid resume version in ${file}: expected MAJOR.MINOR.PATCH (no leading zeros or suffixes).`);
  }
  return version;
}

function readRenderedVersion(file = renderedVersionFile, source = versionFile) {
  const version = readVersion(source);
  if (readVersion(file) !== version) {
    throw new Error('Rendered resume version differs from resume/VERSION. Run npm run resume before building the site.');
  }
  return version;
}

module.exports = { readVersion, readRenderedVersion, renderedVersionFile };
