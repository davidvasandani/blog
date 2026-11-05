# Technical specification

Task: 9c61-feedback-1 (workspace "Feedback 1", branch `vk/9c61-feedback-1`). Written 2026-11-05. The hiring repository holds the private copy with evidence links and the reviewer transcript.

## Request

A second review of resume version 2.0.0 arrived on 2026-11-05, after the STAR rewrite. Its verdict: the resume has strong technical evidence but reads like an engineering case log, and its positioning is split between "IT leader" (the title) and "hands-on infrastructure engineer and automation architect" (the evidence). The reviewer evaluated it for senior infrastructure or hands-on technical leadership roles and asked for five fixes plus section notes:

1. Choose the role the resume sells and foreground the evidence for it.
2. Cut the current-role section substantially. Lead with the POS crash reduction, the fleet-wide API auditing and the approval-controlled financial corrections. Compress or remove the rest.
3. Shorten the summary to target, scope and differentiator. Stop narrating the crash case in it.
4. Explain the different denominators (nearly 300 restaurants, 272 restaurants, 343 locations, 18 registers).
5. Show engineering judgment instead of repeated AI attribution.
6. Remove "Theme:" lines and elapsed durations; strengthen vague outcomes in earlier roles; keep the coding platform and the upstream contribution in Projects but trim the household counts and the unexplained "Jev"; clarify the overlapping 2016 to 2018 roles; prioritise target-role skills over breadth.

The target is unchanged: the Netflix Solutions Engineer 5 opening (Content Promotion and Distribution, JR43004), a hands-on individual-contributor role that integrates and supports external partners on REST APIs, troubleshoots with logs and traces, builds small tools and uses AI openly. The reviewer's advice is applied with that target, not the infrastructure target they assumed. Where the two differ (which skills lead, whether content-workflow evidence stays), the Netflix posting wins and the spec says so.

## Deliverables

1. **Blog (public).** `resume/David_Vasandani_CV.yaml` restructured as below, `resume/VERSION` bumped to 3.0.0 (changed positioning and structure), SpecKit artifacts under `specs/vk/9c61-feedback-1/`, a constitution review entry, and a knowledge-base update.
2. **Hiring (private).** The reviewer's feedback recorded under `netflix/notes/`, a resume-material page with the new lines, the claim map, the lines cut and the questions only David can answer, a knowledge-base page, and private copies of the pipeline artifacts.

## The resume after this task

**Summary.** Three or four sentences, about 60 to 75 words. Target (hands-on engineer at the boundary between a company and the vendors and partners it integrates with), scope (seven years at Sweetgreen, three promotions, now running IT Operations for a chain of nearly 300 restaurants while still doing the engineering), differentiator (finds the cause of production problems inside vendor software that has no logs or source, then turns the fix into a controlled, repeatable tool with read-only defaults, named approvers and audit logs). "AI" at most once. No case study; the crash result moves to its bullet only.

**Experience, current role.** The role summary loses its Theme line and the VP reporting line. It keeps the promotion and the team as one short line of context (manages a Senior Systems Engineer and two IT Operations Specialists). Ten bullets become seven, in this order:

1. POS crash investigation and workaround (lead). Tightened, with the 18-register denominator made explicit: the registers that had crashed in the previous 30 days.
2. Vendor settings contract and fleet audit. 343 is "POS locations, lab and sandbox included".
3. Sales-date corrections with preview, named approver and the unknown-not-retry rule, plus the $55K report discrepancy as the closing sentence (same vendor API, same finance outcome).
4. Loyalty-scan freezes, compressed to the evidence-to-vendor story. 272 is "the restaurants that took loyalty scans that week".
5. Agent tooling, merged from the remote-command and browser-service bullets. Leads with the controls (read-only by default, approval for changes, every command logged, camera check during business hours, a person takes over the live browser session).
6. DoorDash, merged from the three-store incident and the paused restaurant. Keeps the trace evidence, the partner owning its fix, the manual REST recovery and the webhook escalation.
7. The data handoff, compressed to one or two sentences. Kept because validating deliverables and restoring missing items is the closest thing on the page to the posting's "partner deliverables are validated".

