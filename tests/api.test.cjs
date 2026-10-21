const { test } = require('node:test');
const assert = require('node:assert/strict');
const { handler } = require('../.test-dist/api.js');
const request = (path, extra = {}) => handler({
  httpMethod: 'GET', path, headers: { host: 'localhost', 'x-test': 'local' },
  queryStringParameters: {}, body: null, isBase64Encoded: false, ...extra
}, {});

test('serverless hello and HEAD contracts', async () => {
  const result = await request('/api/hello');
  assert.equal(result.statusCode, 200);
  assert.equal(result.body, 'Hello World!');
  assert.match(result.headers['content-type'], /text\/html/);
  assert.equal((await request('/api/hello', { httpMethod: 'HEAD' })).body, '');
});

test('serverless echo preserves request metadata and repeated query values', async () => {
  const result = await request('/api/echo', {
    queryStringParameters: { message: 'hello world', 'filter[status]': 'published' },
    multiValueQueryStringParameters: { tag: ['one', 'two'] }
  });
  assert.equal(result.statusCode, 200);
  assert.match(result.headers['content-type'], /application\/json/);
  const body = JSON.parse(result.body);
  assert.equal(body.path, '/echo');
  assert.equal(body.method, 'GET');
  assert.equal(body.hostname, 'localhost');
  assert.equal(body.headers['x-test'], 'local');
  assert.equal(body.query.message, 'hello world');
  assert.deepEqual(body.query.filter, { status: 'published' });
  assert.deepEqual(body.query.tag, ['one', 'two']);
  assert.equal(typeof body.os.hostname, 'string');
});

test('missing routes and unsupported mutations return 404', async () => {
  for (const [url, method] of [['/api/missing', 'GET'], ['/hello', 'GET'], ['/api/hello', 'POST']]) {
    assert.equal((await request(url, { httpMethod: method })).statusCode, 404);
  }
});

test('native Netlify hello function returns a web Response', async () => {
  const { default: hello } = await import('../.test-dist/hello/hello.mjs');
  const result = await hello(new Request('http://localhost/hello'), {});
  assert.equal(result.status, 200);
  assert.equal(await result.text(), 'Hello, world!');
});
