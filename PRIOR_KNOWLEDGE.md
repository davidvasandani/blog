# Prior knowledge: Projects

Searched `blog/knowledge-base/*.md` for projects, navigation, pages, Gemini, exclusions and audits; read matching topic pages and index. The knowledge base is populated.

- `resume-rendercv.md`: regular pages use `pages/`; resume nav only exists after rendering. Gemini intentionally ignores `pages/**`, so Projects should follow that boundary.
- `dependency-testing.md`: builds can succeed with empty bodies; inspect actual rendered content. Planning and knowledge Markdown must remain excluded from both generators. Node 24 and `npm ci` are the established baseline.
- `diagrams-mermaid.md`: the content column is about 600px, so ordinary headings and paragraphs fit the existing responsive layout. Diagram tooling is documented project evidence.
- `cloudflare-hosting.md`: authoritative hosting is Cloudflare Workers. Pa11y recursively audits public HTML, including new pages. No hosting changes are needed.
- `resume-role-timeline.md`: project claims require evidence; use committed resume content without inventing dates or claims.

The catalog can use the resume's personal/open-source sections and the blog's own diagram documentation. No remote service needs updating.
