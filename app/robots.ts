import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: [
      `${SITE_URL}/sitemap/static.xml`,
      `${SITE_URL}/sitemap/guides.xml`,
      `${SITE_URL}/sitemap/templates.xml`,
      `${SITE_URL}/sitemap/services.xml`,
    ],
  };
}
