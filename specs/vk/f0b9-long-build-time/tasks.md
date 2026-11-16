# Tasks (/speckit.tasks)

Plan: ./plan.md. Sequential tasks; no independent implementation layers.

- [ ] T001 Inspect hosted Blog build selection and current documentation; record `specs/vk/f0b9-long-build-time/research.md`.
- [ ] T002 Correct confirmed stale Blog build override and verify subsequent hosted build; record `specs/vk/f0b9-long-build-time/validation.md`. Depends on T001 and authenticated access.
- [x] T003 Add runtime drift diagnosis to `README.md`; validate diff and documentation. Depends on T001.
- [ ] T004 Run independent Codex review and address findings; record `specs/vk/f0b9-long-build-time/validation.md`. Depends on implementation.
- [ ] T005 Update `knowledge-base/cloudflare-hosting.md` and `knowledge-base/index.md`, commit, open and merge PR. Depends on T002–T004.
