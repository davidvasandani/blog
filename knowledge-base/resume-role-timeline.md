# Resume role attribution

Task: a48e7b92-06d7-40eb-99c1-ed2266c43637 (VAS-932, Senior vs Lead vs Senior Lead)
Updated: 2026-10-30

The resume dates come from the ChartHop effective job history recorded in Blog commit `75a4c24`: Senior August 2019 through February 2021, Lead March 2021 through August 2025, Senior Lead September 2025 through February 2026. Team-name changes and the first observed use of a title in a signature are not replacements for those dates.

The committed hiring timeline at `dc126727cac40ce13aa0211e58f40c6ebed4f64e`, `netflix/canonical-timeline/canonical-timeline.json` and `sources/work.json`, supports the newer accomplishments. Use stable work event IDs and dates inside event descriptions. A project start/end span can cross several roles; a review timestamp or bulk Jira closure is not evidence of when work shipped.

Lead covers the 2024–25 logging rollout (E003), Meraki monitoring and early time-clock telemetry (E012/E041), Cognito caching (E034), AWS governance (E020), and initial vendor SFTP work (E007). Senior Lead covers the later virtual POS cutover planning (E036), Alteryx upgrade (E056), and October 2025 scheduled-reboot remediation (E059). The virtual POS cutover did not run; approved plans must not become production-rollout claims. Incident remediation must not imply ownership of recovery performed by vendors or field technicians.

The Senior highlights were imported from the 2021 resume in Blog commit `c96d301`. The newer timeline does not independently verify their dates. Preserve that provenance rather than redistributing them to fill gaps. The retained leadership-gap bullet likewise comes from `75a4c24` and is not newly verified by the timeline.

The task's [evidence matrix](../specs/vk/018c-senior-vs-lead-v/research.md) records per-claim dates, qualifications, and exclusions. Keep detailed private research in its source repository. Edit the canonical YAML, render before building, and validate the published HTML and PDF together. Generated files remain ignored; Gemini intentionally excludes the resume.
