# Implementation plan

1. Complete the repository's SpecKit command instructions in pipeline order, using `.specify/feature-dir`.
2. Rename `open_source` to `projects` and remove the later `projects` separator in `resume/David_Vasandani_CV.yaml`. Preserve all three entry objects verbatim.
3. Install the pinned tooling, render the résumé, and build the web and Gemini outputs.
4. Compare parsed YAML to the base revision to confirm only grouping changed; check the generated page and PDF text for one Projects heading and all entries. Run existing résumé tests and accessibility checks.
5. Run independent Codex CLI review, address confirmed findings, and document results in VALIDATION.md.
6. Update the résumé knowledge page and index with this task's ID, commit, create a PR against the base branch, wait for required checks, and merge.

No new dependencies, API contracts, or permanent tests are needed for this content-only edit. Rendered artifacts remain ignored, as recorded in PRIOR_KNOWLEDGE.md.
