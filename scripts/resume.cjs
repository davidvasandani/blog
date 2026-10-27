#!/usr/bin/env node
// Wrapper around the RenderCV CLI (Python). Usage:
//   node scripts/resume.cjs setup            create resume/.venv and install resume/requirements.txt
//   node scripts/resume.cjs render [--watch] render resume/David_Vasandani_CV.yaml
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const resumeDir = path.join(__dirname, '..', 'resume');
const venvDir = path.join(resumeDir, '.venv');
const binDir = path.join(venvDir, process.platform === 'win32' ? 'Scripts' : 'bin');
const exe = name => path.join(binDir, process.platform === 'win32' ? `${name}.exe` : name);
const input = 'David_Vasandani_CV.yaml';

const run = (cmd, args) => {
  const result = spawnSync(cmd, args, { cwd: resumeDir, stdio: 'inherit' });
  if (result.error) return { missing: result.error.code === 'ENOENT', status: 1 };
  return { missing: false, status: result.status ?? 1 };
};

function setup() {
  if (!fs.existsSync(exe('python'))) {
    const python = process.env.PYTHON || (process.platform === 'win32' ? 'python' : 'python3');
    const created = run(python, ['-m', 'venv', venvDir]);
    if (created.missing) {
      console.error(`Python not found (${python}). Install Python 3.12+ or set PYTHON.`);
      return 1;
    }
    if (created.status !== 0) return created.status;
  }
  return run(exe('python'), ['-m', 'pip', 'install', '-r', 'requirements.txt']).status;
}

function render(extraArgs) {
  const args = ['render', input, ...extraArgs];
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
