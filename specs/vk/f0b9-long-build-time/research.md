# Investigation, 2026-11-16

- The supplied build #0c04b000 screenshot shows 3m17s in Installing. The last visible log is Python 3.13.18 installation; Building has not started. This is an in-progress duration, not a completed build measurement.
- `git show 2191598:.python-version` returns 3.14.8 for the exact source commit shown in the screenshot. Current `.python-version` also contains 3.14.8. A stale hosted build override is therefore the leading explanation, pending dashboard inspection.
- Cloudflare's [build-image documentation](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/) checked today lists Python 3.14.8 as default, with `PYTHON_VERSION` and `.python-version` as supported selection mechanisms. It places build variables under Settings > Build > Build Variables and Secrets.
- Available environment API token verification returns HTTP 401, code 1000, Invalid API Token. No token value was recorded.
- Workspace managed browser reaches the Blog Worker settings URL but remains at a page titled Just a moment.... No hosted variables have been read or changed.
- The screenshot confirms selection drift, not the present value of the dashboard variable or a measured improvement. No dependency upgrade or application optimization is justified by the evidence.

## Self-hosted Firecrawl follow-up, 2026-11-17

At the user's request, retried through the self-hosted Firecrawl browser MCP. Both the cloudflare-routing and David saved profiles redirect to Cloudflare sign-in. The David profile's Google sign-in offers the personal account as signed out; choosing it reaches Enter your password. No hosted build configuration was accessible and no settings were changed. The unused cloudflare-routing session was closed without saving profile changes. The David session remains available for the user to authenticate.
