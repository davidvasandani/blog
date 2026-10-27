# Tasks: RenderCV resume source

**Plan**: `./plan.md`

Tasks are ordered by dependency. Tasks marked **[P]** touch independent files
and may run in parallel within their group. Each task names the file(s) it
changes.

## Phase 1: Setup
- [x] T001 [P] Pin `rendercv[full]==2.8` in `resume/requirements.txt` (FR-2)
- [x] T002 [P] Create the resume source `resume/David_Vasandani_CV.yaml` from `rendercv new`, with public contact details, TODO skeleton sections and the `classic` theme (FR-1)
- [x] T003 [P] Ignore `resume/.venv/` and `resume/rendercv_output/` in `.gitignore`, and `resume/` in `.eleventyignore` (FR-6)

## Phase 2: Core
- [x] T004 Implement the `setup` / `render` / `render --watch` wrapper in `scripts/resume.cjs` with a missing-install message (FR-2–FR-5; depends on T001, T002)
- [x] T005 Add the `resume:setup`, `resume` and `resume:watch` scripts in `package.json` (depends on T004)

## Phase 3: Validation
- [x] T006 [P] Add the contract and output-exclusion tests in `tests/resume.test.cjs` (FR-8, including the FR-5 missing-install message; depends on T001–T003)
- [x] T007 [P] Add the `resume` render-and-upload job in `.github/workflows/test.yml` (FR-7; depends on T001, T002)
- [x] T008 [P] Document usage in `resume/README.md` (FR-9; depends on T005)
- [x] T009 Verify locally: `npm run resume:setup`, `npm run resume` (PDF exists), `npm test`, `npm run typecheck` (depends on T001–T008)

<!--
Conventions:
- `T001` … task ids are stable and referenced by the dependency graph.
- `[P]` … parallel-safe (independent files). Omit for tasks that must be serial.
- `[ ]` / `[x]` … completion checkbox, toggled from the workbench.
-->
