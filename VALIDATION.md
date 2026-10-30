# Validation

## Baseline before application dependency upgrades
2026-10-21, Node 24.15.0 / npm 11.12.1. Original npm ci succeeded (426 packages; 37 advisories). Added test-only DOM/YAML/preview helpers and test scripts; application dependency ranges unchanged. npm test passed all 12 tests, including website and Gemini builds and API TypeScript compilation. Eleventy remained 2.0.1 and Express 4.18.2. Test tooling caused normal transitive hoisting changes; date-fns 2.7.0 matches the original browser import.

Coverage: generated navigation/pages, post date/content/archives, contact form semantics, responsive image files, Gemini content, internal-document exclusion, CMS schema/previews/registration/Identity callbacks, actual serverless hello/HEAD/echo/query/missing-route behavior.

## Upgraded clean-install validation
`npm ci`, `npm test`, `npm run typecheck`, and `npm run gemini:server:build` all passed on Node 24.15.0. The final suite has 16 tests, including a real Decap filesystem backend read/save/path-rejection test confined to disposable fixtures and browser-helper version alignment. Both builds start from clean output; Eleventy writes 21 public files and 6 Gemini files.

The tests exposed and verified fixes for removed layoutContent aliases, double image transformation, and TypeScript source-root changes. Nested Express query parsing is explicitly preserved. npm outdated lists only Node 26 types, deliberately kept on Node 24 to match the runtime.

Audit: original install had 37 findings (4 critical, 20 high, 9 moderate, 4 low). Final install has 3 low findings, all in the development-only Decap/@decap/cli/@hapi/joi chain. `npm audit --omit=dev` reports zero. No force overrides or audit downgrades were used. Browser Decap/date-fns URLs returned HTTP 200; local tests do not verify the full remotely hosted CMS UI or hosted authentication/publishing.

## Independent review
Codex CLI `codex review --base origin/main` completed with: “No actionable regressions were found in the diff.” It independently passed regression/type checks. Its sandbox blocked Gemini's listening port; a separate foreground local TLS request to /posts/hello/index.gmi returned Gemini status 20. The root Gemini page remains absent in the existing generator configuration (six post files); this task preserves that pre-existing output boundary.

Deployment follow-up adds coverage for the native hello.mts handler and restores/upgrades its @netlify/functions type dependency. The first Netlify preview failed after build in the dashboard-installed accessibility plugin (Pa11y timeout); deployment gates remain enforced.
The follow-up's 15 tests, both builds and compiler checks passed. A second independent Codex review reported no actionable regressions against the merge base.
Two previews timed out in Pa11y after successful website/function builds. Expanded Netlify logs showed default a11y inputs scanning every HTML file. The repository now scopes this static-file accessibility scan to public pages (excludes the remote CMS/unrendered Identity templates) and keeps accessibility failures blocking.
Independent review of the accessibility configuration confirmed supported inputs, preserved recursive public-page coverage, and no actionable regressions.

A third preview still timed out after scoping, so scope alone was not the cause. The old plugin is now a declared dependency with a targeted Pa11y 10 override (Puppeteer 25), replacing its obsolete browser stack. A fresh install using the documented NixOS system-Chromium setup passed all 16 tests, the full blocking public accessibility scan, type checks, and Gemini compilation. The negative accessibility fixture proves violations still fail. Independent review found no actionable defects; Chromium execution was unavailable in the review sandbox but verified in the workspace. The final install still reports only three low development findings.
GitHub's Ubuntu runner rejected Puppeteer's downloaded Chrome under AppArmor. CI now uses the runner-installed Google Chrome executable and skips the redundant browser download, preserving Chromium's sandbox.
With the upgraded Pa11y stack, Netlify's accessibility plugin and Lighthouse both passed. Lighthouse reported Performance 100, Accessibility 100, Best Practices 100, and SEO 96. The GitHub runner browser-path adjustment passed independent review; its final CI run is the remaining delivery check.

All GitHub tests, CodeQL, Netlify preview and required redirect checks passed. Merge additionally required verified signatures. The seven task commits were recreated with GitHub signatures in the same order, and their final tree hash matched the reviewed/tested source exactly. Final merge status is recorded on PR #118.

## Dependency advisory follow-up — 2026-10-30

Base: origin/main 6b0567c. Node 24.15.0 / npm 11.12.1.
- Baseline clean install and npm test: 39 tests plus public accessibility audit passed before dependency changes.
- New Joi prototype-pollution regression failed against @hapi/joi 17.1.1, then passed with scoped joi 17.13.8 alias.
- Expanded CMS tests reject unknown actions and missing required fields while retaining successful read/write and traversal checks.
- Compressed-body rejection/recovery is exercised through both installed Express majors in isolated HTTP subprocesses; these tests passed on the baseline too and are compatibility coverage, not a reproduction of the timing-dependent crash.
- Zod 4.6.7 is scoped to @decap/cli. In-memory MCP tests verify tool listing, valid calls and invalid-input rejection using both Zod v3 compatibility and v4 schemas, plus zod-to-json-schema conversion.
- PUPPETEER_SKIP_DOWNLOAD=true npm ci: passed, 0 vulnerabilities.
- npm test: 43 tests passed; public-page accessibility audit passed. NixOS used PUPPETEER_EXECUTABLE_PATH=/nix/store/j8hc3kdypr2gaa2w3dq0a370lwfzbasf-chromium-151.0.7922.137/bin/chromium.
- npm run typecheck and npm run gemini:server:build: passed.
- npm audit and npm audit --omit=dev: both 0 vulnerabilities.
- Final resolved versions: Joi 17.13.8, Zod 4.6.7, body-parser 1.20.9 (Decap Express 4) and 2.4.0 (production Express 5).
- Hosted sign-in/publishing is outside this local verification; no production credentials or external message delivery are used.
- Independent codex review --uncommitted: no actionable regressions. Reviewer separately passed Joi/MCP checks; its sandbox blocked subprocess-based compressed-request tests. Those tests passed in the primary workspace's clean full run. No significant findings remain.
