# Prior knowledge for the content recovery bullet

Task: VAS-965, c2fbb0ca-6f57-45bd-b382-038719fc40ea; workspace 4fff46dc-554d-4def-95b1-0c88d549271e.

Read-only search covered blog/knowledge-base, the hiring resume material and timeline audit, and prior blog specs. This project already has a populated local knowledge base.

- blog/knowledge-base/resume-voice.md: apply /voice, preserve numbers, qualifiers and ownership; avoid invented outcomes and confidential product names. Historical hiring copies remain evidence, not synchronized resume copies.
- blog/knowledge-base/resume-rendercv.md and blog/resume/README.md: edit the YAML source; rendered PDF/Markdown are ignored outputs; render before building the resume page. Node tests and Python rendering are separate checks.
- hiring/netflix/timeline-audit/REPORT.md, F08 and R041: 62 new items and 63 requeued failures are prior resume claims. The audit did not retrieve the underlying run, and requeued does not mean completed. This edit must not strengthen those claims.
- hiring/netflix/research/00-job-posting.md: the saved posting emphasizes content ingestion, structured troubleshooting and practical remediation. This supports leading with restored imports rather than a task-log opening. No claim of Netflix-scale work is warranted.

Use these findings to constrain SPEC.md and the implementation plan. No knowledge-base pages were changed during recall.
