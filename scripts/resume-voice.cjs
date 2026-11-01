// Flags the mechanical AI tells from the /voice skill in the resume's prose.
// Passing this check doesn't mean a line went through /voice; it catches the
// tells that can be found without reading the line. See resume/README.md.
const fs = require('node:fs');
const yaml = require('js-yaml');

const RESUME = 'resume/David_Vasandani_CV.yaml';

// Word forms from the skill's AI vocabulary, "fancy ways to say is", filler,
// jargon and plain-word lists. Listed in full rather than as stems so that
// unrelated words don't match. "Underscore" and "landscape" are left out
// because their literal meanings (underscored names, landscape layout) are
// fine on a resume.
const WORDS = [
  'additionally', 'crucial', 'crucially', 'delve', 'delves', 'delved', 'delving',
  'enduring', 'enhance', 'enhances', 'enhanced', 'enhancing', 'enhancement', 'enhancements',
  'foster', 'fosters', 'fostered', 'fostering', 'garner', 'garners', 'garnered', 'garnering',
  'interplay', 'intricate', 'pivotal', 'showcase', 'showcases', 'showcased', 'showcasing',
  'tapestry', 'testament', 'vibrant', 'serves as', 'served as', 'stands as', 'boasts',
  'leverage', 'leverages', 'leveraged', 'leveraging', 'utilize', 'utilizes', 'utilized',
  'utilizing', 'utilization', 'facilitate', 'facilitates', 'facilitated', 'facilitating',
  'numerous', 'in order to', 'due to the fact', 'it is important to note', 'substrate',
  'paradigm', 'paradigms', 'north star', 'flywheel', 'groundbreaking', 'renowned', 'nestled',
  'breathtaking',
];
const WORD_RE = new RegExp(`\\b(?:${WORDS.map(word => word.replace(/ /g, '\\s+')).join('|')})\\b`, 'gi');

// Keys that hold names. They get the dash and quote checks but not the word
// list, so a company called "Pivotal Software" doesn't fail.
const NAMES = new Set(['company', 'institution', 'name', 'position', 'label', 'area', 'degree', 'title', 'authors', 'journal']);

// Keys that hold dates, places, links or handles rather than prose.
const NOT_PROSE = new Set([
  'date', 'start_date', 'end_date', 'location', 'url', 'doi', 'username', 'network', 'email', 'phone', 'website',
]);

function proseOf(cv) {
  const out = [];
  const walk = (value, where) => {
    if (typeof value === 'string') out.push({ where, text: value, isName: NAMES.has(where.split('.').pop()) });
    else if (Array.isArray(value)) value.forEach((item, i) => walk(item, `${where}[${i}]`));
    else if (value && typeof value === 'object') {
      for (const [key, item] of Object.entries(value)) {
        if (!NOT_PROSE.has(key)) walk(item, `${where}.${key}`);
      }
    }
  };
  walk(cv.headline, 'headline');
  for (const [name, entries] of Object.entries(cv.sections || {})) walk(entries, name);
  return out;
}

function problems(raw, { isName = false } = {}) {
  // Check what readers see: drop Markdown link targets and bare URLs.
  const text = raw.replace(/\]\([^)]*\)/g, ']').replace(/https?:\/\/\S+/g, '');
  const found = [];
  if (/[\u2014\u2013]/.test(text)) found.push('em or en dash');
  if (/[\u2018\u2019\u201c\u201d]/.test(text)) found.push('curly quote');
  // "AI" once per line: a multi-paragraph summary is several lines.
  const ai = Math.max(0, ...text.split(/\n+/).map(line => (line.match(/\bAI\b/g) || []).length));
  if (ai > 1) found.push(`says "AI" ${ai} times in one line`);
  if (isName) return found;
  // A capitalized match mid-sentence is a name ("Foster City"). At the start
  // of a sentence it counts; reword a sentence that opens with such a name.
  const isNameMatch = m => m[0][0] !== m[0][0].toLowerCase()
    && !/(^|[.!?:]\s+|\n\s*)$/.test(text.slice(0, m.index));
  const words = [...new Set([...text.matchAll(WORD_RE)]
    .filter(m => !isNameMatch(m))
    .map(m => m[0].toLowerCase().replace(/\s+/g, ' ')))];
  if (words.length) found.push(`AI vocabulary: ${words.join(', ')}`);
  return found;
}

function check(source) {
  const cv = yaml.load(source).cv;
  return proseOf(cv)
    .map(({ where, text, isName }) => ({ where, problems: problems(text, { isName }) }))
    .filter(result => result.problems.length);
}

module.exports = { check, problems, RESUME };

if (require.main === module) {
  const results = check(fs.readFileSync(RESUME, 'utf8'));
  for (const { where, problems: found } of results) console.error(`${where}: ${found.join('; ')}`);
  if (results.length) {
    console.error(`\n${results.length} resume line(s) need another pass through the /voice skill.`);
    process.exit(1);
  }
  console.log('No mechanical voice problems in the resume.');
}
