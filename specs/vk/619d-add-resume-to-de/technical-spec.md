# Technical spec: Resume in Decap (619d-add-resume-to-de)

## Goal
Edit `resume/David_Vasandani_CV.yaml` from `/admin/` through form fields, next to Post and Page, without the save changing anything RenderCV reads beyond what was edited.

## Components
- **`admin/config.yml`**: a third collection, `resume`, of type `files` with one file (`cv`), `format: yml`, `delete: false`, `editor.preview: false`. Fields mirror the RenderCV 2.8 keys the file uses (see `data-model.md`): `cv` (contact, `social_networks`, `sections.summary|experience|projects|skills`), then collapsed `design`, `locale`, `settings`. Dates are `string` widgets so `2026-02`, `present` and `2016 – 2019` survive. Top-level field order matches the file because Decap sorts top-level keys by field order.
- **`resume/David_Vasandani_CV.yaml`**: two values quoted (both had an unquoted `: ` from 8331c6b and fc77944; one broke parsing, one parsed as a mapping), two curly apostrophes straightened, and all comments except the schema line moved to `resume/README.md`. No words changed.
- **`resume/VERSION`**: 3.1.0 → 3.2.0 (minor), since the unreleased direct-to-main edits add a bullet and now publish.
- **`tests/admin.test.cjs`**: collection shape; recursive key coverage (data vs field tree, and list-of-text items must be scalars); a round trip using `yaml` 1.10.2 with the same steps as decap-cms-core 3.20.1 `formats/yaml.ts` `toFile`, compared with js-yaml.
- **`tests/resume.test.cjs`**: the schema line is optional (a CMS save removes it); if present it must target v2.8.
- **`package.json`**: `yaml` 1.10.2 exact devDependency.
- **Docs**: `resume/README.md` "Editing in the CMS" and "Notes on the source"; one paragraph in `README.md` under CMS sign-in.

## Behavior of a CMS save
Decap parses with yaml 1.x and serializes from data: comments go, lines fold at 80 columns, quoting can change. Field `comment` options don't apply to `files` collections (`selectField` reads `collection.fields`). Editorial workflow makes the save a PR; CI runs RenderCV and `resume:voice`.

## Non-goals
Rendered preview, running `/voice` or RenderCV in the browser, tailored resume copies, editing `resume/VERSION` from the CMS.
