# Feature specification: Long Build Time

Feature directory: specs/vk/f0b9-long-build-time
Status: specified through /speckit.specify

## Summary
Reduce unnecessary Blog build provisioning delay by resolving runtime selection drift. The screenshot shows installation still selecting an older runtime despite the repository's previously validated pin.

## User story
As the Blog owner, I want builds to use the intended runtime so publishing does not wait on avoidable provisioning.

## Functional requirements
- FR-1: Identify the stage responsible for the observed delay using recorded build evidence.
- FR-2: Align the Blog's hosted Python selection with the repository's validated pin, preserving other settings.
- FR-3: Preserve resume generation, published URLs and content.
- FR-4: Document runtime drift checks and report measured timings separately from expectations.

## Acceptance criteria
- Screenshot diagnosis distinguishes Installing from Building.
- Hosted configuration is inspected and aligned; a subsequent build confirms the selected Python and records installation/build durations.
- No unrelated service or content changes occur.
- Documentation gives a repeatable way to detect an obsolete build override.

## Out of scope
Dependency upgrades, resume wording, other services, and unrelated Cloudflare account settings. The user later explicitly authorized adding Workers CI access to the supplied token through the browser.

## Open questions
Hosted access and current setting need investigation; these are execution dependencies, not missing product requirements.

## Clarifications (/speckit.clarify)
The requested fix concerns the Blog's Cloudflare build shown in the screenshot. Repository Python alignment already shipped; repeating that change is unnecessary. Changing this Blog's stale build override is within scope. Access failure must be reported rather than treated as an acceptance pass. No product questions remain.
