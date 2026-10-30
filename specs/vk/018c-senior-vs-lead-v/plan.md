# Technical plan: Sweetgreen role chronology

Spec: `./spec.md`. Prepared through `/speckit.plan`.

## Approach
Read `hiring/netflix/canonical-timeline/canonical-timeline.json` and `sources/work.json` at the attached committed revision, including qualifications. Compare Blog commits `75a4c24` and `c96d301`, which introduced promotion dates and prior resume content. Write a public-safe evidence matrix in `research.md` with commit hashes, stable event IDs, activity dates and limitations.

Edit only content in `resume/David_Vasandani_CV.yaml`: add supported Lead accomplishments, move early observability work out of Senior Lead, and distinguish later proof-of-concept planning from the earlier investigation. Preserve Senior content when no dated contrary evidence exists. No data model or API contracts change; no dependencies are added.

Run `npm ci`, `npm run resume:setup`, `npm run resume -- --dont-generate-png`, `npm run build`, `npm run gemini:build`, and `node --test tests/resume.test.cjs`. Inspect generated Markdown, page and PDF for role headings, dates, content and placeholders; use existing accessibility checks where available. Document results in `validation.md`. No new test is needed for this editorial correction.

Run independent Codex CLI review against the task diff and evidence, address confirmed findings, then write a topic page and update `knowledge-base/index.md`. Commit and open the PR against main; merge only after checks pass.

## Constitution check
All writes are in Blog except the explicitly required workspace prior-knowledge note. Hiring is read-only. Existing output paths and Gemini exclusion stay intact. Process documents under `specs/` and knowledge under `knowledge-base/` are excluded from publishing. RenderCV remains pinned and generated artifacts ignored. No deviation.

## Risks
The timeline is strongest from late 2024 onward; do not claim it verifies 2019–21 work. Some events span roles, so use dates within their descriptions and source phases. Avoid copying sensitive internal details, extrapolating savings, or claiming rollout from an approved plan.
