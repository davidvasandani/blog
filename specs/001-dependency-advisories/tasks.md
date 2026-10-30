# Tasks: dependency advisory remediation

## Foundation
- [x] T001 Refresh SPEC.md, PRIOR_KNOWLEDGE.md, IMPLEMENTATION_PLAN.md and SpecKit artifacts.
- [x] T002 Clean install and verify existing tests before updates; record in research.md.

## US1 + US2: safe dependencies and preserved behavior
- [x] T003 Add dependency-security.test.cjs and admin.test.cjs regressions; demonstrate vulnerable baseline failure (after T002).
- [x] T004 Apply scoped Joi/Zod overrides and compatible body-parser updates in package.json/package-lock.json (after T003).
- [x] T005 Verify clean npm ci and full npm test including security/admin regressions (after T004).
- [x] T006 [P] Run typecheck and Gemini compilation (after T005).
- [x] T007 [P] Run full/runtime audits and consumer smoke checks (after T005).

## Delivery
- [x] T008 Independent Codex review of the diff and fix/reverify any findings (after T006,T007).
- [x] T009 Record VALIDATION.md and knowledge-base findings; refresh index and commit (after T008).
- [ ] T010 Open follow-up PR, satisfy required checks and merge (after T009).

Dependencies: T001 → T002 → T003 → T004 → T005 → {T006,T007} → T008 → T009 → T010.
Parallel example: typecheck/build and read-only dependency audits run together after clean full verification; no concurrent package-lock writes. Deliver tests first, minimal dependency changes second, evidence and review third.
