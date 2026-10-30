const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { spawnSync } = require('node:child_process');

// Resolve from the real consumer, including nested dependencies after npm ci.
const proxyRequire = createRequire(require.resolve('decap-server/dist/middlewares'));
const cliRequire = createRequire(proxyRequire.resolve('@decap/cli/dev'));

test('Decap validation messages cannot pollute Object.prototype', () => {
  const Joi = cliRequire('@hapi/joi');
  try {
    Joi.string().messages(JSON.parse('{"__proto__":{"blogPolluted":"unexpected"}}'));
    assert.equal(Object.hasOwn(Object.prototype, 'blogPolluted'), false);
    const schema = Joi.string().required().messages({ 'string.empty': 'A title is required' });
    assert.equal(schema.validate('').error.message, 'A title is required');
    assert.equal(schema.validate('A valid title').error, undefined);
  } finally {
    delete Object.prototype.blogPolluted;
  }
});

for (const [name, expressPath] of [
  ['production API', require.resolve('express')],
  ['local Decap proxy', cliRequire.resolve('express')],
]) {
  test(`${name} survives trailing bytes after a compressed request`, () => {
    // A vulnerable parser can raise an uncaught exception. Isolate the HTTP
    // server so a crash is an assertion failure rather than a dead test runner.
    const probe = spawnSync(process.execPath, ['-e', `
      const assert = require('node:assert/strict');
      const http = require('node:http');
      const { gzipSync } = require('node:zlib');
      const express = require(process.argv[1]);
      const app = express();
      app.use(express.json());
      app.post('/', (req, res) => res.json(req.body));
      app.use((err, req, res, next) => res.status(err.status || 500).end());
      const server = app.listen(0, '127.0.0.1', async () => {
        const send = body => new Promise((resolve, reject) => {
          const req = http.request({ host: '127.0.0.1', port: server.address().port,
            method: 'POST', path: '/', headers: { 'content-type': 'application/json',
              'content-encoding': 'gzip', 'content-length': body.length } }, res => {
            let text = ''; res.on('data', chunk => text += chunk);
            res.on('end', () => resolve({ status: res.statusCode, text }));
          });
          req.on('error', reject); req.end(body);
        });
        try {
          const valid = gzipSync(JSON.stringify({ title: 'Still working' }));
          const bad = await send(Buffer.concat([valid, Buffer.from('invalid trailing bytes')]));
          assert.equal(bad.status, 400);
          const good = await send(valid);
          assert.equal(good.status, 200);
          assert.deepEqual(JSON.parse(good.text), { title: 'Still working' });
        } catch (error) { console.error(error); process.exitCode = 1; }
        finally { server.close(); }
      });
    `, expressPath], { encoding: 'utf8', timeout: 10000 });
    assert.equal(probe.error, undefined, String(probe.error));
    assert.equal(probe.status, 0, probe.stderr || probe.stdout);
  });
}

test('Decap MCP dependencies still validate tools with Zod 3 and 4 schemas', async () => {
  const sdkRequire = createRequire(cliRequire.resolve('@modelcontextprotocol/sdk/server/mcp.js'));
  const { McpServer } = sdkRequire('./mcp.js');
  const { Client } = cliRequire('@modelcontextprotocol/sdk/client/index.js');
  const { InMemoryTransport } = cliRequire('@modelcontextprotocol/sdk/inMemory.js');
  const { zodToJsonSchema } = sdkRequire('zod-to-json-schema');
  const z3 = sdkRequire('zod/v3');
  const z4 = sdkRequire('zod/v4');
  assert.equal(zodToJsonSchema(z3.object({ title: z3.string() })).properties.title.type, 'string');
  const server = new McpServer({ name: 'local-test', version: '1.0.0' });
  const client = new Client({ name: 'local-test-client', version: '1.0.0' });
  for (const [name, z] of [['v3', z3], ['v4', z4]]) {
    server.registerTool(name, { inputSchema: { title: z.string().min(1) } }, async ({ title }) => ({
      content: [{ type: 'text', text: title }],
    }));
  }
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  try {
    await server.connect(serverTransport);
    await client.connect(clientTransport);
    const listed = await client.listTools();
    assert.equal(listed.tools.length, 2);
    for (const tool of listed.tools) {
      assert.equal(tool.inputSchema.properties.title.type, 'string');
      const valid = await client.callTool({ name: tool.name, arguments: { title: 'Test post' } });
      assert.equal(valid.content[0].text, 'Test post');
      const invalid = await client.callTool({ name: tool.name, arguments: { title: 123 } });
      assert.equal(invalid.isError, true);
    }
  } finally {
    await client.close();
    await server.close();
  }
});
