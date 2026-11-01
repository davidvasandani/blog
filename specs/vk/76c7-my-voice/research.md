# Rewrite notes and fact check

Reviewed 2026-11-01. Blog baseline `5e1f7787143e63af59a74bf2b552e05889dd5896`; hiring evidence at `a711394` (read-only).

## The skill

The attachment `SKILL (1).md` is named `unslopify`. With the name changed to `voice`, it matches `~/.claude/skills/voice/SKILL.md` exactly. That file is a link into the managed skills catalog, so `/voice` was already installed and nothing was copied into the Blog.

## What made the old lines sound like AI

- "AI" said two or three times in one bullet ("AI-driven ... AI-assisted").
- Verbs that hide the work: enabled, advanced, codified, evangelized, leveraging, initiated.
- "-ing" tails that add a vague benefit: "unblocking automation while preserving manual intervention", "giving teams visibility into", "increasing developer velocity".
- Nouns stacked on nouns: "AI-assisted delivery of documented vendor integration tools with read-only safeguards".
- Benefits that don't say anything: "more sustainable", "improved developer experience".

## Decisions

- Implied subject stays in the summary and work bullets. The open-source and project entries already used "my", so they keep it.
- Each bullet says what was built or found, then what happened.
- Where the old wording was too abstract to fix by rewording, the new line says what the thing does, using only the evidence listed. No new numbers or outcomes. The crash bullet now says why the memory ran out (the app reserves memory per CPU core) and what the workaround does (starts the app on fewer cores). The remote-support bullet says it runs PowerShell on store POS devices. It doesn't name the remote-access product, which LSF lists as confidential (found in the Codex review).
- The settings-audit bullet doesn't bring back "undocumented API" or "6 minutes". Commit `89f9c56` took them out on purpose, and the reason isn't recorded.
- "Theme:" labels stay. David added them in `01dbc94`, and they don't restate the line after them.
- Skill labels and the four Warby Parker lines that were already plain stay as they are.

## Line by line

Evidence keys: `work:E126` and the rest refer to `netflix/canonical-timeline/sources/work.json`, and `personal:` IDs refer to `sources/personal.json`. OOM is `netflix/evidence/pos-register-oom.md`, LSF is `netflix/resume-material/loyalty-scan-freeze.md`, VENDOR is the POS vendor integration page in `netflix/resume-material/` (its file name is left out here because it names the vendor), and SUM is `netflix/research/08-resume-summary.md`.

### Summary

| Before | After | Facts kept |
| --- | --- | --- |
| Hands-on engineer at the boundary between a company and its vendors. | Hands-on engineer who works on the customer side of vendor software. | Same frame Matt Ryan asked for (SUM). "Customer side" says which side he's on. |
| Prototypes fast to unblock people, then turns what works into sustainable platforms so fixes don't stay one-offs. | Prototypes fast to unblock people, then builds the version that lasts so the fix isn't a one-off. | Same two speeds. SUM says each "platform" claim has to be backed by a bullet, and they still are. |
| The other three sentences | Unchanged apart from "owning the POS..." | Seven years, three promotions, the four integration areas, no source or logs, evidence and a clear ask. |

### Senior Manager

