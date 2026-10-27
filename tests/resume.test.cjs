const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const read = file => fs.readFileSync(file, 'utf8');
const lines = file => read(file).split(/\r?\n/).map(line => line.trim());

test('RenderCV is pinned to an exact release with its CLI extras', () => {
  const requirements = lines('resume/requirements.txt').filter(line => line && !line.startsWith('#'));
  assert.deepEqual(requirements, ['rendercv[full]==2.8']);
});

test('resume source targets the pinned schema and names David', () => {
  const source = read('resume/David_Vasandani_CV.yaml');
  assert.match(source, /refs\/tags\/v2\.8\/schema\.json/);
  assert.match(source, /^ {2}name: David Vasandani$/m);
  assert.match(source, /^ {2}theme: classic$/m);
});

test('local environment and rendered output stay out of git and site builds', () => {
  const gitignore = lines('.gitignore');
  assert.ok(gitignore.includes('resume/.venv/'));
  assert.ok(gitignore.includes('resume/rendercv_output/'));
  assert.ok(lines('.eleventyignore').includes('resume/'));
  for (const output of ['_site', '_gemini']) {
    assert.ok(fs.existsSync(output), `${output} was built`);
    assert.ok(!fs.existsSync(path.join(output, 'resume')), `${output}/resume`);
    const files = fs.readdirSync(output, { recursive: true }).map(String);
    assert.deepEqual(files.filter(file => /David_Vasandani_CV/.test(file)), [], output);
  }
});

test('render explains setup when RenderCV is not installed', t => {
  // Copy the wrapper beside an empty resume folder so no venv or PATH binary is found.
  const root = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'resume-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'scripts'));
  fs.mkdirSync(path.join(root, 'resume'));
  fs.copyFileSync('scripts/resume.cjs', path.join(root, 'scripts', 'resume.cjs'));
  const result = spawnSync(process.execPath, [path.join(root, 'scripts', 'resume.cjs'), 'render'], {
    encoding: 'utf8',
    env: { PATH: '' },
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /npm run resume:setup/);
});
