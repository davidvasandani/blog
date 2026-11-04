# Implementation plan

Task: 7e87-star-method. Two repositories: hiring (private evidence and drafts) and blog (public resume).

1. **Record the feedback** (hiring): a dated note under `netflix/notes/` with the hiring manager's 2026-11-04 messages, transcribed from the screenshot. Done.
2. **Re-run the crash numbers** (hiring): query Datadog with the evidence file's crash query for 2026-10-13 to 2026-11-04, grouped by register and day. Add a "Re-run" section to `netflix/evidence/pos-register-oom.md` with the counts, the enrolled-register subset, and the caveats (logs only go back to Oct 13; CPU setting inferred, not recorded).
3. **Draft the STAR rewrite** (hiring): `netflix/resume-material/star-rewrite.md` with the hiring manager's criteria, every new bullet, a claim-to-evidence table, the facts restored and the bullets cut, the voice pass table, and the "numbers only David can estimate" list with candidate derivations.
4. **Rewrite the resume** (blog): `resume/David_Vasandani_CV.yaml`. Summary names the headline result. Senior Manager bullets lead with the crash and loyalty investigations, then the vendor-settings contract, the sales-date corrections and the report discrepancy, then the remaining stories. Senior Lead and Lead bullets gain situation and result sentences. The 2019 to 2021 role and the three earlier employers lose their lowest-relevance bullets. Framework names leave the bullets unless they carry the meaning. Replace the crash TODO comment with the measured window.
5. **Voice** (blog): run every changed line through `/voice`, record the before-and-after table with a facts column in `specs/vk/7e87-star-method/research.md`, then `npm run resume:voice`.
6. **Version** (blog): `resume/VERSION` 1.1.1 to 2.0.0.
7. **Validate** (blog): `npm run resume -- --dont-generate-png` (page count), `node --test tests/resume.test.cjs`, `npm run build`, YAML shape diff, confidentiality grep over `git diff origin/main`, `git diff --check`.
8. **SpecKit** (blog): constitution review entry, `spec.md`, clarifications, `plan.md`, `tasks.md`, analysis, implementation checklist.
9. **Review**: Codex review of both repositories' diffs; fix confirmed findings; record in hiring `specs/vk/7e87-star-method/review.md`.
10. **Knowledge**: hiring `knowledge-base/star-resume.md` plus index; blog `knowledge-base/resume-voice.md` section on measured outcomes and estimates, plus index.
11. **Ship**: commit both repositories, open a PR in each, merge after checks.
