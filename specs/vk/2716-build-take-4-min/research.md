# Research

The supplied build 95f68040 reports initialization 8m05s, cloning 7s, installation 4m32s, building 37s and deployment 13s. Python 3.13.18 installation starts at 22:20:16.776; npm starts at 22:24:16.125. This points to Python provisioning, but does not prove source compilation.

Cloudflare's current build-image documentation lists Python 3.14.8 as the default and supports `.python-version` and `PYTHON_VERSION` overrides:
https://developers.cloudflare.com/workers/ci-cd/builds/build-image/
The Blog README currently directs a floating `PYTHON_VERSION=3.13`, which selects a different release line. Matching the documented image default is the smallest mitigation to test. Do not remove the override and silently float future Python versions.

The current local uv 0.11.19 has no download entry for 3.14.8. This is an old installer catalog, not evidence the Python release is unavailable. Obtain a newer installer or the exact standalone release for local verification.

Rejected alternatives: removing resume generation would break published output; changing the renderer would broaden scope; removing npm development dependencies would break Eleventy; tuning the 37-second application build would not address the four-minute gap.

Access limits: Cloudflare token verification returns HTTP 401, Invalid API Token. Managed dashboard access reaches security verification. No hosted configuration has been changed, and no post-change timing has been observed.
