# Validation, 2026-11-25

## Configuration

Production and Previews Base both had `PYTHON_VERSION=3.13`. Changed each to `3.14.8` in the Blog's build settings. Reloaded and read back both values. `NODE_VERSION=24`, commands, runtime secrets and repository pins are unchanged.

## Local checks

- `git diff --check origin/main` passed.
- Checked that every changed repository file is Markdown and that README, specs, .specify and knowledge-base are excluded by `.eleventyignore`.
- Confirmed `.python-version` is 3.14.8 both on this branch and at source commit 2191598.
- No local application regression suite was run for this documentation-only diff. The hosted build runs the actual resume/site build and required-PDF check; PR checks will cover the repository suite.

## Hosted comparison

Retried the original source commit 2191598. Baseline build 0c04b000-9e57-4df2-b0be-50ae61c7642a completed in 5m23s, including installation 4m19s, building 46s and deployment 12s. Retry 9b00a9e4-0cf7-4e15-b0f6-c38e180e42d2 detects Python 3.14.8, completes installation in 34s and building in 37s. The retry deployed successfully as version f88da017. Its build-detail page reports 1m55s total and deployment 21s; the deployment-list row separately shows 1m46s. Use the build-detail breakdown for the comparison. Installation fell by 3m45s and total elapsed time by 3m28s.

This is one comparison across different dates, not a controlled benchmark. Both runs restored dependency caches; npm itself took 38s before and 26s after. The earlier Python setup-to-npm gap was 210.042s, while the retry has no separate Python installation log step.

## Access

The user authorized adding Workers CI Write to the supplied account token. Confirmed the saved permission in the dashboard. Builds API still returns 401/code 12006 with that account token, so the hosted repair used the authenticated browser. Earlier authentication blockers are resolved for the browser and retained as investigation history in research.md.

After deployment, the home page and resume page returned HTTP 200. The PDF returned HTTP 200, application/pdf, 53,309 bytes and a valid %PDF- header. Independent Codex CLI review (`codex review --base origin/main`) completed with no actionable defects. It confirmed a documentation/planning-only diff and a clean diff check; hosted claims were verified by the primary agent, not independently by the reviewer. PR checks are pending.
