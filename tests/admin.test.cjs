const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const yaml = require('js-yaml');
const htm = require('htm');
const { format } = require('date-fns');
const { parseHTML } = require('linkedom');
const read = file => fs.readFileSync(`_site/admin/${file}`, 'utf8');

test('CMS backend and content schemas preserve local editing and publishing paths', () => {
  const config = yaml.load(read('config.yml'));
  assert.deepEqual(config.backend, {
    name: 'github', repo: 'davidvasandani/blog', branch: 'main',
    base_url: 'https://david.vasandani.me', auth_endpoint: 'api/auth', auth_scope: 'public_repo'
  });
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

const RESUME = 'resume/David_Vasandani_CV.yaml';
const resumeFile = () => yaml.load(read('config.yml')).collections.find(c => c.name === 'resume').files[0];

test('Resume collection edits the RenderCV file in place', () => {
  const resume = yaml.load(read('config.yml')).collections.find(c => c.name === 'resume');
  assert.equal(resume.label, 'Resume');
  assert.equal(resume.folder, undefined);
  assert.equal(resume.create, undefined);
  assert.equal(resume.delete, false);
  assert.equal(resume.files.length, 1);
  assert.equal(resume.files[0].file, RESUME);
  // A .yaml extension isn't inferred as YAML for a single file.
  assert.equal(resume.files[0].format, 'yml');
});

// Every key the resume uses needs a field, or a form save could lose it.
function uncovered(value, field, where) {
  if (field.widget === 'hidden') return [];
  if (field.fields && field.widget !== 'list') {
    assert.equal(typeof value, 'object', where);
    return Object.entries(value).flatMap(([key, child]) => {
      const sub = field.fields.find(f => f.name === key);
      return sub ? uncovered(child, sub, `${where}.${key}`) : [`${where}.${key}`];
    });
  }
  if (field.widget === 'list') {
    assert.ok(Array.isArray(value), where);
    const item = field.fields ? { widget: 'object', fields: field.fields } : field.field;
    return item ? value.flatMap((child, i) => uncovered(child, item, `${where}[${i}]`)) : [];
  }
  assert.notEqual(typeof value, 'object', `${where} holds a structure but its field is a ${field.widget}`);
  return [];
}

test('Resume form has a field for every key in the resume file', () => {
  const data = yaml.load(fs.readFileSync(RESUME, 'utf8'));
  assert.deepEqual(uncovered(data, { widget: 'object', fields: resumeFile().fields }, 'resume'), []);
});

test('a CMS save of the unchanged resume keeps the data RenderCV reads', () => {
  // Same steps as decap-cms-core's YAML toFile, with the yaml 1.x major it bundles.
  const YAML = require('yaml');
  const source = fs.readFileSync(RESUME, 'utf8');
  const data = YAML.parseDocument(source).toJSON();
  const order = resumeFile().fields.map(f => f.name);
  const contents = YAML.createNode(data);
  contents.items.sort((a, b) => order.indexOf(a.key.toString()) - order.indexOf(b.key.toString()));
  const doc = new YAML.Document();
  doc.contents = contents;
  const saved = doc.toString();
  assert.deepEqual(yaml.load(saved), yaml.load(source));
  assert.deepEqual(Object.keys(yaml.load(saved)), order);
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

test('admin loads Decap and the previews without Netlify Identity', () => {
  const { document } = parseHTML(read('index.html'));
  assert.ok(document.querySelector('script[src*="decap-cms"]'));
  assert.ok(document.querySelector('script[type="module"][src="/admin/preview-templates/index.js"]'));
  assert.doesNotMatch(read('index.html'), /identity/i);
});

test('browser preview helper pins match the versions exercised locally', () => {
  const pkg = require('../package.json');
  for (const name of ['post', 'page']) {
    assert.ok(read(`preview-templates/${name}.js`).includes(`htm@${pkg.devDependencies.htm}/`));
  }
  assert.ok(read('preview-templates/post.js').includes(`date-fns@${pkg.devDependencies['date-fns']}/`));
});

test('local CMS backend reads and saves a temporary post and rejects path traversal', async () => {
  const os = require('node:os');
  const path = require('node:path');
  const express = require('express');
  const serverless = require('serverless-http');
  const { registerLocalFs } = require('decap-server/dist/middlewares');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-cms-test-'));
  const previous = process.env.GIT_REPO_DIRECTORY;
  const app = express();
  try {
    process.env.GIT_REPO_DIRECTORY = dir;
    await registerLocalFs(app, { logLevel: 'error' });
  } finally {
    if (previous === undefined) delete process.env.GIT_REPO_DIRECTORY;
    else process.env.GIT_REPO_DIRECTORY = previous;
  }
  const handler = serverless(app);
  const request = async (action, params) => handler({
    httpMethod: 'POST', path: '/api/v1',
    headers: { host: 'localhost', 'content-type': 'application/json' },
    body: JSON.stringify({ action, params }), isBase64Encoded: false,
  }, {});
  try {
    const info = await request('info');
    assert.equal(info.statusCode, 200);
    assert.equal(JSON.parse(info.body).type, 'local_fs');
    for (const [action, params] of [
      ['unknownAction', {}],
      ['getEntry', { branch: 'main' }],
      ['persistEntry', { branch: 'main', entry: { path: 'posts/invalid.md' } }],
    ]) {
      const rejected = await request(action, params);
      assert.equal(rejected.statusCode, 422, rejected.body);
    }
    const raw = '---\ntitle: Local test\n---\nTest body';
    const saved = await request('persistEntry', {
      branch: 'main', entry: { slug: 'test', path: 'posts/test/test.md', raw }, assets: [],
      options: { commitMessage: 'test fixture only', useWorkflow: false, status: 'draft' },
    });
    assert.equal(saved.statusCode, 200, saved.body);
    assert.equal(fs.readFileSync(path.join(dir, 'posts/test/test.md'), 'utf8'), raw);
    const entry = await request('getEntry', { branch: 'main', path: 'posts/test/test.md' });
    assert.equal(entry.statusCode, 200);
    assert.ok(entry.body.includes('Test body'));
    const invalid = await request('getEntry', { branch: 'main', path: '../outside.md' });
    assert.equal(invalid.statusCode, 422);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
