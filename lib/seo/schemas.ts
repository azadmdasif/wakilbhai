import { SITE_NAME, SITE_URL } from '@/lib/site';

/**
 * JSON-LD builders for WakilBhai. Each returns a plain object ready to hand to
 * <JsonLd>. Optional inputs are omitted rather than serialized as `undefined`,
 * so the emitted graph never carries empty fields.
 */

const CONTEXT = 'https://schema.org';
const LOGO = `${SITE_URL}/logo.png`;

/** Publisher/author organisation node reused across schemas. */
function orgRef() {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: LOGO },
  };
}

/**
 * Site-wide identity. Modelled as both Organization and LegalService so search
 * engines read WakilBhai as a legal-services entity while keeping the honest
 * description that it is a documentation service, not a law firm.
 * `sameAs` is intentionally empty — populate with social/profile URLs later.
 */
export function organizationSchema() {
  return {
    '@context': CONTEXT,
    '@type': ['Organization', 'LegalService'],
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO,
    image: `${SITE_URL}/hero.png`,
    description: 'Legal documentation service and lawyer connect for India. Not a law firm.',
    telephone: '+91-7686022245',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi', 'bn', 'ur'],
    sameAs: [] as string[],
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  reviewerName?: string;
  url?: string;
}

/**
 * Article node for a guide. `author` is a Person; a legal reviewer is attached
 * as a `reviewedBy` Person node. Publisher is the WakilBhai organisation.
 */
export function articleSchema({
  title,
  description,
  datePublished,
  dateModified,
  authorName,
  reviewerName,
  url,
}: ArticleSchemaInput) {
  return {
    '@context': CONTEXT,
    '@type': 'Article',
    headline: title,
    description,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(url ? { mainEntityOfPage: { '@type': 'WebPage', '@id': url } } : {}),
    author: authorName ? { '@type': 'Person', name: authorName } : orgRef(),
    ...(reviewerName ? { reviewedBy: { '@type': 'Person', name: reviewerName } } : {}),
    publisher: orgRef(),
  };
}

/** FAQPage node. Returns null for an empty list so nothing is emitted. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  if (faqs.length === 0) return null;
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

/**
 * BreadcrumbList node. Items without a `url` (the current page, the last crumb)
 * omit the `item` field, as Google recommends for the final breadcrumb.
 */
export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
