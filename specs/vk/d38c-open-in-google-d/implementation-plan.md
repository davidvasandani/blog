# Implementation plan

Task: d38c-open-in-google-d

1. Run the required SpecKit constitution, specify and clarify stages. Resolve the resume document URL with the user; do not create or change a Google document.
2. Run SpecKit plan, tasks and analyze in order. Keep changes within the Blog repository and preserve existing resume/PDF behavior.
3. In the implement stage, add the supplied Google Docs destination and a normal “Open in Google Docs” anchor beside the PDF link in `pages/resume.njk`, using existing typography and separator conventions.
4. Build and inspect /resume/ for the exact link label and destination, existing version and PDF action; run applicable existing resume/frontend checks. Render the resume first if required by the existing build.
5. Run independent Codex diff review and resolve significant findings.
6. Record reusable configuration knowledge with this task ID and refresh the knowledge-base index, or explicitly record that no new knowledge emerged.
7. Commit the change and documentation, open a PR against the base branch, check CI and merge when checks pass.

Dependency: the destination URL is required before implementation. No placeholder link should ship. SpecKit command availability must be resolved before stage 4 can complete.

## Updated dependency
The user authorizes creating the destination. During implementation, create and verify the native Google Doc from the current YAML, then add its returned URL. Workspace `.claude/commands/speckit.*.md` supplies the required commands; use the feature-dir pointer.
