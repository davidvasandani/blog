# Tasks: STAR resume rewrite with measured outcomes

Plan: `./plan.md`

Tasks are ordered by dependency. Tasks marked **[P]** touch independent files and may run in parallel within their group. Paths outside this repository are in the sibling hiring checkout.

## Phase 1: Evidence (hiring)
- [x] T001 [P] Record the hiring manager's feedback as a dated note under `hiring/netflix/notes/`
- [x] T002 [P] Add the 2026-11-04 crash re-run to `hiring/netflix/evidence/pos-register-oom.md` (query, window, per-register counts, caveats)
- [x] T003 Draft every new bullet with a claim-to-evidence map, the restored facts, the cuts and the estimate list in `hiring/netflix/resume-material/star-rewrite.md` (depends on T002)

## Phase 2: Resume (blog)
- [x] T004 Rewrite summary and highlights in `resume/David_Vasandani_CV.yaml` from T003; replace the crash TODO comment (depends on T003)
- [x] T005 [P] Bump `resume/VERSION` to 2.0.0
- [x] T006 Voice pass on every changed line; before-and-after table with facts column in `specs/vk/7e87-star-method/research.md` (depends on T004)

## Phase 3: Validation (blog)
- [x] T007 `npm run resume:voice` passes (depends on T004)
- [x] T008 `npm run resume -- --dont-generate-png` renders at most three pages; `node --test tests/resume.test.cjs` and `npm run build` pass (depends on T004, T005)
- [x] T009 YAML shape diff (only prose changed, cuts as listed) and confidentiality grep of `git diff origin/main`; `git diff --check` in both repositories (depends on T004)
- [x] T010 Record results in `specs/vk/7e87-star-method/validation.md` (depends on T007, T008, T009)

## Phase 4: Review and knowledge
- [x] T011 Codex review of both diffs; address confirmed findings; record in `hiring/specs/vk/7e87-star-method/review.md` (depends on T010)
- [x] T012 [P] Knowledge: `hiring/knowledge-base/star-resume.md` and `hiring/knowledge-base/index.md`
- [x] T013 [P] Knowledge: measured-outcomes section in `knowledge-base/resume-voice.md` and `knowledge-base/index.md`
- [ ] T014 Commit both repositories, open PRs, merge after checks (depends on T011, T012, T013)
