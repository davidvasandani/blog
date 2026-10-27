# Tasks: Test diagram-design with Mermaid

**Plan**: `./plan.md`

Tasks are ordered by dependency. Tasks marked **[P]** touch independent files
and may run in parallel within their group. Each task names the file(s) it
changes.

## Phase 1: Setup
- [x] T001 [P] Ignore `diagrams/` in `.eleventyignore` and `diagrams/.diagram-design/` in `.gitignore` (FR-9)
- [x] T002 [P] Pin the skill in `diagrams/diagram-design.lock` (repo and commit `97d795138448f6a739a0cebc3d9beb37a42077f1`) (FR-7)
- [x] T003 [P] Write the Mermaid sources (flowchart and sequence) in `diagrams/partner-delivery.md` (FR-1, FR-2)
- [x] T004 [P] Write the blog skin profile in `diagrams/blog-profile.md` (paper `#FFF0EB`, blue link, contrast-checked accent, `Font source: system`) (FR-3)

## Phase 2: Tooling
- [x] T005 Implement `setup` / `extract` / `export` / `check` in `scripts/diagrams.cjs` following `contracts/diagrams-cli.md` (FR-7; depends on T002)
- [x] T006 Add the `diagrams:setup`, `diagrams:extract`, `diagrams:export` and `diagrams:check` scripts in `package.json` (depends on T005)

## Phase 3: Redraws
- [x] T007 [P] Redraw the flowchart in `diagrams/partner-delivery-flow.html` (passes `self_check.py --offline` and `verify-geometry.py`) (FR-3, FR-4; depends on T003, T004, T006)
- [x] T008 [P] Redraw the sequence in `diagrams/partner-delivery-sequence.html` (same checks) (FR-3, FR-4; depends on T003, T004, T006)
- [x] T009 [P] Render Mermaid's default flowchart to `static/img/diagrams/partner-delivery-flow.mermaid.svg` with pinned mmdc (FR-5; depends on T003)
- [x] T010 Export the redraws to `static/img/diagrams/partner-delivery-{flow,sequence}.svg` and write `diagrams/manifest.json` (hashes and counts) (FR-4, FR-7; depends on T007, T008)

## Phase 4: Publish and validate
- [x] T011 [P] Write the post `posts/mermaid-and-diagram-design/mermaid-and-diagram-design.md` (FR-6; depends on T009, T010)
- [x] T012 [P] Add `tests/diagrams.test.cjs` (source blocks match the manifest, SVG contract, post images, Gemini, no leakage) (FR-4, FR-8, FR-9; depends on T010)
- [x] T013 [P] Add the `diagrams` job to `.github/workflows/test.yml` (FR-8; depends on T006)
- [x] T014 [P] Document the workflow, pins and fidelity ledgers in `diagrams/README.md` (FR-10; depends on T010)
- [x] T015 Verify: `npm run diagrams:check`, the source-edit negative test, `npm test` (with Chromium), `npm run typecheck` (depends on T001–T014)

<!--
Conventions:
- `T001` … task ids are stable and referenced by the dependency graph.
- `[P]` … parallel-safe (independent files). Omit for tasks that must be serial.
- `[ ]` / `[x]` … completion checkbox, toggled from the workbench.
-->
