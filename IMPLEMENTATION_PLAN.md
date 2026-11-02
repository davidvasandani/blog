# Implementation plan: og:title and og:image (task 13f2)

1. `_includes/components/head.njk`: after the description meta, add Open
   Graph and Twitter card tags.
   - `ogTitle` = `metadata.title` when `page.url == "/"`, else
     `title or metadata.title`.
   - `ogImageUrl` = front matter `ogImage` or `/authors/david-vasandani.jpg`,
     prefixed with `metadata.url`. Alt from `ogImageAlt`, defaulting to
     "Photo of David Vasandani".
   - Width/height (1528) only for the default image.
   - `og:url` = `metadata.url + page.url`; `og:type` = `article` when
     `section == "post"`, else `website`.
   - Nunjucks autoescapes, so quotes and `&` are escaped.
2. `tests/frontend.test.cjs`: new test checking home, a post and the about
   page for each tag, absolute image URLs that map to files in `_site`, and
   the home og:title being the site name.
3. Build, run `npm test` (Pa11y included), inspect the built head.
4. Codex review, knowledge page, PR, merge.
