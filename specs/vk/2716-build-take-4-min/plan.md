# Plan: pin the Blog build runtime

## Approach
Add `.python-version` with Python 3.14.8, matching the current documented Workers build-image default. Use that file in the separate resume CI job in `.github/workflows/test.yml`. Update README.md to replace the floating 3.13 build override with the same exact version and explain that hosted settings must agree. Keep RenderCV 2.8 and Node 24 unchanged.

Read-only investigation found the available Cloudflare API token invalid, and the dashboard browser stopped at security verification. Hosted overrides therefore remain an external dependency. A repository pin alone must not be presented as changing those settings or proving faster deployment.

## Validation
Install the exact Python version in an ignored environment, render with the existing wrapper, build HTML and Gemini, run resume tests and Worker asset checks, and verify the dry-run bundle. CI runs the same runtime for resume generation and accessibility. Independently review the diff, record knowledge, then open and merge a PR after required checks pass.

## Files
`.python-version`, `.github/workflows/test.yml`, `README.md`, `VALIDATION.md`, the task artifacts, and later `knowledge-base/cloudflare-hosting.md` plus `knowledge-base/index.md`.

## Constitution
Blog-only scope; unchanged content and renderer pin; no new runtime application dependencies; exact Python pin; separate Python CI job; existing output exclusions. No API or data model changes, so contracts and data-model artifacts are unnecessary.

## Risks
Provider image defaults may move after this pin lands. A future refresh requires testing and another timing measurement. The screenshot establishes the slow phase but not whether Python compiled from source. Hosted timing is unverified until build settings and logs are accessible.
