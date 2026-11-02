# Build runtime validation

Task: VAS-961, dbaa2d7b-811b-4f84-ac60-d327b8c758eb. Date: 2026-11-02.

- Installed exact Python 3.14.8 with uv 0.13.6. The existing system uv 0.11.19 lacked this release in its catalog.
- `PYTHON=<3.14.8 binary> npm run resume:setup` succeeded with the unchanged `rendercv[full]==2.8` requirement. `resume/.venv/bin/python --version` confirmed 3.14.8.
- `npm run resume -- --dont-generate-png` produced Typst, PDF, Markdown and HTML.
- `npm run build` and `npm run gemini:build` passed. HTML includes `/resume/` and its PDF; Gemini remains separate.
- `node --test tests/resume.test.cjs`: 13 passed, zero failures.
- `node scripts/workers-assets.cjs`, `npm run test:workers`, and `npx wrangler deploy --dry-run` passed. No deployment was performed by the dry run.
- `npm run resume:voice` and `git diff --check` passed.
- `PUPPETEER_EXECUTABLE_PATH=/run/current-system/sw/bin/chromium npm run test:a11y`: all 26 public pages passed.
- Independent `codex review --base origin/main` reported no actionable regressions. It confirmed the workflow reads the pin and that documentation distinguishes local checks from unverified hosted timing.

The baseline screenshot shows 4m32s installing, including roughly four minutes of Python provisioning, and a 37-second application build. Initialization adds 8m05s. No hosted speedup has been measured. The available Cloudflare token returns Invalid API Token and dashboard access stops at security verification. The hosted `PYTHON_VERSION` override still needs confirmation as 3.14.8. Repository configuration alone does not change it.

## Refresh after main advanced

On November 2, the delayed continuation found all PR checks passing, including Workers Builds, but the branch needed the newer main commits. Preserved main's current root planning documents and archived this task's originals here. Re-rendered on Python 3.14.8, rebuilt HTML and Gemini, and passed all 14 current resume tests. A fresh independent Codex review against origin/main found no actionable regressions. Hosted version selection and installation timing remain unverified.
