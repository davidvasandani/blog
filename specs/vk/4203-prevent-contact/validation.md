# Validation: Contact form spam

2026-11-08.

- `npm test`: 61 passed, 0 failed; public-page accessibility audit passed
  (25 pages). Pa11y ran with `PUPPETEER_EXECUTABLE_PATH` set to Nix
  Chromium 149 because the cached Puppeteer Chrome wasn't installed.
- API tests mock fetch: a 0.97 answer drops without calling Slack and checks
  the request shape; 0.4 delivers; an unset key, a 529, a network error and
  a response with no answer all deliver.
- Live Jev API, compiled app, Slack mocked:

  | Message | Spam probability |
  | - | - |
  | Backlink pitch from the screenshot | 0.99 |
  | AI receptionist trial from the screenshot | 0.99 |
  | SEO audit pitch | 0.99 |
  | Recruiter asking for a call | 0.18 |
  | Reader question about a post | 0.01 |
  | Friend saying hi | 0.01 |
  | Unsolicited request for feedback on an open-source tool | 0.71 |

- After deploy: a backlink pitch posted to the live `/api/contact` got 303
  to `/contact/thanks/`, and `wrangler tail` logged
  `Dropped contact form spam from spamtest@example.com (Jev spam probability 0.99)`.
- A one-hour `wrangler tail` afterwards (02:37 to 03:37 UTC) saw no contact
  submissions, so the cutoff hasn't yet been checked on real traffic.
- Not done: an independent review before merge. PR #198 was admin-merged at
  David's request.
