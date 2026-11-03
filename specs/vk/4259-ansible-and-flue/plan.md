# Plan: POS logging approval history

Spec: ./spec.md

## Technical context and approach
Markdown research task, no application dependencies. Search connected sources read-only. Keep private evidence in hiring/netflix/evidence/pos-log-pipeline-approval-timeline.md and resume draft in hiring/netflix/resume-material/pos-log-pipeline.md. Update hiring/README.md for discoverability. Use existing project knowledge and canonical timeline as leads, then recover original source records.

Search each source system for collector/deployment names, POS logging and approval terms. Follow relevant threads and tickets, broaden by actors and dates. Document failures rather than equating inaccessible sources with absence. Corroborate coverage separately from deployment code.

## Data model and contracts
Each milestone records date, phase, actor/action, source URL and evidence limit. Search coverage records query family, result and access limitations. Draft claims map to milestones. No runtime API or schema changes.

## Constitution check
User-authorized hiring edits, public-safe blog artifacts, voice-reviewed draft, deterministic document validation and independent review comply with principles 1, 6, 9 and 10. No generated publication assets or dependency changes.

## Risks
Search access may fail; record it and use available primary evidence. A year-long project is not automatically a year-long approval. Dates, restaurant counts and host counts must stay distinct.

## Delivery
Review the task diff with Codex CLI. Fix material findings and rerun. Add hiring/knowledge-base/pos-log-pipeline.md and index.md, commit, and open/merge PRs against verified default branches for both changed repositories.
