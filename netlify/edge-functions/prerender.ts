export default async (request: Request) => {
    const userAgent = request.headers.get('user-agent') || '';
    
    const isBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex/i.test(userAgent);
    
    if (!isBot) {
      return;
    }
  };
  
  export const config = { path: '/*' };