import type { Metadata } from 'next';
import { localePath, type Locale } from './i18n';
import { enabledLocaleCodes, DEFAULT_LOCALE } from './i18n/locales';
import { SITE_URL } from './site';

/**
 * Self-canonical + hreflang alternates for a page. `path` is the locale-less
 * path (e.g. '/services' or '/').
 *
 * Each locale version points its canonical at itself (no cross-locale
 * canonicals), and advertises every locale in `availableLocales` plus
 * `x-default` → en. By default that is every live locale from the registry, so
 * adding a locale there is enough to include it here; pages whose content is
 * not yet translated in some locales (e.g. a guide with drafted locales) pass a
 * narrowed list so only ready locales are advertised.
 */
export function localeAlternates(
  locale: Locale,
  path: string,
  availableLocales: readonly Locale[] = enabledLocaleCodes,
): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const code of availableLocales) {
    languages[code] = `${SITE_URL}${localePath(code, path)}`;
  }
  if (availableLocales.includes(DEFAULT_LOCALE)) {
    languages['x-default'] = `${SITE_URL}${localePath(DEFAULT_LOCALE, path)}`;
  }
  return {
    canonical: `${SITE_URL}${localePath(locale, path)}`,
    languages,
  };
}
