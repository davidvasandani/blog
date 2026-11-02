# Tasks: Resume semantic version

Plan: ./plan.md

## Foundation
- [x] T001 Add `resume/VERSION` and `scripts/resume-version.cjs`.

## Integration (after T001; independent files)
- [x] T002 [P] Replace footer and record completed render version in `scripts/resume.cjs`.
- [x] T003 [P] Check rendered version in `scripts/resume-page.cjs`; display in `pages/resume.njk`.

## Verification (after T002/T003)
- [x] T004 [P] Update `tests/resume.test.cjs` for version errors, no-Git rendering and published output.
- [x] T005 [P] Document bump and render workflow in `resume/README.md`.
- [x] T006 Run relevant tests and render/PDF extraction; record results in `VALIDATION.md`.

## Delivery
- [x] T007 Independent Codex CLI review; resolve findings and repeat validation.
- [x] T008 Update `knowledge-base/resume-rendercv.md` and `knowledge-base/index.md`; commit.
- [ ] T009 Open and merge PR after checks pass.
