export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const path = (new URL(request.url)).pathname;
    const location = await env.db.get(path);

    if (!isUrl(location) && !location) {
      return new Response('Not found', { status: 404 });
    }

    return Response.redirect(location, 301);
  },
} satisfies ExportedHandler;

function isUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
