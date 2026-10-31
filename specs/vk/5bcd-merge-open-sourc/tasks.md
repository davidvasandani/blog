# Tasks

Plan: `./plan.md`. Tasks are serial because validation depends on the content edit and its generated outputs; no independent implementation layer warrants [P].

- [x] T001 Merge the section keys in `resume/David_Vasandani_CV.yaml` and compare all parsed content against HEAD.
- [x] T002 Render locally into ignored `resume/rendercv_output/`, build web/Gemini outputs, and check heading, entries, PDF and existing résumé tests.
- [x] T003 Run accessibility audit and write results to `VALIDATION.md`.

Release gates after implementation: independent Codex review; record reusable knowledge in `knowledge-base/resume-rendercv.md` and `knowledge-base/index.md` with task ID; commit; open and merge the PR after checks pass.
