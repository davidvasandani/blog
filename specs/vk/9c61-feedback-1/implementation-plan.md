# Implementation plan

Task: 9c61-feedback-1. Two repositories: hiring (private record of the review, drafts and questions for David) and blog (public resume). Steps run in this order; steps marked [P] can run together.

1. **Record the review** (hiring, [P]). Save the 2026-11-05 review text under `netflix/notes/` with the date, how it arrived (pasted into the task as "Feedback 1", reviewer not named) and what it changes for the Netflix target.
2. **Draft the restructure** (hiring, [P]). A resume-material page with every new or changed line, a claim-to-evidence map, the merged and cut lines, the vague outcomes replaced and what they said, and the questions only David can answer: the 2016 to 2018 overlap, whether "dozens of high-volume stores" should narrow, numbers for the 2019 to 2021 outcomes, Python and SQL evidence.
3. **Restructure the resume** (blog). Edit `resume/David_Vasandani_CV.yaml`:
   - rewrite the summary to target, scope and differentiator, "AI" once, no case study;
   - remove the four `**Theme: ...**` lines and the VP reporting sentence; keep promotions and the team as context;
   - reduce the current role to seven bullets in the spec's order, merging the two agent-tooling bullets and the two DoorDash bullets, compressing the loyalty and data-handoff bullets, folding the $55K sentence into the corrections bullet;
   - add the denominator clarifications (18 registers that had crashed in the previous 30 days; 272 restaurants that took loyalty scans that week; 343 POS locations, lab and sandbox included);
   - cut "AI" to the summary plus at most three current-role bullets;
   - rewrite the three vague 2019 to 2021 outcomes to the operational change;
   - trim the household project to two bullets with no counts and no "Jev";
   - reorder skills and remove "Data & content workflows";
   - set `design.sections.show_time_spans_in: []`;
   - update the header comment that points at the crash re-run note if it moves.
4. **Align the projects page** (blog). `pages/projects.md` describes the household platform with the classifier's product name; change that phrase to plain words so the catalog matches the resume.
5. **Voice** (blog). Run every changed line through the `/voice` process, record the before-and-after table with a facts column in `specs/vk/9c61-feedback-1/research.md`, then `npm run resume:voice`.
6. **Version** (blog). `resume/VERSION` 2.0.0 to 3.0.0.
7. **Validate** (blog). `npm run resume -- --dont-generate-png` and confirm the Markdown output has no duration lines and the PDF is at most three pages; `node --test tests/resume.test.cjs`; `npm run build`; a YAML comparison (ruamel from `resume/.venv`) showing only prose, removed highlights, the design option and the version changed; a confidentiality grep over `git diff --name-only origin/main` plus `git ls-files --others --exclude-standard`; `git diff --check`.
8. **SpecKit** (blog). Constitution review entry, `spec.md`, clarifications, `plan.md`, `tasks.md`, analysis, then implement against `tasks.md`.
9. **Review**. Codex CLI review of both repositories' diffs with a prompt that checks each changed claim against the evidence pages, qualifiers and ownership, confidential names in tracked and untracked files, YAML validity against the pinned RenderCV model, and SpecKit consistency. Fix confirmed findings, re-run, record in hiring `specs/vk/9c61-feedback-1/review.md`.
10. **Knowledge**. Hiring: a knowledge page on positioning and length after the second review, plus the index. Blog: a section in `knowledge-base/resume-voice.md` on cutting for positioning (what to merge, how to explain denominators, the AI-attribution budget, the time-span option), plus the index.
11. **Ship**. Commit both repositories, open a PR in each against `main`, confirm checks, merge.
