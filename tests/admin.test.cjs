const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const yaml = require('js-yaml');
const htm = require('htm');
const format = require('date-fns/format');
const { parseHTML } = require('linkedom');
const read = file => fs.readFileSync(`_site/admin/${file}`, 'utf8');

test('CMS backend and content schemas preserve local editing and publishing paths', () => {
  const config = yaml.load(read('config.yml'));
  assert.deepEqual(config.backend, { name: 'git-gateway', branch: 'main' });
  assert.equal(config.local_backend, true);
  assert.equal(config.publish_mode, 'editorial_workflow');
  const blog = config.collections.find(c => c.name === 'blog');
  assert.equal(blog.folder, 'posts');
  assert.equal(blog.path, '{{slug}}/{{title}}');
  assert.equal(blog.create, true);
  assert.equal(blog.fields.find(f => f.name === 'body').widget, 'markdown');
  for (const name of ['title', 'date', 'author', 'summary', 'tags']) assert.ok(blog.fields.find(f => f.name === name));
  const pages = config.collections.find(c => c.name === 'pages');
  assert.equal(pages.folder, 'pages');
  assert.equal(pages.create, false);
  assert.ok(pages.fields.find(f => f.name === 'permalink'));
});

function preview(name, data) {
  // Substitute only remote module imports; execute the shipped component with real helpers.
  const source = read(`preview-templates/${name}.js`)
    .replace(/^import .*;\n/gm, '')
    .replace(/export default (\w+);/, 'globalThis.component = $1;');
  const context = { htm, format, h: (tag, props, ...children) => ({ tag, props, children }), createClass: x => x };
  vm.runInNewContext(source, context);
  const body = { tag: 'div', props: {}, children: ['Body fixture'] };
  const result = context.component.render.call({ props: {
    entry: { getIn: ([, key], fallback) => data[key] ?? fallback },
    widgetFor: key => { assert.equal(key, 'body'); return body; }
  } });
  return JSON.stringify(result);
}

test('page and post previews render entry title, body, date, summary and tags', () => {
  assert.match(preview('page', { title: 'Page title' }), /Page title.*Body fixture/);
  const post = preview('post', { title: 'Post title', date: new Date('2024-02-15T12:00:00Z'), summary: 'Summary fixture', tags: ['one', 'two'] });
  for (const value of ['Post title', '15 Feb, 2024', 'Summary fixture', 'Body fixture', 'one', 'two']) assert.ok(post.includes(value));
  assert.match(preview('post', { title: 'Draft' }), /Draft/);
});

test('preview registration matches configured collections and styles', async () => {
  const registrations = [];
  const styles = [];
  const source = read('preview-templates/index.js').replace(/^import .*;\n/gm, '');
  const { document } = parseHTML('<html></html>');
  vm.runInNewContext(source, {
    Post: 'post', Page: 'page', document,
    CMS: { registerPreviewTemplate: (...args) => registrations.push(args), registerPreviewStyle: url => styles.push(url) },
    fetch: async url => {
      assert.equal(url, '/');
      return { text: async () => '<link rel="stylesheet" href="/extra.css"><link rel="stylesheet" media="print" href="/print.css">' };
    }
  });
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(registrations, [['blog', 'post'], ['pages', 'page']]);
  assert.deepEqual(styles, ['/_includes/assets/css/inline.css', '/extra.css']);
  assert.ok(fs.existsSync('_site/_includes/assets/css/inline.css'));
});

test('admin identity callbacks redirect login and logout to the editor', () => {
  const { document } = parseHTML(read('index.html'));
  assert.ok(document.querySelector('script[src*="decap-cms"]'));
  assert.ok(document.querySelector('script[type="module"][src="/admin/preview-templates/index.js"]'));
  const source = [...document.querySelectorAll('script')].filter(s => !s.src).map(s => s.textContent).join('\n');
  for (const user of [null, { id: 'local-test' }]) {
    const callbacks = {};
    const doc = { location: { href: '/initial' } };
    vm.runInNewContext(source, { window: { netlifyIdentity: { on: (event, fn) => { callbacks[event] = fn; } } }, document: doc });
    callbacks.init(user);
    callbacks[user ? 'logout' : 'login']();
    assert.equal(doc.location.href, '/admin/');
  }
  assert.doesNotThrow(() => vm.runInNewContext(source, { window: {} }));
});
