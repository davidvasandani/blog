# Prior knowledge: diagram-design with Mermaid

Searched `knowledge-base/` (index, dependency-testing, resume-rendercv), README, posts, pages and earlier specs for Mermaid, diagram, or SVG. There are no earlier pages on diagrams or Mermaid. The two existing pages cover patterns this task can reuse.

From `dependency-testing.md`:
- Run `npm ci`, `npm test`, `npm run typecheck` and `npm run gemini:server:build` on Node 24. `npm test` cleans both outputs, builds `_site` and `_gemini`, runs `node --test tests/*.test.cjs`, then runs Pa11y.
- Both Eleventy generators scan repository Markdown, so new non-content Markdown (here `diagrams/`) must go in `.eleventyignore`. Assert rendered content: a build can succeed with an empty body.
- Pa11y (WCAG2AA) scans every public page, so a new post must pass it. Locally on NixOS, set `PUPPETEER_EXECUTABLE_PATH` to nixpkgs Chromium. CI uses `/usr/bin/google-chrome`.
- `main` needs verified signatures and linear history. Fall back to GitHub `createCommitOnBranch` if local signing is unavailable.

From `resume-rendercv.md`:
- Constitution principle 7: pin non-Node tooling exactly, keep it out of `npm test` and existing CI jobs (give it a separate job), install it into an ignored local path, and document it beside its sources. diagram-design scripts are Python stdlib only, so pinning a git commit is enough. No venv is needed.
- Passthrough copy ignores `.eleventyignore`. Anything under `static/img` is published, so put only the final SVGs there.
- Third-party HTML output can fail Pa11y (an empty `<title>`, CDN assets). Embed only checked SVGs.

Implications: keep Mermaid sources and skill HTML in an ignored `diagrams/` folder, publish exported SVGs through `static/img/diagrams/`, put Python checks in their own CI job, and cover the published contract with a Node test.
