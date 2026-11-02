# Validation: Link previews (task 13f2)

2026-11-02, local, Node 24.

- `npm test`: exit 0. Node tests 57/57 pass (includes the new
  "every page has Open Graph link-preview tags" test). Pa11y public-page
  audit passed (25 pages). SitePing browser test passed.
- Gemini: `_gemini/` built before and after the change; `diff -r` shows no
  difference.
- Built `_site/posts/hello/index.html` head: og:title "hello",
  og:description "hello, world!" (from `summary`), og:type article,
  og:url and og:image absolute on `https://david.vasandani.me`, 1528x1528.
- Override check: a throwaway page with `title: Tom & "Jerry"`,
  `ogImage: /favicon.ico`, `ogImageAlt: An icon` rendered escaped title,
  the override URL and alt, and no width/height. The page was then deleted.
- Not checked: a live iMessage preview. That needs the deploy, and iMessage
  caches previews of links that were already shared.
