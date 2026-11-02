#!/usr/bin/env node
// Wrapper around the RenderCV CLI (Python). Usage:
//   node scripts/resume.cjs setup            create resume/.venv and install resume/requirements.txt
//   node scripts/resume.cjs render [--watch] render resume/David_Vasandani_CV.yaml
// RESUME_VENV relocates the virtualenv (relative to the repository root). Cloudflare
// sets it inside node_modules/.cache, which can be cached between builds.
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { readVersion, renderedVersionFile } = require('./resume-version.cjs');

const repoDir = path.join(__dirname, '..');
const resumeDir = path.join(repoDir, 'resume');
const venvDir = path.resolve(repoDir, process.env.RESUME_VENV || path.join('resume', '.venv'));
const binDir = path.join(venvDir, process.platform === 'win32' ? 'Scripts' : 'bin');
const exe = name => path.join(binDir, process.platform === 'win32' ? `${name}.exe` : name);
const input = 'David_Vasandani_CV.yaml';

const run = (cmd, args) => {
  const result = spawnSync(cmd, args, { cwd: resumeDir, stdio: 'inherit' });
  if (result.error) return { missing: result.error.code === 'ENOENT', status: 1 };
  return { missing: false, status: result.status ?? 1 };
};

// A cached virtualenv breaks if the Python it links to has gone (e.g. a newer
// build image); spawnSync then fails or the interpreter exits non-zero.
const usable = () => fs.existsSync(exe('python')) && spawnSync(exe('python'), ['-c', '']).status === 0;

function setup() {
  if (!usable()) {
    const python = process.env.PYTHON || (process.platform === 'win32' ? 'python' : 'python3');
    const created = run(python, ['-m', 'venv', '--clear', venvDir]);
    if (created.missing) {
      console.error(`Python not found (${python}). Install Python 3.12+ or set PYTHON.`);
      return 1;
    }
    if (created.status !== 0) return created.status;
  }
  // Reconciles a reused virtualenv with requirements.txt; a no-op when already satisfied.
  return run(exe('python'), ['-m', 'pip', 'install', '--disable-pip-version-check', '-r', 'requirements.txt']).status;
}

function render(extraArgs) {
  const version = readVersion();
  const artifacts = ['David_Vasandani_CV.pdf', 'David_Vasandani_CV.md']
    .map(file => path.join(path.dirname(renderedVersionFile), file));
  const fingerprint = file => {
    try {
      const stat = fs.statSync(file, { bigint: true });
      return `${stat.ino}:${stat.mtimeNs}:${stat.ctimeNs}`;
    } catch (error) {
      if (error.code === 'ENOENT') return null;
      throw error;
    }
  };
  const before = artifacts.map(fingerprint);
  fs.rmSync(renderedVersionFile, { force: true });
  const footer = `*NAME -- PAGE_NUMBER/TOTAL_PAGES -- Resume version ${version}*`;
  const local = exe('rendercv');
  const binary = fs.existsSync(local) ? local : 'rendercv';
  const invoke = options => run(binary, ['render', input, ...options,
    '--design.templates.footer', footer]);
  // Complete one render before starting the watcher, so Eleventy can safely
  // consume its version marker while the watcher remains active.
  const result = invoke(extraArgs.filter(arg => arg !== '--watch' && arg !== '-w'));
  if (result.missing) {
    console.error('RenderCV is not installed. Run `npm run resume:setup` (needs Python 3.12+) and try again.');
  }
  if (result.status !== 0) return result.status;
  const regenerated = artifacts.every((file, index) => {
    const after = fingerprint(file);
    return after !== null && after !== before[index];
  });
  if (regenerated) fs.writeFileSync(renderedVersionFile, `${version}\n`);
  else console.warn('Published PDF and Markdown were not both regenerated; run npm run resume before building the site.');
  if (extraArgs.includes('--watch') || extraArgs.includes('-w')) {
    const watched = invoke(extraArgs);
    if (watched.status !== 0) fs.rmSync(renderedVersionFile, { force: true });
    return watched.status;
  }
  return 0;
}

const [command, ...rest] = process.argv.slice(2);
if (command === 'setup') process.exitCode = setup();
else if (command === 'render') {
  try { process.exitCode = render(rest); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
else {
  console.error('Usage: node scripts/resume.cjs <setup|render> [rendercv options]');
  process.exitCode = 2;
}
