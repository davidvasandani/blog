# Implementation plan: Clarify volume (a290)

1. Edit `resume/David_Vasandani_CV.yaml`: in the Senior Manager loyalty-scan highlight, replace "32 of 272 restaurants" with "32 of our highest volume restaurants". Touch nothing else.
2. Run the edited bullet through the `/voice` skill. Keep David's phrase word for word; only take other suggestions if they keep every fact and he'd agree.
3. Write a before-and-after table with a facts column in the SpecKit feature directory (`specs/vk/a290-claify-volume/`).
4. Verify:
   - `git diff` touches only the one YAML line (plus planning files).
   - Parse the old and new YAML and confirm only that highlight string changed.
   - `npm run resume:voice` passes.
   - Render with RenderCV and confirm the page count (3).
   - `npm test`.
   - Grep the diff for the confidential names.
5. Independent Codex review of the diff. Fix confirmed findings.
6. Record the reusable lesson in `knowledge-base/resume-voice.md` (claims that come from David rather than the notes), tag it with this task, refresh the index.
7. Commit, push `vk/a290-claify-volume`, open a PR against `main`, wait for checks, merge.
