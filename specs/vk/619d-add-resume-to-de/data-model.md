# Data model: resume fields in the CMS

Key path (RenderCV 2.8) → Decap widget. `?` = `required: false`.

- `cv.name` string · `cv.headline` string? · `cv.location` string? · `cv.email` string? · `cv.website` string?
- `cv.social_networks` list? of `{network: string, username: string}`
- `cv.sections.summary` list? of text (one paragraph each)
- `cv.sections.experience` list? of `{company: string, position: string?, start_date: string?, end_date: string?, date: string?, location: string?, summary: text?, highlights: list? of text}`
- `cv.sections.projects` list? of `{name: string, date: string?, summary: text?, highlights: list? of text}`
- `cv.sections.skills` list? of `{label: string, details: text}`
- `design.theme` select (classic, ember, engineeringclassic, engineeringresumes, harvard, ink, moderncv, opal, sb2nov)
- `design.entries.allow_page_break` boolean?
- `design.sections.show_time_spans_in` list? of string
- `locale.language` string?
- `settings.current_date` string? · `settings.render_command.output_folder` string? · `settings.pdf_title` string?

Use either `start_date`/`end_date` or `date` on an entry, not both (RenderCV).
