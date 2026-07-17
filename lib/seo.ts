import type { Metadata } from 'next';
import { localePath, type Locale } from './i18n';
import { enabledLocales, DEFAULT_LOCALE } from './i18n/locales';
import { SITE_URL } from './site';

/**
 * Self-canonical + hreflang alternates for a page that exists in every live
 * locale. `path` is the locale-less path (e.g. '/services' or '/').
 *
 * Each locale version points its canonical at itself (no cross-locale
 * canonicals), and advertises every live locale plus `x-default` → en. The
 * hreflang codes come from the locale registry, so adding a locale there is
 * enough to include it here.
 */
export function localeAlternates(locale: Locale, path: string): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const { code } of enabledLocales) {
    languages[code] = `${SITE_URL}${localePath(code as Locale, path)}`;
  }
  languages['x-default'] = `${SITE_URL}${localePath(DEFAULT_LOCALE, path)}`;
  return {
    canonical: `${SITE_URL}${localePath(locale, path)}`,
    languages,
  };
}
