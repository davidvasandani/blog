# SitePing for signed-in Blog users

## Scope and objective
Add SitePing to https://david.vasandani.me/ in davidvasandani/blog only, using the integration exposed by https://github.com/davidvasandani/siteping. Signed-in users can annotate the Blog and leave contextual feedback. Anonymous readers retain the existing public reading experience.

## Requirements
- Initialize the widget only after verifying the applicable signed-in identity; do not treat a client-controlled flag as authorization.
- Keep feedback access authenticated if feedback is shared through an API. Deny anonymous reads and writes, and prevent cross-site mutations.
- Preserve existing Decap GitHub OAuth, publishing, contact, static pages, and Gemini output.
- Handle sign-out and expired credentials by removing feedback access. Fail closed on authentication errors without disrupting reading.
- Avoid screenshots, console capture, or network capture unless explicitly required; do not transmit credentials in feedback.
- Pin integration dependencies and build browser assets reproducibly.
- Add regression coverage for authenticated access, anonymous denial, sign-out, and integration failures; run relevant existing checks.

## Existing architecture
The Blog is an Eleventy static site served by a Cloudflare Worker, with an Express API. The only existing login is Decap CMS GitHub OAuth; its callback returns a token to the CMS popup. There is no general reader session in the inspected API. SitePing supports a framework-independent widget and either server persistence or a localStorage store.

## Resolved scope
Reuse the existing Decap GitHub credential. Verify Blog repository push permission for every feedback request. Persist feedback in a Blog-owned Cloudflare Durable Object, shared across editors and browsers. No new reader accounts, login provider, or external service deployment.

## Acceptance
The intended signed-in audience can create and revisit annotations on Blog pages. Anonymous and signed-out visitors cannot access protected feedback. Existing public-site and CMS tests pass. Independent Codex review has no significant findings. Knowledge is recorded and a Blog PR is opened and merged after verification.
