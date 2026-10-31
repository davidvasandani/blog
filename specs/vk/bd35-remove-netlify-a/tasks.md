# Tasks

## Layer 1: independent source changes
- [x] T001 [P] Move shared API to api/app.ts; update workers/index.ts, api/tsconfig.json, tsconfig.test.json and tests/api.test.cjs; remove api/functions, netlify, netlify.toml, vercel.json, admin/email-templates and static/root/_redirects; simplify scripts/workers-assets.cjs.
- [x] T002 [P] Replace plugin in scripts/test-a11y.cjs and tests/a11y.test.cjs; update .puppeteerrc.cjs.
## Layer 2: integration (depends on T001/T002)
- [x] T003 Update package.json and package-lock.json; README.md, resume/README.md, provider-specific comments and .gitignore.
## Layer 3: verification
- [x] T004 Run typecheck, npm test and test:workers; document results in specs/vk/bd35-remove-netlify-a/validation.md.
- [x] T005 Independent Codex review; address significant findings and reverify.
## Layer 4: delivery
- [x] T006 Update knowledge-base/cloudflare-hosting.md and knowledge-base/index.md, tag task, commit knowledge and code.
- [ ] T007 Open PR, verify required checks and merge.
