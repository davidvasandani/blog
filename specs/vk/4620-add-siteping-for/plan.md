# Technical plan

Use the current Eleventy and Cloudflare Worker application. Reuse Decap 3.17.1's `decap-cms-user` localStorage token; do not create a second credential or login flow. Treat that token as untrusted until GitHub verifies push permission on davidvasandani/blog on every API request. No authorization cache. No credentials in feedback records.

1. Add a browser bootstrap at `src/siteping.js`, emitted with pinned esbuild and @siteping/widget. It checks `/api/siteping/session` before dynamically importing the widget. The widget sends a fresh token with each request. Storage events, focus, and a periodic session check remove the widget after logout or revocation. Public base layout loads only the small bootstrap. Add a CMS link back to the Blog.
2. Route `/api/siteping` and `/api/siteping/session` ahead of Express in `workers/index.ts`. `workers/siteping-auth.ts` validates bearer auth with GitHub repo permissions, disallows cross-origin access, and returns no-store responses. Deny missing/invalid tokens and fail closed on upstream errors.
3. Export `BlogFeedback` Durable Object from `workers/siteping.ts`. Bind it in wrangler.jsonc with a SQLite migration. A single named object per deployment uses @siteping/adapter-kit collection store, storing JSON per feedback in SQLite in one transaction. The library serializes writes and provides filters, paging, dedup, comments and status transitions. This suits the small editor-only Blog; document whole-collection scan cost.
4. Use @siteping/server's validated protocol and custom access policy limited to the Blog project. Disable screenshots and diagnostics. Cap request bytes. Do not enable webhook or issue-tracker integrations. The widget panel's all-pages filter provides shared review.
5. Test real protocol/store persistence with local Worker and mocked GitHub authentication, plus browser lifecycle tests. Run existing checks and independent Codex review.

Constitution check: Blog-only changes, no OAuth contract changes, direct pinned dependencies, deterministic mocked tests, internal documents excluded from publication, no new non-Node tooling. No deviations.

Risks: Decap storage format is version-specific and needs regression coverage. GitHub failure disables feedback. Durable Object storage is deployment-specific; production and preview must not share data. No global cache may retain authenticated responses.
