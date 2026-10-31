import express, { Router, Request, Response } from "express";
import { randomBytes, timingSafeEqual } from "crypto";
import os from "os";

export const api = express();
// Preserve Express 4 nested query semantics after upgrading Express.
api.set("query parser", "extended");

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

// Echo route
router.get("/echo", (req: Request, res: Response) => {
  const echo = {
    path: req.path,
    headers: req.headers,
    method: req.method,
    body: req.body,
    cookies: req.cookies,
    hostname: req.hostname,
    ip: req.ip,
    protocol: req.protocol,
    query: req.query,
    subdomains: req.subdomains,
    os: {
      hostname: os.hostname()
    },
  };

  res.json(echo);
});

// Decap CMS sign-in for the GitHub backend (admin/config.yml base_url and
// auth_endpoint). Needs a GitHub OAuth App whose callback URL is
// <site>/api/callback, and its GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.
const STATE_COOKIE = "cms_oauth_state";

const callbackUrl = (req: Request) =>
  `${req.get("x-forwarded-proto")?.split(",")[0] ?? req.protocol}://${req.get("host")}/api/callback`;

const readCookie = (req: Request, name: string) =>
  req.get("cookie")?.split(";").map(c => c.trim().split("=")).find(([key]) => key === name)?.[1];

const sameSecret = (a: string, b: string) => {
  const [left, right] = [Buffer.from(a), Buffer.from(b)];
  return left.length === right.length && timingSafeEqual(left, right);
};

// Decap's popup handshake: tell the editor window sign-in is ready, wait for
// it to answer, and send the result back only to this site's own origin.
function sendCmsResult(res: Response, status: "success" | "error", content: object) {
  const message = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`).replace(/</g, "\\u003c");
  res.set("Cache-Control", "no-store").type("html").send(`<!doctype html>
<meta charset="utf-8">
<title>Signing in</title>
<script>
  window.addEventListener("message", event => {
    if (event.origin === location.origin) window.opener.postMessage(${message}, event.origin);
  });
  window.opener.postMessage("authorizing:github", location.origin);
</script>`);
}

router.get("/auth", (req: Request, res: Response) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(503).send("CMS sign-in is not configured.");
    return;
  }
  const state = randomBytes(16).toString("hex");
  res.cookie(STATE_COOKIE, state, { httpOnly: true, secure: true, sameSite: "lax", path: "/api/callback", maxAge: 10 * 60 * 1000 });
  const params = new URLSearchParams({ client_id: clientId, redirect_uri: callbackUrl(req), scope: "public_repo", state });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
});

router.get("/callback", async (req: Request, res: Response) => {
  const { code, state } = req.query;
  const expected = readCookie(req, STATE_COOKIE);
  res.clearCookie(STATE_COOKIE, { httpOnly: true, secure: true, sameSite: "lax", path: "/api/callback" });
  if (typeof code !== "string" || typeof state !== "string" || !expected || !sameSecret(state, expected)) {
    sendCmsResult(res, "error", { message: "Sign-in expired or was not started from this site. Please try again." });
    return;
  }
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: callbackUrl(req),
    }),
  });
  const result = (await response.json().catch(() => ({}))) as { access_token?: string; error_description?: string };
  if (!result.access_token) {
    sendCmsResult(res, "error", { message: result.error_description ?? "GitHub did not return a token." });
    return;
  }
  sendCmsResult(res, "success", { token: result.access_token, provider: "github" });
});

// Contact form (_includes/components/form.njk), delivered to Slack through
// the incoming webhook in SLACK_WEBHOOK_URL.
const slackText = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

router.post("/contact", express.urlencoded({ extended: false }), async (req: Request, res: Response) => {
  const form = (req.body ?? {}) as Record<string, unknown>;
  const field = (name: string) => (typeof form[name] === "string" ? (form[name] as string).trim() : "");
  // Hidden from people; anything typed here came from a bot.
  if (field("company")) {
    res.redirect(303, "/contact/thanks/");
    return;
  }
  const name = field("name");
  const email = field("email");
  const message = field("message");
  if (!name || !email || !message || name.length > 200 || email.length > 320 || message.length > 5000) {
    res.status(400).send("Please fill in your name, email and message, then send it again.");
    return;
  }
  const webhook = process.env.SLACK_WEBHOOK_URL;
  const sent = webhook && await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      text: `New message from ${slackText(name)} (${slackText(email)}) via the contact form:\n>>> ${slackText(message)}`,
      unfurl_links: false,
    }),
  }).then(response => response.ok, () => false);
  if (!sent) {
    res.status(502).send("Sorry, your message could not be sent. Please try again later.");
    return;
  }
  res.redirect(303, "/contact/thanks/");
});

api.use("/api/", router);
