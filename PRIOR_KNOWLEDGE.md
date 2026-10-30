# Prior knowledge for category merge

Searched the local `knowledge-base/` for resume, RenderCV, and categories before planning. Relevant page: `knowledge-base/resume-rendercv.md`.

- Edit `resume/David_Vasandani_CV.yaml`; RenderCV 2.8 is pinned with full CLI extras.
- Generated outputs and the Python venv are ignored. Deployment renders the source; do not commit PDFs.
- Build the résumé before Eleventy to include `/resume/` and its PDF. The site uses RenderCV Markdown through `scripts/resume-page.cjs`, not RenderCV HTML.
- Gemini excludes the résumé. Pipeline and knowledge documents must also remain unpublished.
- Existing résumé tests cover publication and tooling. Pa11y checks the rendered page.
- The render date changes daily, so validate content rather than binary PDF equality.

These findings refine SPEC.md: regeneration is local validation; only source and task documentation are committed.
