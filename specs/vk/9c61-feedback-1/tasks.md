# Tasks: resume positioning cut after the second review

Plan: `./plan.md`

Tasks are ordered by dependency. Tasks marked **[P]** touch independent files and may run together within their phase. Hiring paths are in the sibling hiring checkout on branch `vk/9c61-feedback-1`.

## Phase 1: Record (hiring)
- [x] T001 [P] Save the 2026-11-05 review transcript with date, provenance and what it changes, in `hiring/netflix/notes/` (new dated note).
- [x] T002 [P] Draft the restructure page in `hiring/netflix/resume-material/` (new page): new lines, claim-to-evidence map, merged and cut lines, replaced vague outcomes, questions only David can answer.

## Phase 2: Resume source (blog)
- [x] T003 Rewrite the summary in `resume/David_Vasandani_CV.yaml` (`cv.sections.summary`): target, scope, differentiator; "AI" once; no case study.
- [x] T004 Remove the Theme lines and the VP clause from the four Sweetgreen role summaries in `resume/David_Vasandani_CV.yaml` (depends on T003 for one consistent voice pass).
- [x] T005 Reduce the current role to seven highlights in the spec's order, with merged tooling and DoorDash bullets, compressed loyalty and data-handoff bullets, the $55K sentence folded into the corrections bullet, the denominator phrases, the AI budget and the moved re-run comment, in `resume/David_Vasandani_CV.yaml` (depends on T002 for the drafted lines).
- [x] T006 Rewrite the three vague 2019 to 2021 outcomes to the operational change in `resume/David_Vasandani_CV.yaml`.
- [x] T007 Trim the household project to two highlights with no counts and the classifier in plain words, in `resume/David_Vasandani_CV.yaml`.
- [x] T008 Reorder skills and remove the "Data & content workflows" item in `resume/David_Vasandani_CV.yaml`.
- [x] T009 Add `design.sections.show_time_spans_in: []` in `resume/David_Vasandani_CV.yaml`.
- [x] T010 [P] Bump `resume/VERSION` to 3.0.0.
- [x] T011 [P] Replace the classifier's product name with plain words in `pages/projects.md`.

## Phase 3: Voice and validation (blog)
- [x] T012 Run every changed line through the `/voice` process and record the before-and-after table with a facts column, the lines cut, and the voice notes in `specs/vk/9c61-feedback-1/research.md` (depends on T003 to T008).
- [x] T013 Run `npm run resume:voice`; fix any flagged line and update `research.md`.
- [x] T014 Render with `npm run resume -- --dont-generate-png`; confirm at most three pages, no duration lines and no "Theme:" in `resume/rendercv_output/David_Vasandani_CV.md`; record in `research.md`.
- [x] T015 Run `node --test tests/resume.test.cjs` and `npm run build`; record results in `research.md`.
- [x] T016 Compare the YAML against `origin/main` with ruamel from `resume/.venv`: only prose strings, shortened highlight lists, one removed skills item, one design key and the version changed; count `\bAI\b` per line; record in `research.md`.
- [x] T017 Grep `git diff --name-only origin/main` plus `git ls-files --others --exclude-standard` in both repositories for confidential names; run `git diff --check`.

## Phase 4: Review and knowledge
- [x] T018 Codex review of the blog diff and of the hiring diff; fix confirmed findings; re-run until clean; record in `hiring/specs/vk/9c61-feedback-1/review.md`.
- [x] T019 [P] Add a section on positioning cuts to `knowledge-base/resume-voice.md` and a line to `knowledge-base/index.md`.
- [x] T020 [P] Add a hiring knowledge page on positioning and length after the second review, plus a line in `hiring/knowledge-base/index.md`.

## Phase 5: Ship
- [x] T021 Commit both repositories (no confidential names in messages), open a PR in each against `main`, confirm checks, merge.
