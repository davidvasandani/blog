# Diagrams: Mermaid sources and diagram-design redraws

Task: 9f29a37f-e305-491d-a278-64d472783749 (Mermaid Diagram Design)
Updated: 2026-10-27

## How the two fit
- Mermaid is the editable source (`diagrams/*.md`, fenced `mermaid` blocks). GitHub renders these blocks client-side through a Viewscreen iframe. The REST Markdown API (`gh api markdown`) returns plain highlighted code, and it strips inline `<svg>` while keeping `<img src="*.svg">`.
- diagram-design (pinned in `diagrams/diagram-design.lock`, v2.6 at `97d7951`) **imports Mermaid but never writes it**. `mermaid_extract.py` parses without rendering, then an agent redraws the diagram by hand into HTML with inline SVG, and `export_svg.py` makes the published SVG. The redraw does not follow the source, so drift is caught by the manifest hash (see below).
- The extractor supports only flowchart/graph, sequenceDiagram, stateDiagram-v2 and erDiagram. Other kinds (pie, gantt, mindmap, gitGraph…) exit 2. `--diagram N` still reaches the other blocks in the same file.

## Repo layout and checks
- `diagrams/` is in `.eleventyignore`. The skill checkout `diagrams/.diagram-design/` is gitignored. Only `static/img/diagrams/*.svg` is published (passthrough of `static/img`).
- `npm run diagrams:setup|extract|export|check` (`scripts/diagrams.cjs`) needs git and Python 3 with the stdlib only, so no venv. `check` runs, for each manifest entry: the block SHA-256 against `diagrams/manifest.json`, the hash the Mermaid comparison image was rendered from, the extractor kind and counts, `self_check.py --offline`, the repo's `scripts/verify-geometry.py`, and a byte compare of a fresh export. A separate CI `diagrams` job runs it.
- `tests/diagrams.test.cjs` (in `npm test`, offline) checks the SVG accessibility contract, bans scripts, handlers, `@import`, `foreignObject` and external URLs, requires alt text, checks the full-size links and Gemini links, and checks for leaks. `scripts/mermaid-blocks.cjs` is the shared block parser and hasher.

## Gotchas
- The eleventy-img transform rasterises every `<img>` in HTML output. Embed diagrams as `<img eleventy:ignore src="/static/img/diagrams/…svg" alt="…">`.
- gemdown drops raw `<img>`. Add a Markdown link with an **absolute** `https://david.vasandani.me/static/...` URL, because the capsule doesn't carry `static/`.
- markdown-it runs with `breaks: true`: keep each paragraph and each list item on one line.
- The blog's main column is 37.5em (about 600px), so a 960px doc-inline diagram scales to about 62% and 8px labels draw at about 5px. Link to the full-size SVG.
- The skill's skins live only in `~/.diagram-design/profiles/`. `diagrams/blog-profile.md` holds the blog skin: paper `#fff0eb`, accent `#b23a17` (shipped `#bf4520` is only 4.63:1 on this paper), link `#0000ff`, `Font source: system` so there are no Google Fonts requests.
- `verify-geometry.py` catches diagonals, corner ports and label masks under later nodes. It does **not** catch a label sitting on its own connector (rule 2). Review screenshots too (headless Chromium `--screenshot`).
- mermaid-cli 12.0.0 (Mermaid 12.2.0) embeds the Recursive font as base64, about 160 KB of a 294 KB flowchart. Use `htmlLabels:false` so the labels are SVG text rather than `foreignObject`. On NixOS, pass `-p` with nixpkgs Chromium as `executablePath`.
- Hand-authoring is quickest with a throwaway script that computes 4px-grid coordinates. The committed HTML stays the source of truth. Don't commit the generator.
