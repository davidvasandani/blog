# Tasks: resume in David's voice

Plan: `./plan.md`. Prepared through `/speckit.tasks`.

T002 and T003 edit different files and both depend only on T001, so they're marked [P]. Everything else runs in order.

- [x] T001 Draft every rewrite with its original and the facts it keeps in `specs/vk/76c7-my-voice/research.md`.
- [x] T002 [P] Apply the T001 lines to `resume/David_Vasandani_CV.yaml`, changing only text values.
- [x] T003 [P] Add a review note to `.specify/memory/constitution.md` (no amendment).
- [x] T004 Check the YAML mechanically (dashes, AI count, skill word list, `TODO` comment, word diff) and record the result in `specs/vk/76c7-my-voice/validation.md`.
- [x] T005 Render, build and run the resume tests. Compare page counts and record them in `specs/vk/76c7-my-voice/validation.md`.
- [x] T006 Run the Codex review, fix confirmed findings in `resume/David_Vasandani_CV.yaml` and `research.md`, and record it in `validation.md`.
- [x] T007 Record knowledge in `knowledge-base/resume-voice.md` and `knowledge-base/index.md`.
- [ ] T008 Commit, open the PR against main, wait for checks and merge.
