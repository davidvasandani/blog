// Vercel Function behind /api/* (rewritten in vercel.json). Serves the same
// Express app as the Netlify function; Express routes on the original URL.
import type { IncomingMessage, ServerResponse } from "http";
import { api } from "../../netlify/functions/api";

// Vercel's request helpers give each request its own flat `query` and
// `cookies`, which would hide Express's versions (nested query keys such as
// filter[status]). The form body they pre-parse is kept: Express sees the
// stream as already read and uses it.
export default function handler(req: IncomingMessage & { query?: unknown; cookies?: unknown }, res: ServerResponse) {
  delete req.query;
  delete req.cookies;
  return api(req, res);
}
