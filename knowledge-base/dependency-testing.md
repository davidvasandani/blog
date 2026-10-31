# Dependency upgrades and local testing

Current hosting update (task bd3547c1-520f-493b-a49e-18f32927121c): see [Cloudflare hosting](cloudflare-hosting.md). Provider-specific instructions below are historical.

Task: 0b580ba2-71f3-4437-83a4-8ea5080e8fe4 (Upgrade Dependencies)
Updated: 2026-10-30

## Repeatable verification
Use Node 24 and npm ci. Run npm test, npm run typecheck, and npm run gemini:server:build. npm test cleans generated output before building both formats and running Node's test runner. Preserve a passing baseline commit before upgrading application dependencies. CI uses these same commands.

## Admin boundary
The admin backend is hosted Git Gateway/Identity plus the local Decap proxy. Tests evaluate shipped previews and Identity callbacks, parse CMS configuration, and invoke real Decap filesystem middleware against temporary post fixtures. The repository's /api/hello and /api/echo functions are tested through serverless-http. The nested netlify/functions/hello/hello.mts handler is also compiled and tested; include both .ts and .mts patterns when scanning functions. None of this verifies hosted authentication, Git Gateway writes, or the remote CMS UI in a browser.

Browser htm/date-fns pins must match local test helpers; the suite checks alignment. The Decap CMS bundle is independently pinned in admin/index.html. npm start uses the installed decap-server; local editor saves modify the checkout.

## Migration pitfalls
- Eleventy 3 removed layoutContent; use content in both HTML and Gemini layouts. Builds can succeed with empty page bodies, so assert rendered content.
- The official image transform replaces markdown-it-eleventy-img. Mark already-generated shortcode images eleventy:ignore to avoid treating generated URLs as input files.
- Express 5 changes the default query parser. Preserve extended parsing explicitly for nested query compatibility.
- TypeScript needs explicit rootDir to preserve dist/index.js and .test-dist/api.js output paths.
- Both generators scan repository Markdown. Exclude planning, tests, and knowledge pages in .eleventyignore.
- The existing Gemini generator emits six posts, without a root index; use /posts/hello/index.gmi for its local TLS smoke check.

## Dependency risk
After the 2026-10-30 follow-up, full and runtime-only npm audits report zero findings. This replaces the historical three-low-finding result from October 21. Recheck advisories on each upgrade; avoid force-downgrading merely to silence audit. Node types intentionally follow Node 24 rather than the latest Node major.

Evidence: VALIDATION.md and specs/vk/0b58-upgrade-dependen/research.md.

Netlify's dashboard-installed netlify-plugin-a11y 0.0.12 scans HTML files directly, with a 30-second per-page timeout. Its default recursive scan includes admin/index.html and unrendered Identity email templates. netlify.toml scopes that audit to public pages while retaining error mode; admin contracts are covered separately by the local suite. Expand the Building section on public Netlify deploy pages to see full logs and resolved plugin inputs.

Excluding admin alone did not resolve the Netlify timeout. The legacy plugin is now declared locally with an explicit Pa11y 10 override, replacing its obsolete Pa11y 5/Puppeteer stack. npm test runs the actual public audit plus an inaccessible fixture to prove errors still block. Puppeteer normally downloads its browser on installation; NixOS can use PUPPETEER_SKIP_DOWNLOAD=true and PUPPETEER_EXECUTABLE_PATH pointing to system Chromium.
GitHub's Ubuntu runner uses /usr/bin/google-chrome for this audit: its AppArmor profile supports the sandbox, whereas Puppeteer's downloaded binary was rejected. CI skips the redundant browser download rather than disabling Chromium's sandbox.

The Blog main branch also requires verified commit signatures and linear history. Check these requirements before delivery. Where a local signing key is unavailable, GitHub createCommitOnBranch can recreate the task commits with verified platform signatures; compare tree hashes and preserve the baseline-before-upgrade ordering before updating the task branch with an explicit force-with-lease.

Update 2026-10-27 (task e51fe535-6eff-4934-a141-6f1fb612dbda): Netlify's image moved to npm 11.19, which skips install scripts that `allowScripts` in package.json has not approved. Netlify also restores a cached node_modules ("up to date") but not ~/.cache/puppeteer, so Pa11y found no Chrome and failed every deploy preview. Fixes: `allowScripts` approves the pinned Puppeteer (`npm install-scripts approve puppeteer`; re-approve after Puppeteer bumps); `.puppeteerrc.cjs` stores the browser in node_modules/.cache/puppeteer (cached by Netlify); and the Netlify build command runs `npx puppeteer browsers install chrome` first. That command is idempotent, and it needs `unzip`, which Netlify has (NixOS: nixpkgs#unzip).

## Scoped security overrides (2026-10-30)
Task: 0b580ba2-71f3-4437-83a4-8ea5080e8fe4 (Upgrade Dependencies, advisory follow-up).

- @decap/cli still imports deprecated @hapi/joi. Override that dependency with npm:joi@17.13.8: 17.13.6 fixes the original language-key pollution but has additional prototype-replacement and isoDate backtracking advisories. The regression test resolves Joi from the actual Decap consumer and checks that hostile message keys cannot change Object.prototype.
- @decap/cli declares Zod ^3.25.0; its installed 0.1.2 bundles do not import it. Override Zod only within that dependency subtree to 4.6.7. MCP SDK 1.32.1 and zod-to-json-schema 3.25.2 accept Zod 4. In-memory tests cover schema conversion, tool listing and valid/invalid calls with both v3 compatibility and v4 schemas. Do not assume a future Decap release has the same imports.
- Both body-parser major versions must be patched: 1.20.9 under Decap's Express 4 and 2.4.0 under the production Express 5. Both fit existing dependency ranges, so the committed lockfile is sufficient; no body-parser override is needed.
- Remove each scoped override only after an upstream Decap release resolves a patched dependency naturally and clean installation, full/admin tests and both audits pass. Inspect consumer source again before retaining a major Zod override across a Decap update.
- npm audit's suggested decap-server downgrade to 3.11.3 still declares @hapi/joi directly. Inspect the resulting tree rather than trusting the suggested version.

Evidence: VALIDATION.md and specs/001-dependency-advisories/research.md. The compressed-request tests exercise rejection/recovery on both Express majors; they also pass on the old versions and do not reproduce the timing-dependent crash.