**Experience, other roles.** Theme lines removed. The Senior Lead and Lead roles keep their bullets. The 2019 to 2021 role rewrites three vague outcomes to the concrete operational change: what replaced applying from laptops, what "monitoring in one place" meant, what standardising 15+ services changed. The vague claims they replace ("developers shipped faster", "costs went down", "new engineers got up to speed faster") have no number on file; they are listed for David to restore with a figure if he has one. Earlier employers keep their lines. The 2016 to 2019 and 2016 to 2018 overlap stays as it is: no committed evidence says whether the roles were concurrent employment, consulting or volunteering, so the question goes to David rather than onto the page.

**Elapsed durations.** RenderCV prints "10 months", "4 years 6 months" and so on beside each experience entry by default (`design.sections.show_time_spans_in` defaults to `["experience"]`). Set it to `[]`. The resume page transform (`scripts/resume-page.cjs`) treats duration lines as optional and its tests use synthetic markdown, so the page needs no change.

**Projects.** The coding platform keeps three bullets. SitePing keeps its line. The household entry drops the recovery bullet with the 62 and 63 counts and the "Jev" name; the import bullet loses nothing but its counts were never there, and the triage bullet describes the classifier in plain words. Two bullets remain, because resumable media and metadata imports with validation are the one ingestion-shaped story on the page.

**Skills.** Reordered to lead with what the posting asks for: APIs and troubleshooting, AI agents and automation, observability and IT operations, infrastructure and delivery, AWS, technical leadership. "Data & content workflows" goes: it rested on the personal project alone. No Python, Java or SQL line is added, because nothing on file demonstrates them and the knowledge base says tool names are not proof.

**AI attribution.** The word "AI" appears in the summary once and in at most three current-role bullets (the crash investigation, the settings contract, the tooling bullet that exists to serve agents). The corrections and loyalty bullets say "agent" or name the action without the word. Projects keep "Claude and Codex agents" once. Decisions the reviewer asked to see (read-only defaults, named approver, refusal to retry an irreversible change, pinned contract that fails the build, controller review, camera check) stay in every bullet that has them.

## Evidence rules

- No new number. Every figure that stays traces to the same sources resume 2.0.0 used (hiring evidence pages, David's recorded instructions, the dated 2026-11-04 re-run). Denominators are explained, not changed.
- David-supplied phrases stay as written: "dozens of high-volume stores", "during the lunch rush", "the fleet of nearly 300 restaurants", the loyalty DLL "logs nothing when the reward dialog opens". The 18-register clarification sits beside "dozens of high-volume stores" rather than replacing it; the PR asks David whether he wants the phrase narrowed.
- Qualifiers stay: "reported" costs, "postponed" cutover, "about", "roughly", "fell". DoorDash and the POS vendor keep ownership of their fixes. "Handed the vendor the numbers" stays because whether David filed the vendor case is an open question.
- Removing a vague outcome and describing the operational change instead is a deliberate cut, listed in the spec and in hiring, never silent.
- Merging two bullets keeps every fact from both unless the spec lists the fact as cut.

## Confidentiality

The blog is public. No vendor or product names from the confidential lists (the POS vendor and product, the remote-access and camera tools), no store names, register hostnames, ticket numbers or people's names in the resume, specs, knowledge pages or commit messages. The reviewer is "the second reviewer" or "the 2026-11-05 review" in blog artifacts. Grep tracked and untracked changes before every commit.

## Validation

`npm run resume:voice`, `npm run resume -- --dont-generate-png` (expect two or three pages, and no duration lines in the Markdown output), `node --test tests/resume.test.cjs`, `npm run build`, a YAML comparison showing only prose, the removed highlights, the design option and the version changed, a confidentiality grep over tracked and untracked changes, `git diff --check`, and an independent Codex review of both repositories' diffs.

## Out of scope

Interview stories, the resume page layout, the Gemini output, new vendor names, estimates only David can make (still listed for him in hiring), and any claim about Python, Java, SQL or media formats.
