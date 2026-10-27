#!/usr/bin/env node
// Runs the pinned diagram-design skill's scripts against diagrams/. Usage:
//   node scripts/diagrams.cjs setup    clone diagram-design at the commit in diagrams/diagram-design.lock
//   node scripts/diagrams.cjs extract  print the extractor digest of every manifest block
//   node scripts/diagrams.cjs export   re-export each redraw (diagrams/*.html) to its published SVG
//   node scripts/diagrams.cjs check    hashes, extractor counts, self-check, geometry, export drift
// The skill's scripts need only the Python 3 standard library (PYTHON overrides python3).
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { mermaidBlocks } = require('./mermaid-blocks.cjs');

const repoDir = path.join(__dirname, '..');
const diagramsDir = path.join(repoDir, 'diagrams');
const skillRepo = path.join(diagramsDir, '.diagram-design');
const skillDir = path.join(skillRepo, 'skills', 'diagram-design');
const python = process.env.PYTHON || 'python3';
const lock = Object.fromEntries(
  fs.readFileSync(path.join(diagramsDir, 'diagram-design.lock'), 'utf8')
    .split('\n').filter(Boolean).map(line => line.trim().split(/\s+/, 2)),
);
const manifest = JSON.parse(fs.readFileSync(path.join(diagramsDir, 'manifest.json'), 'utf8'));
const abs = rel => path.join(repoDir, rel);

const run = (cmd, args, opts = {}) => {
  const result = spawnSync(cmd, args, { cwd: repoDir, encoding: 'utf8', ...opts });
  if (result.error) {
    if (result.error.code === 'ENOENT') console.error(`${cmd} not found on PATH.`);
    else console.error(result.error.message);
    return { status: 1, stdout: '', stderr: '' };
  }
  return { status: result.status ?? 1, stdout: result.stdout || '', stderr: result.stderr || '' };
};
const git = (...args) => run('git', ['-C', skillRepo, ...args]);

function setup() {
  if (!fs.existsSync(path.join(skillRepo, '.git'))) {
    const cloned = run('git', ['clone', '--quiet', '--filter=blob:none', '--no-checkout', lock.repo, skillRepo], { stdio: 'inherit' });
    if (cloned.status !== 0) return cloned.status;
  }
  if (git('cat-file', '-e', `${lock.commit}^{commit}`).status !== 0) {
    const fetched = git('fetch', '--quiet', 'origin', lock.commit);
    if (fetched.status !== 0) { process.stderr.write(fetched.stderr); return fetched.status; }
  }
  const checkout = git('checkout', '--quiet', '--detach', '--force', lock.commit);
  if (checkout.status !== 0) { process.stderr.write(checkout.stderr); return checkout.status; }
  console.log(`diagram-design ${lock.commit.slice(0, 7)} ready in ${path.relative(repoDir, skillRepo)}/`);
  return 0;
}

function ready() {
  const head = fs.existsSync(path.join(skillRepo, '.git')) ? git('rev-parse', 'HEAD').stdout.trim() : '';
  if (head === lock.commit) return true;
  console.error(`diagram-design is not checked out at ${lock.commit.slice(0, 7)}. Run \`npm run diagrams:setup\` first.`);
  return false;
}

const skillScript = name => path.join(skillDir, 'scripts', name);
const exportSvg = (html, out) => run(python, [skillScript('export_svg.py'), abs(html), out, '--system-fonts']);

function extract() {
  if (!ready()) return 1;
  let status = 0;
  for (const entry of manifest.diagrams) {
    const result = run(python, [skillScript('mermaid_extract.py'), abs(entry.source), '--diagram', String(entry.index)], { stdio: 'inherit' });
    status ||= result.status;
  }
  return status;
}

function exportAll() {
  if (!ready()) return 1;
  let status = 0;
  for (const entry of manifest.diagrams) {
    const result = exportSvg(entry.html, abs(entry.svg));
    if (result.status !== 0) process.stderr.write(result.stdout + result.stderr);
    else console.log(`exported ${entry.svg}`);
    status ||= result.status;
  }
  return status;
}

function check() {
  if (!ready()) return 1;
  let failures = 0;
  const report = (ok, step, name, detail = '') => {
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${step.padEnd(10)} ${name}${!ok && detail ? `\n${detail.trim().replace(/^/gm, '     ')}` : ''}`);
    if (!ok) failures++;
  };
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'diagrams-'));
  try {
    for (const entry of manifest.diagrams) {
      const name = path.basename(entry.html, '.html');
      const block = mermaidBlocks(abs(entry.source))[entry.index];
      report(block?.sha256 === entry.sha256, 'source', name,
        block ? `block ${entry.index} changed (sha256 ${block.sha256}); redraw it, re-export, then update diagrams/manifest.json` : `no block ${entry.index}`);
      if (entry.mermaidSvg) report(block?.sha256 === entry.mermaidSvg.sha256, 'mermaid', name,
        `${entry.mermaidSvg.path} was rendered from an older block; re-render it (diagrams/README.md)`);

      const ir = run(python, [skillScript('mermaid_extract.py'), abs(entry.source), '--diagram', String(entry.index), '--json']);
      let diagram;
      try { diagram = JSON.parse(ir.stdout).diagrams[0]; } catch { /* reported below */ }
      const got = diagram && { kind: diagram.kind, nodes: diagram.analysis.nodes_total, edges: diagram.analysis.edges_total };
      report(ir.status === 0 && got?.kind === entry.kind && got.nodes === entry.nodes && got.edges === entry.edges, 'extract', name,
        got ? `expected ${entry.kind} ${entry.nodes}n/${entry.edges}e, got ${got.kind} ${got.nodes}n/${got.edges}e` : ir.stdout + ir.stderr);

      const self = run(python, [skillScript('self_check.py'), '--offline', abs(entry.html)]);
      report(self.status === 0, 'self-check', name, self.stdout + self.stderr);
      const geometry = run(python, [path.join(skillRepo, 'scripts', 'verify-geometry.py'), abs(entry.html)]);
      report(geometry.status === 0, 'geometry', name, geometry.stdout + geometry.stderr);

      const out = path.join(tmp, path.basename(entry.svg));
      const exported = exportSvg(entry.html, out);
      const same = exported.status === 0 && fs.existsSync(abs(entry.svg)) && fs.readFileSync(out).equals(fs.readFileSync(abs(entry.svg)));
      report(same, 'export', name, exported.status === 0 ? `${entry.svg} differs from a fresh export; run \`npm run diagrams:export\`` : exported.stdout + exported.stderr);
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  console.log(failures ? `${failures} check(s) failed` : 'all diagram checks passed');
  return failures ? 1 : 0;
}

const commands = { setup, extract, export: exportAll, check };
const command = commands[process.argv[2]];
if (command) process.exitCode = command();
else {
  console.error('Usage: node scripts/diagrams.cjs <setup|extract|export|check>');
  process.exitCode = 2;
}
