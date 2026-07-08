import type { Metadata } from 'next';
import { locales, localePath, type Locale } from './i18n';
import { SITE_URL } from './site';

/**
 * Canonical + hreflang alternates for a page available in all four locales.
 * `path` is the locale-less path (e.g. '/services' or '/').
 */
export function localeAlternates(locale: Locale, path: string): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l === 'en' ? 'en-IN' : `${l}-IN`] = `${SITE_URL}${localePath(l, path)}`;
  }
  languages['x-default'] = `${SITE_URL}${localePath('en', path)}`;
  return {
    canonical: `${SITE_URL}${localePath(locale, path)}`,
    languages,
  };
}
