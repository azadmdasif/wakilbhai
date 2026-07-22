import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n';
import { localeAlternates } from '@/lib/seo';
import { enabledLocaleCodes } from '@/lib/i18n/locales';
import { SITE_NAME, SITE_URL } from '@/lib/site';

/** Hard SEO ceiling for <title> (see CLAUDE.md: unique title ≤60 chars). */
const TITLE_MAX = 60;
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** Build the dynamic OG image URL (app/api/og) for a page's title + category. */
function ogImageUrl(title: string, category?: string): string {
  const url = new URL('/api/og', SITE_URL);
  url.searchParams.set('title', title);
  if (category) url.searchParams.set('category', category);
  return url.toString();
}

const ogLocales: Record<Locale, string> = {
  en: 'en_IN',
  hi: 'hi_IN',
  mr: 'mr_IN',
  te: 'te_IN',
  ta: 'ta_IN',
  gu: 'gu_IN',
  ur: 'ur_IN',
  bn: 'bn_IN',
};

export interface BuildMetadataInput {
  /** Page title WITHOUT the brand suffix; "{title} | WakilBhai" is built here.
   *  Titles that already carry the brand (e.g. the homepage) are used as-is. */
  title: string;
  description: string;
  /** Locale-less path, e.g. '/' or '/help/money-recovery'. */
  path: string;
  locale: Locale;
  /** Category name for the OG image's stamp chip (e.g. guide category). */
  ogCategory?: string;
  /** Override the OG image entirely; defaults to a generated /api/og card. */
  ogImage?: string;
  /** Locales this page is actually available in (defaults to all live locales).
   *  Narrow it for pages with drafted/untranslated locales. */
  availableLocales?: readonly Locale[];
  /** Keep the page out of the index (e.g. a locale still in draft). */
  noindex?: boolean;
}

/**
 * "{Page Title} | WakilBhai", clamped to TITLE_MAX. When the page title alone
 * would overflow, it is trimmed at a word boundary and ellipsised so the
 * brand suffix always survives intact.
 */
function fullTitle(raw: string): string {
  if (raw.includes(SITE_NAME)) return raw; // brand titles (homepage) pass through
  const suffix = ` | ${SITE_NAME}`;
  const combined = `${raw}${suffix}`;
  if (combined.length <= TITLE_MAX) return combined;
  const room = TITLE_MAX - suffix.length - 1; // -1 for the ellipsis
  const cut = raw.slice(0, room);
  const lastSpace = cut.lastIndexOf(' ');
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…${suffix}`;
}

/**
 * Per-page Metadata: title in the "{Page Title} | WakilBhai" pattern,
 * description, locale-aware canonical + hreflang alternates, and matching
 * Open Graph / Twitter cards.
 */
export function buildMetadata({
  title,
  description,
  path,
  locale,
  ogCategory,
  ogImage,
  availableLocales = enabledLocaleCodes,
  noindex,
}: BuildMetadataInput): Metadata {
  const resolvedTitle = fullTitle(title);
  const canonical = `${SITE_URL}${localePath(locale, path)}`;
  // The card shows the human title (no "| WakilBhai" suffix — the brand row
  // already carries it). Explicit ogImage still wins.
  const image = ogImage ?? ogImageUrl(title, ogCategory);
  const images = [{ url: image, width: OG_WIDTH, height: OG_HEIGHT, alt: resolvedTitle }];
  return {
    title: { absolute: resolvedTitle },
    description,
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    alternates: localeAlternates(locale, path, availableLocales),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: resolvedTitle,
      description,
      url: canonical,
      locale: ogLocales[locale],
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images,
    },
  };
}
