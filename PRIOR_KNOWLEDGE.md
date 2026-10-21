# Prior knowledge: Blog dependency upgrades

Searched the Blog workspace for knowledge-base/wiki directories and indexed topic pages, inspected repository documentation, and discovered available tools for project knowledge. No Blog knowledge base or WikiLLM tool is present in this workspace. Treat this as the first Blog knowledge entry; do not borrow unrelated services' knowledge.

Repository evidence: README.md describes Eleventy, Decap CMS, Git Gateway and Netlify Identity. admin/config.yml enables local_backend and editorial workflow against main. netlify/functions/api.ts contains /api/hello and /api/echo only. There is no test command. .eleventy.config.images.js requires undeclared direct packages supplied transitively. .nvmrc selects Node 20. Separate Gemini output and server must survive upgrades.

Implications: test local CMS contracts and API without claiming hosted authentication coverage; declare direct imports; test both generators; explicitly exclude new planning/knowledge Markdown from builds.
