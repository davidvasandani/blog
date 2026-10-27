<!-- diagram-design-profile
name: David Vasandani blog
slug: vasandani-blog
source-url: _includes/assets/css/inline.css
created: 2026-10-27
updated: 2026-10-27
notes: Blog paper and link colours, system fonts
-->
# Style Guide (blog skin)

This is the diagram-design skin for this blog. It is a token override of the skill's shipped `references/style-guide.md` at the commit pinned in `diagram-design.lock`. Everything not listed here (typography roles, strokes, node treatments, constraints) is the shipped guide, unchanged.

diagram-design reads profiles only from `~/.diagram-design/profiles/<slug>.md`, and a project's `.diagram-design` marker can only name a slug. To use this skin in an agent session, copy the shipped style guide to `~/.diagram-design/profiles/vasandani-blog.md`, put this header on it, and replace its tokens table with the one below.

## Tokens

| Role | Light | Source / reason | Contrast on paper |
|---|---|---|---|
| `paper` | `#fff0eb` | blog `--background` | — |
| `paper-2` | `#f7e4dc` | paper, darkened slightly | decorative |
| `ink` | `#2d3142` | shipped default, near the blog's default text colour | 11.61:1 |
| `ink-strong` | `#111111` | shipped | — |
| `muted` | `#4f5d75` | shipped | 6.00:1 |
| `soft` | `#5a6580` | shipped | 5.24:1 |
| `rule` | `rgba(45,49,66,0.12)` | shipped | decorative |
| `rule-solid` | `#bfc0c0` | shipped | decorative |
| `accent` | `#b23a17` | shipped hue, darkened. Shipped `#bf4520` is 4.63:1 here, too close to 4.5 once it sits on `accent-tint` | 5.39:1 |
| `accent-tint` | `rgba(178,58,23,0.08)` | from accent | decorative |
| `link` | `#0000ff` | blog `--primary: blue` | 7.74:1 |

Font source: `system`

The blog sets type in Avenir or the platform sans with no web fonts. With `system`, the skill's stacks fall through to `system-ui, sans-serif`, `ui-monospace, monospace` and `serif`, so diagrams make no network requests. Dark skin: not used.
