# Contract: `scripts/diagrams.cjs`

| npm script | Command | Behavior | Exit |
|---|---|---|---|
| `diagrams:setup` | `setup` | Clone `repo` into `diagrams/.diagram-design/` (or fetch) and check out the lock `commit` detached | 0, or 1 if git fails |
| `diagrams:extract` | `extract` | Print the Markdown digest of every manifest block | extractor's exit code |
| `diagrams:export` | `export` | Run `export_svg.py --system-fonts html svg` for every entry | 0 / 1 |
| `diagrams:check` | `check` | Run the six checks in plan.md and print `ok`/`FAIL <step> <entry>` per check | 0 if everything passes, otherwise 1 |

Commands other than `setup` exit 1 with "run npm run diagrams:setup" when the checkout is missing or at the wrong commit. They also exit 1 when `python3` is not on PATH (override with `PYTHON`).
