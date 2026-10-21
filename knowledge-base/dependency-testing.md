# Dependency upgrades and local testing

Task: 0b580ba2-71f3-4437-83a4-8ea5080e8fe4 (Upgrade Dependencies)
Updated: 2026-10-21

## Repeatable verification
Use Node 24 and npm ci. Run npm test, npm run typecheck, and npm run gemini:server:build. npm test cleans generated output before building both formats and running Node's test runner. Preserve a passing baseline commit before upgrading application dependencies. CI uses these same commands.

## Admin boundary
The admin backend is hosted Git Gateway/Identity plus the local Decap proxy. Tests evaluate shipped previews and Identity callbacks, parse CMS configuration, and invoke real Decap filesystem middleware against temporary post fixtures. The repository's /api/hello and /api/echo functions are tested through serverless-http. None of this verifies hosted authentication, Git Gateway writes, or the remote CMS UI in a browser.

Browser htm/date-fns pins must match local test helpers; the suite checks alignment. The Decap CMS bundle is independently pinned in admin/index.html. npm start uses the installed decap-server; local editor saves modify the checkout.

## Migration pitfalls
- Eleventy 3 removed layoutContent; use content in both HTML and Gemini layouts. Builds can succeed with empty page bodies, so assert rendered content.
- The official image transform replaces markdown-it-eleventy-img. Mark already-generated shortcode images eleventy:ignore to avoid treating generated URLs as input files.
- Express 5 changes the default query parser. Preserve extended parsing explicitly for nested query compatibility.
- TypeScript needs explicit rootDir to preserve dist/index.js and .test-dist/api.js output paths.
- Both generators scan repository Markdown. Exclude planning, tests, and knowledge pages in .eleventyignore.
- The existing Gemini generator emits six posts, without a root index; use /posts/hello/index.gmi for its local TLS smoke check.

## Dependency risk
After this upgrade, runtime-only npm audit reports zero findings. Three low findings remain in @hapi/joi via the development-only Decap CLI/proxy. Recheck upstream releases before the next upgrade; avoid force-downgrading merely to silence audit. Node types intentionally follow Node 24 rather than the latest Node major.

Evidence: VALIDATION.md and specs/vk/0b58-upgrade-dependen/research.md.
