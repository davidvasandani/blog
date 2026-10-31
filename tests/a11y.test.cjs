const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { audit } = require('../scripts/test-a11y.cjs');

test('upgraded accessibility engine still blocks an inaccessible page', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-a11y-test-'));
  fs.writeFileSync(path.join(dir, 'index.html'), '<!doctype html><html><body><p>Missing document language and title</p></body></html>');
  try {
    await assert.rejects(audit(dir), /accessibility issues found/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
