# Implementation tasks

- [x] T001 Pin SitePing and build dependencies in package.json/package-lock.json after baseline checks.
- [x] T002 [P] Add verified editor authentication in workers/siteping-auth.ts.
- [x] T003 [P] Add durable shared store and SitePing protocol in workers/siteping.ts.
- [x] T004 [P] Add browser lifecycle in src/siteping.js and scripts/build-siteping.cjs.
- [x] T005 Wire workers/index.ts, wrangler.jsonc, generated runtime types, .eleventy.js, _includes/layouts/base.njk, and admin/index.html. Depends on T002–T004.
- [x] T006 Add tests/siteping.test.cjs and browser/Worker integration tests. Depends on T005.
- [x] T007 Run regression, type, accessibility and Worker validation; document in feature validation.md.
- [x] T008 Run independent Codex review, fix confirmed findings and rerun affected checks.
- [x] T009 Update knowledge-base topic/index with task ID and commit knowledge.
- [ ] T010 Open PR against main, pass required checks, and merge.
