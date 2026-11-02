# Prior knowledge: Blog dependency installation latency

Task workspace: 271671fa-3a56-4fd0-ac2f-c0bc313a9843
Source: read-only search of blog/knowledge-base on 2026-11-02.

- `cloudflare-hosting.md`: Cloudflare Workers is the current deployment target. `npm run workers:build` renders the resume, builds Eleventy, and verifies the PDF. Older provider-specific notes are historical. Preserve RenderCV and build-output exclusions.
- `resume-rendercv.md`: RenderCV is pinned to `rendercv[full]==2.8`. Resume setup can reuse a virtualenv and recreates it when the cached Python interpreter is unusable. Historical Netlify timings (16s cold setup, about 1s warm) are not measurements of Cloudflare's Python provisioning.
- `dependency-testing.md`: Node 24 and `npm ci` are the supported baseline. Browser downloads can be skipped when a system Chrome is supplied. Keep Python rendering in a separate CI job. Main requires signed commits and linear history; required checks must pass before merge.
- `index.md`: The existing knowledge base is populated. Hosting and resume pages are the relevant topic owners for eventual reusable findings.

Current repository evidence: README.md instructs `PYTHON_VERSION=3.13`; the screenshot resolves that to 3.13.18. `workers:build` places the resume venv under node_modules/.cache. Neither proves that Cloudflare caches that directory across npm clean installs.

Screenshot evidence: installation lasts 4m32s, with about four minutes between Python installation starting and npm installation starting. Initialization takes a separate 8m05s; the application build takes 37s. Investigate runtime provisioning first. Source compilation remains a hypothesis until complete logs or provider evidence confirm it.

Spec follow-up: do not apply historical Netlify caching assumptions to Workers Builds. Preserve the pinned renderer and distinguish provider initialization from dependency setup in validation.
