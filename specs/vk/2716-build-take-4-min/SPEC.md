# Reduce Blog deployment dependency setup time

## Problem and evidence
The supplied Cloudflare Workers build screenshot shows 13m33s total: initializing 8m05s, cloning 7s, installing 4m32s, building 37s, deploying 13s. Python 3.13.18 installation starts at 22:20:16.776; npm dependency installation starts at 22:24:16.125. This strongly suggests Python provisioning accounts for most of the installation phase; it does not prove the runtime cause without complete logs.

## Objective
Reduce avoidable dependency provisioning time for davidvasandani/blog while preserving resume generation, public assets, worker behavior and local development.

## Requirements
- Inspect existing deployment and knowledge documentation before selecting a fix.
- Keep all changes within the Blog repository and its own build configuration.
- Preserve exactly pinned RenderCV tooling and generated resume PDF/HTML behavior.
- Separate Cloudflare initialization delay from repository-controlled installation and build time; do not promise to eliminate provider queue time.
- Prefer an available compatible prebuilt Python runtime over source compilation if build evidence supports that diagnosis.
- Document any hosted configuration needed and verify actual settings before claiming they changed.
- Validate relevant build behavior and obtain independent review before merging a PR.

## Acceptance
Document the measured phase timings, the evidence for the chosen mitigation, reproducible configuration and validation. A subsequent Cloudflare build is needed to confirm hosted speedup; local timings alone cannot establish it.

## Open investigation
Inspect complete build logs and existing runtime pins. Determine whether the installed SpecKit commands are available before proceeding through the mandatory stages.
