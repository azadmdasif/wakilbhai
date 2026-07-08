import type { Locale } from './i18n';
import { localePath } from './i18n';
import { SITE_NAME, SITE_URL, WHATSAPP_NUMBER } from './site';
import type { DocTemplate, GuideMeta, PaidService } from '@/types';

// NOTE: deliberately ProfessionalService, not LegalService/Attorney —
// WakilBhai is a documentation service, not a law firm.
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/hero.png`,
    description:
      'WakilBhai is an Indian legal documentation service: document drafting, advocate-sent legal notices, and consultations. Not a law firm; nothing on the site is legal advice.',
    telephone: `+${WHATSAPP_NUMBER}`,
    areaServed: 'IN',
    availableLanguage: ['en', 'hi', 'ur', 'bn'],
    priceRange: '₹199 - ₹1499',
  };
}

export function breadcrumbJsonLd(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function guideArticleJsonLd(guide: GuideMeta, locale: Locale) {
  const url = `${SITE_URL}${localePath(locale, `/help/${guide.category}/${guide.slug}`)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title[locale],
    description: guide.answerBox[locale],
    inLanguage: locale === 'en' ? 'en-IN' : `${locale}-IN`,
    dateModified: guide.updatedAt,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

export function serviceJsonLd(service: PaidService, locale: Locale) {
  const url = `${SITE_URL}${localePath(locale, `/services/${service.id}`)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title[locale],
    description: service.description[locale],
    url,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: 'IN',
    offers: {
      '@type': 'Offer',
      price: service.priceINR,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url,
    },
  };
}

export function templateJsonLd(template: DocTemplate, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: template.title[locale],
    description: template.description[locale],
    url: `${SITE_URL}${localePath(locale, `/templates/${template.slug}`)}`,
    encodingFormat: template.fileFormats.map((f) =>
      f === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ),
    isAccessibleForFree: true,
    inLanguage: locale === 'en' ? 'en-IN' : `${locale}-IN`,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
}
