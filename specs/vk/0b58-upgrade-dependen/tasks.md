# Tasks

## Baseline layer
- [x] T001 Set up test commands/tooling in package.json, package-lock.json, tsconfig.test.json and exclude internal output in .eleventyignore/.gitignore.
- [x] T002 [P] Add frontend tests in tests/frontend.test.cjs (after T001).
- [x] T003 [P] Add admin and API tests in tests/admin.test.cjs and tests/api.test.cjs (after T001).
- [x] T004 Run baseline and record results in VALIDATION.md (after T002, T003).

## Upgrade layer
- [ ] T005 Research and upgrade package.json/package-lock.json, browser imports and runtime/config compatibility; record decisions in specs/vk/0b58-upgrade-dependen/research.md (after T004).
- [ ] T006 [P] Document local checks in README.md (after T005).
- [ ] T007 [P] Add CI checks in .github/workflows/test.yml (after T005).
- [ ] T008 Clean install, test, compile and build both outputs; update VALIDATION.md (after T006,T007).

## Delivery layer
- [ ] T009 Independent Codex review and confirmed fixes, with revalidation (after T008).
- [ ] T010 Commit knowledge-base/index.md and dependency-testing.md with task identifier (after T009).
- [ ] T011 Open PR against main, verify checks and merge (after T010).
