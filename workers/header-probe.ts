// Temporary: records the headers Slack sends when it unfurls a link and fetches the preview image.
// Share /debug/slack-headers?n=<anything new> in Slack, then read the "slack-header-probe" lines in Workers Logs.
export const PROBE_PAGE = '/debug/slack-headers';
export const PROBE_IMAGE = '/debug/slack-headers.jpg';

const REDACTED = new Set(['cookie', 'authorization', 'cf-access-jwt-assertion', 'cf-access-client-id', 'cf-access-client-secret']);
const noStore = { 'cache-control': 'no-store', 'x-robots-tag': 'noindex' };

export function logRequest(request: Request, kind: 'page' | 'image') {
  const headers: Record<string, string> = {};
  for (const [name, value] of request.headers) headers[name] = REDACTED.has(name) ? '[redacted]' : value;
  const cf = request.cf as { asn?: number; asOrganization?: string; country?: string } | undefined;
  console.log(JSON.stringify({ probe: 'slack-header-probe', kind, method: request.method, url: request.url, headers, asn: cf?.asn, asOrganization: cf?.asOrganization, country: cf?.country }));
}

const escape = (text: string) => text.replace(/[&<>"]/g, c => `&#${c.charCodeAt(0)};`);

export function probePage(request: Request) {
  logRequest(request, 'page');
  const url = new URL(request.url);
  const image = `${url.origin}${PROBE_IMAGE}${url.search}`;
  const agent = escape(request.headers.get('user-agent') || 'none');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Header probe</title>
<meta name="robots" content="noindex">
<meta property="og:title" content="Header probe">
<meta property="og:description" content="Page fetched by: ${agent}">
<meta property="og:image" content="${escape(image)}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="600">
<meta property="og:image:height" content="600">
<meta name="twitter:card" content="summary">
</head><body><p>Page fetched by: ${agent}</p></body></html>`;
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', ...noStore } });
}

export async function probeImage(request: Request, assets: Fetcher) {
  logRequest(request, 'image');
  const image = await assets.fetch(new URL('/img/og/david-vasandani.jpg', request.url));
  return new Response(image.body, { status: image.status, headers: { 'content-type': 'image/jpeg', ...noStore } });
}
