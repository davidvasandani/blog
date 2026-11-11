# Feature Specification: Contact form spam

**Feature dir**: `specs/vk/4203-prevent-contact/`
**Task**: VAS-985 (Prevent Contact Me Spam)
**Status**: Shipped in PR #198

## Summary
Sales pitches were reaching the #blog-contact Slack channel through the
contact form: a backlink offer ("reply YES", "unsubscribe") and a lead
generation company's trial offer. Both left the hidden `company` honeypot
empty, so a person or a bot that skips hidden fields sent them.

## Functional Requirements
- FR-1: Messages that are unsolicited pitches don't reach Slack.
- FR-2: The sender of a dropped message sees the normal thanks page, so they
  can't tell they were filtered and reword around it.
- FR-3: Each drop leaves a record (sender and score) in the Worker logs, so a
  real message caught by mistake can be found.
- FR-4: If the filter is unconfigured or its service fails or is slow, the
  message is delivered as before. The filter must never lose a real message
  because of an outage.

## Decisions
- A fixed word list shipped first and was replaced at David's request with
  TypeSafe's Jev model, which scores each message instead of matching
  phrases.
- Cutoff 0.9, not the 0.8 first proposed: a genuine but unsolicited request
  scored 0.71 against the live API (see `validation.md`).

## Out of Scope
- Cloudflare Turnstile or another visible challenge.
- Changing the privacy policy. It already has generic service-provider
  wording and doesn't name Slack either.
