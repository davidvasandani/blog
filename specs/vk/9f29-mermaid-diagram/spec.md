# Feature Specification: Test diagram-design with Mermaid

**Feature dir**: `specs/vk/9f29-mermaid-diagram/`
**Status**: Clarified

## Summary
David is applying for the Netflix Solutions Engineer 5 - Content Promotion & Distribution role, which involves integration guides, operational documentation, and explaining partner delivery workflows. GitHub renders Mermaid diagrams written in Markdown. The diagram-design agent skill claims it can redraw Mermaid as polished, branded diagrams. This feature tests that claim on diagrams relevant to the role: a partner content-delivery flow and a delivery API exchange. It publishes the findings as a blog post and keeps the test repeatable, so the conclusion can be re-checked when the skill changes.

## User Stories
- As David, I want an evidence-based answer to "does diagram-design work well with Mermaid?" so that I know whether to use it for integration docs.
- As David, I want my diagrams' Mermaid source kept as plain text in the repo so that it renders on GitHub and stays easy to edit.
- As a blog reader (including a hiring manager), I want to see the Mermaid original and the redrawn version side by side, with a clear verdict and caveats.
- As David, I want one command that re-runs the test against a pinned skill version and flags when the published diagrams no longer match their sources.
- As a blog reader using assistive technology, I want every diagram to have a meaningful text alternative.

## Functional Requirements
- FR-1: The repository holds Mermaid source for at least one flowchart and one sequence diagram about a generic partner content delivery (submission, authentication, validation, remediation, orchestration, availability, launch; API accept/reject). The content is not presented as Netflix internals.
- FR-2: The Mermaid source renders natively when viewed on GitHub.
- FR-3: Each source diagram is redrawn with diagram-design's documented import workflow and skinned to match the blog. The redraw reports a fidelity ledger of what was merged, collapsed or dropped.
- FR-4: The published diagrams make no external network requests, contain no scripts, and are accessible figures (title, description, alt text).
- FR-5: A comparison image of Mermaid's own default rendering of the flowchart is published next to the redraw.
- FR-6: A blog post explains how each tool works, how they fit together, what the test found (including its limits), and gives a recommendation.
- FR-7: One command re-runs the test against a pinned version of the skill. It fails if any source diagram cannot be parsed, has unexpected node or edge counts, fails the skill's own quality checks, or no longer matches the published diagram.
- FR-8: CI runs that command separately from the existing test jobs. The existing Node test suite needs no Python or network access, and it checks the published contract.
- FR-9: Diagram sources and working files never appear as site or Gemini pages.
- FR-10: The workflow (setup, redraw, export, check, pinned versions) is documented next to the sources.

## Out of Scope
- Client-side Mermaid rendering on the blog.
- Vendoring or modifying the diagram-design skill.
- Diagram kinds the skill does not import (pie, gantt, mindmap…), beyond reporting the gap.
- Real Netflix architecture or confidential detail.

## Acceptance Criteria
- [ ] The repeatable check command passes locally and in CI.
- [ ] `npm test` (including Pa11y) and `npm run typecheck` pass.
- [ ] The built post at `/posts/<slug>/` shows the Mermaid comparison, both redraws, and the verdict, and the Gemini capsule has the post.
- [ ] Editing a Mermaid source without redrawing makes the check fail.
- [ ] No file under the diagram source folder is published.

## Clarifications
Resolved 2026-10-27 without user input. Each choice follows the constitution or the skill's own guidance, and the post states each one.
- **Skin**: the blog's palette. The skill's first-run gate says not to ship default-skinned diagrams into a branded project. The blog's CSS (`#FFF0EB` paper, blue links, Avenir/system sans) maps onto the skill's roles. Any token that fails the skill's 4.5:1 contrast contract is adjusted, and the adjustment is recorded.
- **Fonts**: system fonts (the skill's `system` font source). Constitution principle 8 bans external requests, and the blog already uses system sans.
- **Drift**: the check re-exports each committed redraw with the pinned skill version and compares it byte for byte with the published SVG. Because the version is pinned, the output is deterministic. Changing the pin means re-exporting in the same change.
- **Embedding**: `<img>` with alt text pointing at the exported SVG files. These files also work on GitHub, which strips inline SVG from Markdown. Separate files also avoid ID collisions between figures on one page.
- **Source drift detection** (acceptance criterion "editing a Mermaid source fails the check"): the check records each block's expected node and edge counts, plus a hash of each block's source text, beside the redraw. An edited source fails until the redraw and the recorded hash are updated together.

## Open Questions
None remaining.
