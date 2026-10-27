# Implementation Plan: Test diagram-design with Mermaid

**Spec**: `./spec.md`
**Status**: Planned

## Technical Context
Eleventy 3 on Node 24 (`.eleventy.js`, `.eleventy.config.images.js`, `.eleventy.config.gemini.js`). markdown-it runs with `html: true, breaks: true`, so each paragraph must be one line. The eleventy-img transform rewrites every `<img>` in HTML output into AVIF/WebP/JPEG, and an `eleventy:ignore` attribute opts an image out. `static/img` is passthrough-copied to `/static/img/`. diagram-design v2.6 is pinned at commit `97d795138448f6a739a0cebc3d9beb37a42077f1`. Its scripts (`mermaid_extract.py`, `self_check.py`, `export_svg.py`, repo-level `verify-geometry.py`) use the Python 3 stdlib only. Mermaid's comparison render uses `@mermaid-js/mermaid-cli@12.0.0` through `npx` once, with no dependency added.

## Architecture & Approach
| Requirement | Files |
|---|---|
| FR-1, FR-2 Mermaid sources | `diagrams/partner-delivery.md` (two fenced blocks: flowchart, sequenceDiagram) |
| FR-3 redraws + ledger | `diagrams/partner-delivery-flow.html`, `diagrams/partner-delivery-sequence.html`; ledgers in `diagrams/README.md` and the post |
| Skin | `diagrams/blog-profile.md` (skill profile body for the blog palette, `Font source: system`) |
| FR-4 published SVGs | `static/img/diagrams/partner-delivery-{flow,sequence}.svg` from `export_svg.py --system-fonts` |
| FR-5 comparison (drift: manifest records rendered-from hash; Node test bans scripts/external refs) | `static/img/diagrams/partner-delivery-flow.mermaid.svg` (mmdc, default theme, `htmlLabels: false` so text is real SVG text) |
| FR-6 post | `posts/mermaid-and-diagram-design/mermaid-and-diagram-design.md`; `<img eleventy:ignore>` with alt text |
| FR-7 repeatable check | `scripts/diagrams.cjs` (`setup`, `extract`, `export`, `check`), `diagrams/manifest.json` (see contracts), npm scripts `diagrams:setup`, `diagrams:extract`, `diagrams:export`, `diagrams:check` |
| FR-8 CI + Node test | `diagrams` job in `.github/workflows/test.yml`; `tests/diagrams.test.cjs` (already matched by `tests/*.test.cjs`) |
| FR-9 exclusion | `diagrams/` in `.eleventyignore`; `diagrams/.diagram-design/` in `.gitignore` |
| FR-10 docs | `diagrams/README.md` |

`check` runs these steps in order:
1. Verify the checkout is at the pinned SHA.
2. For each manifest entry, hash the fenced block's source and compare it with the manifest.
3. Run `mermaid_extract.py --diagram N --json`, then assert the kind and the node/edge counts.
4. Run `self_check.py --offline` on the HTML.
5. Run `verify-geometry.py` on the HTML.
6. Export to a temp file and compare it byte for byte with the committed SVG.
7. For the Mermaid comparison image, compare the source hash it was rendered from (manifest `mermaidSvg.sha256`) with the current block.

Any failure exits 1 and names the step.

## Data Model
See `./data-model.md`.

## Contracts
See `./contracts/diagrams-cli.md`.

## Research Notes
See `./research.md`.

## Constitution Check
- 1 Scope: blog only. ✅
- 2 Preserve: adds one post. Existing URLs, CMS and Gemini are unchanged. ✅
- 3/4 Deterministic tests: `npm test` runs offline with no Python. The network clone happens only in `diagrams:setup` and the CI job. ✅
- 5 Dependencies: no new npm dependencies. mermaid-cli is a documented one-off `npx` call with a pinned version. ✅
- 6 Outputs: `diagrams/` is ignored by both generators, and the test asserts it. ✅
- 7 Non-Node tooling: the skill is pinned to a commit, cloned into an ignored path, run by a separate CI job, and documented in `diagrams/README.md`. ✅
- 8 Generated artifacts: committed sources, an export command, a byte-level drift check, system fonts, no scripts, accessible figures with alt text, and Pa11y over the post. ✅
- 9 Ship: Codex review, knowledge base update and PR. ✅

## Risks & Dependencies
- gemdown may drop raw `<img>` HTML from the Gemini capsule. Each image therefore also gets a Markdown link line, and T015 checks the `.gmi` output.
- The connector rules are strict, so hand-authoring may take several rounds against `verify-geometry.py`.
- The export output depends on the pinned script. Bumping the pin means re-exporting.
- GitHub's clone must be reachable from CI (public repository).
- Mermaid CLI needs Chromium. Locally, use nixpkgs Chromium through `PUPPETEER_EXECUTABLE_PATH`.
