import type { Locale } from './i18n';
import { localePath } from './i18n';
import { SITE_NAME, SITE_URL } from './site';
import type { DocTemplate, PaidService } from '@/types';

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
