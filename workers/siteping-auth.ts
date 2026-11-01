// Decap owns the login. Never trust identity or permission fields from storage.
export async function authorizeEditor(request: Request, fetcher: typeof fetch = fetch): Promise<string | Response> {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return failure(403);
  const authorization = request.headers.get('authorization') ?? '';
  if (!/^Bearer [A-Za-z0-9_]+$/.test(authorization)) return failure(401);
  const headers = { authorization, accept: 'application/vnd.github+json', 'user-agent': 'david-vasandani-blog', 'x-github-api-version': '2022-11-28' };
  try {
    const repo = await fetcher('https://api.github.com/repos/davidvasandani/blog', { headers, signal: AbortSignal.timeout(5000) });
    if (!repo.ok) return failure(repo.status === 401 ? 401 : repo.status === 404 ? 403 : 503);
    const permissions = await repo.json() as { permissions?: { push?: boolean } };
    if (permissions.permissions?.push !== true) return failure(403);
    const user = await fetcher('https://api.github.com/user', { headers, signal: AbortSignal.timeout(5000) });
    if (!user.ok) return failure(user.status === 401 ? 401 : 503);
    const identity = await user.json() as { login?: string };
    return typeof identity.login === 'string' && /^[a-z\d-]{1,39}$/i.test(identity.login) ? identity.login : failure(503);
  } catch { return failure(503); }
}
export function failure(status: number) {
  return Response.json({ error: status === 503 ? 'Feedback is temporarily unavailable.' : 'Blog editor sign-in required.' }, { status, headers: { 'cache-control': 'no-store' } });
}
