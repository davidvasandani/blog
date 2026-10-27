# Research: diagram-design with Mermaid

## Sources
- GitHub blog, "Include diagrams in your Markdown files with Mermaid" (Woodward & Biagianti, 2022-02-14, updated 2024-07-23). GitHub's HTML pipeline swaps `mermaid` code blocks for a progressive template. With JavaScript, an iframe to Viewscreen renders them with Mermaid.js. Without JavaScript (including the API), readers see the code. Verified: `gh api markdown` returns the block as highlighted `mermaid` source, and it strips inline `<svg>` while keeping `<img src="*.svg">`.
- diagram-design README, `SKILL.md` v2.6, `references/import-mermaid.md`, `output-spec.md`, `export.md`, `style-guide.md`, `profiles.md`, at commit `97d7951` (2026-10-26).

## Decisions
| Decision | Chosen | Alternatives | Why |
|---|---|---|---|
| Pin the skill | git commit SHA, clone into ignored dir | vendor files; `npx skills add` | Constitution 7. Vendoring 1 MB of docs is noise. `skills add` installs into agent homes, not the repo. |
| Python env | system `python3` (stdlib) | venv | The scripts import only the stdlib |
| Fonts | `system` font source, `--system-fonts` export | Google Fonts | No external requests (constitution 8). The blog already uses system sans. |
| Embed | `<img eleventy:ignore>` to `/static/img/diagrams/*.svg` | inline SVG | Works on GitHub too. No ID collisions. Bypasses the eleventy-img raster transform. |
| Mermaid comparison | one-off `npx @mermaid-js/mermaid-cli@12.0.0` with `htmlLabels:false` | client-side Mermaid.js; dev dependency | The site stays JS-free. A one-time image doesn't justify a Chromium-heavy dependency. |
| Drift | manifest with block SHA-256 and expected counts, plus a byte compare of the re-export | screenshot diff | Deterministic, stdlib only, and catches both source edits and export changes |

## Early findings (from extractor runs)
- The flowchart parses with 8 nodes and 8 edges. It reports the decision, the cycle (remediation loop), hubs, entry and terminals, and gives a budget verdict.
- The sequence parses with 3 lifelines and 6 messages, plus the `alt` fragment and autonumber. The Markdown digest's edge table doesn't say which `alt` branch an edge is in (the `--json` IR does), and it prints `direction: LR` for sequences, where that means nothing.
- A `pie` block exits 2 with a clear message ("supported: flowchart, sequenceDiagram, stateDiagram-v2, erDiagram"). Other blocks in the same file stay reachable with `--diagram N`.
- The flow is one way: diagram-design never writes Mermaid, so the redraw goes stale when the source changes. The manifest hash makes that visible.
- Profiles live only in `~/.diagram-design/profiles/`. A repo marker can name one but can't carry it, so the blog skin is committed as a profile body to copy in.
