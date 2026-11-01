# Technical plan: resume in David's voice

Spec: `./spec.md`. Prepared through `/speckit.plan`.

## Technical context
The only content file is `resume/David_Vasandani_CV.yaml` (RenderCV 2.8 schema, `classic` theme). `scripts/resume.cjs` renders it, `scripts/resume-page.cjs` turns the Markdown output into `/resume/`, and `tests/resume.test.cjs` checks the schema tag, name, theme, the page and that nothing leaks into `_gemini`. No code, data model or contract changes, so there's no `data-model.md` or `contracts/`.

## Approach
1. Draft each rewrite in `research.md` as a table of the original, the new text and the facts it keeps. The skill's rules decide the wording. The hiring repository decides what a vague phrase may be replaced with (read-only, quoted by file and event ID).
2. Copy the final lines into the YAML. Only scalar text values change. Keys, order, dates, comments and the `TODO` line stay.
3. Check the YAML mechanically: no em or en dashes in values, "AI" at most once per bullet, no word from the skill's AI vocabulary list, the `TODO` comment still present. `git diff --word-diff` should show only text values changing.
4. Run `node --test tests/resume.test.cjs`, `npm run resume -- --dont-generate-png`, then `npm run build` so the page test covers the rendered resume. Check the page count in the rendered Markdown and PDF. Record the results in `validation.md`.
5. Codex review of the diff against `research.md`, then knowledge, PR and merge.

## Constitution check
- 1 and 2: only Blog changes. The published URL, page structure and PDF stay the same, and only the wording changes, which this task asks for.
- 3 and 4: existing resume tests cover the rendering. They need no credentials and publish nothing.
- 6: `specs/` stays unpublished, and `resume/` stays out of Gemini.
- 7: RenderCV stays pinned, with no new tooling.
- 9: local validation and an independent review come before the merge.
No deviation.

## Risks
- A plainer line can quietly change a claim, for example by dropping "likely" or "reported", or by turning a plan into a rollout. The fact column in `research.md` and the Codex review check for this.
- Concrete detail can expose confidential information. Use only details the hiring material marks as safe, and keep the vendor security finding, store names and tickets off.
- Longer bullets could push the PDF onto another page. Check the page count before and after.
