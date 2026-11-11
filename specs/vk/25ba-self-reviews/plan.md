# Implementation Plan: Review documents as resume evidence

**Spec**: `./spec.md`
**Status**: Ready

## Technical Context
Two repositories. The private hiring repository holds Markdown evidence pages, a JSON-sourced work timeline with a Python build script (standard library only), dated notes and resume drafts. This repository holds the published resume (`resume/David_Vasandani_CV.yaml`, `resume/VERSION`), the mechanical voice check (`scripts/resume-voice.cjs`, run by `npm run resume:voice` and `npm test`), the constitution (`.specify/memory/constitution.md`) and the knowledge base (`knowledge-base/`). No new dependency.

## Architecture & Approach
- FR-1, FR-2, FR-3, FR-4 are carried out in the private repository: the source documents are kept as received, a cross-check page maps each claim to a dated record, the timeline source gains entries and pointers and is rebuilt with its own script, a dated note and a proposals page are added. Proposed lines go through the `/voice` skill there.
- FR-5 and FR-6 shape what lands here: `specs/vk/25ba-self-reviews/` (this plan, `spec.md`, `tasks.md`, the sanitized `technical-spec.md`, `prior-knowledge.md`, `implementation-plan.md`), one review entry in `.specify/memory/constitution.md`, a new section in `knowledge-base/resume-voice.md` and its line in `knowledge-base/index.md`.
- `resume/` is not touched. The check is `git diff origin/main -- resume/` returning nothing.

## Data Model
Not applicable here. The private timeline's entry shape (name, detail, role, start, end, evidence pointer) is unchanged.

## Contracts
None.

## Research Notes
No `research.md`: there is no before-and-after resume table because no published line changes. The `/voice` records for the proposed lines sit beside the proposals in the private repository.

## Constitution Check
- 1: substance stays in hiring, as the 2026-11-11 review entry authorizes; nothing else is touched.
- 2: published URLs, resume content and Gemini output unchanged.
- 3, 4: no code change; existing tests still run and need no credentials.
- 6: specs and knowledge pages are already excluded from published output.
- 9: validation, independent Codex review, knowledge capture, pull request.
- 10: proposals go through `/voice`; `npm run resume:voice` still passes on the untouched YAML.
No deviation.

## Risks & Dependencies
- Leaking confidential detail into this public repository through a spec, a file name or a commit message. Mitigation: generic wording, and a grep over tracked and untracked changes before each commit.
- Treating a retrospective document as a dated record. Mitigation: the script check that every added timeline entry matches its source record.
- A proposal being mistaken for a published change. Mitigation: the empty `resume/` diff and the pull request text.
