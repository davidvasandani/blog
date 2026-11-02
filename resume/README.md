# Resume (RenderCV)

The resume lives in `David_Vasandani_CV.yaml` and is rendered by [RenderCV](https://github.com/rendercv/rendercv) ([docs](https://docs.rendercv.com)).

## Published on the site

Every Cloudflare deploy renders the resume (see `npm run workers:build`) and publishes:

- https://david.vasandani.me/resume/: the HTML version, built from RenderCV's Markdown output in the blog's own layout (`pages/resume.njk`, `scripts/resume-page.cjs`), with a **Resume** nav link
- https://david.vasandani.me/resume/David_Vasandani_CV.pdf: the PDF

The Worker build stores RenderCV in `node_modules/.cache/resume-venv`. See [build tooling](../README.md#build-tooling) for the local cache locations.

So publishing a change means editing the YAML and merging to `main`. A render failure fails the deploy, so a broken resume never goes live. Locally, `npm run build` includes the page only after `npm run resume` has rendered it, and skips it (and the nav link) otherwise. The source files themselves stay out of template processing (`resume/` is in `.eleventyignore`) and out of the Gemini capsule.

## Setup

Requires Python 3.12+. From the repository root:

```sh
npm run resume:setup   # creates resume/.venv and installs the pinned version from requirements.txt
```

Set `PYTHON=/path/to/python3.12` if your default `python3` is older.

## Render

```sh
npm run resume         # writes resume/rendercv_output/David_Vasandani_CV.{pdf,png,typ,md,html}
npm run resume:watch   # re-renders on every save
```

Extra RenderCV options pass through after `--`, for example `npm run resume -- --dont-generate-png`. If `resume/.venv` doesn't exist, the scripts fall back to a `rendercv` on your `PATH`.

The PDF footer and the published `/resume/` page show **Resume version 1.0.0**
(initial release), sourced from `resume/VERSION`. This version belongs to the
resume, independently of the blog's package version. It does not require Git.

Before releasing a changed resume from main, update `resume/VERSION`:

- **Major**, e.g. `1.2.3` → `2.0.0`: substantial restructuring or changed positioning.
- **Minor**, e.g. `1.2.3` → `1.3.0`: substantive additions such as roles, achievements or skills.
- **Patch**, e.g. `1.2.3` → `1.2.4`: corrections or formatting changes.

Use three nonnegative integers without leading zeros or suffixes. Unrelated blog
changes do not bump the resume. Commit the version bump with the resume change,
run `npm run resume -- --dont-generate-png` and `npm run build`, and inspect both
outputs before merging to main. The main deployment renders from these sources.
Readers compare their PDF footer with the version beside the online PDF link.

Use the npm wrapper: direct RenderCV calls bypass version injection. A successful
render writes `rendercv_output/resume-version.txt`; the site build rejects missing
or mismatched metadata rather than labeling an old PDF with a new version. If you
have older generated files, rerender once. Watch mode performs an initial render
before watching and captures the starting version; restart it after a version
bump. Failed renders clear the marker. Skipping PDF or Markdown generation, or sending
output elsewhere, leaves no marker unless both default published files were
regenerated. Run a normal render before building the site. A version identifies a release, so local
unreleased edits can still carry the previous version until you bump it.

`rendercv_output/` and `.venv/` are gitignored. CI (`.github/workflows/test.yml`, job `resume`) renders the resume on every pull request and push to `main` and uploads `rendercv_output/` as the `resume` artifact.

## Editing

- Run every wording change through the `/voice` skill first, then check that it kept every fact, number, qualifier and ownership claim. `AGENTS.md` at the repository root has the steps. `npm run resume:voice` flags dashes, curly quotes, "AI" said more than once in a line and the skill's word lists. `npm test` runs the same check, so CI fails on them too. The script only finds the tells it can match, so a clean run doesn't mean the line went through `/voice`.
- Lines marked `TODO` are placeholders to replace with real content.
- Section titles under `cv.sections` are free-form. Each section holds one entry type (text, experience, education, bullet, one-line `label`/`details`, and so on). See the [entry types](https://docs.rendercv.com/user_guide/structure_of_the_yaml_input_file/).
- Change the look with `design.theme`. The built-ins are `classic`, `ember`, `engineeringclassic`, `engineeringresumes`, `harvard`, `ink`, `moderncv`, `opal` and `sb2nov`.
- Editors with the YAML language server get validation and autocomplete from the schema line at the top of the file.
- For a tailored variant (for example, one application), copy the YAML to a new file and render it with `resume/.venv/bin/rendercv render <file>.yaml` from `resume/`.

## Upgrading RenderCV

Bump the version in `requirements.txt` and the schema tag on the first line of the YAML, then run `npm run resume:setup && npm run resume`. Check the [changelog](https://docs.rendercv.com/changelog/) for schema changes. `tests/resume.test.cjs` asserts the pin and schema tag, so update it too.
