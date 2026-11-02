// Personalise the home and resume pages for visitors on Netflix's corporate network.
export const NETFLIX_ASN = 55095;
// Posted title: "Solutions Engineer 5 - Content Promotion & Distribution". Wording reviewed with /voice.
export const NETFLIX_ROLE_LINE = 'Applying to Netflix for the Solutions Engineer 5 role in Content Promotion & Distribution.';
export const NETFLIX_PATHS = ['/', '/resume/'];

export function isNetflix(request: Request): boolean {
  return (request.cf as { asn?: number } | undefined)?.asn === NETFLIX_ASN;
}

export async function netflixPage(request: Request, assets: Fetcher): Promise<Response> {
  // Skip revalidation: a cached generic copy must not answer a Netflix visit with a 304.
  const headers = new Headers(request.headers);
  headers.delete('if-none-match');
  headers.delete('if-modified-since');
  const response = await assets.fetch(new Request(request, { headers }));
  if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) return response;

  const rewriter = new URL(request.url).pathname === '/'
    ? new HTMLRewriter().on('main > h1', { element: el => { el.setInnerContent('Hi, Netflix'); } })
    : new HTMLRewriter().on('main > h1', {
      element: el => { el.after(`<p class="resume-target">${NETFLIX_ROLE_LINE.replace('&', '&amp;')}</p>`, { html: true }); },
    });
  const personalised = rewriter.transform(response);
  const out = new Response(personalised.body, personalised);
  // Personalised HTML must not be stored by the browser or any shared cache.
  out.headers.set('cache-control', 'private, no-store');
  out.headers.delete('etag');
  out.headers.delete('last-modified');
  return out;
}
