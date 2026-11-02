// Turns RenderCV's Markdown output into the /resume/ page body. The page is
// built only when `npm run resume` has rendered the resume (always on Cloudflare).
const fs = require('node:fs');
const path = require('node:path');
const markdownIt = require('markdown-it');
const { readRenderedVersion } = require('./resume-version.cjs');

const outputDir = path.join(__dirname, '..', 'resume', 'rendercv_output');
const markdownFile = path.join(outputDir, 'David_Vasandani_CV.md');
const pdfFile = path.join(outputDir, 'David_Vasandani_CV.pdf');
const pdfUrl = '/resume/David_Vasandani_CV.pdf';

// The page layout supplies the <h1>, so drop RenderCV's title heading and
// demote the rest one level to keep a single h1 and an unbroken outline.
function toPageMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const title = lines.findIndex(line => /^# /.test(line));
  if (title !== -1) lines.splice(title, 1);
  return lines.map(line => line.replace(/^(#{1,5}) /, '#$1 ')).join('\n').trim();
}

// RenderCV writes each entry as a heading, then location, dates and duration
// as separate lines. These match the date and duration lines.
const datePattern = /\b(19|20)\d{2}\b|\bpresent\b/i;
const durationPattern = /^\d+ (years?|months?)( \d+ months?)?$/;

const html = (state, content) => Object.assign(new state.Token('html_inline', '', 0), { content });
// markdown-it leaves empty text tokens around emphasis; ignore them.
const parts = inline => inline.children.filter(token => token.type !== 'text' || token.content);

// A paragraph's inline token when it holds only plain text that isn't a
// sentence, such as "Culver City, CA" or "Feb 2026 – present".
function plainLine(tokens, i) {
  if (tokens[i]?.type !== 'paragraph_open') return null;
  const inline = tokens[i + 1];
  const [only, ...rest] = parts(inline);
  if (rest.length || only?.type !== 'text' || /\.$/.test(only.content)) return null;
  return inline;
}

// "**Company**, Title" becomes a company eyebrow above the title. The comma
// stays as visually hidden text so the heading reads the same words.
function splitHeading(state, inline) {
  const [open, company, close, title, ...rest] = parts(inline);
  if (rest.length || open?.type !== 'strong_open' || company?.type !== 'text'
    || close?.type !== 'strong_close' || title?.type !== 'text' || !title.content.startsWith(', ')) return;
  title.content = title.content.slice(2);
  inline.children = [
    html(state, '<span class="resume-org">'), company,
    html(state, '</span><span class="visually-hidden">, </span><span class="resume-role">'), title,
    html(state, '</span>'),
  ];
}

// Folds the location, dates and duration under an entry heading into one
// paragraph: dates first, then duration, then location.
function groupMeta(state, start) {
  const lines = [];
  for (let i = start; plainLine(state.tokens, i); i += 3) lines.push(state.tokens[i + 1]);
  const last = lines.findLastIndex(inline => {
    const text = parts(inline)[0].content;
    return datePattern.test(text) || durationPattern.test(text);
  });
  if (last === -1) return;
  const meta = lines.slice(0, last + 1).map(inline => parts(inline)[0]);
  const rank = token => datePattern.test(token.content) ? 0 : durationPattern.test(token.content) ? 1 : 2;
  const kinds = ['dates', 'duration', 'location'];
  meta.forEach(token => { token.meta = { kind: kinds[rank(token)] }; });
  meta.sort((a, b) => rank(a) - rank(b));
  const [open, inline] = [state.tokens[start], state.tokens[start + 1]];
  open.attrSet('class', 'resume-meta');
  inline.children = meta.flatMap(token => [html(state, '<span>'), token, html(state, '</span>')]);
  state.tokens.splice(start + 3, last * 3);
}

// A paragraph that is only "**Theme: ...**" becomes a callout with a label.
function markTheme(state, i) {
  const inline = state.tokens[i + 1];
  const [open, text, close, ...rest] = parts(inline);
  if (rest.length || open?.type !== 'strong_open' || text?.type !== 'text'
    || close?.type !== 'strong_close' || !text.content.startsWith('Theme: ')) return;
  state.tokens[i].attrSet('class', 'resume-theme');
  text.content = ` ${text.content.slice('Theme: '.length)}`;
  inline.children = [html(state, '<span class="resume-label">Theme:</span>'), text];
}

const block = (state, content) => Object.assign(new state.Token('html_block', '', 0), { content, block: true });

// The company and title of an entry heading that splitHeading has split.
function headingParts(inline) {
  const [open, company, , title] = inline.children;
  if (open?.content !== '<span class="resume-org">') return null;
  return { company, title };
}

// The meta paragraph's text tokens by kind, when the entry has one.
function metaTokens(tokens, i) {
  if (tokens[i]?.attrGet?.('class') !== 'resume-meta') return {};
  const found = {};
  for (const token of tokens[i + 1].children) if (token.meta?.kind) found[token.meta.kind] = token;
  return found;
}

// Groups adjacent roles at the same company under one company heading:
// an h3 with the company's overall dates and shared location, then each
// role as an h4 with its own dates. Runs newest first, as RenderCV writes.
function groupCompanies(state) {
  const { tokens } = state;
  const entries = [];
  tokens.forEach((token, i) => {
    if (token.type === 'heading_open' && /^h[23]$/.test(token.tag)) {
      if (entries.length) entries.at(-1).end = i;
      entries.push(token.tag === 'h3' ? { start: i, parts: headingParts(tokens[i + 1]) } : { start: i });
    }
  });
  if (entries.length) entries.at(-1).end = tokens.length;

  const runs = [];
  for (const entry of entries) {
    const run = runs.at(-1);
    const name = entry.parts?.company.content;
    if (name && run?.name === name && run.entries.at(-1).end === entry.start) run.entries.push(entry);
    else runs.push({ name, entries: [entry] });
  }

  // Work backwards so earlier token indexes stay valid while splicing.
  for (const { entries: roles } of runs.filter(run => run.name && run.entries.length > 1).reverse()) {
    const metas = roles.map(role => metaTokens(tokens, role.start + 3));
    const locations = new Set(metas.map(meta => meta.location?.content));
    const location = locations.size === 1 ? metas[0].location : null;
    const newest = metas[0].dates?.content.split(' – ');
    const oldest = metas.at(-1).dates?.content.split(' – ');

    for (const [index, role] of roles.entries()) {
      tokens[role.start].tag = tokens[role.start + 2].tag = 'h4';
      tokens[role.start + 1].children = [role.parts.title];
      const meta = metas[index];
      if (location && meta.location) {
        const inline = tokens[role.start + 4];
        const at = inline.children.indexOf(meta.location);
        inline.children.splice(at - 1, 3);
      }
    }

    const company = new state.Token('text', '', 0);
    company.content = roles[0].parts.company.content;
    const heading = [
      Object.assign(new state.Token('heading_open', 'h3', 1), { block: true }),
      Object.assign(new state.Token('inline', '', 0), { children: [company], content: company.content }),
      Object.assign(new state.Token('heading_close', 'h3', -1), { block: true }),
    ];
    const spans = [];
    if (newest?.length === 2 && oldest?.length === 2) {
      const range = new state.Token('text', '', 0);
      range.content = `${oldest[0]} – ${newest[1]}`;
      spans.push(range);
    }
    if (location) spans.push(location);
    if (spans.length) {
      const open = Object.assign(new state.Token('paragraph_open', 'p', 1), { block: true });
      open.attrSet('class', 'resume-meta');
      heading.push(open,
        Object.assign(new state.Token('inline', '', 0), {
          children: spans.flatMap(token => [html(state, '<span>'), token, html(state, '</span>')]),
        }),
        Object.assign(new state.Token('paragraph_close', 'p', -1), { block: true }));
    }

    tokens.splice(roles.at(-1).end, 0, block(state, '</div>\n</section>\n'));
    tokens.splice(roles[0].start, 0,
      block(state, '<section class="resume-company">\n'), ...heading, block(state, '<div class="resume-roles">\n'));
  }
}

// Lays out entry headers. Resume strings stay in text tokens, so markdown-it
// still escapes them; only the fixed markup above goes in as html_inline.
function resumeLayout(md) {
  md.core.ruler.push('resume_layout', state => {
    const { tokens } = state;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'heading_open' && tokens[i].tag === 'h3') {
        splitHeading(state, tokens[i + 1]);
        groupMeta(state, i + 3);
      } else if (tokens[i].type === 'paragraph_open') {
        markTheme(state, i);
      }
    }
    groupCompanies(state);
  });
}

function renderResume(markdown) {
  // Raw HTML stays disabled: resume text is escaped, never injected.
  return markdownIt().use(resumeLayout).render(markdown);
}

function readResume() {
  if (!fs.existsSync(markdownFile) || !fs.existsSync(pdfFile)) return null;
  const version = readRenderedVersion();
  const html = renderResume(toPageMarkdown(fs.readFileSync(markdownFile, 'utf8')));
  return { html, pdfUrl, version };
}

module.exports = { toPageMarkdown, renderResume, readResume, pdfFile, pdfUrl };
