# Implementation plan: resume positioning cut after the second review

Spec: `./spec.md`
Status: Draft

## Technical context

The resume is a RenderCV 2.8 YAML source, `resume/David_Vasandani_CV.yaml`, rendered through the npm wrapper (`scripts/resume.cjs`) with a pinned Python virtualenv in `resume/.venv`. `resume/VERSION` holds the resume release version, injected into the PDF footer and the `/resume/` page. `scripts/resume-page.cjs` turns RenderCV's Markdown into the page body; `scripts/resume-voice.cjs` is the mechanical voice check that `npm test` runs. `pages/projects.md` mirrors the resume's project descriptions. The hiring repository (sibling checkout, same branch name) holds the private evidence and takes the review record.

## Architecture and approach

All resume changes are edits to one YAML file plus one line in `resume/VERSION`.

1. **Summary** (`cv.sections.summary[0]`). Replace the paragraph with three or four sentences: target, scope, differentiator. Drop the crash narration, "over a decade" and the operating-philosophy sentences. Keep "Seven years at Sweetgreen, promoted three times" and David's "nearly 300 restaurants".
2. **Role summaries** (`experience[0..3].summary`). Remove the bold Theme line from each and the "reporting to the VP of Technology" clause from the first. Each becomes one plain paragraph (a second paragraph renders as raw text).
3. **Current role highlights** (`experience[0].highlights`). Ten strings become seven, in the spec's order. New text for the merged bullets (tooling, DoorDash) and compressed bullets (loyalty, data handoff) comes from the existing strings only; the $55K string becomes the last sentence of the corrections bullet. Denominator phrases are added inside the crash, loyalty and settings bullets. The header comment about the crash re-run moves with the crash bullet.
4. **2019 to 2021 highlights** (`experience[3].highlights`). Three strings rewritten so the clause after "so" describes the operational change instead of the vague outcome.
5. **Projects** (`projects[2]`). The household entry keeps two highlights and loses the recovery bullet; the triage bullet names "a hosted email classifier" instead of the product.
6. **Skills** (`skills`). Reorder the list and delete the "Data & content workflows" item.
7. **Design** (`design.sections.show_time_spans_in: []`). The classic theme defaults this to `["experience"]`, which prints "10 months" style durations; an empty list removes them. The page transform's `groupMeta` already treats the duration line as optional.
8. **Version**: `resume/VERSION` 2.0.0 to 3.0.0 (restructure and changed positioning).
9. **Projects page**: in `pages/projects.md`, "Jev classification" becomes the same plain words the resume uses.
10. **Voice**: every changed string goes through the `/voice` process; the before-and-after table with a facts column lands in `./research.md`.

Hiring repository, same branch: `netflix/notes/` gains the review transcript; `netflix/resume-material/` gains the drafts, claim map, cuts and questions page; `knowledge-base/` gains a page and an index line; `specs/vk/9c61-feedback-1/` holds private copies of the pipeline artifacts and the review log.

## Data model

Not applicable. The YAML shape does not change except for shorter highlight lists, one removed skills item and one added design key.

## Contracts

Not applicable. The RenderCV 2.8 schema (`design.sections.show_time_spans_in: list[str]`) is the only interface touched.

## Research notes

See `./research.md`: the decisions behind each cut and merge, the voice table and the validation record.

## Constitution check

- Principle 1: blog changes stay in this repository; the hiring repository takes only its own files on its own branch.
- Principle 2: `/resume/` keeps its URL, PDF and layout. The transform is unchanged; the theme callout code path simply stops firing.
- Principles 3 and 4: `node --test tests/resume.test.cjs` and `npm run build` run locally with no credentials; the render is checked for page count and absence of duration lines.
- Principle 6: specs and knowledge pages stay out of published output (`.eleventyignore` already covers them).
- Principle 7: RenderCV stays pinned; no tooling change.
- Principle 9: Codex review, knowledge capture, PRs with checks.
- Principle 10: `/voice` on every changed line; facts, qualifiers and ownership preserved; cuts listed.

No deviations.

## Risks and dependencies

- **A merge drops a fact.** The research table lists the facts of both source bullets beside the merged text; the Codex review prompt checks it.
- **A vague-outcome rewrite invents a result.** Each rewrite names only the mechanism already in the bullet (CI applies, one tool, shared setup). The replaced phrases are recorded for David.
- **Rhythm.** Seven STAR bullets in a row read machine-made. The compressed bullets are deliberately shorter and vary in shape.
- **Confidential file names.** The hiring drafts page is referenced generically in blog artifacts; the grep covers untracked files.
- **Page count.** Fewer bullets should bring the PDF to two or three pages; `allow_page_break` stays on in case an entry still straddles a page.
