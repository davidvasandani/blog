import { httpServerHandler } from "cloudflare:node";
import { api } from "../api/app";

// Keep the same Express routes and secrets as the existing deployment.
api.listen(3000);
const expressHandler = httpServerHandler({ port: 3000 });

export default {
  async fetch(request, env, ctx) {
    const path = new URL(request.url).pathname;
    if (path === "/hello") return new Response("Hello, world!");
    if (path === "/api" || path.startsWith("/api/")) {
      return expressHandler.fetch!(request, env, ctx);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
