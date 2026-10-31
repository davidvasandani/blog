#!/usr/bin/env node
// Wrapper around the RenderCV CLI (Python). Usage:
//   node scripts/resume.cjs setup            create resume/.venv and install resume/requirements.txt
//   node scripts/resume.cjs render [--watch] render resume/David_Vasandani_CV.yaml
// RESUME_VENV relocates the virtualenv (relative to the repository root). Netlify
// sets it inside node_modules/.cache, which Netlify keeps between builds.
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

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
  const revision = spawnSync('git', ['rev-parse', '--short=8', 'HEAD'], {
    cwd: repoDir, encoding: 'utf8',
  });
  const hash = revision.status === 0 ? revision.stdout.trim() : 'unavailable';
  if (hash === 'unavailable') console.warn('Git revision unavailable; the PDF footer will say so.');
  const args = ['render', input, ...extraArgs,
    '--design.templates.footer', `*NAME -- PAGE_NUMBER/TOTAL_PAGES -- Git: ${hash}*`];
  const local = exe('rendercv');
  if (fs.existsSync(local)) return run(local, args).status;
  const global = run('rendercv', args);
  if (!global.missing) return global.status;
  console.error('RenderCV is not installed. Run `npm run resume:setup` (needs Python 3.12+) and try again.');
  return 1;
}

const [command, ...rest] = process.argv.slice(2);
if (command === 'setup') process.exitCode = setup();
else if (command === 'render') process.exitCode = render(rest);
else {
  console.error('Usage: node scripts/resume.cjs <setup|render> [rendercv options]');
  process.exitCode = 2;
}
