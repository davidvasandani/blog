# Implementation plan: Resume in Decap (619d-add-resume-to-de)

Steps in order. Each was done and checked; see `tasks.md` and `validation.md`.

1. Confirm the breakage on `main`: `gh run view 42578893977 --log-failed` shows js-yaml failing at line 28 and RenderCV validation failing.
2. In `resume/David_Vasandani_CV.yaml`, double-quote the current role's summary and the loyalty highlight, straighten the two curly apostrophes (after a `/voice` pass on that highlight), and remove the comments except the schema line plus a README pointer.
3. Bump `resume/VERSION` to 3.2.0.
4. `npm i -D -E yaml@1.10.2`.
5. Append the `resume` files collection to `admin/config.yml` following `data-model.md`.
6. Add the three Resume tests to `tests/admin.test.cjs`; make the schema-line assertion in `tests/resume.test.cjs` conditional.
7. Add "Editing in the CMS" and "Notes on the source" to `resume/README.md`, and the collections paragraph to `README.md`.
8. Validate: `npm run resume:voice`, `npm run test:admin`, full `npm test` with Nix Chromium, PyYAML parse, RenderCV render of the source and a round-tripped copy, and a real Decap UI save against decap-server on a scratch copy.
9. Codex review of the diff; fix confirmed findings; re-run step 8's tests.
10. Update `knowledge-base/` (resume-rendercv schema-line note, a Decap resume page), refresh `index.md`, commit, open the PR, wait for checks, merge.
