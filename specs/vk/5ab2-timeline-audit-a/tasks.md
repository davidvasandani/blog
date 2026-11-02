# Tasks
Command: /speckit.tasks. Plan: ./plan.md. Paths below are workspace-relative.

## Source layer
- [x] T001 [P] Capture source provenance and inventory in hiring/netflix/timeline-audit/sources.json and inventory.json.
- [x] T002 [P] Define role criteria and anchored scoring rubric in hiring/netflix/timeline-audit/rubric.json.

## Assessment layer (depends on T001, T002)
- [x] T003 Assess every resume and timeline item in hiring/netflix/timeline-audit/assessments.json.
- [x] T004 Map claims and analyze dates and gaps in hiring/netflix/timeline-audit/findings.json (depends on T003).

## Delivery layer (depends on T003, T004)
- [x] T005 Build and validate full audit views with hiring/netflix/timeline-audit/build.py; generate REPORT.md, index.html and coverage.json.
- [x] T006 Record independent Codex review and validation in hiring/netflix/timeline-audit/VERIFICATION.md; correct findings and recheck.
- [x] T007 Record reusable sanitized knowledge and index in blog/knowledge-base; commit both repositories.
- [ ] T008 Create and merge PRs for hiring and blog; record final URLs in the user response.
