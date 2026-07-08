import type { MetadataRoute } from 'next';
import { locales, localePath } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

// Static routes available in every locale. Content-driven routes (guides,
// templates, services, tools, cities) are appended by later phases.
const staticPaths = ['/', '/services', '/pricing', '/talk-to-a-lawyer', '/contact', '/why-wakilbhai', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of staticPaths) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}${localePath(locale, path)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '/' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${localePath(l, path)}`])),
        },
      });
    }
  }
  return entries;
}
