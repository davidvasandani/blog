const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { Browser, Cache, detectBrowserPlatform } = require('@puppeteer/browsers');
const { preflight } = require('../scripts/puppeteer-preflight.cjs');

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'blog-chrome-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));

  const cache = new Cache(root);
  const platform = detectBrowserPlatform();
  const buildId = '123.4.5.6';
  const directory = cache.installationDir(Browser.CHROME, platform, buildId);
  const executable = cache.computeExecutablePath({ browser: Browser.CHROME, platform, buildId });
  const config = { cacheDirectory: root, defaultBrowser: 'chrome', chrome: { version: buildId } };
  const browser = { configuration: async () => config };
  const writeExecutable = async () => {
    await fs.mkdir(path.dirname(executable), { recursive: true });
    await fs.writeFile(executable, '', { mode: 0o755 });
  };
  return { browser, root, config, directory, executable, buildId, platform, writeExecutable };
}

test('installs an absent Chrome build without removing any directory', async t => {
  const { browser, directory, buildId, platform, writeExecutable } = await fixture(t);
  const remove = t.mock.method(fs, 'rm');
  const install = t.mock.fn(async target => {
    assert.equal(target.buildId, buildId);
    assert.equal(target.platform, platform);
    await assert.rejects(fs.stat(directory), { code: 'ENOENT' });
    await writeExecutable();
  });
  await preflight({ browser, install });
  assert.equal(install.mock.callCount(), 1);
  assert.equal(remove.mock.callCount(), 0);
});

test('concurrent preflights repair one incomplete build and preserve its sibling', async t => {
  const { browser, directory, executable, writeExecutable } = await fixture(t);
  const sibling = path.join(path.dirname(directory), 'sibling');
  const keep = path.join(sibling, 'keep');
  await fs.mkdir(sibling, { recursive: true });
  await fs.writeFile(keep, 'keep');
  await writeExecutable();
  await fs.unlink(executable);

  const install = t.mock.fn(async () => {
    await assert.rejects(fs.stat(directory), { code: 'ENOENT' });
    await writeExecutable();
  });
  await Promise.all([preflight({ browser, install }), preflight({ browser, install })]);
  assert.equal(install.mock.callCount(), 1);
  assert.equal(await fs.readFile(keep, 'utf8'), 'keep');

  await fs.unlink(executable);
  await preflight({ browser, install });
  assert.equal(install.mock.callCount(), 2);
});

for (const failure of ['cleanup', 'installer', 'unusable executable']) {
  test(`reports the build and executable after ${failure} failure`, async t => {
    const { browser, directory, executable, buildId } = await fixture(t);
    const cause = new Error(failure);
    await fs.mkdir(directory, { recursive: true });
    const remove = failure === 'cleanup' && t.mock.method(fs, 'rm', async () => { throw cause; });
    const install = t.mock.fn(async () => {
      if (failure === 'installer') throw cause;
      await fs.mkdir(executable, { recursive: true });
    });

    try {
      await assert.rejects(preflight({ browser, install }), error => {
        assert.ok(error.message.includes(buildId));
        assert.ok(error.message.includes(executable));
        if (failure === 'unusable executable') assert.match(error.cause.message, /regular/);
        else assert.equal(error.cause, cause);
        return true;
      });
      assert.equal(install.mock.callCount(), failure === 'cleanup' ? 0 : 1);
    } finally {
      if (remove) remove.mock.restore();
    }
  });
}

test('preserves an existing build when the executable path points to a directory', async t => {
  const { browser, executable, buildId } = await fixture(t);
  await fs.mkdir(executable, { recursive: true });
  const install = t.mock.fn();

  await assert.rejects(preflight({ browser, install }), error => {
    assert.ok(error.message.includes(buildId));
    assert.ok(error.message.includes(executable));
    assert.match(error.cause.message, /regular/);
    return true;
  });
  assert.ok((await fs.stat(executable)).isDirectory());
  assert.equal(install.mock.callCount(), 0);
});

test('reuses healthy managed Chrome without removing or installing anything', async t => {
  const { browser, executable, writeExecutable } = await fixture(t);
  await writeExecutable();
  const before = await fs.stat(executable);
  const remove = t.mock.method(fs, 'rm');
  const install = t.mock.fn();

  await preflight({ browser, install });

  const after = await fs.stat(executable);
  assert.equal(after.ino, before.ino);
  assert.equal(after.mtimeMs, before.mtimeMs);
  assert.equal(remove.mock.callCount(), 0);
  assert.equal(install.mock.callCount(), 0);
});

for (const override of [{ executablePath: '/system/chrome' }, { defaultBrowser: 'firefox' }]) {
  test(`bypasses the managed cache for ${Object.keys(override)[0]}`, async t => {
    const configuration = async () => ({
      ...override,
      get cacheDirectory() { assert.fail('Managed cache should not be read'); },
    });
    const install = t.mock.fn();
    await preflight({ browser: { configuration }, install });
    assert.equal(install.mock.callCount(), 0);
  });
}

test('reuses healthy Chrome through a linked browser directory', async t => {
  const { browser, root, executable, writeExecutable } = await fixture(t);
  await writeExecutable();
  const chromeRoot = path.join(root, 'chrome');
  const shared = path.join(root, 'shared');
  await fs.rename(chromeRoot, shared);
  await fs.symlink(shared, chromeRoot, 'junction');
  await preflight({ browser, install: () => assert.fail('Unexpected download') });
  await fs.unlink(executable);
  await preflight({ browser, install: writeExecutable });
  assert.ok((await fs.stat(executable)).isFile());
  assert.ok((await fs.lstat(chromeRoot)).isSymbolicLink());
});

test('repairs a build with a file obstructing the executable path', async t => {
  const { browser, directory, executable, writeExecutable } = await fixture(t);
  await fs.mkdir(directory, { recursive: true });
  const bundle = path.relative(directory, executable).split(path.sep)[0];
  await fs.writeFile(path.join(directory, bundle), 'partial');
  await preflight({ browser, install: writeExecutable });
  assert.ok((await fs.stat(executable)).isFile());
});

test('leaves permissions on an existing executable to the launcher', async t => {
  const { browser, executable, writeExecutable } = await fixture(t);
  await writeExecutable();
  await fs.chmod(executable, 0o644);
  const before = await fs.stat(executable);
  await preflight({ browser, install: () => assert.fail('Unexpected download') });
  assert.equal((await fs.stat(executable)).mode, before.mode);
});
