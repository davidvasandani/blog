// Publish _gemini to the Flounder capsule through its HTTPS file editor.
// Flounder's SFTP port (2024) refuses connections, even though its docs at
// gemini://admin.flounder.online/sftp.gmi still list it, so each file is
// saved the way the web editor saves it. Files that exist only on Flounder
// are left alone.
const fs = require('node:fs');
const path = require('node:path');

const BASE = 'https://flounder.online';
const ROOT = '_gemini';
const { FLOUNDER_USERNAME: username = 'david', FLOUNDER_PASSWORD: password } = process.env;
if (!password) throw new Error('Set FLOUNDER_PASSWORD.');

let cookie = '';
async function request(url, options = {}) {
  const response = await fetch(BASE + url, {
    ...options,
    redirect: 'manual',
    headers: { ...options.headers, cookie },
  });
  const session = response.headers.getSetCookie().find(c => c.startsWith('cookie-session='));
  if (session) cookie = session.split(';')[0];
  return response;
}

async function csrfToken(url) {
  const response = await request(url);
  const html = await response.text();
  const token = html.match(/name="csrf_token" value="([^"]+)"/)?.[1];
  if (response.status !== 200 || !token) throw new Error(`No form at ${url} (HTTP ${response.status})`);
  return token;
}

function post(url, fields) {
  return request(url, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(fields),
  });
}

(async () => {
  const login = await post('/login', { csrf_token: await csrfToken('/login'), username, password });
  if (login.status !== 303 || (await request('/my_site')).status !== 200) {
    throw new Error(`Flounder login failed (HTTP ${login.status})`);
  }

  const files = fs.readdirSync(ROOT, { recursive: true })
    .map(String)
    .filter(file => fs.statSync(path.join(ROOT, file)).isFile())
    .map(file => file.split(path.sep).join('/'))
    .sort();
  for (const file of files) {
    const url = `/edit/${file}`;
    const response = await post(url, {
      csrf_token: await csrfToken(url),
      file_id: '0',
      rename: file,
      file_text: fs.readFileSync(path.join(ROOT, file), 'utf8'),
    });
    if (response.status >= 400) throw new Error(`Saving ${file} failed (HTTP ${response.status})`);
    console.log(`saved ${file}`);
  }

  // Read every file back from the editor to confirm Flounder stored the build.
  for (const file of files) {
    const html = await (await request(`/edit/${file}`)).text();
    const live = (html.match(/<textarea[^>]*name="file_text"[^>]*>([\s\S]*?)<\/textarea>/)?.[1] ?? '')
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#34;|&quot;/g, '"').replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&').replace(/\r\n/g, '\n');
    if (live.trim() !== fs.readFileSync(path.join(ROOT, file), 'utf8').trim()) {
      throw new Error(`${file} on Flounder does not match the build`);
    }
  }
  console.log(`published ${files.length} files`);
})().catch(error => {
  console.error(error.message);
  process.exit(1);
});
