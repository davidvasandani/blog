# Visitor personalisation in the Worker

Task: 13f2dbd4-b8af-4925-aa6a-55f7ef3f57a7 (Netflix greeting), 2026-11-02.

- Static pages normally skip the Worker. To change a page per visitor, add
  its exact path to `assets.run_worker_first` in `wrangler.jsonc`, then
  rewrite `env.ASSETS.fetch()` output with `HTMLRewriter`
  (`workers/netflix.ts`).
- `request.cf.asn` identifies the visitor's network. Netflix's corporate
  network is AS55095; AS2906 and AS40027 are its streaming networks.
- Personalised HTML must be `private, no-store` with ETag/Last-Modified
  removed. Also strip `If-None-Match`/`If-Modified-Since` before fetching
  the asset for a personalised request, or a browser holding the generic copy
  gets a 304 and never sees the personalised one.
- Local tests: Miniflare reads `request.cf` from an `MF-CF-Blob` JSON header
  (`scripts/test-workers.cjs`). Production ignores that header.
- Text injected into the resume page counts as resume wording: run it
  through `/voice` (AGENTS.md).
