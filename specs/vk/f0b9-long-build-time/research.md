# Investigation, 2026-11-16

- The supplied build #0c04b000 screenshot shows 3m17s in Installing. The last visible log is Python 3.13.18 installation; Building has not started. This is an in-progress duration, not a completed build measurement.
- `git show 2191598:.python-version` returns 3.14.8 for the exact source commit shown in the screenshot. Current `.python-version` also contains 3.14.8. A stale hosted build override is therefore the leading explanation, pending dashboard inspection.
- Cloudflare's [build-image documentation](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/) checked today lists Python 3.14.8 as default, with `PYTHON_VERSION` and `.python-version` as supported selection mechanisms. It places build variables under Settings > Build > Build Variables and Secrets.
- Available environment API token verification returns HTTP 401, code 1000, Invalid API Token. No token value was recorded.
- Workspace managed browser reaches the Blog Worker settings URL but remains at a page titled Just a moment.... No hosted variables have been read or changed.
- The screenshot confirms selection drift, not the present value of the dashboard variable or a measured improvement. No dependency upgrade or application optimization is justified by the evidence.
