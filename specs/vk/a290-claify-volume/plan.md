# Implementation plan: clarify volume in the loyalty-scan bullet

Spec: `./spec.md`
Status: Planned through `/speckit.plan`

## Technical context
The resume is `resume/David_Vasandani_CV.yaml` (RenderCV 2.8 schema). The bullet is the third highlight under Sweetgreen, Senior Manager, IT Infrastructure & Innovation (`cv.sections.experience[0].highlights[2]`, line 36). `scripts/resume-voice.cjs` (`npm run resume:voice`, also run by `npm test`) checks the resume's prose. `scripts/resume.cjs` renders it with the pinned RenderCV in `resume/.venv` (`npm run resume:setup`). `tests/resume.test.cjs` covers the resume boundaries.

## Approach
1. Replace "32 of 272 restaurants" with "32 of our highest volume restaurants" in that one string. The bullet is a plain YAML scalar with no quotes, and the new text adds no `:` or `#`, so the scalar stays valid unquoted.
2. Run the whole bullet through `/voice`. Keep David's phrase as written (clarification 1). Take another suggestion only if it changes no fact and is a clear fix, and record it in `research.md`.
3. Record the before-and-after with a facts column in `research.md`.
4. Verify: compare old and new YAML parses (ruamel from `resume/.venv`, or js-yaml from `node_modules`), `npm run resume:voice`, a RenderCV render and page count, `npm test`, and a grep of the diff for confidential names.

No data model or contracts: nothing about the resume's structure or the site's interfaces changes.

## Research notes
See `./research.md`.

## Constitution check
- 1 (scope): blog only. The hiring repository isn't edited.
- 2 (preserve content): one deliberate, specified wording change. URLs, the resume page and the PDF pipeline are unchanged.
- 3, 4 (tests): existing deterministic tests; no credentials or publishing.
- 5, 7 (dependencies, non-Node tooling): none added. RenderCV stays pinned in its ignored venv.
- 6 (keep specs out of output): spec files live under `specs/`, which Eleventy already ignores.
- 8 (generated artifacts): no committed generated files change.
- 9 (ship): local validation, Codex review, knowledge page, PR merge with checks.
- 10 (voice): the line goes through `/voice`, and every other fact and qualifier stays.

No deviations.

## Risks and dependencies
- The new claim isn't in the committed notes. It's David's statement, recorded as such (spec, clarification 2).
- "highest volume" without a hyphen may read as a style slip to some readers. Kept as written; David can ask for the hyphen.
- `npm test` needs `npm ci` and Chrome for Pa11y. The render needs `npm run resume:setup` (network for pip).
