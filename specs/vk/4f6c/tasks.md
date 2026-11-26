# Tasks for interrupted Chrome download recovery

Design and acceptance criteria are in [plan.md](plan.md) and [spec.md).

## Phase 1. Setup

- [X] T001 Declare the locked `@puppeteer/browsers` 3.2.5 as a direct dev dependency in `package.json` and `package-lock.json`.

## Phase 2. Shared preflight

- [X] T002 Create `scripts/puppeteer-preflight.cjs`. Read effective Puppeteer configuration, bypass explicit executable and non-Chrome selections, and resolve the managed Chrome target and regular-file execute check. Follow [research.md](research.md) for build, platform and cache path validation.

## Phase 3. US1 (P1) Repair an incomplete download

An isolated incomplete build recovers in one install attempt with sibling builds intact. An absent build needs only installation. Installer failure or an unusable result stops launch with the build ID and expected executable path.

- [X] T003 [P] [US1] In `tests/puppeteer-preflight.test.cjs`, use temporary directories and an injected installer to test absent and incomplete builds, sibling preservation, concurrent calls, cleanup failure, installer failure and an unusable result after installer success.
- [X] T004 [P] [US1] Await the preflight immediately before launch in `scripts/test-a11y.cjs` so the CLI and `tests/a11y.test.cjs` use the same setup.
- [X] T005 [US1] In `scripts/puppeteer-preflight.cjs`, return on healthy reuse. For a build with a missing executable, remove only its validated directory if present, call the installed Puppeteer package’s installer once and recheck the executable. Include the build ID and path on failure and retain the underlying error. Lock and recheck the build before repair so concurrent callers reuse the completed installation.

## Phase 4. US2 (P2) Reuse an available browser

A healthy managed executable, explicit executable or non-Chrome selection proceeds with zero cache writes and zero installer calls.

- [X] T006 [US2] Add focused tests for healthy reuse and both configuration bypasses in `tests/puppeteer-preflight.test.cjs`.

## Phase 5. Documentation and validation

- [X] T007 [P] Document the repair scope and browser overrides in `knowledge-base/dependency-testing.md`.
- [X] T008 Run the focused tests and isolated cache recovery in `specs/vk/4f6c/quickstart.md`. Verify both npm entry points recover Chrome, the fixture still reports accessibility issues, and the sibling sentinel survives.

Focused tests passed. In a temporary cache, the standalone audit repaired
the pinned Chrome build and passed all 25 public pages. After removing the
executable a second time, `npm test` repaired the build before the inaccessible
fixture, passed the public audit and completed the SitePing browser tests.
The sibling directory survived both runs.

## Dependencies and delivery

- T001 → T002 → US1 → US2 → final validation.
- US1 parallel example. Write T003 while wiring T004 against the preflight entry point from T002. Complete T005 before running the recovery tests.
- US2 parallel example. Draft T007 alongside T006 once the reuse and bypass behavior is in place. Both test tasks edit the same file, so finish T003 before T006.
- MVP. Complete setup, shared preflight and US1, then verify recovery on its own. Add the dedicated US2 coverage and run the full quickstart before review.
