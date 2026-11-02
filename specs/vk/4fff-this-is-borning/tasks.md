# Tasks: Strengthen the stalled-import resume bullet

**Plan**: `./plan.md`

Tasks are ordered by dependency. Tasks marked **[P]** touch independent files
and may run in parallel within their group. Each task names the file(s) it
changes. This file enumerates tasks only; no task is executed as part of
writing this file.

## Phase 1: Fact-check & draft prep
- [x] T001 Build the before/after/facts comparison for the stalled-import highlight against `hiring/netflix/timeline-audit/REPORT.md` (F08, R041), confirming credential repair, recovery triggers, "62 new items," and "63 failed downloads" stay distinct: 62 items imported, 63 failed downloads requeued without claiming completion (FR-3, FR-4). Updates `blog/specs/vk/4fff-this-is-borning/research.md`.

## Phase 2: Implementation
- [x] T002 Rewrite the stalled-import highlight in `resume/David_Vasandani_CV.yaml:131` to lead with the restored imports (outcome) before the credential/trigger mechanism (FR-2, FR-7), per the draft in T001. Touches only `resume/David_Vasandani_CV.yaml`. Depends on T001.
- [x] T003 Run the rewritten line through the `/voice` skill and re-check it against the T001 fact table (every fact, qualifier, and ownership claim preserved, none added; FR-5, FR-6, FR-8, FR-9). Record the final wording and comparison notes in `blog/specs/vk/4fff-this-is-borning/research.md`. Depends on T002.
- [x] T004 Apply the `/voice`-passed wording to `resume/David_Vasandani_CV.yaml:131` if it differs from the T002 draft. Touches only `resume/David_Vasandani_CV.yaml`. Depends on T003.

## Phase 3: Validation
- [x] T005 Run `npm run resume:voice` and confirm a clean exit on the edited file (FR-10). No file changes; fix and re-run T004 if it fails. Depends on T004.
- [x] T006 Run `git diff` on `resume/David_Vasandani_CV.yaml` and confirm exactly one changed highlight string and no other line changed (first acceptance criterion). No file changes. Depends on T004.
- [x] T007 Run `npm run resume` (pinned RenderCV) and visually confirm the new bullet reads correctly and the resume stays 3 pages. No file changes. Depends on T004.
- [x] T008 Run `npm test` (build, `resume:voice`, `tests/resume.test.cjs`, a11y, SitePing) and confirm it stays green. No file changes. Depends on T004.

## Phase 4: Pipeline gates (post-validation)
- [x] T009 **Stage 11 — independent review**: Run an independent Codex CLI review of the diff. Resolve any significant findings (reintroduced fact, merged 62/63, scope creep) by revising `resume/David_Vasandani_CV.yaml:131` and re-running T005–T008. Depends on T005, T006, T007, T008.
- [x] T010 **Stage 12 — knowledge update**: Update `knowledge-base/resume-voice.md` (and its index, if separate) with the reusable lesson on how far a lead-with-outcome rewrite can go before risking an implied-completion or evidence-boundary drift, tagged with task VAS-965 (`c2fbb0ca-6f57-45bd-b382-038719fc40ea`). Touches `knowledge-base/resume-voice.md` (and its index file). Depends on T009.
- [ ] T011 **Stage 13 — PR merge**: Open a PR with the YAML diff, `research.md`, `plan.md`, and the knowledge-base update; wait for required CI (including the `resume` render job and `npm test`) and merge once green and reviewed. Depends on T010.

<!--
Conventions:
- `T001` … task ids are stable and referenced by the dependency graph.
- `[P]` … parallel-safe (independent files). None of these tasks are
  independent: T001-T011 form a single linear chain because each edits or
  validates the same one-line YAML change in sequence.
- `[ ]` / `[x]` … completion checkbox, toggled from the workbench.
-->
