import type { MetadataRoute } from 'next';
import { locales, localePath } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';
import { getCategories, getGuideMetas, getServices, getTemplates } from '@/lib/content';
import { getTools } from '@/lib/tools';
import { getBuildableCities } from '@/lib/locations';

// Split sitemaps by content type: /sitemap/static.xml, /sitemap/guides.xml,
// /sitemap/templates.xml, /sitemap/services.xml
export function generateSitemaps() {
  return [{ id: 'static' }, { id: 'guides' }, { id: 'templates' }, { id: 'services' }, { id: 'locations' }];
}

function entriesFor(paths: { path: string; lastModified?: string; priority?: number }[]): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const { path, lastModified, priority } of paths) {
    for (const locale of locales) {
      out.push({
        url: `${SITE_URL}${localePath(locale, path)}`,
        lastModified: lastModified ? new Date(`${lastModified}T00:00:00Z`) : new Date(),
        changeFrequency: 'weekly',
        priority: priority ?? 0.7,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${localePath(l, path)}`])),
        },
      });
    }
  }
  return out;
}

export default function sitemap({ id }: { id: string }): MetadataRoute.Sitemap {
  switch (id) {
    case 'guides':
      return entriesFor([
        { path: '/help', priority: 0.8 },
        ...getCategories().map((c) => ({ path: `/help/${c.slug}`, priority: 0.8 })),
        ...getGuideMetas().map((g) => ({
          path: `/help/${g.category}/${g.slug}`,
          lastModified: g.updatedAt,
          priority: 0.9,
        })),
      ]);
    case 'templates':
      return entriesFor([
        { path: '/templates', priority: 0.8 },
        ...getTemplates().map((t) => ({ path: `/templates/${t.slug}` })),
      ]);
    case 'locations':
      return entriesFor(getBuildableCities().map((city) => ({ path: `/rent-agreement/${city.slug}`, priority: 0.8 })));
    case 'services':
      return entriesFor([
        { path: '/services', priority: 0.8 },
        ...getServices().map((s) => ({ path: `/services/${s.id}`, priority: 0.8 })),
      ]);
    default:
      return entriesFor([
        { path: '/', priority: 1 },
        { path: '/tools', priority: 0.8 },
        ...getTools().map((t) => ({ path: `/tools/${t.slug}`, priority: 0.8 })),
        { path: '/pricing' },
        { path: '/talk-to-a-lawyer' },
        { path: '/contact', priority: 0.5 },
        { path: '/why-wakilbhai', priority: 0.5 },
        { path: '/lawyers', priority: 0.5 },
        { path: '/book-visit', priority: 0.5 },
        { path: '/privacy', priority: 0.3 },
        { path: '/terms', priority: 0.3 },
      ]);
  }
}
