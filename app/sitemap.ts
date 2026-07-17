import type { MetadataRoute } from 'next';
import { locales, localePath } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';
import { getCategories, getGuideMetas, getServices, getTemplates } from '@/lib/content';
import { getTools } from '@/lib/tools';
import { getBuildableCities } from '@/lib/locations';

/**
 * Single dynamic sitemap served at /sitemap.xml. Lists every static route plus
 * every guide, category, template, tool, service and city landing page, once
 * per live locale, with hreflang alternates. `lastModified` comes from the
 * guide front-matter `updatedAt`; routes without a content date fall back to
 * build time.
 */
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

export default function sitemap(): MetadataRoute.Sitemap {
  return entriesFor([
    // Static routes
    { path: '/', priority: 1 },
    { path: '/help', priority: 0.8 },
    { path: '/templates', priority: 0.8 },
    { path: '/tools', priority: 0.8 },
    { path: '/services', priority: 0.8 },
    { path: '/pricing' },
    { path: '/talk-to-a-lawyer' },
    { path: '/lawyers', priority: 0.5 },
    { path: '/why-wakilbhai', priority: 0.5 },
    { path: '/contact', priority: 0.5 },
    { path: '/book-visit', priority: 0.5 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },

    // Guides (lastModified from front-matter) + category hubs
    ...getCategories().map((c) => ({ path: `/help/${c.slug}`, priority: 0.8 })),
    ...getGuideMetas().map((g) => ({
      path: `/help/${g.category}/${g.slug}`,
      lastModified: g.updatedAt,
      priority: 0.9,
    })),

    // Templates, tools, services, city landing pages
    ...getTemplates().map((t) => ({ path: `/templates/${t.slug}` })),
    ...getTools().map((t) => ({ path: `/tools/${t.slug}`, priority: 0.8 })),
    ...getServices().map((s) => ({ path: `/services/${s.id}`, priority: 0.8 })),
    ...getBuildableCities().map((city) => ({ path: `/rent-agreement/${city.slug}`, priority: 0.8 })),
  ]);
}
