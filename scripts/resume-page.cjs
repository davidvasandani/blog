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

function readResume() {
  if (!fs.existsSync(markdownFile) || !fs.existsSync(pdfFile)) return null;
  // Raw HTML stays disabled: resume text is escaped, never injected.
  const html = markdownIt().render(toPageMarkdown(fs.readFileSync(markdownFile, 'utf8')));
  return { html, pdfUrl };
}

module.exports = { toPageMarkdown, readResume, pdfFile, pdfUrl };
