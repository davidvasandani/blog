# Research: strengthen the stalled-import bullet

## Current bullet
`resume/David_Vasandani_CV.yaml:131`, under `projects` → "Household content and workflow platform":

> Got stalled imports running again by fixing credentials and using the recovery triggers. That brought in 62 new items and requeued 63 failed downloads.

## Evidence
- `hiring/netflix/timeline-audit/REPORT.md`, F08 and R041 (read-only; the relevant F08 and R041 excerpts were inspected during recall). The current bullet already reflects that evidence; this task reorders it, so no new fact lookup is needed.
- `PRIOR_KNOWLEDGE.md` records the audit's evidence boundary: requeued ≠ completed, and the recovery run was not re-fetched for this task. The rewrite must not blur that line.

## Before and after (draft)
| Before | After (draft, as supplied for this task) | Facts |
| --- | --- | --- |
| Got stalled imports running again by fixing credentials and using the recovery triggers. That brought in 62 new items and requeued 63 failed downloads. | Restored stalled content imports by fixing credentials and running recovery triggers. Imported 62 new items and requeued 63 failed downloads. | Same four facts, same distinctness (62 imported vs. 63 requeued, not merged, and the 63 are not claimed as completed downloads). Only the lead changes: outcome first ("Restored... imports"), mechanism second ("by fixing credentials and running recovery triggers"). No business impact, team framing, or professional-scope language added. |

This table is the fact-preservation anchor the `/voice` pass and the independent review check against (see `knowledge-base/resume-voice.md`'s "before-and-after table" guidance from the 76c7-my-voice task).

## /voice pass and audit (T003)

Input to the skill: "Restored stalled content imports by fixing credentials and running recovery triggers. Imported 62 new items and requeued 63 failed downloads."

Pattern scan: no em dashes, no curly quotes, no colons, no boldface, no title case, no AI vocabulary (puffery, "AI" mentions, abstract metaphor nouns), no filler phrases, no passive voice. Both sentences open with a strong verb and drop the subject ("Restored...", "Imported..."), matching the sibling highlights on the same project ("Built media and metadata imports...", "Automated email triage...") and the implied-subject convention recorded in `knowledge-base/resume-voice.md`.

Self-audit ("what makes this obviously AI generated?"): nothing flagged. The sentence is concrete (named mechanism, two distinct counts), short, and reads like the other bullets in this project entry. No rewrite needed.

**Final wording (unchanged by `/voice`):** Restored stalled content imports by fixing credentials and running recovery triggers. Imported 62 new items and requeued 63 failed downloads.

Fact/qualifier/ownership recheck against the table above: credential repair present, recovery triggers present, "62" (imported) and "63" (requeued, not completed) remain distinct, household/personal scope unchanged, no new claim added. Matches FR-3, FR-4, FR-5, FR-6, FR-8, FR-9.

## Constraints carried into the rewrite
- FR-2: lead with the restored imports, not the credential/trigger mechanism.
- FR-3/FR-4: keep credential repair, recovery triggers, "62" and "63" as two distinct outcomes; don't imply the 63 requeued downloads completed.
- FR-6: household/personal framing only — no team or production-scale wording.
- FR-8/FR-9: no dashes, no curly quotes, no POS vendor or confidential product name (not applicable here, but checked).
- Constitution principle 10 / FR-10: `npm run resume:voice` (`scripts/resume-voice.cjs`) must pass.

## Rendering and test surface
- `scripts/resume.cjs render` wraps the pinned RenderCV (Python, `resume/.venv`, version pinned in `resume/requirements.txt`); `npm run resume` is the local render command (`resume/README.md`).
- `tests/resume.test.cjs` asserts the RenderCV pin and schema tag — unaffected by a highlight-text-only change, but still part of `npm test` and must stay green.
- `npm run resume:voice` (`scripts/resume-voice.cjs`) is also run inside `npm test`; it checks dashes, curly quotes, "AI" count, and the skill's word list against every prose string in the YAML, not just the changed line.
- No new test is warranted: the acceptance criteria are about wording and fact-preservation, which a script can't judge (per `resume-voice.cjs`'s own comment), so this is covered by the `/voice` fact-comparison table plus independent review rather than a new assertion that would just mirror the sentence.

## Independent review and knowledge update
- Per the constitution (principle 9) and `IMPLEMENTATION_PLAN.md`, run an independent Codex CLI review of the diff after rendering and tests pass, before opening the PR.
- Update `knowledge-base/resume-voice.md` and its index with any reusable limit on how far a lead-with-outcome rewrite can go without widening the audit's evidence boundary, tagged with this task's feature id (`vk/4fff-this-is-borning`), following the pattern of the existing "Claims David supplies himself" and "Camera check" entries.
