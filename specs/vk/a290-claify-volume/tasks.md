# Tasks: clarify volume in the loyalty-scan bullet

Plan: `./plan.md`

Tasks are ordered by dependency. Tasks marked **[P]** touch independent files and may run in parallel within their group. Each task names the file(s) it changes.

## Phase 1: Setup
- [x] T001 [P] Install Node dependencies for the checks (`npm ci`; changes only the ignored `node_modules/`)
- [x] T002 [P] Set up the pinned RenderCV venv and render the current resume as the baseline page count (`npm run resume:setup`, `npm run resume`; ignored `resume/.venv/`, `resume/rendercv_output/`)

## Phase 2: Core
- [x] T003 Replace "32 of 272 restaurants" with "32 of our highest volume restaurants" in the Senior Manager loyalty-scan highlight in `resume/David_Vasandani_CV.yaml`
- [x] T004 Run the edited bullet through the `/voice` skill; apply only fact-preserving fixes in `resume/David_Vasandani_CV.yaml` (depends on T003)
- [x] T005 Record the before-and-after with a facts column and the `/voice` result in `specs/vk/a290-claify-volume/research.md` (depends on T004)

## Phase 3: Validation
- [x] T006 [P] Compare old and new YAML parses: only `experience[0].highlights[2]` changed (no file changes; depends on T001, T004)
- [x] T007 [P] Run `npm run resume:voice` (no file changes; depends on T001, T004)
- [x] T008 [P] Render the edited resume and confirm the page count matches the baseline (ignored output; depends on T002, T004)
- [x] T009 [P] Grep the diff against `origin/main` for confidential names (no file changes; depends on T005)
- [x] T010 Run `npm test` (ignored build output; depends on T006 to T008)
- [x] T011 Write the validation results in `specs/vk/a290-claify-volume/validation.md` (depends on T006 to T010)
