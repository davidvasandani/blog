# Technical specification: test diagram-design with Mermaid

Scope: davidvasandani/blog only. Find out whether the [diagram-design](https://github.com/cathrynlavery/diagram-design) agent skill works well with [Mermaid](https://github.blog/developer-skills/github/include-diagrams-markdown-files-mermaid/), using diagrams that matter for the Netflix Solutions Engineer (Content Promotion & Distribution) application. Publish the result as a blog post, and keep the test repeatable.

## What the two sources say
- **GitHub + Mermaid** (GitHub blog, 2022, updated 2024): a fenced `mermaid` block in any GitHub Markdown file is rendered client-side by Mermaid.js inside a sandboxed iframe (Viewscreen). Clients without JavaScript, including the REST Markdown API, get the raw code block. The diagram source lives next to the docs and stays easy to edit. GitHub strips inline `<svg>` from Markdown, but SVG files referenced as images work.
- **diagram-design** (v2.6, commit `97d7951`): an agent skill that writes one self-contained HTML file with inline SVG in an editorial design system. It has 45 diagram types, a complexity budget of 9 nodes and 12 arrows, six mandatory connector rules, and an accessible-SVG contract. It **imports** Mermaid but never emits it. `scripts/mermaid_extract.py` (Python stdlib only) parses `flowchart`/`graph`, `sequenceDiagram`, `stateDiagram-v2` and `erDiagram` into a digest. It never renders or executes the source, and it exits 2 for other kinds (`pie`, `gantt`, `mindmap`, …). The agent then redraws from scratch and reports a fidelity ledger. `export_svg.py` turns the HTML into a standalone SVG (`--system-fonts` makes no network requests). `self_check.py` and the repository's `scripts/verify-geometry.py` check the output.

So the integration runs one way. Mermaid stays the editable source, and diagram-design produces a presentation copy that has to be redrawn when the source changes.

## Requirements
1. **Mermaid sources**: `diagrams/partner-delivery.md` holds two fenced Mermaid blocks about a generic partner content delivery: a flowchart (submit → authenticate → validate → remediation loop → orchestrate → availability → launch) and a sequence (partner REST delivery returning `422` or `202`). They render natively on GitHub. They describe a generic workflow, not Netflix internals.
2. **Redraws by the skill**: following the skill's import procedure (extract, set the four dials, pick the type, redraw, taste gate, fidelity ledger), produce `diagrams/partner-delivery-flow.html` and `diagrams/partner-delivery-sequence.html`, skinned with the blog's own palette and `system` font source.
3. **Exported SVGs**: `static/img/diagrams/partner-delivery-flow.svg` and `…-sequence.svg`, produced by `export_svg.py --system-fonts`. They are the published copies, with no external requests and no scripts.
4. **Comparison image**: Mermaid's own default render of the same flowchart (`static/img/diagrams/partner-delivery-flow.mermaid.svg`), generated once with a pinned `@mermaid-js/mermaid-cli` run through `npx`, not added as a dependency. The command is documented.
5. **Blog post**: `posts/mermaid-and-diagram-design/mermaid-and-diagram-design.md` presents the findings: how each tool works, the side-by-side, what the extractor caught, the limits (unsupported kinds, one-way flow, drift, profile storage), and a recommendation. Images get real alt text. Gemini output must stay valid.
6. **Repeatable check**: `npm run diagrams:check` (`scripts/diagrams.cjs`) checks out diagram-design at the pinned commit into the ignored `diagrams/.diagram-design/`, then runs: the extractor on every block (exit 0, expected node/edge counts), `self_check.py --offline` and `verify-geometry.py` on each HTML, and an export of each HTML compared byte for byte with the committed SVG (drift check). A separate `diagrams` CI job runs it. `npm test` does not need Python or network access.
7. **Node test** `tests/diagrams.test.cjs`: the sources have the expected Mermaid blocks, the committed SVGs meet the accessible-SVG contract and make no external requests, the post links each image, the published post exists in `_site` and `_gemini`, and nothing from `diagrams/` is published.
8. Documentation: `diagrams/README.md` (workflow, pinned versions, how to redraw) and a knowledge-base page.

## Acceptance
`npm test` and `npm run typecheck` pass. `npm run diagrams:check` passes locally and in CI. The post builds, passes Pa11y, and shows both diagrams. Independent Codex review reports no significant findings. The PR merges into `main`.

## Boundaries
No client-side Mermaid.js on the blog. The site stays free of JavaScript frameworks, and Pa11y scans static HTML. The skill is not vendored into the repository. Existing pages, CMS, resume and Gemini behaviour are unchanged.
