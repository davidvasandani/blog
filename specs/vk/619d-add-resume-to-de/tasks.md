# Tasks: Resume in Decap

**Plan**: `./plan.md`

## Layer 1: source fixes and dependency
- [x] T001 [P] Quote the current role's `summary` (no word changes), straighten the two curly apostrophes in `experience[0].highlights[0]` after a `/voice` pass, and replace the YAML comments with a README pointer, keeping the schema modeline. Bump `resume/VERSION` to 3.2.0 for the unreleased wording changes in 8331c6b and fc77944. `resume/David_Vasandani_CV.yaml`, `resume/VERSION`
- [x] T002 [P] Add exact devDependency `yaml` 1.10.2 and refresh the lockfile. `package.json`, `package-lock.json`

## Layer 2: CMS config and docs (after T001)
- [x] T003 [P] Add the Resume `files` collection with the field tree from `data-model.md`. `admin/config.yml`
- [x] T004 [P] Move the YAML notes into "Notes on the source" and add "Editing in the CMS". `resume/README.md`, `README.md` (CMS section, if it lists collections)

## Layer 3: tests (after T002, T003)
- [x] T005 [P] Resume collection shape, key coverage, Decap-style round trip and strict parse tests. `tests/admin.test.cjs`
- [x] T006 [P] Make the schema-modeline assertion conditional on the line being present. `tests/resume.test.cjs`

## Layer 4: validation (after T001 to T006)
- [x] T007 Run `npm run resume:voice`, `npm run test:admin`, `npm test` and a local RenderCV render of the source and of a Decap round-tripped copy. Record results in `validation.md`. `specs/vk/619d-add-resume-to-de/validation.md`
- [x] T008 Open `/admin/` against `decap-server`, open Resume, check the values show, save an edit, and check the written file renders. Record in `validation.md`.
