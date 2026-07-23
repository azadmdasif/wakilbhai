import { getCategory, getGuideMetas, getServices, getTemplates } from './content';
import { getTools, toolTitle } from './tools';
import { getDict } from './dictionaries';
import { localePath, type Locale } from './i18n';

export interface SearchDoc {
  type: 'guide' | 'template' | 'service' | 'tool';
  title: string;
  keywords: string[];
  url: string;
  /** The 60-second answer (guides) — serves as both description and quickAnswer. */
  answer?: string;
  /** Localized category name (guides) — searchable + shown as a badge. */
  category?: string;
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
      answer: guide.answerBox[locale],
      category: getCategory(guide.category)?.title[locale],
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
  const dict = getDict(locale);
  const enDict = getDict('en');
  for (const tool of getTools()) {
    docs.push({
      type: 'tool',
      title: toolTitle(dict, tool.widget),
      keywords: [toolTitle(enDict, tool.widget)],
      url: localePath(locale, `/tools/${tool.slug}`),
    });
  }
  return docs;
}
