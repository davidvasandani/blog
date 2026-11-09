# Validation: Resume in Decap

Run 2026-11-09 on the task branch.

- `npm run resume:voice`: "No mechanical voice problems in the resume." (Before the fix it flagged curly quotes in `experience[0].highlights[0]`.)
- `npm run test:admin`: the three new Resume tests pass. The key-coverage test first failed on `cv.sections.experience[0].highlights[1]`, which parsed as a mapping because of an unquoted `: `. Quoting it fixed that.
- `PUPPETEER_EXECUTABLE_PATH=<nix chromium> npm test`: 64 pass, 0 fail; Pa11y and the SitePing browser checks pass.
- PyYAML `safe_load` of the resume: parses; every highlight is a string.
- RenderCV 2.8 (`rendercv render --dont-generate-png --dont-generate-html`): the source and a yaml 1.10.2 round-tripped copy both render. Their `.typ` and `.md` outputs are byte-identical apart from the date line.
- Real Decap 3.17.1 UI (`decap-server` local_fs against a scratch git copy, `_site` served statically with `publish_mode` removed because local_fs only supports simple mode; Puppeteer + Nix Chromium): Resume appears in Collections, the entry opens with current values, and an edit to Location saved through Publish now. The written file parsed to the same data apart from the edited field; comments were gone and long lines folded, as documented. RenderCV rendered it, and the Markdown differed only in the Location line.
- Not checked: the GitHub backend's editorial workflow for the Resume collection (needs production sign-in). It's the same code path posts use.
- Codex review (`codex review --base origin/main`), pass 1: two P2 findings. (1) The theme dropdown offered themes that `tests/resume.test.cjs` rejected; the test now accepts any built-in theme. (2) An editable `output_folder` would break `scripts/resume.cjs` and the site build; `render_command` is now a hidden field, and a real Decap save confirmed it keeps its value. Pass 2: no actionable findings.
