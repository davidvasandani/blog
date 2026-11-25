# Prior knowledge

Task: f0b9-long-build-time. Read-only search of the local project knowledge-base completed 2026-11-16.

- `knowledge-base/cloudflare-hosting.md`, Python provisioning delay (VAS-961): an earlier build spent about four minutes provisioning Python 3.13.18; application build was 37 seconds. `.python-version` was already updated to 3.14.8 and validated with RenderCV 2.8, resume tests, Worker runtime tests and accessibility. Hosted verification was blocked by API authentication and browser security verification. Dashboard `PYTHON_VERSION` alignment remained outstanding.
- `knowledge-base/cloudflare-hosting.md`: Workers builds render the resume and verify its PDF. Preserve published assets and pinned tooling; avoid unrelated hosting changes.
- `knowledge-base/resume-rendercv.md`: preserve reproducible RenderCV generation and ignored environment/output paths.

Implication: do not repeat the already-shipped Python pin change. The supplied screenshot still detects 3.13.18 from environment, making a stale hosted override the leading hypothesis. Inspect hosted configuration before implementation; do not claim runtime timings from repository tests.
