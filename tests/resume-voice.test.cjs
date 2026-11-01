const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { check, problems, RESUME } = require('../scripts/resume-voice.cjs');

test('resume prose has none of the mechanical AI tells (run changes through /voice)', () => {
  const results = check(fs.readFileSync(RESUME, 'utf8'));
  assert.deepEqual(results, [], 'run `npm run resume:voice`, then rewrite the flagged lines with the /voice skill');
});

test('the voice check catches the bullet that started the rewrite', () => {
  const before = 'Enabled AI-driven POS troubleshooting through AI-assisted development of remote-support tools.';
  assert.deepEqual(problems(before), ['says "AI" 2 times in one line']);
  assert.deepEqual(problems('Leveraged Datadog to enhance visibility \u2014 a pivotal win.'), [
    'em or en dash',
    'AI vocabulary: leveraged, enhance, pivotal',
  ]);
  assert.deepEqual(problems('Shipped it. Fostered growth.'), ['AI vocabulary: fostered']);
  assert.deepEqual(problems('Built a tool that lets AI agents run PowerShell on store POS devices.'), []);
});

test('the voice check leaves ordinary and technical words alone', () => {
  for (const line of [
    'Renamed underscored identifiers and printed in landscape.',
    'Opened an office in Foster City.',
    'Joined Pivotal Software.',
    'Wrote [documentation](https://example.com/enhance) at https://example.com/leverage.',
    'Built an AI tool.\nDocumented AI workflows.',
  ]) {
    assert.deepEqual(problems(line), [], line);
  }
});

test('the voice check reads every prose field and skips dates, places and links', () => {
  const source = [
    'cv:',
    '  headline: Engineer',
    '  sections:',
    '    summary:',
    '      - "Additionally, a summary."',
    '    experience:',
    '      - company: Pivotal Software',
    '        position: Engineer',
    '        date: 2016 \u2013 2019',
    '        location: "Here \u2013 there"',
    '        summary: Fostered growth.',
    '        highlights:',
    '          - Shipped it in order to ship it.',
    '    notes:',
    '      - bullet: Leveraged AI for AI.',
    '    skills:',
    '      - label: Tools',
    '        details: "Docker \u2014 Kubernetes"',
    '    links:',
    '      - name: Site',
    '        url: https://example.com/leverage',
  ].join('\n');
  assert.deepEqual(check(source), [
    { where: 'summary[0]', problems: ['AI vocabulary: additionally'] },
    { where: 'experience[0].summary', problems: ['AI vocabulary: fostered'] },
    { where: 'experience[0].highlights[0]', problems: ['AI vocabulary: in order to'] },
    { where: 'notes[0].bullet', problems: ['says "AI" 2 times in one line', 'AI vocabulary: leveraged'] },
    { where: 'skills[0].details', problems: ['em or en dash'] },
  ]);
});

test('agent instructions require /voice for resume changes and stay unpublished', () => {
  const agents = fs.readFileSync('AGENTS.md', 'utf8');
  assert.match(agents, /goes through the `\/voice` skill/);
  assert.match(agents, /npm run resume:voice/);
  assert.equal(fs.readFileSync('CLAUDE.md', 'utf8').trim(), '@AGENTS.md');
  const ignored = fs.readFileSync('.eleventyignore', 'utf8').split(/\r?\n/).map(line => line.trim());
  assert.ok(ignored.includes('AGENTS.md') && ignored.includes('CLAUDE.md'));
});
