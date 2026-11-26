# Validate Chrome recovery

Run from the repository root after implementation. Use Node 24 and `npm ci`. The real recovery run requires access to the Chrome download and the host libraries Puppeteer needs. Use a POSIX shell for the commands below.

```sh
node --test tests/puppeteer-preflight.test.cjs
npm run build
```

Use temporary directories and an injected installer in the focused tests. Cover healthy reuse, both bypasses, an absent build, a damaged build with intact siblings, installer failure, and a successful installer exit with the executable still unusable. Check installer call counts and build/path diagnostics against the [recovery states](data-model.md).

Seed an incomplete build in an isolated cache. Run the public-page audit first, then remove only the installed executable and run the full test command. Puppeteer should repair Chrome before the inaccessible fixture launches, and the fixture should still reject its page for accessibility issues.

```sh
(
  set -eu
  unset PUPPETEER_EXECUTABLE_PATH PUPPETEER_BROWSER
  PUPPETEER_CACHE_DIR=$(mktemp -d)
  export PUPPETEER_CACHE_DIR
  trap 'rm -rf -- "$PUPPETEER_CACHE_DIR"' EXIT
  chrome=$(node --input-type=module -e \
    'import puppeteer from "puppeteer"; console.log(await puppeteer.executablePath())')
  mkdir -p "$(dirname "$chrome")" "$PUPPETEER_CACHE_DIR/chrome/sibling-sentinel"
  npm run test:a11y
  test -x "$chrome"
  rm -- "$chrome"
  npm test
  test -x "$chrome"
  test -d "$PUPPETEER_CACHE_DIR/chrome/sibling-sentinel"
)
```
