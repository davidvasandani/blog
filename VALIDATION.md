# Validation

## Baseline before application dependency upgrades
2026-10-21, Node 24.15.0 / npm 11.12.1. Original npm ci succeeded (426 packages; 37 advisories). Added test-only DOM/YAML/preview helpers and test scripts; application dependency ranges unchanged. npm test passed all 12 tests, including website and Gemini builds and API TypeScript compilation. Eleventy remained 2.0.1 and Express 4.18.2. Test tooling caused normal transitive hoisting changes; date-fns 2.7.0 matches the original browser import.

Coverage: generated navigation/pages, post date/content/archives, contact form semantics, responsive image files, Gemini content, internal-document exclusion, CMS schema/previews/registration/Identity callbacks, actual serverless hello/HEAD/echo/query/missing-route behavior.

## Upgraded clean-install validation
`npm ci`, `npm test`, `npm run typecheck`, and `npm run gemini:server:build` all passed on Node 24.15.0. The final suite has 14 tests, including a real Decap filesystem backend read/save/path-rejection test confined to disposable fixtures and browser-helper version alignment. Both builds start from clean output; Eleventy writes 21 public files and 6 Gemini files.

The tests exposed and verified fixes for removed layoutContent aliases, double image transformation, and TypeScript source-root changes. Nested Express query parsing is explicitly preserved. npm outdated lists only Node 26 types, deliberately kept on Node 24 to match the runtime.

Audit: original install had 37 findings (4 critical, 20 high, 9 moderate, 4 low). Final install has 3 low findings, all in the development-only Decap/@decap/cli/@hapi/joi chain. `npm audit --omit=dev` reports zero. No force overrides or audit downgrades were used. Browser Decap/date-fns URLs returned HTTP 200; local tests do not verify the full remotely hosted CMS UI or hosted authentication/publishing.

## Independent review
Codex CLI `codex review --base origin/main` completed with: “No actionable regressions were found in the diff.” It independently passed regression/type checks. Its sandbox blocked Gemini's listening port; a separate foreground local TLS request to /posts/hello/index.gmi returned Gemini status 20. The root Gemini page remains absent in the existing generator configuration (six post files); this task preserves that pre-existing output boundary.
