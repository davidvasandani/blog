# Validation: Slack link preview image

2026-11-02, local.

- `npm test`: exit 0. 58 node tests passed, the public-page accessibility
  audit passed (25 pages), and the SitePing checks passed. Pa11y ran with
  `PUPPETEER_EXECUTABLE_PATH` set to Nix Chromium 149, because the cached
  Puppeteer Chrome wasn't installed in this workspace. Without it, the
  inaccessible-fixture test fails with "Could not find Chrome".
- Built `_site/img/og/david-vasandani.jpg`: baseline JPEG, 600x600, 55,014
  bytes. The live original is 713,610 bytes.
- `_site/about/index.html` head: og:image
  `https://david.vasandani.me/img/og/david-vasandani.jpg`, type
  `image/jpeg`, 600x600, alt "Photo of David Vasandani".
- The new test asserts the image is under 300 KB and that its sharp metadata
  matches the declared width, height and type.
- The first attempt used `mozjpeg: true` and produced a progressive JPEG
  (sharp's mozjpeg preset forces progressive). It was dropped so the file is
  baseline.
- Still to do after deploy: check the live `/resume/` tags and image, then
  share a fresh URL in Slack.
