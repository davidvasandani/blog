const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { toPageMarkdown, renderResume, pdfFile, pdfUrl } = require('../scripts/resume-page.cjs');

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

test('an entry header gets a company eyebrow, one meta line and a theme callout', () => {
  const html = renderResume([
    '### **Sweetgreen**, Senior Manager, IT Infrastructure & Innovation', '',
    'Culver City, CA', '', 'Feb 2026 – present', '', '10 months', '',
    '**Theme: Running IT operations.**', '', 'Promoted from Lead.', '', '- Bullet',
  ].join('\n'));
  assert.equal(html, [
    '<h3><span class="resume-org">Sweetgreen</span><span class="visually-hidden">, </span>'
      + '<span class="resume-role">Senior Manager, IT Infrastructure &amp; Innovation</span></h3>',
    '<p class="resume-meta"><span>Feb 2026 – present</span><span>10 months</span><span>Culver City, CA</span></p>',
    '<p class="resume-theme"><span class="resume-label">Theme:</span> Running IT operations.</p>',
    '<p>Promoted from Lead.</p>',
    '<ul>\n<li>Bullet</li>\n</ul>',
    '',
  ].join('\n'));
});

test('a year alone is meta, a sentence is not, and plain headings stay as they are', () => {
  const openSource = renderResume('### **Fork**\n\n2026\n\nBuilt for my own use.\n');
  assert.equal(openSource, '<h3><strong>Fork</strong></h3>\n<p class="resume-meta"><span>2026</span></p>\n<p>Built for my own use.</p>\n');
  const project = renderResume('### **Platform**\n\nPersonal project, built in 2026.\n\n- Bullet\n');
  assert.match(project, /<p>Personal project, built in 2026\.<\/p>/);
  assert.doesNotMatch(project, /resume-meta/);
  const older = renderResume('### **Co**, Engineer\n\nRemote\n\n2016 – 2019\n\n- Bullet\n');
  assert.match(older, /<p class="resume-meta"><span>2016 – 2019<\/span><span>Remote<\/span><\/p>/);
});

test('resume text is still escaped inside the new markup', () => {
  const html = renderResume('### **<b>Co</b>**, <i>Role</i>\n\n<script>x</script>\n\n2020 – 2021\n\n**Theme: <img src=x>**\n');
  assert.doesNotMatch(html, /<(b|i|script|img)[ >]/i);
  assert.match(html, /&lt;script&gt;x&lt;\/script&gt;/);
  assert.match(html, /<span class="resume-label">Theme:<\/span> &lt;img src=x&gt;/);
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
    env: { ...process.env, RESUME_VENV: path.join(root, 'cached-venv') },
  });
  assert.equal(result.status, 0, result.stderr);
  const hash = spawnSync('git', ['rev-parse', '--short=8', 'HEAD'], { encoding: 'utf8' }).stdout.trim();
  assert.equal(read(path.join(bin, 'args')).trim(),
    `render David_Vasandani_CV.yaml --dont-generate-png --design.templates.footer *NAME -- PAGE_NUMBER/TOTAL_PAGES -- Git: ${hash}*`);

  const withoutGit = spawnSync(process.execPath, ['scripts/resume.cjs', 'render'], {
    encoding: 'utf8',
    env: { PATH: '', RESUME_VENV: path.join(root, 'cached-venv') },
  });
  assert.equal(withoutGit.status, 0, withoutGit.stderr);
  assert.match(withoutGit.stderr, /Git revision unavailable/);
  assert.match(read(path.join(bin, 'args')), /Git: unavailable/);
});
