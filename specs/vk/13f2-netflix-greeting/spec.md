# Feature Specification: Netflix greeting

**Feature dir**: `specs/vk/13f2-netflix-greeting/`
**Status**: Ready for David's review (PR only, do not merge)

## Summary
David is applying to Netflix. Visitors browsing from Netflix's corporate
network (AS55095, "Netflix Inc", checked in RIPEstat 2026-11-02) should see
the home page say "Hi, Netflix" and the resume page name the role.

## Requirements
- FR-1: On `/`, a request whose Cloudflare `request.cf.asn` is 55095 gets
  the home heading "Hi, Netflix" instead of "Welcome".
- FR-2: On `/resume/`, the same visitors see, under the "Resume" heading:
  "Applying to Netflix for the Solutions Engineer 5 role in Content
  Promotion & Distribution." The posted title is "Solutions Engineer 5 -
  Content Promotion & Distribution" (saved posting dated 10-21-2026 in the
  hiring repo, read-only). The line went through `/voice`, which replaced the
  hyphen-as-dash; every word of the title is kept.
- FR-3: Everyone else gets the unchanged static pages.
- FR-4: Personalised responses are `private, no-store` with no ETag, and
  Netflix requests skip revalidation, so a laptop moving between networks
  never sees the wrong version from cache.
- FR-5: The static build, Gemini output and resume YAML/PDF are unchanged.

## Out of scope
- AS2906 and AS40027 (streaming/CDN networks, not office browsing).
- Netflix staff on VPNs or home networks; ASN only sees the network.

## Acceptance
- `npm run test:workers` simulates AS55095 and another ASN and checks both
  pages, cache headers and the 304 bypass.
- `npm test` and `npm run resume:voice` pass.
