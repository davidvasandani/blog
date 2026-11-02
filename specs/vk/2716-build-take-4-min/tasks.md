# Tasks

## Runtime configuration
- [x] T001 [P] Pin Python 3.14.8 in `.python-version` and use it in the resume job in `.github/workflows/test.yml`.
- [x] T002 [P] Update `README.md` with matching hosted build variables and the timing caveat.

## Verification, after T001 and T002
- [x] T003 Install the exact runtime, render, run relevant tests and record results in `VALIDATION.md`.
- [x] T004 Run independent Codex review of the task diff and resolve significant findings; record results in `VALIDATION.md`.

## Delivery, after T004
- [x] T005 Update `knowledge-base/cloudflare-hosting.md` and `knowledge-base/index.md` with task-tagged evidence; commit.
- [ ] T006 Open the PR, wait for required checks, merge and report hosted verification status.
