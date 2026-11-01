# Validation

Run on 2026-11-01 against baseline `5e1f778`.

## Mechanical checks (T004)
Both YAML files were parsed with ruamel (from the RenderCV venv), and the old and new trees compared:
- Same keys, list lengths and value types. No date, name, title, company, location, link, label, skills or settings value changed.
- 44 prose values changed (summaries and highlights). The `TODO` crash-reduction comment and the schema line are still there.
- No prose value has an em or en dash, a curly quote, "AI" more than once, or a word from the skill's AI vocabulary list (also checked: leverage, utilize, enable, evangelize, ensure).

## Render, build and tests (T005)
- `npm ci`, then `npm run resume:setup` (RenderCV 2.8) and `npm run resume`. The PDF, Markdown, HTML and PNGs rendered. The PDF is 3 pages, the same as the baseline YAML rendered the same way. Page 1 was checked visually.
- `npm run build` and `npm run gemini:build`, then `node --test tests/resume.test.cjs`: 8 of 8 pass. `/resume/` contains the new text, and the Gemini capsule has no resume.
- `npm run test:a11y` with Nix Chromium: the public-page audit passed (25 pages, including `/resume/`).

## Codex review (T006)
Three passes of `codex exec` (read-only) on the diff against `origin/main`, with the hiring evidence available.
- Pass 1: three findings, all confirmed and fixed. The remote-support bullet named the stores' remote-access product, which the hiring material lists as confidential, so it now says "our remote-access software". The Gruntwork line added an outcome ("less code to maintain"), so it's back to the original purpose ("easier to maintain"). The OpsGenie line had dropped David's lead on the runbook work, so it now says "then led the team".
- Pass 2: one finding, confirmed and fixed. Evidence file names and an alias in `PRIOR_KNOWLEDGE.md` and `research.md` gave away the POS product's name, which isn't anywhere else in this public repo. They now use a neutral alias.
- Pass 3: no significant findings.

The local commit was amended before the first push, so the public branch history never contained either product name. After the fixes, `npm run resume`, the build, the 8 resume tests and the 25-page accessibility audit all pass again, and the PDF is still 3 pages.
