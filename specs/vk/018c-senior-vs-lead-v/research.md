# Role attribution evidence

Reviewed 2026-10-30. Blog baseline `7a2570f97dc1f4f86a4cb880b48e9aad994aeffc`; hiring evidence snapshot `dc126727cac40ce13aa0211e58f40c6ebed4f64e`.

The source is the committed `netflix/canonical-timeline/canonical-timeline.json` and its `sources/work.json` in davidvasandani/hiring. Stable IDs below refer to work events and their source phases. The archive contains source references and qualifications; it is not copied here. Its activity cutoff is 2026-10-26, with research completed October 27. These are review boundaries, not accomplishment dates.

## Employment dates and earlier content

Blog commit `75a4c248601bca6d32b5430b8af56e9c1a49344c` records ChartHop effective dates: Senior August 2019 through February 2021, Lead March 2021 through August 2025, Senior Lead September 2025 through February 2026. Retain these. Team renames and first signature appearances in the timeline are not promotion evidence.

Blog commit `c96d301266df36211975d8c032b1d2ab9d64c9cb` imported Senior highlights from the 2021 resume. The newer timeline has no contrary dated evidence for those claims. Preserve their existing attribution; do not describe it as newly independently verified. The leadership-gap highlight is also retained from `75a4c24`; the timeline does not independently establish its dates.

## Lead accomplishments

| Event | Dated evidence | Editorial decision |
| --- | --- | --- |
| work:E003 | Monitoring designs November–December 2024, logs shipped February 2025, coverage 222 of 252 restaurants by May 15, 2025 | Credit Ansible/Fluent Bit POS logging to Lead. Use measured coverage, not the earlier 187-store slide draft or projected savings. |
| work:E012 and work:E041 | Meraki Lambda merged February 28, 2025; time-clock dashboard live May 28, 2025 | Move network and time-clock observability out of Senior Lead. Describe specific network and device metrics rather than retaining the unsupported aggregate master-terminal claim. Later telemetry extensions are not claimed here. |
| work:E034 | May–August 2025 token caching; August 20 status report credits David's implementation | Credit marketplace authentication caching to Lead. Describe the roughly $3,500 to $1,000 monthly cost change as reported, not audited finance results. |
| work:E020 | ServiceNow and AWS Config applied to all AWS accounts June 18, 2025 | Credit Terraform AWS account governance, Atlantis and view-only SSO to Lead; do not move later September work wholesale into this role. |
| work:E007 | Vendor SFTP setup from September 2024; first encrypted PAR file received/decrypted February 27, 2025 | Credit Terraform-managed AWS Transfer service and vendor onboarding. Do not claim David personally implemented every user or decryption workflow, or include later 2026 onboarding. |

## Senior Lead corrections

| Event | Dated evidence | Editorial decision |
| --- | --- | --- |
| work:E036 | POC began May 2025; hardware installed August 18; cutover plan approved October 24; November cutover postponed and never ran | Describe the Senior Lead phase as cutover planning with telemetry prerequisites. Do not imply a production VM rollout. Remove the broad research/security bullet pair, whose chronology was not established. |
| work:E056 | October 2025 attempted upgrade rolled back; replacement Alteryx server cut over October 31 with business approval | Add the completed upgrade with rollback readiness as a distinct Senior Lead outcome. |
| work:E059 | October 21–22, 2025 scripts removed scheduled reboots from devices in the Ansible inventory | Describe David's own remediation and its purpose. PAR and field technicians restored stores; do not claim David led the incident or personally restored all stores. Remove the training claim, which this event does not verify. |

The Lead selection covers substantive, well-dated outcomes rather than filling every year of the role with conjecture. Rejected alternatives include abandoned WAF operation-name controls, conflicting AppSec selection, unmerged Dependabot automation, and cost savings with disputed ownership.
