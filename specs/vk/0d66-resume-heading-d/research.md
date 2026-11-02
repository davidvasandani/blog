# Research: Resume Heading Design (task 0d66)

## RenderCV's Markdown entry shape
`npm run resume` (RenderCV 2.8, `classic` theme) writes
`resume/rendercv_output/David_Vasandani_CV.md`. Each entry is:

```
## **Sweetgreen**, Senior Manager, IT Infrastructure & Innovation

Culver City, CA

Feb 2026 – present

10 months

**Theme: Running IT operations, ...**

Promoted from Senior Lead Software Engineer. ...

- bullet
```

`scripts/resume-page.cjs` demotes headings one level, so entries become
`<h3>`. Variants in the current resume:
- Older roles: location, then a year range ("2016 – 2019"), no duration.
- Open Source: bold name only, then "2026", then a summary sentence.
- Projects: bold name only, then "Personal project, built with AI coding
  agents." and no date.
- Skills: `**Label:** list` paragraphs, no h3.

So a meta block is: the plain-text paragraphs right after an h3, up to the
last one that looks like a date range, a year, "present" or a duration.
Paragraphs ending in "." never count; that keeps the Projects summary out.

## Where to transform
Options considered:
1. A custom RenderCV Markdown template. Ties layout to RenderCV's template
   internals and the pinned version; the PDF build shares the theme folder.
2. Regex on the rendered HTML string. Fragile, and easy to break escaping.
3. A markdown-it core rule on the token stream (chosen). Resume strings stay
   in `text` tokens, so markdown-it still escapes them. Injected markup is
   fixed strings in `html_inline` tokens, which the renderer writes as-is
   even with `html: false` (that option only governs parsing input).

## Colours (on page background #FFF0EB)
| Use | Colour | Contrast |
|---|---|---|
| Meta line | #6b5750 | 6.09:1 |
| Company eyebrow, Theme label | #9a3412 | 6.58:1 |

Both pass WCAG AA for small text. The theme callout's background tint
(#fbe4db) lowers these slightly; checked in the Pa11y run.

## Separators
`.resume-meta span:not(:last-child)::after { content: "·" / ""; }` (after, not before, so a wrapped line never starts with a dot) uses the CSS
alt-text syntax so screen readers skip the dot. Browsers without the syntax
drop the declaration, so a plain `content: "·"` line comes first as a
fallback.
