# SitePing and CMS sign-in

Task: 2edab207-fbe6-4baa-96e7-37ba3e0ed70a, VAS-945, 2026-11-01.

SitePing reuses the GitHub token in pinned Decap 3.17.1's `decap-cms-user`
localStorage entry. There is no separate sign-in. `workers/siteping-auth.ts`
checks repository push permission and GitHub identity on every request. Browser
identity fields are never authorization evidence. Public readers do not load the
widget itself. Logout storage events remove it across tabs; focus and a
60-second check revalidate the session. Recheck the storage contract when Decap
is upgraded. No token is stored in feedback.

`workers/siteping.ts` exports the SQLite `BlogFeedback` Durable Object.
`wrangler.jsonc` binds `BLOG_FEEDBACK` and declares the `siteping-v1` migration.
Keep those declarations on subsequent deployments. Feedback, annotations, replies,
and statuses are shared between editors. The widget's all-pages panel is the
review inbox. Production and preview storage are separate. Screenshots and
diagnostics are disabled both in the widget and before persistence.

The adapter kit serializes collection mutations within the singleton object;
SQLite transactionSync makes snapshot writes atomic. This scans and rewrites the
collection and suits the small Blog editor audience. A public high-volume use
case should use indexed queries instead. Export from the panel before any
intentional namespace deletion.

`scripts/build-siteping.cjs` runs after Eleventy's HTML build and emits a small
bootstrap plus lazy widget chunks in `_site/assets/siteping`. Gemini is unchanged.
`tests/siteping.test.cjs` tests the real Worker with mocked GitHub and a temporary
persistent runtime. Pinned Miniflare v5 needs its compatibility converter and
explicit shared-storage persistence options to test restart durability.
`scripts/test-siteping-browser.cjs` checks the built widget and cross-tab logout
using Puppeteer, with the same executable configuration as the accessibility test.
