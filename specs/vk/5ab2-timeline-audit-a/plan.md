# Technical plan
Command: /speckit.plan. Spec: ./spec.md.

Use the existing hiring JSON timelines and blog resume YAML as source fallbacks, with snapshot provenance. Fetch linked pages first. Implement a dependency-free Python standard-library report builder and coverage validator in hiring/netflix/timeline-audit/. Store frozen inventory and manually assessed scores in JSON, render Markdown and an escaped standalone HTML view. The build must be deterministic and offline. Extract YAML through existing tooling or its constrained highlight structure; validate item counts against source. No application runtime or dependency changes.

Model each item with ID, source locator, original text/title, date, relevance score, matched criteria, rationale, limitations, recommended use, and optional cross-references. Preserve source confidence rather than manufacturing verification. Role criteria come from the retrieved posting, with the committed posting identified if retrieval fails.

Validation: compare ID sets and counts with frozen inventories; require bounded integer scores, nonempty reasons, known criteria and valid mapping targets; regenerate reports and check drift. Review chronology against effective promotion dates and phase descriptions. Independently review both repository diffs before PR creation.

Constitution: user authorized both repositories; public planning contains no private details, published pages unchanged, no resume copy changed, deterministic offline checks, no new third-party dependency. Data is private in hiring. Stage 12 updates sanitized project knowledge in blog. Risks: expiring previews, incomplete historical records, weak evidence of programming-language proficiency, commits that do not establish delivery or ownership.

Validation result: all 410 items scored, six integrity tests and generated drift check pass. Independent hiring review found and resolved Markdown caveat omission; second review found no actionable defects. Blog builds and resume voice checks pass. See private audit VERIFICATION.md for full evidence.

Delivery note: GitHub requires verified commits on the blog base branch. The initially unsigned task commit was recreated through GitHub's signed-commit API and its tree was checked byte-for-byte against the independently reviewed tree. The audit is merged in hiring PR #14; blog PR #168 carries the public planning and knowledge. Required checks must pass for the signed head before merging; no branch protection bypass is authorized or needed.
