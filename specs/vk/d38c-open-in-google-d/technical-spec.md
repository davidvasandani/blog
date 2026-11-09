# Open in Google Docs

Task: d38c-open-in-google-d

Add an “Open in Google Docs” link to the resume page, beside the existing PDF download in the version row shown in the supplied screenshot. Scope is davidvasandani/blog only.

Use a normal accessible anchor and the existing page styling. Preserve the version, PDF link, resume contents, published URLs and Gemini output. No Google API integration, document creation, sharing changes or other service updates are requested.

The destination must be the user's intended resume document URL. It is absent from the request and tracked blog configuration; clarification has been requested. Do not invent a document ID or publish a placeholder.

Implementation should keep the destination in a maintainable location consistent with existing resume page data. Verify the built /resume/ page contains the exact label and supplied destination and retains its PDF download. Run relevant existing resume/frontend checks. Complete the prescribed SpecKit stages and independent Codex review before creating and merging a PR.

Acceptance: the link is visible next to Download the PDF, keyboard accessible, points to the supplied document, and does not alter resume wording or PDF generation.

## Resolved scope, 2026-11-09
The user asked to create the Google Doc because no destination exists. This supersedes the earlier no-creation constraint. Create a native document preserving all resume wording, verify its content, and use its returned URL. Keep the source YAML authoritative; document snapshot maintenance. Public read access is needed for blog visitors; never grant public editing.
