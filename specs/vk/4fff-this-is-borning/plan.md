# Implementation Plan: Strengthen the stalled-import resume bullet

**Spec**: `./spec.md`
**Status**: Ready for implementation

## Technical Context
One-line wording change in a YAML data file consumed by RenderCV (Python, pinned version, invoked through `scripts/resume.cjs`). No application code, schema, or build-config change. Node 24, existing `npm test` pipeline (`scripts/resume-voice.cjs`, `tests/resume.test.cjs`, RenderCV render in CI job `resume`).

## Architecture & Approach
1. **Edit**: In `resume/David_Vasandani_CV.yaml:131`, replace the second highlight under `projects` → "Household content and workflow platform" with a version that leads with the restored imports (outcome) before the credential/trigger mechanism, per FR-2. Touch only this one line; the sibling highlights (lines 130, 132) and the rest of the file stay byte-identical.
2. **Fact check against evidence**: Compare the rewrite to `hiring/netflix/timeline-audit/REPORT.md` F08/R041 (read-only) and the current bullet, using the before/after/facts table in `research.md`. Confirm credential repair, recovery triggers, "62 new items," and "63 failed downloads" all survive, and that 62 and 63 stay distinct outcomes (FR-3, FR-4) with no implication the 63 requeued downloads completed.
3. **/voice pass**: Run the draft through the `voice` skill manually (per `AGENTS.md` and constitution principle 10), then re-run the fact comparison from step 2 against the skill's output. Record the before/after table and the comparison notes in `research.md` (already scaffolded) so a reviewer can check it without re-deriving it.
4. **Mechanical check**: Run `npm run resume:voice` (`scripts/resume-voice.cjs`) and confirm it exits clean — it scans every prose string in the YAML, not just the edited line, so it also re-validates lines untouched by this task.
5. **Diff scope check**: `git diff` against the edited YAML must show exactly one changed highlight string and no other line, per the spec's first acceptance criterion.
6. **Render**: Run `npm run resume` (pinned RenderCV via `resume/.venv`, set up with `npm run resume:setup` if needed) and visually confirm the new bullet reads correctly and page count is unchanged (resume stays 3 pages, per `knowledge-base/resume-voice.md`).
7. **Existing tests**: Run `npm test`, which includes `npm run build`, `npm run resume:voice`, `tests/resume.test.cjs` (RenderCV pin/schema assertions, unaffected but must stay green), a11y and SitePing checks. Do not add a new test — a script can't judge wording/fact-preservation (that's what `/voice` and review are for), and a test that only re-asserts the sentence would just mirror it (constitution principle 3, scoped to observable behavior; this change has none beyond the rendered text).
8. **Independent review**: Run an independent Codex CLI review of the diff (constitution principle 9). Resolve any significant findings (e.g., a reintroduced fact, a merged 62/63, scope creep into team/professional framing) and recheck the affected bullet and `npm run resume:voice` / render after any fix.
9. **Knowledge update**: Update `knowledge-base/resume-voice.md` (and its index, if the index lists entries separately) with any reusable lesson from this lead-with-outcome rewrite — specifically, how far a "lead with outcome" edit can go before it risks implying the 63 requeued downloads completed, or before it drifts from the audit's evidence boundary. Tag the entry with this task's feature id (`vk/4fff-this-is-borning`), following the existing entries' pattern (task id + date).
10. **PR**: Open a PR against the repository's actual base branch with the YAML diff, `research.md`, this `plan.md`, and the knowledge-base update. Wait for required CI checks (including the `resume` render job and `npm test`) and merge once green and reviewed.

## Data Model
Not applicable — no new entities or schema; this is a single string edit in an existing, already-schema-valid YAML file.

## Contracts
Not applicable — no API or interface change. The resume's published URL, PDF, and surrounding page layout are unaffected (constitution principle 2); only the text of one highlight changes.

## Research Notes
See `./research.md` for the current bullet, the cited evidence (F08/R041), the before/after/facts table, and why no new test is added.

## Constitution Check
- Principle 1 (scope): change is confined to `resume/David_Vasandani_CV.yaml` in the blog repo; the hiring repo is read-only evidence only. ✓
- Principle 2 (preserve published behavior): no change to `/resume/`'s URL, PDF pipeline, or any other bullet. ✓
- Principle 3/4 (test observable behavior, deterministic): no new test needed per the research notes; existing `npm test` suite stays deterministic and is run unchanged. ✓
- Principle 9 (ship after validation and review): plan includes local validation (voice script + render + `npm test`), independent Codex review, knowledge-base update, and PR merge with required checks. ✓
- Principle 10 (resume wording through `/voice`): step 3 runs the rewrite through the `voice` skill before commit, per `AGENTS.md`. ✓
- No deviation identified.

## Risks & Dependencies
- **Depends on**: the `voice` skill being invokable in this environment (or following `~/.claude/skills/voice/SKILL.md` manually); a working pinned RenderCV environment for rendering (`npm run resume:setup`, Python 3.12+); Codex CLI availability for the independent review step.
- **Risk**: leading with the outcome could read as implying the 63 requeued downloads also completed — mitigated by FR-4 and the explicit fact-comparison table before and after `/voice`.
- **Risk**: the mechanical `resume:voice` check only catches tells it can pattern-match; a clean run doesn't substitute for the fact/qualifier/ownership comparison in step 2–3 (explicitly called out in `knowledge-base/resume-voice.md`).
- Per the command instructions, this plan stops before execution — no later stage (tasks, implementation) is run as part of this step.
