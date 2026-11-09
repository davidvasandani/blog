# Resume in Decap

Task: 619d-add-resume-to-de (Add Resume to Decap), 2026-11-09.

`/admin/` has a Resume collection (`admin/config.yml`, `name: resume`) that edits `resume/David_Vasandani_CV.yaml` through form fields. User-facing notes are in `resume/README.md#editing-in-the-cms`.

## How Decap writes YAML
- Decap 3.17.1 bundles decap-cms-core 3.20.1, whose `formats/yaml.ts` uses the `yaml` package 1.x. `toFile` rebuilds the document from parsed data, so every comment is dropped, strings fold at 80 columns and quoting changes. Top-level keys are sorted by configured field order; nested order follows the data.
- Field-level `comment` options don't work for a `files` collection: `selectField` looks in `collection.fields`, which only folder collections have. Keep notes in `resume/README.md`, not YAML comments.
- A `.yaml` file in a `files` collection needs `format: yml`.
- yaml 1.x is lenient. It loaded a resume with an unquoted `: ` inside a plain scalar that js-yaml and RenderCV reject, so the CMS opening a file doesn't mean the file is valid.

## Guarding the schema
- `tests/admin.test.cjs` walks the parsed resume against the field tree. Any key without a field fails the test, and so does a structure where a `text`/`string` item is expected. That second check caught a highlight that YAML read as a one-key mapping (`- While ..., found a second failure: loyalty ...`).
- The same file reproduces Decap's `toFile` with `yaml` 1.10.2 (exact devDependency) and checks js-yaml reads back identical data. If Decap moves to yaml 2.x, update the devDependency and recheck.
- Every key the resume uses has a field, so preservation doesn't depend on Decap keeping keys it has no field for. Values that downstream scripts depend on use `widget: hidden`, which keeps the existing value (`settings.render_command`, because `scripts/resume.cjs` and the site build read `rendercv_output`). The theme dropdown and `tests/resume.test.cjs` share the built-in theme list.
- Dates are `string` widgets. A datetime widget would rewrite `2026-02`, `present` and `2016 – 2019`.

## Testing the real UI locally
`decap-server` reports `local_fs` with only the `simple` publish mode, so to drive the real UI, serve a copy of `_site` with `publish_mode` removed and point `GIT_REPO_DIRECTORY` at a scratch git copy. Puppeteer with Nix Chromium works. Click Login, open `#/collections/resume/entries/cv`, edit, then Publish and Publish now. Triple-click doesn't select an input's text in Puppeteer here; clear the value another way before typing.

## Workflow
A CMS save is an editorial-workflow draft, and publishing it opens a PR where CI runs RenderCV and `npm run resume:voice`. The `/voice` rule and the `resume/VERSION` bump still apply. The CMS can't edit VERSION.
