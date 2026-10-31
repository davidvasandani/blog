const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { toPageMarkdown, pdfFile, pdfUrl } = require('../scripts/resume-page.cjs');

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

test('local environment and rendered output stay out of git and template processing', () => {
  const gitignore = lines('.gitignore');
  assert.ok(gitignore.includes('resume/.venv/'));
  assert.ok(gitignore.includes('resume/rendercv_output/'));
  assert.ok(lines('.eleventyignore').includes('resume/'));
});

test('resume page markdown keeps one h1 and an unbroken outline', () => {
  const markdown = "# David Vasandani's CV\n\n- Email: x\n\n# Summary\nText\n\n# Experience\n## **Co**, Role\n";
  assert.equal(toPageMarkdown(markdown), '- Email: x\n\n## Summary\nText\n\n## Experience\n### **Co**, Role');
});

test('the Gemini capsule never contains the resume', () => {
  assert.ok(fs.existsSync('_gemini'), '_gemini was built');
  const files = fs.readdirSync('_gemini', { recursive: true }).map(String);
  assert.deepEqual(files.filter(file => /resume|David_Vasandani_CV/i.test(file)), []);
});

test('the site publishes the resume page and PDF only when the resume is rendered', () => {
  assert.ok(fs.existsSync('_site'), '_site was built');
  const site = fs.readdirSync('_site', { recursive: true }).map(String).map(file => file.split(path.sep).join('/'));
  const published = site.filter(file => /David_Vasandani_CV|^resume\//.test(file)).sort();
  const nav = read('_site/index.html').includes('href="/resume/"');
  if (!fs.existsSync(pdfFile)) {
    assert.deepEqual(published, []);
    assert.equal(nav, false, 'no nav link to a missing page');
    return;
  }
  assert.deepEqual(published, ['resume/David_Vasandani_CV.pdf', 'resume/index.html']);
  assert.ok(nav, 'nav links to /resume/');
  assert.ok(fs.statSync(path.join('_site', 'resume', 'David_Vasandani_CV.pdf')).size > 0);
  const page = read('_site/resume/index.html');
  assert.equal(page.match(/<h1[\s>]/g).length, 1);
  assert.match(page, /<title>Resume<\/title>/);
  assert.ok(page.includes(`href="${pdfUrl}"`));
  assert.match(page, /<h2[^>]*>Experience<\/h2>/);
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

test('render uses the virtualenv named by RESUME_VENV (Cloudflare cache location)', { skip: process.platform === 'win32' }, t => {
  const root = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'resume-venv-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const bin = path.join(root, 'cached-venv', 'bin');
  fs.mkdirSync(bin, { recursive: true });
  // Stand-in rendercv that records its arguments instead of rendering.
  fs.writeFileSync(path.join(bin, 'rendercv'), '#!/bin/sh\necho "$@" > "${0%/*}/args"\n', { mode: 0o755 });
  const result = spawnSync(process.execPath, ['scripts/resume.cjs', 'render', '--dont-generate-png'], {
    encoding: 'utf8',
    env: { PATH: '', RESUME_VENV: path.join(root, 'cached-venv') },
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(read(path.join(bin, 'args')).trim(), 'render David_Vasandani_CV.yaml --dont-generate-png');
});
