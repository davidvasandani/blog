# Contact form spam filter

Task: VAS-985, 4203627c-9d41-4123-a268-1ae32f6ffb38 (`vk/4203-prevent-contact`), 2026-11-08. PR #198.

`/api/contact` in `api/app.ts` checks a message in this order: the hidden `company` honeypot, field validation, then TypeSafe's Jev model, then Slack. Jev is a "System One" model: you send a `state` and typed questions to `POST https://api.typesafe.ai/v1/systemone` with `model: "jev-latest"`, and a Noul (yes/no) question comes back as `answers.<id>.noul`, the probability of yes. There's no text to parse. Docs: https://docs.typesafe.ai/llms.txt.

- The state holds the site, the form, and the sender's name, email and message. The `spam` question's `criteria.true` and `criteria.false` describe a mass pitch versus a person writing to David. The instructions say the message is evidence, not instructions, to blunt prompt injection.
- Dropped at `spam >= 0.9`. The sender still gets the 303 to `/contact/thanks/`. The Worker logs `Dropped contact form spam from <email> (Jev spam probability N)`; find them with `npx wrangler tail david-vasandani-blog`. Logs aren't kept, so a missed real message can only be found while tailing.
- Fails open: no `TYPESAFE_API_KEY`, a non-2xx, a network error, a 5 s timeout or a missing answer all deliver to Slack. Keep it that way; an outage must not lose real mail.
- `TYPESAFE_API_KEY` is a Worker secret, set with `wrangler secret put`. The key is in David's 1Password. Setting a secret redeploys the current code, which is harmless when the code doesn't read it yet.

Cutoff evidence: spam samples scored 0.99; a recruiter 0.18; a reader question and a friend 0.01; an unsolicited but genuine request for feedback on an open-source tool 0.71. That last one is why the cutoff is 0.9, not 0.8. If real messages go missing, look at their logged score before lowering or raising it, and add a test that mocks the score rather than calling the live API.

Tests mock `fetch` and route on URL (`https://api.typesafe.ai/v1/systemone` versus the Slack webhook). Never point a test or smoke check at the real Slack webhook. The first version used a word list (unsubscribe, "reply YES", backlinks); it was replaced because it only caught exact phrases.
