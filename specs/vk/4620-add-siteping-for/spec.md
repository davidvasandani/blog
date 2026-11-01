# Feature Specification: SitePing for signed-in Blog users

**Feature dir**: `specs/vk/4620-add-siteping-for/`
**Status**: Clarified

## Summary
Allow the intended signed-in Blog audience to annotate pages and leave contextual feedback through SitePing, while preserving the public reading experience.

## User Stories
- As a signed-in user, I want to mark a specific area and explain a problem so that feedback has clear context.
- As a feedback author, I want to revisit my annotations after navigation or reload.
- As an anonymous reader, I want to read the Blog without feedback overlays.
- As a user who signs out, I want protected feedback access to end.

## Functional Requirements
- FR-1: Show SitePing only to GitHub-authenticated editors with push permission on davidvasandani/blog.
- FR-2: Support creating and revisiting page-specific annotations and comments.
- FR-3: Deny anonymous access to protected feedback, including direct data access if a shared backend is used.
- FR-4: Remove access after sign-out or invalid credentials; authentication failures must not interrupt reading.
- FR-5: Preserve CMS publishing, contact delivery, public URLs, page content, and Gemini output.
- FR-6: Do not capture screenshots, console logs, or network traffic by default.
- FR-7: Keep feedback available for shared server storage for review across browsers.

## Out of Scope
Changes to other repositories or services; unrelated dependency upgrades; automatic external ticket creation or message delivery.

## Acceptance Criteria
- [x] A user in the selected audience can create a page annotation and revisit it after reload.
- [x] An anonymous visitor sees no active feedback widget and cannot read or mutate protected feedback.
- [x] Sign-out and expired credentials remove access.
- [x] Authentication or feedback failures leave the page readable.
- [x] Existing CMS, public-site, Gemini, and accessibility checks pass.
- [x] Independent Codex review reports no significant findings.

## Clarifications
The user wants one sign-in for CMS and SitePing and shared feedback for review. Reuse the existing Decap GitHub login and Blog editor permissions. Do not add reader accounts or a second login. The feedback panel supports all-page review and status changes.
