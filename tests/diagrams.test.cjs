// Published contract for the diagram-design redraws (no Python, no network).
// The skill's own checks and the export drift check run in `npm run diagrams:check`.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { mermaidBlocks } = require('../scripts/mermaid-blocks.cjs');

const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const read = file => fs.readFileSync(file, 'utf8');
const lines = file => read(file).split(/\r?\n/).map(line => line.trim());
const manifest = JSON.parse(read('diagrams/manifest.json'));
const published = manifest.diagrams.flatMap(entry => [entry.svg, entry.mermaidSvg?.path].filter(Boolean));
const postHtml = '_site/posts/mermaid-and-diagram-design/index.html';

test('diagram-design is pinned to an exact commit', () => {
  const lock = read('diagrams/diagram-design.lock');
  assert.match(lock, /^repo https:\/\/github\.com\/cathrynlavery\/diagram-design\.git$/m);
  assert.match(lock, /^commit [0-9a-f]{40}$/m);
});

test('every manifest entry matches its current Mermaid block', () => {
  for (const entry of manifest.diagrams) {
    const block = mermaidBlocks(entry.source)[entry.index];
    assert.ok(block, `${entry.source} has block ${entry.index}`);
    assert.ok(block.body.startsWith(entry.kind === 'flowchart' ? 'flowchart' : entry.kind), `block ${entry.index} is a ${entry.kind}`);
    assert.equal(block.sha256, entry.sha256, `${entry.html} was drawn from an older block ${entry.index}; redraw it and update the manifest`);
    if (entry.mermaidSvg) assert.equal(block.sha256, entry.mermaidSvg.sha256, `${entry.mermaidSvg.path} is stale`);
  }
});

test('redraws are accessible, script-free and make no network requests', () => {
  for (const entry of manifest.diagrams) {
    const slug = path.basename(entry.html, '.html');
    const svg = read(entry.svg);
    assert.match(svg, new RegExp(`<svg[^>]*role="img"[^>]*aria-labelledby="${slug}-title ${slug}-desc"`));
    assert.match(svg, new RegExp(`<svg[^>]*>\\s*<title id="${slug}-title">[^<]{1,60}</title>\\s*<desc id="${slug}-desc">[^<]+</desc>`));
    assert.doesNotMatch(read(entry.html), /fonts\.googleapis|<link\b/, `${entry.html} uses system fonts`);
  }
  for (const file of published) {
    const svg = read(file);
    assert.doesNotMatch(svg, /<script|\son[a-z]+=|@import|<foreignObject/i, `${file} has no scripts, handlers, imports or HTML labels`);
    const urls = [...svg.matchAll(/(?:href|src)\s*=\s*["']([^"']+)|url\(\s*["']?([^"')]+)/g)].map(m => m[1] || m[2]);
    assert.deepEqual(urls.filter(url => !/^(#|data:)/.test(url)), [], `${file} references only local fragments and data URIs`);
  }
});

test('the post publishes every diagram with alt text, outside the image transform', () => {
  const html = read(postHtml);
  for (const file of published) {
    const url = '/' + file;
    assert.ok(fs.existsSync(path.join('_site', file)), `${url} is published`);
    const img = html.match(new RegExp(`<img[^>]*src="${escapeRegExp(url)}"[^>]*>`));
    assert.ok(img, `post embeds ${url}`);
    assert.match(img[0], /alt="[^"]{40,}"/, `${url} has descriptive alt text`);
    assert.match(html, new RegExp(`href="https://david\\.vasandani\\.me${escapeRegExp(url)}"`), `post links to full-size ${url}`);
  }
});

test('the Gemini capsule has the post with links to the diagrams', () => {
  const gmi = read('_gemini/posts/mermaid-and-diagram-design/index.gmi');
  for (const file of published) assert.ok(gmi.includes(`=> https://david.vasandani.me/${file}`), `gemini links ${file}`);
});

test('diagram sources and the skill checkout are never published', () => {
  assert.ok(lines('.eleventyignore').includes('diagrams/'));
  assert.ok(lines('.gitignore').includes('diagrams/.diagram-design/'));
  for (const dir of ['_site', '_gemini']) {
    const files = fs.readdirSync(dir, { recursive: true }).map(String);
    const posix = files.map(file => file.split(path.sep).join('/'));
    assert.deepEqual(posix.filter(file => file.startsWith('diagrams/')), [], `${dir} has no top-level diagrams/`);
    const images = posix.filter(file => file.startsWith('static/img/diagrams/')).sort();
    if (dir === '_site') assert.deepEqual(images, [...published].sort(), 'only the published SVGs are copied');
    else assert.deepEqual(images, []);
    assert.deepEqual(files.filter(file => /partner-delivery\.md|manifest\.json|blog-profile|\.diagram-design/.test(file)), [], `${dir} has no diagram sources`);
  }
});
