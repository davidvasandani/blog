# Resume skills review

Date: 2026-11-02

## Scope and evidence

Refresh the skills section in the Blog's canonical resume. Review based on the
committed resume at a2b7777, `knowledge-base/resume-relevance-audit.md`,
`knowledge-base/resume-voice.md`, and `knowledge-base/resume-rendercv.md`.
The experience and project entries are evidence for selection, not a new
independent verification of employment claims. No other service needs changes.

The old section overweights infrastructure products and understates the current
Solutions Engineer positioning. Recent entries demonstrate API investigations,
agent tools, endpoint operations, content validation and people management.
Keep infrastructure depth, but give those demonstrated capabilities space.

## Review of every previous group

| Previous group | Decision | Reason |
| --- | --- | --- |
| Infrastructure as Code: Terraform, Terragrunt, Packer, Ansible, Consul, Vault | Keep Terraform, Terragrunt, Packer and Ansible under Infrastructure & delivery. Omit Consul and Vault. | Terraform and Ansible recur across roles; Packer is explicit at Warby Parker. Terragrunt carries forward the existing skills claim. Consul is historical; Vault lacks a supporting example in the current narrative. |
| AWS: ECS, Elastic Beanstalk, CloudWatch, Auto Scaling, Spot Fleet, DMS, IAM, App Mesh, CodePipeline | Keep IAM. Replace the rest with services named in work examples. | Lambda and Cognito support the restaurant integrations story; ALB supports delivery; EC2, RDS and ElastiCache support managed-service migrations; Transfer Family names the AWS Transfer SFTP service already described. CloudWatch and Auto Scaling are supported historical skills, but less useful here than the concrete integration examples. The other omitted products have no work example in the current resume. |
| Containers: Docker, Kubernetes, Helm, ChartMuseum, Rancher, ALB and NGINX ingress controllers | Keep Docker in Infrastructure & delivery. Omit the other container products. | Docker has explicit work examples. The current narrative does not substantiate the other container-specific skills. AWS ALB is retained for its documented deployment use, without an ingress-controller claim. |
| CI/CD & Observability: CircleCI, Datadog, OpsGenie, Sensu | Keep CircleCI and Datadog in the relevant groups. Add Fluent Bit and operational practices. | CircleCI and Datadog have repeated work examples. Fluent Bit supports the restaurant logging pipeline. On-call runbooks express the OpsGenie work as a capability. Sensu is limited to an older role. |
| Collaboration: Documentation, workflow management, lecturing, mentoring | Replace with Technical leadership. | Team management, vendor escalation, stakeholder communication and rollout planning have explicit examples. Runbooks retain a concrete form of documentation. Lecturing and mentoring lack specific examples in the current narrative. |

Omission does not mean a skill is obsolete or that David no longer has it. This
is a relevance and evidence selection, not a claim about product lifecycle or
current proficiency. No external product-status research was needed.

## Final wording and fact check

These are the exact replacement rows after applying the `/voice` process.

| Label | Final details | Evidence and claim limits |
| --- | --- | --- |
| AI agents & automation | Agent tool development, browser automation, approval controls, audit logging | Senior Manager browser service, settings audits and remote PowerShell tool. Open-source platform. Does not claim model training or autonomous production authority. |
| APIs & troubleshooting | REST APIs, webhooks, request tracing, log analysis, reverse engineering | Two DoorDash investigations, POS executable and loyalty DLL investigations, logging pipeline. Does not claim ownership of DoorDash's fix. |
| Infrastructure & delivery | Terraform, Terragrunt, Ansible, Packer, Docker, CircleCI, blue-green and canary deployments | Existing skills plus infrastructure roles at Sweetgreen, LearnZillion, HOT and Warby Parker. Terragrunt has only the pre-existing skills claim, not a narrative example. |
| AWS | Lambda, Cognito, IAM, ALB, EC2, RDS, ElastiCache, Transfer Family | Sweetgreen monitoring, authentication, access, deployment and SFTP examples; LearnZillion migrations. No architecture certification or proficiency rating implied. |
| IT operations & observability | PowerShell, Intune, Meraki, Datadog, Fluent Bit, incident response, on-call runbooks | Remote device tool, network/device monitoring, POS logging, outage response and on-call rotation. No claim to enterprise-wide Intune administration. |
| Data & content workflows | Export validation, metadata extraction, deduplication, resumable imports | Workplace data handoff and personal household library. Personal project context stays explicit in the projects section. Does not imply professional media distribution experience. |
| Technical leadership | Team management, vendor escalation, stakeholder communication, rollout and rollback planning | Current direct reports, vendor incidents, leadership coverage, Alteryx migration and postponed POS cutover. No claim that the postponed cutover shipped. |

## Deliberate exclusions

Do not add Python, Java, SQL, or language proficiency based on adjacent tooling,
database names, or agent-generated code. The earlier relevance audit explicitly
calls out this evidence gap. Do not turn the self-hosted cluster into a
Kubernetes claim, or browser authentication into an unsupported identity/security
specialization. No new vendor names or confidential products are introduced.

## Voice review

Applied the voice skill to each label and detail string. Removed broad phrases
such as workflow management in favor of concrete practices. Used short nouns
and standard technical names, with no proficiency adjectives or invented
outcomes. Self-audit: the main risk was a generic keyword list; each retained
term now has an evidence mapping above, with Terragrunt's limitation explicit.
Facts, qualifiers and ownership in experience and project entries are unchanged.

## Release and verification

Version 1.0.0 becomes 1.1.0 for substantive skills additions. The headline,
experience, projects, layout and routes stay unchanged. Generated files remain
ignored. Validate the voice check, real RenderCV output, website and Gemini
builds, and existing resume tests. Inspect the final diff for accidental edits.

Validation completed:

- `npm run resume:voice` passed.
- `npm run resume` generated PDF, PNG, Markdown and HTML successfully.
- Visually checked page 3: all seven skills rows fit without clipping, and the
  footer reads Resume version 1.1.0. The PDF remains three pages.
- `npm run build` and `npm run gemini:build` passed.
- `node --test tests/resume.test.cjs tests/resume-voice.test.cjs` passed all 19
  tests, including a run after rendering and rebuilding the published page.
- Parsed the old and new YAML and compared them with skills removed: identical.
- `git diff --check` passed. No dependencies or other services changed.

These are local validation results; no deployment or independent review is
claimed by this record.
