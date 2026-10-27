# Research: RenderCV

- **Version**: PyPI `rendercv` latest is 2.8 (checked 2026-10-27), `requires_python >=3.12`. The CLI, Typst and fonts ship only in the `[full]` extra (typer, watchdog, typst>=0.14.8, rendercv-fonts). Pin `rendercv[full]==2.8`. Installed cleanly into a Python 3.13 venv on Linux x86_64.
- **CLI** (verified with `--help`): `rendercv new "Full Name" [--theme]`, `rendercv render FILE [-o folder] [--watch] [-nopng ...]`, `rendercv create-theme`. Built-in themes: classic, ember, engineeringclassic, engineeringresumes, harvard, ink, moderncv, opal, sb2nov. Output paths are configured in `settings.render_command`, relative to the input file.
- **Install isolation**: a project-local venv (`resume/.venv`), not a global pip install. This avoids polluting the system Python and NixOS's read-only store. `uv`/`pipx` are not available on this host, so stdlib `venv` + pip is the portable choice.
- **Alternatives considered**: running in Docker (heavier and needs a daemon); JSON Resume via npm (the user asked for RenderCV specifically); rendering in the Netlify build (adds Python to every deploy for an unpublished document, so it is deferred).
- **Supported social networks** include GitHub and Mastodon. Mastodon usernames take the form `@user@instance`.
