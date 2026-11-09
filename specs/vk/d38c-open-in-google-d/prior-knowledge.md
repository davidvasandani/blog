# Prior knowledge

Task: d38c-open-in-google-d

Searched the project's committed knowledge-base index and resume pages for resume, Google, Docs and Drive. No existing Google Docs destination or integration was found.

- `knowledge-base/resume-rendercv.md`: RenderCV YAML is the resume source; the web page and PDF share generated content. `resume/VERSION` identifies the resume release; the page shows it next to the PDF link. Generated files are ignored and must be rendered before full resume validation.
- `knowledge-base/resume-decap.md`: Decap edits the resume YAML; its schema must preserve all fields. A navigation link can live in the page without extending this content schema.
- `knowledge-base/index.md`: links to the release, wording and CMS guidance. Resume wording changes require /voice; this task adds a navigation action and does not edit resume claims.
- `.specify/memory/constitution.md`: preserve URLs and Gemini output, exclude pipeline artifacts from publishing, validate and obtain independent review before merging.

Implication: keep this change in the resume page and its existing data conventions; do not add Google API credentials, alter resume generation or edit other services. The document destination remains an open question.
