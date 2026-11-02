# Prior knowledge: resume semantic version

Searched the blog's knowledge-base index and resume/dependency topic pages for
resume, version, RenderCV, publishing, and validation.

- `blog/knowledge-base/resume-rendercv.md`: RenderCV 2.8 is pinned; the npm wrapper
  sets CLI render options. Generated artifacts and virtualenvs are ignored.
- HTML is built from RenderCV Markdown through `scripts/resume-page.cjs`; the page
  is absent when Markdown or PDF is missing. Gemini must never publish the resume.
- Current production builds render before Eleventy; use the current Cloudflare
  workflow, since older hosting notes in the topic page are historical.
- Resume rendering has its own CI job. The JavaScript suite must work without Python.
- `blog/knowledge-base/dependency-testing.md`: assert built page content, since a
  successful Eleventy build alone does not prove correct output.
- `blog/AGENTS.md` and `blog/knowledge-base/resume-voice.md`: wording edits need
  voice review; this task preserves the YAML and changes version metadata only.

Implications: share a validated version source across render and page builds;
retain optional rendering behavior and exercise both rendered and absent cases.
