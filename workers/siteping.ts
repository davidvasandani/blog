import { DurableObject } from 'cloudflare:workers';
import { createCollectionStore, type FeedbackRecord } from '@siteping/adapter-kit';
import { createSitepingHandler } from '@siteping/server';

export class BlogFeedback extends DurableObject<Env> {
  private handler;
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS feedback (id TEXT PRIMARY KEY, record TEXT NOT NULL)');
    const store = createCollectionStore({
      load: () => Array.from(ctx.storage.sql.exec<{ record: string }>('SELECT record FROM feedback'), row =>
        JSON.parse(row.record, (key, value) => ['createdAt', 'updatedAt', 'resolvedAt'].includes(key) && typeof value === 'string' ? new Date(value) : value) as FeedbackRecord),
      persist: records => ctx.storage.transactionSync(() => {
        ctx.storage.sql.exec('DELETE FROM feedback');
        for (const record of records) ctx.storage.sql.exec('INSERT INTO feedback VALUES (?, ?)', record.id, JSON.stringify(record));
      }),
      generateId: () => crypto.randomUUID(),
      comments: true,
    });
    this.handler = createSitepingHandler({
      store, maxBodyBytes: 65536,
      access: {
        // Only the Worker can reach this binding, after GitHub verification.
        authenticate: request => request.headers.get('x-blog-editor'),
        authorize: ({ projectName }) => projectName === 'david-vasandani-blog',
        canCommentAsTeam: () => true,
      },
      beforeCreate: (data, { principal }) => ({ ...data, authorName: principal, authorEmail: `${principal}@users.noreply.github.com`, screenshotDataUrl: null, screenshotRegion: null, diagnostics: null }),
      beforeComment: (data, { principal }) => ({ ...data, authorName: principal, authorEmail: `${principal}@users.noreply.github.com` }),
    });
  }
  async fetch(request: Request) {
    const method = request.method;
    if (!['GET', 'POST', 'PATCH', 'DELETE'].includes(method)) return new Response(null, { status: 405 });
    const response = await this.handler[method as 'GET' | 'POST' | 'PATCH' | 'DELETE'](request);
    response.headers.set('cache-control', 'no-store');
    return response;
  }
}
