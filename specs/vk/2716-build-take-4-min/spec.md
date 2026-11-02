# Reduce dependency setup time

Status: specified

## Summary
The Blog owner should not wait several minutes for avoidable runtime setup on every deployment. The attached build spends 4m32s installing dependencies and only 37s building the site.

## User stories
- As the Blog owner, I want faster deploy previews without losing the generated resume or changing public content.
- As a maintainer, I want documented runtime settings and measured evidence so future changes do not restore the delay.

## Requirements
- FR-1: Preserve resume PDF and HTML generation with RenderCV 2.8.
- FR-2: Remove avoidable runtime provisioning overhead where supported by current provider evidence.
- FR-3: Keep the fix within the Blog repository and its Worker build settings.
- FR-4: Report initialization, dependency installation and application build time separately.
- FR-5: Keep runtime selection reproducible and document any dashboard setting that can override repository configuration.

## Acceptance
- The selected Python runtime installs the pinned renderer and produces the PDF and resume page.
- Existing relevant resume tests and asset verification pass.
- Hosted configuration changes are read back. Any claimed speedup includes a subsequent build timing; otherwise hosted timing remains explicitly unverified.
- Independent review reports no significant findings and required PR checks pass before merge.

## Out of scope
Provider initialization queues, other services, resume wording, application dependencies and zone-wide settings.

## Open questions
- Resolved: test an exact pin to Python 3.14.8, the documented current build-image default, to avoid selecting the older 3.13 line. This is a mitigation to validate, not a proven speedup.
- Hosted validation depends on dashboard access. The supplied API token returns Invalid API Token; repository changes must not be described as changing hosted overrides.
- Keep Node 24 and RenderCV 2.8. No user-facing behavior or wording changes are intended.
- No product questions remain. If the selected runtime cannot pass rendering checks, revise the technical choice before shipping.
