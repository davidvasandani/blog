# Validation

Task: 7e87-star-method. Run 2026-11-04 on branch `vk/7e87-star-method`.

| Check | Result |
| --- | --- |
| `npm run resume:voice` | No mechanical voice problems. |
| `npm run resume` (RenderCV 2.8, pinned venv) | Renders. PDF is 3 pages at resume version 2.0.0. |
| `node --test tests/resume.test.cjs` after `npm run build` and `npm run gemini:build` | 14 tests, 14 pass. |
| `npm run build` | Passes; `_site/resume/index.html` contains the new crash figure. |
| YAML shape diff (ruamel, old vs new) | Only `summary`, `highlights` and project highlight strings changed; the four role `summary` strings differ in whitespace only (word lists identical); removed highlights match the cut list in `spec.md`; one key added, `design.entries.allow_page_break`. |
| Confidentiality grep over `git diff origin/main` | No vendor or product names from the confidential lists, no store names, register hostnames, ticket ids or the hiring manager's name. |
| `git diff --check` in blog and hiring | Clean. |

## Two rendering fixes found on the way

- **Entries could not break across pages.** The longer Senior Manager entry no longer fit below the summary, so RenderCV moved the whole entry to page 2 and left page 1 almost empty (4 pages). `design.entries.allow_page_break: true` lets an entry continue on the next page. Layout of the HTML page is unaffected; it is built from the Markdown output.
- **Role summaries rendered in monospace.** A second paragraph inside an entry `summary` came out as raw text in the PDF (visible in version 1.1.1 as well). Joining the bold theme line and its paragraph with a single newline keeps the words and the line break and renders them in the body font. This also recovered the five lines that had spilled onto a fourth page.

## Rebase

Main merged VAS-950 (remove the Alteryx bullet, reword the Senior Lead theme, version 1.1.2) while CI ran. Rebased onto it: the Alteryx bullet is gone, the new theme wording is kept, and the version stays 2.0.0. Voice check, render (3 pages) and resume tests re-run after the rebase.

## Not verified here

The crash reduction is a read-only query of the monitoring system on 2026-11-04 over an 11-day window, recorded in the hiring repository with its query and caveats. It is not a test fixture. The resume comment asks for a longer window before the next release.
