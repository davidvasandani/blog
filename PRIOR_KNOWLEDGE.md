# Prior knowledge: Fix SitePing UI (task 91b3)

Sources: `knowledge-base/siteping.md`, `knowledge-base/dependency-testing.md`,
`knowledge-base/cloudflare-hosting.md`, `.specify/memory/constitution.md`.

## SitePing (`knowledge-base/siteping.md`, VAS-945)
- The widget only loads for signed-in CMS editors. `src/siteping.js` reads
  Decap's `decap-cms-user` token and checks `/api/siteping/session` before it
  calls `initSiteping`. Public readers never load the widget.
- `scripts/build-siteping.cjs` bundles `src/siteping.js` with esbuild into
  `_site/assets/siteping` after the Eleventy build. `_includes/layouts/base.njk`
  loads it as a module.
- `scripts/test-siteping-browser.cjs` drives the built widget in Puppeteer
  (mount after verification, cross-tab logout). The page doesn't say how it
  runs, and neither `npm test` nor CI calls it. It's a manual check.
- `@siteping/widget` is pinned at 0.12.0 (devDependency, bundled).

Not in the knowledge base (found in the widget source for this task): the
launcher and FAB live in a closed shadow root, but the annotate toolbar,
overlay, comment popup, markers and tooltip go straight into
`document.body`. They set inline styles, but any property they leave unset
takes the host page's CSS.

## Testing (`knowledge-base/dependency-testing.md`)
- `npm test` cleans, builds HTML and Gemini, runs `node --test tests/*.test.cjs`,
  then the Pa11y audit of public pages. CI runs it with
  `PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome` and skips the browser
  download.
- On NixOS, set `PUPPETEER_EXECUTABLE_PATH` to system Chromium.

## Constitution
- Principle 1: Blog repository only.
- Principle 2: keep published content and the editor workflow as they are.
  The contact form must look the same.
- Principle 3/4: test observable behavior, deterministically, with no
  production credentials. Mock the SitePing API.
- Principle 9: local validation, independent review, knowledge update, PR.
