# Technical specification

Task: 25ba-self-reviews. Written 2026-11-11. Sanitized copy; the detailed one is private.

## Request

Analyze three year-end review documents (two self-reviews and one manager review), update the private work timeline and notes, and propose resume updates.

## Scope

- The analysis, the timeline update, the notes and the proposed resume lines all live in the private hiring repository. The source documents are confidential and nothing from them is quoted here.
- "Propose" means drafts for David to choose from. `resume/David_Vasandani_CV.yaml` and `resume/VERSION` do not change in this task.
- This repository takes the sanitized pipeline artifacts, a constitution review entry and a knowledge note on how to treat review documents as resume evidence.

## Rules

- A review document is a retrospective account. It can corroborate a dated record, but it does not date work and its figures are unverified until a record supports them.
- Role attribution follows effective promotion dates and event dates, not the year a review covers.
- Activity counts (pull requests, lines changed) are not outcomes and do not go on the resume.
- Proposed lines go through `/voice` in the private repository and again when any of them is adopted here.

## Validation

`npm run resume:voice` and `npm test` still pass with the resume untouched; `git diff origin/main -- resume/` is empty; a confidentiality grep over tracked and untracked changes; independent Codex review.
