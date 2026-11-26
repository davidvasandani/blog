const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const fs = require('node:fs/promises');
const { constants } = require('node:fs');
const path = require('node:path');
const { Browser, Cache, detectBrowserPlatform } = require('@puppeteer/browsers');
const { default: puppeteer, PUPPETEER_REVISIONS } = require('puppeteer');
const { lock } = require('proper-lockfile');
const run = promisify(execFile);

async function lstatIfPresent(file) {
  try {
    return await fs.lstat(file);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

async function checkFile(executable) {
  if (!(await fs.stat(executable)).isFile()) {
    throw new Error('Expected a regular Chrome executable');
  }
}

async function checkExecutable(executable) {
  await checkFile(executable);
  await fs.access(executable, constants.X_OK);
}

async function resolveChrome(puppeteer) {
  const config = await puppeteer.configuration();
  if (config.executablePath || (config.defaultBrowser ?? 'chrome') !== 'chrome') return;

  const platform = detectBrowserPlatform();
  const requestedBuild = config.chrome?.version ?? PUPPETEER_REVISIONS.chrome;
  if (!platform || !config.cacheDirectory || !requestedBuild) {
    throw new Error(`Cannot resolve a managed Chrome target for build ${requestedBuild}`);
  }

  const cache = new Cache(path.resolve(config.cacheDirectory));
  const buildId = cache.resolveAlias(Browser.CHROME, requestedBuild) ?? requestedBuild;
  if (!/^\d+(?:\.\d+){3}$/.test(buildId)) {
    throw new Error(`Cannot resolve a concrete Chrome build for ${requestedBuild}`);
  }

  const directory = cache.installationDir(Browser.CHROME, platform, buildId);
  const executable = cache.computeExecutablePath({ browser: Browser.CHROME, platform, buildId });
  const relative = path.relative(directory, executable);
  if (!relative || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Chrome build ${buildId} has an executable outside ${directory}: ${executable}`);
  }
  return { buildId, platform, directory, executable };
}

async function installChrome({ buildId, platform, directory, executable }) {
  // Keep interrupted downloads inside the one directory the next repair cleans.
  await fs.mkdir(directory);
  const cacheDir = await fs.mkdtemp(path.join(directory, '.repair-'));
  try {
    const installed = new Cache(cacheDir).installationDir(Browser.CHROME, platform, buildId);
    await run(process.execPath, [require.resolve('./install-chrome.mjs')], {
      env: {
        ...process.env,
        PUPPETEER_CACHE_DIR: cacheDir,
        PUPPETEER_CHROME_VERSION: buildId,
        PUPPETEER_SKIP_DOWNLOAD: 'false',
        PUPPETEER_CHROME_SKIP_DOWNLOAD: 'false',
        PUPPETEER_CHROME_HEADLESS_SHELL_SKIP_DOWNLOAD: 'true',
        PUPPETEER_FIREFOX_SKIP_DOWNLOAD: 'true',
      },
    });
    await checkExecutable(path.join(installed, path.relative(directory, executable)));
    // Publish the executable's bundle last. Its presence signals a complete build.
    const bundle = path.relative(directory, executable).split(path.sep)[0];
    const entries = await fs.readdir(installed);
    for (const entry of entries.filter(name => name !== bundle).concat(bundle)) {
      await fs.rename(path.join(installed, entry), path.join(directory, entry));
    }
  } finally {
    await fs.rm(cacheDir, { recursive: true, force: true });
  }
}

async function hasExecutable(executable) {
  try {
    await checkFile(executable);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return false;
    throw error;
  }
}

async function preflight({ browser = puppeteer, install = installChrome } = {}) {
  const target = await resolveChrome(browser);
  if (!target) return;
  const { buildId, directory, executable } = target;
  try {
    if (await hasExecutable(executable)) return;

    const parent = path.dirname(directory);
    await fs.mkdir(parent, { recursive: true });
    // The build may not exist yet. Use a sibling lock which survives its removal.
    const release = await lock(directory, {
      realpath: false,
      stale: 30000,
      retries: { retries: 300, minTimeout: 100, maxTimeout: 1000 },
    });
    try {
      if (await hasExecutable(executable)) return;
      if (await lstatIfPresent(directory)) {
        await fs.rm(directory, { recursive: true, force: true });
      }
      await install(target);
      await checkExecutable(executable);
    } finally {
      await release();
    }
  } catch (cause) {
    throw new Error(`Could not prepare Chrome build ${buildId} at ${executable}`, { cause });
  }
}

module.exports = { preflight };
