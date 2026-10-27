# Implementation plan: RenderCV resume source

1. Add `resume/requirements.txt` pinning `rendercv[full]==2.8`, the current PyPI release (needs Python >= 3.12).
2. Generate `resume/David_Vasandani_CV.yaml` with `rendercv new "David Vasandani"`. Replace the sample content with the public contact details and a skeleton of sections (summary, experience, skills, education) marked TODO. Keep the schema comment for editor validation. Set the output folder to `rendercv_output` and the PDF title to `David Vasandani - Resume`.
3. Add `scripts/resume.cjs`, a small Node wrapper that finds `resume/.venv`, falls back to a `rendercv` on PATH, and prints setup instructions if neither exists. Add npm scripts: `resume:setup` (create the venv and install), `resume` (render) and `resume:watch`.
4. Ignore `resume/.venv/` and `resume/rendercv_output/` in `.gitignore`. Add `resume/` to `.eleventyignore`.
5. Add `tests/resume.test.cjs`: exact pin, the YAML names David and has the schema line, ignore rules exist, and `_site`/`_gemini` contain no resume output after the build. Add it to the `npm test` glob, which already picks up `tests/*.test.cjs`.
6. Add a `resume` job to `.github/workflows/test.yml`: setup-python 3.13 with pip cache, `pip install -r resume/requirements.txt`, `rendercv render`, assert the PDF is non-empty, then upload the artifact.
7. Write `resume/README.md` covering setup, render, watch, themes, and where the output goes.
8. Verify locally: `npm run resume:setup`, `npm run resume`, `npm test`, `npm run typecheck`.
9. Run the Codex review, fix its findings, update the knowledge base, then open and merge the PR.
