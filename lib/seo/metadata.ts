import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n';
import { localeAlternates } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

/** Hard SEO ceiling for <title> (see CLAUDE.md: unique title ≤60 chars). */
const TITLE_MAX = 60;
const DEFAULT_OG_IMAGE = '/hero.png';

const ogLocales: Record<Locale, string> = {
  en: 'en_IN',
  hi: 'hi_IN',
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
  /** Path or absolute URL of the OG image; defaults to the site hero. */
  ogImage?: string;
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
export function buildMetadata({ title, description, path, locale, ogImage }: BuildMetadataInput): Metadata {
  const resolvedTitle = fullTitle(title);
  const canonical = `${SITE_URL}${localePath(locale, path)}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  return {
    title: { absolute: resolvedTitle },
    description,
    alternates: localeAlternates(locale, path),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: resolvedTitle,
      description,
      url: canonical,
      locale: ogLocales[locale],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [image],
    },
  };
}
