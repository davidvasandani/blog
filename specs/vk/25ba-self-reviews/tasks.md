# Tasks: Review documents as resume evidence

**Plan**: `./plan.md`

Paths starting with `hiring:` are in the private repository; file names there are described generically on purpose. All other paths are in this repository.

## Phase 1: Sources and cross-check (private)
- [x] T001 [P] Keep the three review documents as received in `hiring:` evidence folder for performance reviews
- [x] T002 Write the claim-by-claim cross-check page in the same folder (depends on T001)

## Phase 2: Timeline, notes, proposals (private)
- [x] T003 Add missing entries and review pointers to `hiring:` work timeline source, rebuild with its script, and record the change in that folder's README (depends on T002)
- [x] T004 [P] Write the dated note in `hiring:` notes folder (depends on T002)
- [x] T005 [P] Draft the proposed resume lines through `/voice` in `hiring:` resume-material folder, with evidence, risk and recommendation (depends on T002)
- [x] T006 [P] Add the reviews as a source and restate the rating item in `hiring:` roles and promotions page (depends on T002)

## Phase 3: Validation
- [x] T007 Script check: every added timeline entry matches its source record's dates and role; JSON parses; relative links resolve (depends on T003, T004, T005)
- [x] T008 [P] `npm run resume:voice`, `npm test`, and `git diff origin/main -- resume/` empty
- [x] T009 Confidentiality grep over tracked and untracked changes in this repository (depends on T011)

## Phase 4: Knowledge and review
- [x] T010 [P] Knowledge page and index in `hiring:` knowledge base, README entry (depends on T007)
- [x] T011 [P] Add a section on review documents to `knowledge-base/resume-voice.md` and a line to `knowledge-base/index.md`
- [x] T012 Independent Codex review of both diffs; fix confirmed findings and log them in `hiring:` task spec folder (depends on T007, T009, T010, T011)
