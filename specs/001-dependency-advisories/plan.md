# Implementation Plan: dependency advisory remediation

## Summary and technical context
Node 24/npm, Eleventy HTML/Gemini, Decap local proxy, Express APIs. Change package.json/package-lock.json and focused Node tests; preserve application contracts and hosted configuration.

## Constitution check
All seven principles pass before design: Blog-only scope, unchanged behavior, baseline before upgrades, credential-free tests, reproducible lockfile, excluded docs, independent review and PR. The design introduces no exceptions. Recheck after verification.

## Research and design
See research.md. Retain current direct dependency versions where a transitive update suffices. Alias only @decap/cli's @hapi/joi to patched joi 17.13.8. Override only the Decap dependency subtree's Zod to 4.6.7; verify installed consumer imports and compatibility. Update body-parser within each existing major using npm update body-parser. No new data entities or interfaces are introduced; tests/admin.test.cjs and tests/api.test.cjs remain the contract source.

## Sequence
1. Record current baseline (39 tests plus public accessibility audit).
2. Add targeted tests for hostile Joi message keys and malformed local CMS requests; verify the vulnerability regression fails before updating.
3. Apply overrides and transitive updates, inspecting the lockfile for unintended drift.
4. Clean-install, run full tests, typecheck/Gemini build, audits and targeted consumer smoke checks.
5. Independent Codex review, documentation, knowledge commit, PR and required checks, merge.

## Structure
- package.json and package-lock.json: narrow dependency remediation.
- tests/dependency-security.test.cjs and tests/admin.test.cjs: regression/compatibility coverage.
- VALIDATION.md and knowledge-base/: reproducible evidence and override removal conditions.

## Risks
A Zod major override is not justified by audit alone: inspect Decap's shipped imports and validate external consumers. Do not silently tolerate a failing baseline or use npm audit fix --force. Browser availability is an environment prerequisite, not grounds to disable sandboxing.
