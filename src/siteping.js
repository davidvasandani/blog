// Reuse the AuthStore key in the pinned Decap CMS 3.17.1 bundle.
export function readToken(storage) {
  try {
    const user = JSON.parse(storage.getItem('decap-cms-user'));
    return typeof user?.token === 'string' && /^[A-Za-z0-9_]+$/.test(user.token) ? user.token : null;
  } catch { return null; }
}

export function startFeedback(win, load = () => import('@siteping/widget')) {
  let instance, activeToken, generation = 0;
  function token() { try { return readToken(win.localStorage); } catch { return null; } }
  function destroy() { generation++; instance?.destroy(); instance = undefined; activeToken = undefined; }
  async function check() {
    const current = token();
    if (!current) { destroy(); return; }
    if (activeToken && activeToken !== current) destroy();
    const attempt = ++generation;
    try {
      const response = await win.fetch('/api/siteping/session', { headers: { authorization: `Bearer ${current}` }, cache: 'no-store', signal: AbortSignal.timeout(5000) });
      if (attempt !== generation) return;
      if (!response.ok) { destroy(); return; }
      const { login } = await response.json();
      if (typeof login !== 'string') { destroy(); return; }
      if (instance && activeToken === current) return;
      const { initSiteping } = await load();
      if (attempt !== generation || token() !== current) return;
      activeToken = current;
      instance = initSiteping({
        endpoint: '/api/siteping', projectName: 'david-vasandani-blog', forceShow: true,
        identity: { name: login, email: `${login}@users.noreply.github.com` },
        enableScreenshot: false, captureDiagnostics: false,
        getPageScope: () => ({ url: win.location.pathname, urlPattern: null }),
        headers: () => {
          if (token() !== current) { destroy(); throw new Error('Sign in through the Blog CMS to leave feedback.'); }
          return { authorization: `Bearer ${current}` };
        },
      });
    } catch { if (attempt === generation) destroy(); }
  }
  const changed = event => { if (!event.key || event.key === 'decap-cms-user') { destroy(); void check(); } };
  win.addEventListener('storage', changed);
  win.addEventListener('focus', check);
  const timer = win.setInterval(check, 60000);
  void check();
  return () => { destroy(); win.clearInterval(timer); win.removeEventListener('storage', changed); win.removeEventListener('focus', check); };
}
if (typeof window !== 'undefined') startFeedback(window);
