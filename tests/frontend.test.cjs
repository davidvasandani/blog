const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parseHTML } = require('linkedom');
const page = name => parseHTML(fs.readFileSync(path.join('_site', name), 'utf8')).document;

test('home navigation and published pages remain accessible', () => {
  const home = page('index.html');
  assert.equal(home.title, 'Home');
  for (const url of ['/about/', '/blog/', '/contact/']) {
    assert.ok(home.querySelector(`nav a[href="${url}"]`), url);
    assert.ok(page(`${url}/index.html`).querySelector('main'));
  }
  assert.ok(page('404.html').querySelector('main'));
});

test('post content, dates, author and tag archives remain linked', () => {
  const post = page('posts/hello/index.html');
  assert.equal(post.querySelector('h1').textContent, 'hello');
  assert.equal(post.querySelector('time').getAttribute('datetime'), '2023-11-06');
  assert.equal(post.querySelector('time').textContent, '06 Nov 2023');
  for (const url of ['/authors/david-vasandani/', '/tags/hello/', '/tags/new/']) {
    assert.ok(post.querySelector(`a[href="${url}"]`), url);
    assert.ok(page(`${url}/index.html`).querySelector('a[href="/posts/hello/"]'));
  }
  assert.ok(page('blog/index.html').querySelector('a[href="/posts/hello/"]'));
});

test('contact form posts to the Slack endpoint with required fields and a hidden honeypot', () => {
  const form = page('contact/index.html').querySelector('form[name="contact"]');
  assert.equal(form.getAttribute('method').toLowerCase(), 'post');
  assert.equal(form.getAttribute('action'), '/api/contact');
  assert.equal(form.hasAttribute('data-netlify'), false);
  assert.ok(form.querySelector('[hidden] input[name="company"]:not([required])'));
  assert.ok(page('contact/thanks/index.html').querySelector('main'));
  for (const field of ['name', 'email', 'message']) {
    assert.ok(form.querySelector(`[name="${field}"][required]`));
    assert.ok(form.querySelector(`label[for="${field}"]`));
  }
  assert.ok(form.querySelector('button[type="submit"]'));
});

test('generated responsive images reference existing nonempty assets', () => {
  const files = fs.readdirSync('_site/posts', { recursive: true }).filter(f => f.endsWith('.html'));
  let images = 0;
  for (const file of files) {
    for (const img of page(`posts/${file}`).querySelectorAll('picture img')) {
      images++;
      assert.ok(img.hasAttribute('alt'));
      assert.ok(Number(img.getAttribute('width')) > 0);
      assert.ok(fs.statSync(path.join('_site', img.getAttribute('src'))).size > 0);
    }
  }
  assert.ok(images > 0);
});

test('Gemini preserves post content and internal documents are not published', () => {
  assert.match(fs.readFileSync('_gemini/posts/hello/index.gmi', 'utf8'), /hello/);
  for (const output of ['_site', '_gemini']) {
    const files = fs.readdirSync(output, { recursive: true });
    for (const name of ['SPEC', 'PRIOR_KNOWLEDGE', 'IMPLEMENTATION_PLAN', 'VALIDATION', 'specs', 'tests', 'knowledge-base']) {
      assert.ok(!files.some(f => f.split(path.sep).some(part => part === name || part.startsWith(`${name}.`))), `${output}: ${name}`);
    }
  }
});
