# Tasks

## Baseline layer
- [x] T001 Set up test commands/tooling in package.json, package-lock.json, tsconfig.test.json and exclude internal output in .eleventyignore/.gitignore.
- [x] T002 [P] Add frontend tests in tests/frontend.test.cjs (after T001).
- [x] T003 [P] Add admin and API tests in tests/admin.test.cjs and tests/api.test.cjs (after T001).
- [x] T004 Run baseline and record results in VALIDATION.md (after T002, T003).

## Upgrade layer
- [x] T005 Research and upgrade package.json/package-lock.json, browser imports and runtime/config compatibility; record decisions in specs/vk/0b58-upgrade-dependen/research.md (after T004).
- [x] T006 [P] Document local checks in README.md (after T005).
- [x] T007 [P] Add CI checks in .github/workflows/test.yml (after T005).
- [x] T008 Clean install, test, compile and build both outputs; update VALIDATION.md (after T006,T007).

## Delivery layer
- [x] T009 Independent Codex review and confirmed fixes, with revalidation (after T008).
- [x] T010 Commit knowledge-base/index.md and dependency-testing.md with task identifier (after T009).
- [x] T011 Open PR against main and verify checks (after T010). Final merge is performed by pipeline stage 13; its authoritative status is [PR #118](https://github.com/davidvasandani/blog/pull/118).
