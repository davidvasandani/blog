# Data model

## Diagram manifest (`diagrams/manifest.json`)
A list of entries. Each one links a Mermaid block to its redraw and published SVG.

| Field | Type | Meaning |
|---|---|---|
| `source` | path | Markdown file holding the fenced block (`diagrams/partner-delivery.md`) |
| `index` | integer | Fenced block index passed to `--diagram` |
| `kind` | string | Expected grammar (`flowchart`, `sequenceDiagram`) |
| `sha256` | hex | SHA-256 of the block's body (text between the fences, LF line endings) |
| `nodes`, `edges` | integer | Expected counts from the extractor IR |
| `html` | path | Redraw source of truth (`diagrams/*.html`) |
| `svg` | path | Published export (`static/img/diagrams/*.svg`) |

Pin: `diagrams/diagram-design.lock` holds `repo` and `commit` lines.
