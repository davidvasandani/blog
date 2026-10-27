// Fenced ```mermaid blocks in a Markdown file, in document order, with the
// SHA-256 of each body (the lines between the fences, LF line endings).
// Shared by scripts/diagrams.cjs and tests/diagrams.test.cjs.
const crypto = require('node:crypto');
const fs = require('node:fs');

function mermaidBlocks(file) {
  const lines = fs.readFileSync(file, 'utf8').replace(/\r\n?/g, '\n').split('\n');
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    if (!/^```mermaid\s*$/.test(lines[i])) continue;
    const end = lines.findIndex((line, j) => j > i && /^```\s*$/.test(line));
    if (end === -1) throw new Error(`${file}: unterminated mermaid block at line ${i + 1}`);
    const body = lines.slice(i + 1, end).join('\n') + '\n';
    blocks.push({ body, line: i + 1, sha256: crypto.createHash('sha256').update(body).digest('hex') });
    i = end;
  }
  return blocks;
}

module.exports = { mermaidBlocks };
