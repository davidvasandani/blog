import { httpServerHandler } from "cloudflare:node";
import { authorizeEditor } from './siteping-auth';
export { BlogFeedback } from './siteping';
import { api } from "../api/app";

// Keep the same Express routes and secrets as the existing deployment.
api.listen(3000);
const expressHandler = httpServerHandler({ port: 3000 });

export default {
  async fetch(request, env, ctx) {
    const path = new URL(request.url).pathname;
    if (path === '/api/siteping' || path === '/api/siteping/session') {
      const editor = await authorizeEditor(request);
      if (editor instanceof Response) return editor;
      if (path.endsWith('/session')) {
        if (request.method !== 'GET') return new Response(null, { status: 405, headers: { 'cache-control': 'no-store' } });
        return Response.json({ login: editor }, { headers: { 'cache-control': 'no-store' } });
      }
      const headers = new Headers(request.headers);
      headers.delete('authorization');
      headers.set('x-blog-editor', editor);
      return env.BLOG_FEEDBACK.getByName('blog').fetch(new Request(request, { headers }));
    }
    if (path === "/hello") return new Response("Hello, world!");
    if (path === "/api" || path.startsWith("/api/")) {
      return expressHandler.fetch!(request, env, ctx);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
