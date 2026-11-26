# Research

## Audit entry point

Use `audit(directory)` in `scripts/test-a11y.cjs`. The CLI calls it for `_site`, and `tests/a11y.test.cjs` imports it directly. An npm `pretest:a11y` hook would miss the fixture, which runs before that npm script.

## Resolve the managed Chrome target

Use the default Puppeteer instance, available to CommonJS as `require('puppeteer').default`. Await `configuration()` before doing any cache work, then read the configured Chrome version or Puppeteer's exported `PUPPETEER_REVISIONS.chrome` pin. Resolve its executable with the browser manager’s cache API. The executable resolver can return the expected path before the file exists. The installed packages were checked locally and resolved Chrome `155.0.8059.84` on Linux. Resolve it at runtime because Puppeteer versions and configuration can change.

Use `detectBrowserPlatform()` and `new Cache(config.cacheDirectory).installationDir(Browser.CHROME, platform, buildId)` from `@puppeteer/browsers`. These APIs replace hardcoded platform folders and executable paths. The default repository cache comes from `.puppeteerrc.cjs`. Fail safely if the platform is unsupported or the build ID cannot identify a concrete directory. If a configured alias already resolves in cache metadata, validate its concrete build and executable relationship before deletion. An unresolved alias cannot authorize deletion. Check that the executable belongs to the computed build.

## Invoke the installer

Run the installed Puppeteer package’s own install script with the resolved Chrome build. It detects the platform and reads the configured download mirror and npm proxy settings. Disable the two other browser downloads in the child process. Download into a temporary cache inside the version directory so a truncated archive in the original cache cannot be reused. Validate the executable and move the finished files into place, publishing the directory containing the executable last.
