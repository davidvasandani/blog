# Research: Resume in Decap

## Decap YAML behavior (decap-cms-core 3.20.1, `src/formats/yaml.ts`)
- `fromFile` uses `yaml.parseDocument(...).toJSON()` (yaml 1.x). It accepted the currently broken resume (unquoted `: ` inside a plain scalar) that js-yaml and RenderCV reject.
- `toFile` builds a new document from data with `yaml.createNode`, sorts top-level keys by configured field order, and calls `toString()`. All comments are lost, long strings fold at 80 columns, and quoting is the library's choice.
- Field-level `comment` options are collected by `selectFieldsComments`, but `selectField` looks up `collection.fields`, which a `files` collection doesn't have, so comments never apply to a single-file collection. Rejected as a way to keep notes.
- Experiment: round-tripping the quoted resume through yaml 1.10.2 `createNode`/`toString` gives data deep-equal under js-yaml 4 and PyYAML.

## Alternatives considered
- **Folder collection over `resume/`** so field comments work: needs an identifier field at the top level of the entry, which RenderCV would reject as an unknown key. Rejected.
- **Expose only `cv`, leave design/locale/settings unexposed:** Decap keeps unknown keys in entry data today, but that is implementation behavior. Exposing them makes the coverage test exhaustive. Chosen: expose, collapsed.
- **Custom preview rendering the resume:** out of scope (spec).
- **Date widgets for start/end dates:** would rewrite `2026-02` and `present`. Rejected for `string`.

## Dependency
`yaml` 1.10.2 (devDependency, exact). Used only by `tests/admin.test.cjs` to reproduce Decap's serializer. Decap itself still loads from unpkg.

## Pre-existing breakage
`main` has failed `Blog tests` since 8331c6b (2026-11-09): js-yaml throws "bad indentation of a mapping entry" at line 28, and the `resume` job's RenderCV validation fails. Quoting the scalar fixes both.
