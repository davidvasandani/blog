// Turns RenderCV's Markdown output into the /resume/ page body. The page is
// built only when `npm run resume` has rendered the resume (always on Cloudflare).
const fs = require('node:fs');
const path = require('node:path');
const markdownIt = require('markdown-it');

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
  });
}

function renderResume(markdown) {
  // Raw HTML stays disabled: resume text is escaped, never injected.
  return markdownIt().use(resumeLayout).render(markdown);
}

function readResume() {
  if (!fs.existsSync(markdownFile) || !fs.existsSync(pdfFile)) return null;
  const html = renderResume(toPageMarkdown(fs.readFileSync(markdownFile, 'utf8')));
  return { html, pdfUrl };
}

module.exports = { toPageMarkdown, renderResume, readResume, pdfFile, pdfUrl };
