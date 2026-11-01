# Validation: clarify volume in the loyalty-scan bullet

Run 2026-11-01 on branch `vk/a290-claify-volume`.

- YAML: parsed the original and edited resume with js-yaml. The only changed value is `cv.sections.experience[0].highlights[2]`.
- `npm run resume:voice`: "No mechanical voice problems in the resume."
- RenderCV (pinned 2.8, `npm run resume -- --dont-generate-png`): rendered before and after at 3 pages. The generated Markdown has the new phrase.
- `npm test` (with nix chromium for Pa11y): 50 of 50 tests pass. The accessibility audit passed on 26 pages.
- Confidential names: a case-insensitive grep of the diff against `origin/main` for the POS vendor, product, store, remote-access and camera tool names found none. Re-run on the final diff before pushing.
- `/voice`: see `research.md`. No changes beyond David's phrase.