| Before | After | Facts kept |
| --- | --- | --- |
| Theme: Leading IT operations with AI-assisted diagnosis and automation. | Theme: Running IT operations, using AI to find problems and automate fixes. | Same scope. |
| Manage a team of three, a Senior Systems Engineer and two IT Operations Specialists. | Manage a team of three: a Senior Systems Engineer and two IT Operations Specialists. | Grammar only. |
| Traced 314 POS crashes ... using AI-assisted diagnostics; shipped a workaround to 18 registers in 2 weeks. | Used AI to trace 314 POS crashes at the busiest stores to a 32-bit memory limit in the vendor's app, which reserves memory for every CPU core. Shipped a workaround that starts the app on fewer cores to 18 registers in 2 weeks. | 314, busiest stores, 32-bit limit, 18 registers, 2 weeks. The cause and the fix come from OOM (server GC with one heap per CPU; launch limited to 6 CPUs). The `TODO` comment stays. |
| Used AI-assisted analysis of decompiled vendor DLLs and fleet logs to identify a hidden reward dialog blocking the UI thread as the likely cause of loyalty-scan freezes at 32 of 272 restaurants. Documented 46 forced restarts in a week and gave the POS vendor the evidence for confirmation. | Found the likely cause of loyalty-scan freezes at 32 of 272 restaurants, a hidden reward dialog that blocked the register's screen. Used AI to decompile the vendor's DLLs and read fleet logs, documented 46 forced restarts in a week, and sent the vendor the evidence to confirm. | "Likely" stays (the vendor hasn't confirmed, LSF). 32 of 272, 46 in a week, DLLs, fleet logs. "Screen thread" is LSF's own wording for the UI thread. |
| Enabled repeatable configuration audits across 343 locations by directing AI-assisted delivery of documented vendor integration tools with read-only safeguards. | Directed AI agents to build documented, read-only tools that audit the POS vendor's settings across 343 locations, as often as needed. | 343 locations (includes lab and sandbox, VENDOR; the old line said "locations" too). Directed AI, documented, read-only, repeatable. |
| Built an AI-assisted browser platform with human takeover and persistent sessions, unblocking automation while preserving manual intervention. | Built a browser service for AI agents that stays logged in between runs. When a step needs a person, they take over the live session. | Persistent sessions and human takeover (`personal:hl-firecrawl`: persistent profiles, a live view for people). |
| Replaced emailed vendor requests for sales-date corrections with an AI-run fix gated by a preview and a named approver. | Replaced emailing the POS vendor to fix sales stuck on the wrong business date with an AI agent that makes the fix after a preview and a named approver's sign-off. | Preview, named approver, emails replaced (VENDOR). |
| Enabled AI-driven POS troubleshooting through AI-assisted development of remote-support tools with read-only defaults, approval controls and audit logs. | Built a tool that lets AI agents run PowerShell on store POS devices through our remote-access software. Commands are read-only by default, changes need approval, and every command is logged. | `work:E126` (read-only by default, allowlisted and audited commands, approved-command dashboard). The product name stays off because LSF lists the remote-access tools as confidential. |

### Senior Lead

| Before | After | Facts kept |
| --- | --- | --- |
| Theme: Guiding retail technology through incidents and change. | Theme: Covering for retail technology leadership through POS incidents and upgrades. | Matches the bullets: the leadership gap, the outage remediation, the Alteryx upgrade and the POS proof of concept. |
| Filled the Retail Technology leadership gap during an unplanned leave, giving the VP ... | Filled the Retail Technology leadership gap during an unplanned leave. Gave the VP of Technology the technical guidance to limit revenue loss from POS issues. | Unchanged claim (`75a4c24`). |
| Advanced a virtual POS proof of concept through cutover planning with Security; the planned cutover was postponed to add telemetry. | Took a virtual POS proof of concept through cutover planning with Security. The cutover was postponed to add telemetry first. | The cutover never ran (`work:E036`). |
| Upgraded Alteryx Server using a replacement host and a business-approved cutover, retaining the previous server for rollback. | Upgraded Alteryx Server by building a replacement host and cutting over with the business's approval. Kept the old server ready for rollback. | `work:E056`. |
| Wrote and ran staged Ansible remediation to remove scheduled reboots across the managed POS inventory after the October 2025 end-of-day outage, preventing those reboots from interrupting end-of-day processing. | After the October 2025 end-of-day outage, wrote and ran staged Ansible changes that removed scheduled reboots from the POS devices Ansible manages, so those reboots no longer interrupt end-of-day processing. | `work:E059`. Still David's own remediation only, with no claim that he restored stores. |

### Lead

| Before | After | Facts kept |
| --- | --- | --- |
| Theme: Connecting restaurant systems and making their health visible. | Unchanged. | Already plain. |
| Built an Ansible and Fluent Bit pipeline for POS logs in Datadog, reaching 222 of 252 restaurants by May 2025. | Built an Ansible and Fluent Bit pipeline that ships POS logs to Datadog. It covered 222 of 252 restaurants by May 2025. | `work:E003`. |
| Built AWS Lambda and Datadog monitoring for Meraki network loss and latency and Intune time-clock device health, giving teams visibility into restaurant connectivity and device status. | Built AWS Lambda and Datadog monitoring for Meraki network loss and latency and for Intune-managed time clocks, so teams could see which restaurants had network or device problems. | `work:E012`, `work:E041`. |
| Implemented Cognito token caching for marketplace partners, reducing reported authentication costs from roughly $3,500 to $1,000 per month. | Added Cognito token caching for marketplace partners. Reported authentication costs fell from about $3,500 to $1,000 a month. | "Reported" stays (`work:E034`). |
| Codified AWS accounts in Terraform, rolled out Atlantis and view-only SSO access, and deployed AWS Config with ServiceNow integration across all accounts. | Defined AWS accounts in Terraform, rolled out Atlantis and view-only SSO, and turned on AWS Config with ServiceNow integration in every account. | `work:E020`. |
| Built and managed a Terraform-based AWS Transfer SFTP service with isolated vendor folders, supporting Paytronix and PAR data exchange and coordinating onboarding with Security. | Built and ran an AWS Transfer SFTP service in Terraform, with a separate folder for each vendor, for Paytronix and PAR file exchange. Worked with Security to onboard vendors. | `work:E007`. No claim about every user or decryption step. |

### Senior Software Engineer

These claims came from the 2021 resume (`c96d301`). Only the wording changes.

| Before | After |
| --- | --- |
| Joined as Senior Engineer, Infrastructure, retitled Senior Software Engineer in March 2020. | Joined as Senior Engineer, Infrastructure. Retitled Senior Software Engineer in March 2020. |
| Broke a locally run Terraform monorepo into smaller repositories deployed by CircleCI, each with its own backend state, reducing blast radius and increasing developer velocity. | Split a Terraform monorepo that people ran from their own machines into smaller repositories, each with its own state and deployed by CircleCI. A bad change could break less, and developers shipped faster. |
| Decoupled an Ember frontend from a Rails backend into a static single-page application to increase deployment frequency. | Split an Ember frontend out of a Rails backend into a static single-page app so it could deploy more often. |
| Built blue-green infrastructure enabling canary deployments and fast rollbacks using weighted target groups on AWS ALBs. | Built blue-green infrastructure on weighted AWS ALB target groups, so teams could run canary deploys and roll back fast. |
| Initiated and documented a tech-wide on-call rotation in OpsGenie, leading the team to incrementally improve service runbooks. | Started and documented a tech-wide on-call rotation in OpsGenie, then led the team in improving service runbooks a little at a time. |
| Improved developer experience by introducing LocalStack, enabling hot reloading for local development, and granting bastion access via IAM. | Made local development easier by adding LocalStack and hot reloading, and set up bastion access through IAM. |
| Introduced Gruntwork's library of reusable, production-tested infrastructure modules to make the infrastructure codebase more sustainable. | Brought in Gruntwork's reusable, production-tested infrastructure modules to make our infrastructure code easier to maintain. |
| Evangelized and led the Datadog implementation, centralizing observability and reducing costs. | Pushed for Datadog and led its rollout. Monitoring moved into one place, and costs went down. |
| Standardized infrastructure and deployment processes across 15+ services, shortening time to launch for new services and reducing onboarding overhead for new team members. | Standardized infrastructure and deploys across 15+ services, so new services launched sooner and new engineers got up to speed faster. |

### Earlier roles

| Before | After |
| --- | --- |
| Migrated self-hosted EC2 instances of Elasticsearch, Redis, and Postgres to Amazon Elasticsearch Service, ElastiCache, and RDS, increasing reliability and decreasing overhead. | Moved Elasticsearch, Redis and Postgres off self-managed EC2 instances onto Amazon Elasticsearch Service, ElastiCache and RDS, which were more reliable and less work to run. |
| Reduced infrastructure costs by moving testing environments to ECS on Spot Fleet and leveraging short-term Reserved Instance contracts. | Cut infrastructure costs by moving test environments to ECS on Spot Fleet and buying short-term Reserved Instances. |
| Improved developer experience with Docker for Mac and migrated CI from CircleCI 1.0 to 2.0. | Set developers up with Docker for Mac and upgraded CI from CircleCI 1.0 to 2.0. |
| Migrated applications from a hand-built cloud server on an outdated Docker version to a Docker Swarm cluster provisioned by Ansible and Terraform, with continuous deployment through CircleCI. | Moved apps off a hand-built cloud server running an old Docker version onto a Docker Swarm cluster built with Ansible and Terraform, deployed continuously from CircleCI. |
| Led weekly community meetings to communicate changes to stakeholders. | Ran weekly community meetings to tell stakeholders what was changing. |
| Designed a security-first AWS VPC and migrated Rackspace Public Cloud instances into it. | Designed an AWS VPC with security as the first requirement and moved our Rackspace Public Cloud instances into it. |
| Moved to immutable infrastructure with auto scaling groups and blue-green and canary deployments using Packer, Ansible, Terraform, and Consul. | Moved to immutable infrastructure built with Packer, Ansible, Terraform and Consul, with auto scaling groups and blue-green and canary deploys. |
| Auto-scaled, Monitored, Increased deployments, Cut the bill (four lines) | Unchanged. They already say what happened, with numbers. |

### Open source and projects

| Before | After | Facts kept |
| --- | --- | --- |
| Built for my own use and adopted at work; now onboarding my team. | Built for my own use. Work adopted it, and I'm now onboarding my team. | Same. |
| Connected my AI coding platform to Jira, Slack, GitHub, AWS and ChatGPT, so agents finish work without manual logins or copying tickets by hand. | Connected it to Jira, Slack, GitHub, AWS and ChatGPT, so agents can finish work without someone logging in for them or copying tickets over by hand. | Same systems. |
| Grew a single-machine AI coding tool into a 6-server cluster that keeps agent work safe through restarts and opens its own repair tickets. | Grew it from one machine into a 6-server cluster. Agent work survives restarts, and the cluster opens its own repair tickets. | Same. |
| Designed the platform and directed Claude and Codex agents to build it, with every change written up as a spec, reviewed and passed through automated tests before release. | Designed it and directed Claude and Codex agents to build it. Every change starts as a written spec, then gets a review and automated tests before release. | Same gates (`5e1f778`). |
| Expanded an open-source website feedback tool to phones by directing AI-assisted implementation and 48 regression tests; upstream shipped the work in v0.11.0. | Made an open-source website feedback tool work on phones, directing AI agents to write the change and 48 regression tests. Upstream shipped it in v0.11.0. | 48 tests, v0.11.0 (`personal:siteping-up`). |
| Personal project developed with AI coding agents. | Personal project, built with AI coding agents. | Same. |
| Implemented media and metadata ingestion with resumable imports, attachment validation, and recovery controls for a household archive. | Built media and metadata imports for a household archive. Imports pick up where they stopped, check attachments, and have controls to recover failed runs. | Same three features. |
| Restored content ingestion, importing 62 new items and requeuing 63 failed downloads through recovery triggers and credential remediation. | Got stalled imports running again by fixing credentials and using the recovery triggers. That brought in 62 new items and requeued 63 failed downloads. | 62 and 63. |
| Automated email triage using Jev classification and Johnny.Decimal-based labels, with independent action verification and human feedback. | Automated email triage. Jev sorts each message into Johnny.Decimal labels, a separate check confirms each action, and my corrections tune it. | Jev, Johnny.Decimal, separate verification, human feedback (`personal:hl-ohana-inbox`, tuned from feedback). |
