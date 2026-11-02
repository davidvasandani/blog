# Implementation plan: resume semantic version

Based on SPEC.md and workspace PRIOR_KNOWLEDGE.md.

1. Complete constitution, feature specification, clarification, technical plan,
   tasks, and analysis in the task's SpecKit directory.
2. Add a tracked resume/VERSION and shared strict release-version reader.
3. Replace Git footer resolution and expose the version on the HTML resume.
4. Document version meaning, bumping, and rebuilding before main releases.
5. Cover malformed/missing versions, footer arguments without Git, and published
   HTML version. Preserve absent-resume behavior and run regression checks.
6. Render the PDF and inspect its extracted footer; verify the built HTML matches.
7. Obtain an independent Codex review, resolve findings, record reusable knowledge.
8. Commit, open the PR against main, satisfy checks, and merge.
