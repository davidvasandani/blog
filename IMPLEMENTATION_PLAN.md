# Implementation plan

1. Complete the repository's SpecKit command instructions in pipeline order, using `.specify/feature-dir`.
2. Rename `open_source` to `projects` and remove the later `projects` separator in `resume/David_Vasandani_CV.yaml`. Preserve all three entry objects verbatim.
3. Install the pinned tooling, render the résumé, and build the web and Gemini outputs.
4. Compare parsed YAML to the base revision to confirm only grouping changed; check the generated page and PDF text for one Projects heading and all entries. Run existing résumé tests and accessibility checks.
5. Run independent Codex CLI review, address confirmed findings, and document results in VALIDATION.md.
6. Update the résumé knowledge page and index with this task's ID, commit, create a PR against the base branch, wait for required checks, and merge.

No new dependencies, API contracts, or permanent tests are needed for this content-only edit. Rendered artifacts remain ignored, as recorded in PRIOR_KNOWLEDGE.md.

# Resume role timeline correction (2026-10-30)

1. Use workspace `PRIOR_KNOWLEDGE.md` and existing resume publishing guidance to preserve the source/output boundaries.
2. Execute the configured SpecKit commands in order and document the feature under `.specify/feature-dir`.
3. Read the committed hiring timeline, its qualifications and role milestones, plus Blog resume history. Separate activity dates from later review/merge dates.
4. Document public-safe evidence references and assign accomplishments to Senior, Lead and Senior Lead date windows. Preserve verified promotion dates.
5. Update the canonical resume YAML with distinct, supported Lead accomplishments and any supported attribution corrections.
6. Render with pinned RenderCV, build HTML and Gemini, run existing resume tests and inspect rendered role sections and PDF.
7. Run independent Codex review, fix confirmed findings and revalidate. Record validation and reusable knowledge, commit Blog changes, then open and merge a PR after checks.

## Concurrent retired-host cleanup record

# Implementation plan

1. Move the shared Express application to api/app.ts; update Worker import and compile targets. Keep test-only serverless adaptation outside production code.
2. Remove retired deployment configs, adapters, Identity email templates and forced redirect assets; preserve Cloudflare resume validation.
3. Replace the accessibility plugin with pinned direct Pa11y and Puppeteer dependencies and a recursive blocking audit; retain the inaccessible fixture regression.
4. Refresh current documentation, package metadata and provider-specific comments. Preserve historical knowledge snapshots.
5. Regenerate the lockfile, run typecheck, full tests and Worker smoke tests. Review the complete diff independently with Codex and fix confirmed findings.
6. Record hosting knowledge, commit, open the task PR, verify checks and merge.
