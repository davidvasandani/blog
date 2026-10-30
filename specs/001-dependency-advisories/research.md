# Research — 2026-10-30

- Joi: https://github.com/advisories/GHSA-6w3j-5fw6-r9vr lists no patched @hapi/joi, but joi 17.13.6 is patched. Use a scoped npm alias override, keep the same major API, and test custom-message prototype pollution plus real CMS validation. Latest decap-server 3.11.6/@decap/cli 0.1.3 still declare @hapi/joi ^17.0.2, so upgrading alone does not solve this. Suggested downgrade 3.11.3 also declares it directly; rejected.
- body-parser: https://github.com/advisories/GHSA-27r3-jxmh-p828 fixes compressed-body trailing-byte handling in 1.20.9/2.4.0. Both fit the existing Express dependency ranges; update the lockfile without a major override.
- Zod: https://github.com/advisories/GHSA-mrhx-c7xc-m3w5 marks versions below 4.6.6 affected. No patched 3.x release is published. Installed @decap/cli 0.1.2 declares Zod but its shipped .cjs files do not import it; MCP SDK 1.32.1 accepts ^3.25 || ^4.0. Use scoped 4.6.7 and validate SDK/schema consumers; do not replace all consumers globally. Firecrawl developer search corroborated the bundled-v4 issue in Zod 3.25.
- Baseline on current main 6b0567c: 39 tests and public-page accessibility audit passed before dependency changes.

The new hostile-message regression fails on @hapi/joi 17.1.1 before remediation, confirming prototype pollution. Expanded CMS invalid-action/missing-field tests pass before remediation. Compressed-body rejection/recovery tests pass on the baseline too; they verify compatibility, not a reproduction of the timing-dependent crash.

SpecKit command templates were retrieved from github/spec-kit because this checkout no longer contains the original slash-command files. Their constitution/specify/clarify/plan/tasks/analyze/implement workflows and prerequisite/template scripts were executed in order; no extension hooks are configured. Existing project template files were preserved.

Final Joi selection is **17.13.8**, not 17.13.6: auditing the renamed package exposes two additional advisories, GHSA-wr44-6hxh-3jwq (message prototype replacement, fixed 17.13.8) and GHSA-6h2x-m376-mqjq (isoDate backtracking, fixed 17.13.7). This is the minimum 17.x release covering all observed Joi findings. Sources: https://github.com/advisories/GHSA-wr44-6hxh-3jwq and https://github.com/advisories/GHSA-6h2x-m376-mqjq.
