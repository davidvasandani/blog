# Implementation plan: test diagram-design with Mermaid

1. Add `diagrams/` to `.eleventyignore` and `diagrams/.diagram-design/` to `.gitignore`.
2. Write `diagrams/partner-delivery.md` with the flowchart and sequence Mermaid blocks. Check that GitHub's Markdown API treats them as `mermaid` code (the iframe render happens client-side on github.com).
3. Add `scripts/diagrams.cjs` with these commands:
   - `setup` clones `cathrynlavery/diagram-design` at the pinned commit (`97d795138448f6a739a0cebc3d9beb37a42077f1`) into `diagrams/.diagram-design/`, or re-checks out the pin if the folder exists.
   - `extract` prints the digests.
   - `export` regenerates the committed SVGs.
   - `check` runs extract with count assertions, `self_check.py --offline`, `verify-geometry.py`, and the export drift comparison.

   Wire `diagrams:setup`, `diagrams:export` and `diagrams:check` in `package.json`. Python 3 stdlib only, with a clear message when `python3` or `git` is missing.
4. Run the extractor. From the digests, set the dials: `format=svg` (the HTML is the source), `size=doc-inline` (960×600), `detail=balanced` and `audience=mixed`. Pick the types: flowchart and sequence.
5. Skin: map the blog's CSS (`--background #FFF0EB`, `--primary blue`, Avenir/system sans) to the skill's roles. Keep warm paper, dark ink, and blue `link`. Choose one accent that clears 4.5:1 on the paper. Font source `system`. Record this as a profile body in `diagrams/blog-profile.md` and note that the skill only reads profiles from `~/.diagram-design/profiles/`.
6. Hand-author both HTML redraws from `assets/template.html`, following the type references, connector rules and complexity budget. Iterate until `self_check.py` and `verify-geometry.py` pass, then review screenshots in Chromium.
7. Export the SVGs with `export_svg.py --system-fonts` into `static/img/diagrams/`.
8. Render Mermaid's default flowchart with `npx -y @mermaid-js/mermaid-cli@12.0.0` (bundles Mermaid 12.2.0), using system Chromium. Commit it as `partner-delivery-flow.mermaid.svg` and document the exact command in `diagrams/README.md`.
9. Write the post `posts/mermaid-and-diagram-design/mermaid-and-diagram-design.md` with the findings, side-by-side images, fidelity ledgers and recommendation.
10. Add `tests/diagrams.test.cjs` covering the source blocks, the SVG contract, the post and image links in `_site`, the Gemini output, and no `diagrams/` leakage.
11. Add a `diagrams` job to `.github/workflows/test.yml`: checkout, setup-python 3.13, `npm run diagrams:check`.
12. Write `diagrams/README.md`. Verify with `npm test` (with Chromium), `npm run typecheck` and `npm run diagrams:check`.
13. Run the Codex review, then update the knowledge base, then open and merge the PR.

## Dependency advisory follow-up (2026-10-30)
1. Refresh the existing constitution/spec/clarifications/plan/tasks and check scope against current main.
2. Clean-install the existing lockfile; run current frontend/admin/API and full tests before upgrades.
3. Inspect current advisories and actual Decap/Joi/Zod usage. Add meaningful security/compatibility regression tests.
4. Apply minimum compatible patched dependencies and narrowly scoped overrides; regenerate the lockfile.
5. Reinstall cleanly, run full tests/typechecks/Gemini build and full/runtime audits.
6. Obtain independent Codex diff review; fix confirmed findings and revalidate.
7. Record reusable findings and verification evidence; commit, open a follow-up PR, satisfy checks and merge.
