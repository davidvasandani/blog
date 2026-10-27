# Resume with RenderCV

Task: e51fe535-6eff-4934-a141-6f1fb612dbda (Set up RenderCV in the blog)
Updated: 2026-10-27

## Layout
The resume source is `resume/David_Vasandani_CV.yaml` (RenderCV 2.8 schema). `resume/requirements.txt` pins `rendercv[full]==2.8`. The `[full]` extra is required for the CLI, the bundled Typst compiler, and fonts. No system TeX or Typst is needed. `scripts/resume.cjs` backs `npm run resume:setup` (creates `resume/.venv`), `npm run resume` and `npm run resume:watch`. It prefers the venv binary, falls back to `rendercv` on PATH, and otherwise exits 1 with setup instructions. Output goes to the gitignored `resume/rendercv_output/` (pdf, png, typ, md, html).

## Boundaries
- `resume/` is in `.eleventyignore`: its README and RenderCV's generated Markdown would otherwise be published by both Eleventy generators. `tests/resume.test.cjs` fails if any resume file reaches `_site` or `_gemini`.
- `npm test` needs no Python. Rendering is checked by a separate `resume` job in `.github/workflows/test.yml`, which uploads the PDF as the `resume` artifact. Get the latest PDF from that artifact, not from git.
- The resume is not published on the site yet; the content is a TODO skeleton. Publishing means copying the PDF into the Eleventy output (passthrough copy) and adding Python to the Netlify build, or committing a built PDF. Decide that when the content is real.

## Gotchas
- `settings.current_date: today` stamps "Last updated", so PDFs differ between days. This is one reason output isn't committed.
- Long values in the education `degree` column wrap badly in the `classic` theme. Use abbreviations (BS, MS).
- Mastodon handles use `username: '@user@instance'`.
- Upgrading means bumping both the pin and the schema tag on the YAML's first line. The test asserts both.
- Local `npm test` needs Chrome for the Pa11y audit. On this NixOS host, use `PUPPETEER_EXECUTABLE_PATH=$(nix build --no-link --print-out-paths nixpkgs#chromium)/bin/chromium`.
