# Implementation plan: STAR resume rewrite with measured outcomes

Spec: `./spec.md`
Status: Draft

## Technical context

The resume is RenderCV 2.8 YAML at `resume/David_Vasandani_CV.yaml`, rendered by `scripts/resume.cjs` through the pinned virtualenv in `resume/.venv` (Python 3.13 here), with the version injected from `resume/VERSION`. `scripts/resume-voice.cjs` enforces the mechanical voice rules and runs inside `npm test`. `tests/resume.test.cjs` checks the pin, schema tag and version plumbing. The public page is built by `scripts/resume-page.cjs` from RenderCV's Markdown output and does not depend on section names beyond what the YAML already has. The private evidence lives in the sibling hiring checkout on the same branch.

## Architecture and approach

Only prose changes. The YAML keeps its sections (summary, experience, projects, skills), entry order, dates, companies and titles. Each `highlights` string under the three recent Sweetgreen roles is rewritten in STAR form; earlier roles lose listed bullets. The `summary` string gains the headline result. The crash TODO comment becomes a note with the measured window.

Numbers come from four places, each recorded in `research.md`:
1. hiring `netflix/evidence/pos-register-oom.md`, including the 2026-11-04 re-run section added by this task;
2. hiring `netflix/resume-material/` pages (loyalty freeze, vendor settings contract, sales corrections, log pipeline, network architecture, coding platform fork);
3. David's recorded instructions (2026-11-02 reword, 2026-11-03 fleet phrase);
4. lines already on the resume (reported auth costs, data handoff counts, deployments per month).

Voice: every changed line goes through the `/voice` process and the result is tabulated in `research.md` with a facts column, then `npm run resume:voice` runs.

## Data model

Not applicable. See `./research.md` for the before-and-after table.

## Contracts

Not applicable.

## Research notes

`./research.md`: the before-and-after table, the facts restored, the lines cut, the sources behind every number, and the voice self-audit.

## Constitution check

- Principle 1: blog changes stay in `resume/`, `specs/` and `knowledge-base/`; hiring changes are authorized by the 2026-11-04 review entry.
- Principle 2: `/resume/` URL, PDF name and layout unchanged.
- Principle 3 and 4: `node --test tests/resume.test.cjs`, `npm run resume:voice` and `npm run build` run locally with no credentials. The Datadog re-run is research, not a test, and is recorded in hiring with its query and window.
- Principle 7: RenderCV stays pinned; no new tooling.
- Principle 9: Codex review, knowledge capture, PR with checks.
- Principle 10: `/voice` on every line; qualifiers and ownership preserved; restored facts and the $55K line are called out in the spec and PR.

## Risks and dependencies

- **Length.** STAR bullets are longer. Mitigation: the listed cuts; render and check the page count before committing. If still over three pages, trim the household project and the browser-service bullet first.
- **Claim creep.** Mitigation: the facts column; qualifiers checked word for word; no number without a source row.
- **Confidentiality.** Mitigation: grep the blog diff for the confidential names and for store names and hostnames seen in the Datadog output.
- **David's vetoes.** The $55K line and the restored facts are flagged in the PR so a single edit removes them.
