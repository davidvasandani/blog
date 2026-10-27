# Technical specification: RenderCV resume source

Scope: davidvasandani/blog only. Add [RenderCV](https://github.com/rendercv/rendercv) so David's resume is kept as YAML in the blog repository and rendered to PDF (plus Markdown/HTML/PNG) with one command. The immediate use is a tailored resume for the Netflix Solutions Engineer 5 - Content Promotion & Distribution application.

## Current architecture
Eleventy 3 (Node 24) builds the site into `_site` and the Gemini capsule into `_gemini`. `npm test` builds both and runs Node test suites plus a Pa11y audit. CI (`.github/workflows/test.yml`) runs `npm ci`, `npm test`, typecheck and the Gemini server build. Netlify runs `eleventy` only. There is no Python tooling in the repository.

## Requirements
- RenderCV is a Python CLI (`rendercv[full]`, requires Python >= 3.12). Pin it exactly in `resume/requirements.txt` so renders are reproducible.
- Keep the resume source in `resume/David_Vasandani_CV.yaml`, generated from `rendercv new` and filled in with the public contact details already on the blog (name, email, website, GitHub, Mastodon). Experience content the repository does not know is marked as a TODO, not invented.
- `npm run resume:setup` creates a local virtualenv (`resume/.venv`) and installs the pinned requirements; `npm run resume` renders into `resume/rendercv_output/`; `npm run resume:watch` re-renders on save. The venv and output are gitignored.
- Resume files must not enter the Eleventy or Gemini outputs (`resume/` in `.eleventyignore`).
- CI gets a separate job that installs Python, renders the resume, checks a non-empty PDF exists, and uploads the output as a workflow artifact. Existing Node jobs are unchanged.
- A Node test validates the repository contract (pinned version, YAML file present, ignore rules), so `npm test` does not need Python.
- Document the workflow in `resume/README.md`.

## Acceptance
On a clean checkout with Python 3.12+, `npm run resume:setup && npm run resume` produces `resume/rendercv_output/David_Vasandani_CV.pdf`. `npm test` still passes, and the site and Gemini outputs contain no resume files. The CI resume job passes and uploads the PDF. Independent review reports no significant findings. The PR merges into `main`.

## Boundaries
Publishing the PDF on the live site is out of scope: the content is still a skeleton. The Netlify build command and other services stay as they are.
