# Prior knowledge: Resume in Decap

Taken from `knowledge-base/` (read-only) for task 619d-add-resume-to-de.

- **Decap setup** (`dependency-testing.md`, `siteping.md`): the Decap bundle is pinned in `admin/index.html` (3.17.1) separately from npm. `npm start` runs the local `decap-server` proxy. `tests/admin.test.cjs` parses the built config and drives decap-server's local_fs middleware. Recheck the `decap-cms-user` storage contract when upgrading Decap.
- **Resume source** (`resume-rendercv.md`): `resume/David_Vasandani_CV.yaml`, RenderCV 2.8 schema, pinned in `resume/requirements.txt`. A test asserted the schema tag on the YAML's first line. That conflicts with a CMS save, which drops comments, so it had to become conditional. `cv.sections.projects` is the single Projects section.
- **Colon trap** (`resume-voice.md`, "Measured outcomes"): a `: ` inside an unquoted highlight turns it into a mapping and fails the render. Quote it. This is the same failure that broke `main` before this task.
- **Verifying rewrites** (`resume-voice.md`): compare parsed old and new YAML rather than text. System Python has no PyYAML; use the resume venv or a scratch venv.
- **Voice rule** (`resume-voice.md`, AGENTS.md, constitution 10): every wording change goes through `/voice`; `npm run resume:voice` runs in `npm test`. Keep qualifiers and ownership. Don't name the confidential POS vendor in public files.
- **Release versions** (`resume-rendercv.md#resume-release-versions`): `resume/VERSION` is independent of the blog; bump before releasing a changed resume from `main`.
- **Local browser tests** (`resume-rendercv.md`, `cloudflare-hosting.md`): on NixOS, set `PUPPETEER_EXECUTABLE_PATH` to Nix Chromium for Pa11y and the SitePing check.
