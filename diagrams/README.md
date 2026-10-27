# Diagrams

Mermaid sources, plus the [diagram-design](https://github.com/cathrynlavery/diagram-design) redraws used by the post `posts/mermaid-and-diagram-design/`. Eleventy ignores this folder (`.eleventyignore`). Only the exported SVGs in `static/img/diagrams/` are published.

| File | Role |
|---|---|
| `partner-delivery.md` | Mermaid source of truth. GitHub renders its two blocks: 0 is the flowchart, 1 is the sequence. |
| `partner-delivery-flow.html`, `partner-delivery-sequence.html` | diagram-design redraws (HTML with inline SVG). The skill treats these as the source for export. |
| `manifest.json` | Links each block to its redraw and SVG. Holds the block's SHA-256 and the expected node and edge counts. |
| `diagram-design.lock` | Pinned skill repository and commit |
| `blog-profile.md` | The blog's skin for the skill (tokens, contrast ratios, `system` fonts) |
| `.diagram-design/` | Ignored checkout of the pinned skill, created by `npm run diagrams:setup` |

## Commands

Requirements: Node 24, `git` and `python3`. The skill's scripts use only the Python standard library. Set `PYTHON` to use another interpreter.

```sh
npm run diagrams:setup    # clone/check out diagram-design at the pinned commit
npm run diagrams:extract  # print the skill's digest of each Mermaid block
npm run diagrams:export   # redraw HTML -> static/img/diagrams/*.svg (export_svg.py --system-fonts)
npm run diagrams:check    # what CI runs (the "diagrams" job)
```

For each diagram, `check` verifies:
1. **source**: the Mermaid block still matches the hash in the manifest. An edited block fails until it is redrawn.
2. **mermaid**: the Mermaid comparison image was rendered from the current block.
3. **extract**: `mermaid_extract.py` parses the block with the expected kind, nodes and edges.
4. **self-check**: `self_check.py --offline` passes (accessible SVG, single file, no Google Fonts).
5. **geometry**: `verify-geometry.py` passes (no diagonals, no corner ports, no masks under nodes).
6. **export**: a fresh export is byte-identical to the committed SVG.

`npm test` covers the published side without Python: SVG accessibility, no scripts or external URLs, alt text, Gemini links, and no leaked sources.

## Changing a diagram

1. Edit the block in `partner-delivery.md`.
2. Redraw it with an agent that has diagram-design installed. Point the agent at the block and this skin. The skill reads profiles only from `~/.diagram-design/profiles/`, so first copy `blog-profile.md` there as described in that file. Ask for `format=svg size=doc-inline detail=balanced audience=mixed`, and update the matching HTML here. Keep the redraw within the skill's budget (9 nodes, 12 arrows) and record label changes in the ledger below.
3. Run `npm run diagrams:export`, put the new block hash (`npm run diagrams:check` prints it) in `manifest.json`, and run `npm run diagrams:check`.
4. If the flowchart changed, re-render the Mermaid comparison:

```sh
node -e "const {mermaidBlocks}=require('./scripts/mermaid-blocks.cjs');process.stdout.write(mermaidBlocks('diagrams/partner-delivery.md')[0].body)" > /tmp/flow.mmd
echo '{"flowchart":{"htmlLabels":false},"htmlLabels":false}' > /tmp/mmdc.json
npx -y @mermaid-js/mermaid-cli@12.0.0 -i /tmp/flow.mmd -o static/img/diagrams/partner-delivery-flow.mermaid.svg -c /tmp/mmdc.json -b '#fff0eb'
```

mermaid-cli 12.0.0 bundles Mermaid 12.2.0. `htmlLabels:false` keeps the labels as SVG text, so it works as an `<img>` and has no `foreignObject`. Then set `mermaidSvg.sha256` to the block hash. Puppeteer needs Chrome. On NixOS, pass `-p` with a config whose `executablePath` points to nixpkgs Chromium.

Bumping the skill: change the commit in `diagram-design.lock`, then run `diagrams:setup`, `diagrams:export` and `diagrams:check`, and commit any SVG changes together.

## Fidelity ledgers

**Block 0, flowchart** (doc-inline, balanced, mixed). Source: 8 nodes and 8 edges. Drawn: 8 nodes and 8 edges. Nothing merged or dropped.

| Source | Drawn | Reason |
|---|---|---|
| `Authenticate submission` | Authenticate + sublabel "submission" | Fits a 144px box |
| `Orchestrate metadata, artwork, video` | Orchestrate assets + "metadata · artwork · video" | Name plus technical sublabel |
| `Remediate with partner` | Remediate + "with partner" | Fits the box |
| `Set availability window` | Set availability + "launch window" | Reworded sublabel |
| `POST package` edge | link-blue arrow, "POST PACKAGE" | HTTP call semantics |
| `Schema valid?` | the only focal element, with the yes edge as the accent path | Most consequential decision |
| LR direction | Kept, with failure loop on a second row | Fits 960×600 |

**Block 1, sequence**. Source: 3 participants, 6 messages, 1 `alt` with 2 regions, `autonumber` from 1. Drawn: all of them, numbered 1–6.

| Source | Drawn | Reason |
|---|---|---|
| `POST /deliveries (JSON manifest)` | "1 · POST /DELIVERIES", link-blue | Label length. "Manifest" moved to the Validator sublabel |
| `validate(manifest)` | "2 · VALIDATE" | Label length |
| `422 Unprocessable Entity` | "4 · 422 UNPROCESSABLE" | Label length |
| `202 Accepted` | solid accent | Headline success (one accent message) |
| Participants | sublabels "REST client", "/deliveries", "manifest schema" | Taken from message content |
| Validator | focal actor | Where the branch is decided |
