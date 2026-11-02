# Technical plan

Spec: `./spec.md`

The existing RenderCV 2.8 YAML source feeds Markdown and PDF output. Eleventy renders the Markdown through `scripts/resume-page.cjs` into `pages/resume.njk`. No template or API changes are needed.

1. Edit only the two section-key lines in `resume/David_Vasandani_CV.yaml`, joining the lists under `projects`.
2. Use the pinned setup and render scripts, then build Eleventy and Gemini. Compare parsed YAML against HEAD with the same grouping transformation, proving content preservation.
3. Inspect rendered headings, project names and PDF output; run `node --test tests/resume.test.cjs` and `npm run test:a11y` against the built site.
4. Record evidence in `VALIDATION.md`; run independent Codex review before knowledge capture and PR merge.

Constitution check: all nine principles hold. No dependency or tooling changes; ignored artifacts stay ignored; existing public URLs remain. The only data-model change is joining two lists of the same RenderCV entry type. No contracts are affected.

Risk: the changed grouping may alter page breaks. Inspect PDF text and page count after rendering. Environment dependencies are Node 24, Python 3.12+, the pinned requirements, and a usable Chromium for the existing audit.
