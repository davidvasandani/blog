# Implementation Plan: Resume in Decap

**Spec**: `./spec.md`
**Status**: Ready via `/speckit.plan`

## Technical Context
Decap CMS 3.17.1 loaded from unpkg in `admin/index.html` (it bundles `decap-cms-core` 3.20.1, whose YAML format uses the `yaml` package 1.x). The config is `admin/config.yml`, copied to `_site/admin/` by `addPassthroughCopy("admin/")` in `.eleventy.js`. GitHub backend with `publish_mode: editorial_workflow`; `local_backend: true` for `npm start` (`decap-server`). The resume is `resume/David_Vasandani_CV.yaml`, RenderCV 2.8 schema, read by RenderCV (Python, ruamel), `scripts/resume-voice.cjs` (js-yaml) and nothing else in Node.

## Architecture & Approach
1. **Fix the broken YAML (FR-8).** Double-quote the current role's `summary` in `resume/David_Vasandani_CV.yaml`. The words don't change.
2. **Move comments out of the YAML (FR-5).** Add a "Notes on the source" section to `resume/README.md` with the role attribution pointer, the ChartHop date source, the crash-figure re-run note and the reasons for `allow_page_break` and `show_time_spans_in: []`. Leave the YAML with the schema modeline and a one-line pointer to the README.
3. **Resume collection (FR-1 to FR-3).** Append a `files` collection to `admin/config.yml`:
   - `name: resume`, `label: Resume`, `create: false`, `delete: false`, one file `name: cv`, `label: Resume`, `file: resume/David_Vasandani_CV.yaml`, `format: yml` (the `.yaml` extension doesn't infer the format for a file collection).
   - Field tree mirrors the YAML (see `data-model.md`): `cv` object (contact fields, `social_networks` list, `sections` object with `summary`, `experience`, `projects` and `skills` lists), then collapsed `design`, `locale` and `settings` objects.
   - Strings use `string`; long prose (summary paragraphs, entry summaries, highlights) uses `text`. Lists use `list` with `fields`, or `field` for a list of plain strings. Dates stay `string` so values like `2026-02`, `present` and `2016 – 2019` round-trip unchanged. Optional RenderCV keys get `required: false`. Lists of entries get `summary` templates so collapsed items show company and position.
   - Top-level field order `cv`, `design`, `locale`, `settings` matches the file, so Decap's key sort keeps the current order.
4. **Tests (`tests/admin.test.cjs`).** Read the built `_site/admin/config.yml`:
   - The Resume collection is a single non-creatable, non-deletable file pointing at the resume with `format: yml`, and the existing Post/Page assertions are unchanged.
   - Coverage: walk the parsed resume and the field tree together; every key path in the data has a field (list items checked against `fields`/`field`). Fails when someone adds a YAML key the form can't show.
   - Round trip: serialize the resume with `yaml` 1.x the way Decap's `toFile` does (`createNode`, sort top-level keys by field order, `Document#toString`) and assert js-yaml reads back deep-equal data.
   - Strict parse: js-yaml loads the source file (already implied by the voice check, made explicit).
5. **`tests/resume.test.cjs`.** The schema-pin test currently requires the modeline; a CMS save drops it. Change it to: if the modeline is present it targets `v2.8`. The pin itself is still asserted on `requirements.txt`.
6. **Docs (FR-7).** `resume/README.md` "Editing in the CMS": where it is, that saves become editorial-workflow PRs, that `/voice` still applies before merge and CI runs `resume:voice`, that saves drop comments and reflow lines, how to restore the modeline, that section names are fixed in the form, and that a cleared optional field should be checked in the render. One line in the root `README.md` CMS section if it lists collections.
7. **Dependency.** Add `yaml` 1.10.2 as an exact devDependency for the round-trip test (the same major Decap uses). Update `package-lock.json`.

## Data Model
See `./data-model.md`.

## Contracts
The contract is the RenderCV 2.8 input schema for the keys the file uses; `data-model.md` maps each to a CMS widget. No API changes.

## Research Notes
See `./research.md`.

## Constitution Check
- 1: Blog repository only; no hosting or OAuth change.
- 2: Post and Page configs, editorial workflow, auth and previews untouched; `/resume/` URL and content unchanged (only quoting changes).
- 3, 4: New tests are deterministic and offline; they read the built config and committed YAML.
- 5: `yaml` is declared exactly and locked; documented in research.
- 6: Specs and knowledge pages stay unpublished; `resume/` is already in `.eleventyignore`.
- 7: No new Python in `npm test`; local RenderCV render is a manual validation step.
- 9: Local validation, Codex review, knowledge capture and a PR.
- 10: No wording changes. The quoting fix keeps every word. CMS edits are routed through the same PR checks and the `/voice` rule is documented for them.

## Risks & Dependencies
- Decap writing `""` for a cleared optional field (for example `date`) could fail RenderCV. Checked in the browser during validation; documented.
- The first CMS save produces a whole-file reformat diff.
- A future Decap upgrade could move to `yaml` 2.x. The round-trip test pins the 1.x behavior; revisit on upgrade.
- RenderCV section names are free-form, but the form fixes four. Adding a section needs a config change; documented.
