# Resume semantic version

## Purpose
A reader with a saved resume PDF must be able to compare its major, minor, and
patch version with the resume released from main without interpreting Git hashes.

## Requirements
- Replace the PDF's Git revision label with an explicit resume semantic version.
- Keep the resume version in a single tracked source, independent of blog package
  releases. Start at 1.0.0 for the first semantically versioned resume.
- Display the same version on the published HTML resume so readers can compare.
- Reject missing or malformed versions rather than publishing an ambiguous label.
- Document major (substantial restructuring), minor (new roles or substantive
  content), and patch (corrections or formatting) updates and the release workflow.
- Preserve name/page numbering, render options, and resume prose.
- Test version validation and PDF/HTML integration; render and inspect the PDF.

## Scope
Only davidvasandani/blog. No changes to other services or infrastructure.

## Acceptance
A generated PDF and HTML resume both display 1.0.0 without a Git hash. Changing
the tracked version changes both outputs. Invalid or absent versions fail clearly.
Existing build and relevant regression checks pass, followed by independent review.
