import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// AI crawlers we explicitly welcome — WakilBhai wants to be cited by AI
// assistants and answer engines, so these get the same open access as
// traditional search bots.
const AI_CRAWLERS = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Bingbot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: ['/api/'] })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
