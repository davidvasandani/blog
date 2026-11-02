# Implementation plan: Fix the Slack link preview

1. In `.eleventy.config.images.js`, add an `eleventy.before` hook that runs
   eleventy-img `Image()` on `authors/david-vasandani.jpg`: width 600, JPEG,
   quality 82, written to `<output>/img/og/david-vasandani.jpg` under a fixed
   file name.
2. Nothing generated is committed. Every build, including Workers Builds,
   regenerates the file.
3. Change `_includes/components/head.njk`: the default `ogImageUrl` becomes
   `/img/og/david-vasandani.jpg`, the declared size becomes 600x600,
   and pages without an override also get `og:image:type` `image/jpeg`.
4. Extend the Open Graph test in `tests/frontend.test.cjs`: the default image
   is under 300 KB, and its sharp metadata matches the declared width and
   height.
5. Run `npm test`.
6. Update `knowledge-base/link-previews.md` and its index entry.
7. Open the PR, merge, and check the live tags and image size after deploy.
