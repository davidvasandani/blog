# Investigation, 2026-11-16

- The supplied build #0c04b000 screenshot shows 3m17s in Installing. The last visible log is Python 3.13.18 installation; Building has not started. This is an in-progress duration, not a completed build measurement.
- `git show 2191598:.python-version` returns 3.14.8 for the exact source commit shown in the screenshot. Current `.python-version` also contains 3.14.8. A stale hosted build override is therefore the leading explanation, pending dashboard inspection.
- Cloudflare's [build-image documentation](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/) checked today lists Python 3.14.8 as default, with `PYTHON_VERSION` and `.python-version` as supported selection mechanisms. It places build variables under Settings > Build > Build Variables and Secrets.
- Available environment API token verification returns HTTP 401, code 1000, Invalid API Token. No token value was recorded.
- Workspace managed browser reaches the Blog Worker settings URL but remains at a page titled Just a moment.... No hosted variables have been read or changed.
- The screenshot confirms selection drift, not the present value of the dashboard variable or a measured improvement. No dependency upgrade or application optimization is justified by the evidence.

## Self-hosted Firecrawl follow-up, 2026-11-17

At the user's request, retried through the self-hosted Firecrawl browser MCP. Both the cloudflare-routing and David saved profiles redirect to Cloudflare sign-in. The David profile's Google sign-in offers the personal account as signed out; choosing it reaches Enter your password. No hosted build configuration was accessible and no settings were changed. The unused cloudflare-routing session was closed without saving profile changes. The David session remains available for the user to authenticate.

## User-supplied API credential follow-up

The supplied 1Password item contains an account-owned Cloudflare API token. Account-scoped verification succeeds (active), and Workers script listing succeeds and includes david-vasandani-blog. The user-token verification endpoint rejects this token type, so that rejection alone does not establish that an account token is invalid. However, listing the Blog's build triggers through the documented Builds API returns HTTP 401, code 12006, Invalid token. Token-policy inspection returns 403 Unauthorized to access requested resource, so the precise missing permission or token-type limitation is not confirmed. No hosted settings changed.

## Hosted repair, 2026-11-25

Authenticated dashboard inspection confirmed `PYTHON_VERSION=3.13` in both the Blog's Production and Previews Base build variables. Updated each to `3.14.8`, saved, reloaded the page, and read both values back. `NODE_VERSION=24`, build/deploy commands and application secrets were preserved. No repository runtime pin or application code change was needed.

The original build `0c04b000-9e57-4df2-b0be-50ae61c7642a`, on commit `2191598`, completed in 5m23s: initialization 3s, cloning 4s, installing 4m19s, building 46s, deploying 12s. Python setup started at 11:59:26.319 and npm installation started at 12:02:56.361, a gap of 210.042 seconds.

The user explicitly requested the API token update. Added only Workers CI Write to the existing account token through the browser and confirmed the saved permission. The existing secret value was not rotated. The Builds API still returned 401/code 12006 afterward; the dashboard was used to complete the build repair. A successful account-token verification or Workers script read does not establish Builds API compatibility.

Started retry `9b00a9e4-0cf7-4e15-b0f6-c38e180e42d2` of the same commit through the dashboard. Its result and timing comparison belong in `validation.md`.
