export default async (request: Request) => {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex|facebookexternalhit|twitterbot/i.test(userAgent);

  if (!isBot) return;

  const url = new URL(request.url);
  const origin = url.origin;
  const res = await fetch(`${origin}/index.html`);
  const html = await res.text();

  return new Response(html, {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  });
};

export const config = { path: '/*' };