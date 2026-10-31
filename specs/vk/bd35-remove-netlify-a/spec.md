# Feature specification: Cloudflare-only blog

Status: Specified

## Summary
Retire obsolete hosting integrations so maintainers can build and deploy the blog using its current host without misleading configuration or unnecessary dependencies.

## User stories
- As the owner, I want only current hosting instructions and configuration.
- As a reader or editor, I want existing pages, endpoints, publishing and contact workflows to keep working.

## Functional requirements
- FR-1: Remove retired hosts' deployment files, runtime adapters and provider-only dependencies.
- FR-2: Preserve public URLs, API/OAuth/contact behavior, resume/PDF publication and Gemini output.
- FR-3: Retain blocking public accessibility audits and a regression proving inaccessible pages fail.
- FR-4: Document current hosting and preserve historical migration evidence as explicitly historical.

## Out of scope
Provider account deletion, DNS changes, other repositories/services, application redesign.

## Acceptance criteria
- No active runtime/configuration dependency on Netlify or Vercel.
- Typecheck, existing regression suite and Worker smoke tests pass.
- Current instructions describe Cloudflare and independent review finds no significant issues.

## Open questions
None; this is cleanup of the blog repository under the user's Cloudflare-only direction.

## Clarifications (/speckit.clarify)
- Keep historical specs and migration snapshots; supersede their operational guidance in the knowledge index.
- Preserve the existing GitHub CMS and contact integration; removing obsolete Identity templates does not change either flow.
- Remove repository integrations only. The old apex migration snapshot is not evidence authorizing DNS or hosted-account deletion.
