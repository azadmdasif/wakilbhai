import { getGuideMetas, getServices, getTemplates } from './content';
import { localePath, type Locale } from './i18n';

export interface SearchDoc {
  type: 'guide' | 'template' | 'service' | 'tool';
  title: string;
  keywords: string[];
  url: string;
  /** Price shown next to services. */
  priceINR?: number;
}

/** Build the per-locale client search index at build time. */
export function buildSearchIndex(locale: Locale): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const guide of getGuideMetas()) {
    docs.push({
      type: 'guide',
      title: guide.title[locale],
      keywords: [...guide.searchKeywords[locale], ...guide.searchKeywords.en],
      url: localePath(locale, `/help/${guide.category}/${guide.slug}`),
    });
  }
  for (const template of getTemplates()) {
    docs.push({
      type: 'template',
      title: template.title[locale],
      keywords: [template.title.en],
      url: localePath(locale, `/templates/${template.slug}`),
    });
  }
  for (const service of getServices()) {
    docs.push({
      type: 'service',
      title: service.title[locale],
      keywords: [service.title.en],
      url: localePath(locale, `/services/${service.id}`),
      priceINR: service.priceINR,
    });
  }
  return docs;
}
