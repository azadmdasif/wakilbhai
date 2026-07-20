import { DEFAULT_LOCALE, enabledLocaleCodes, getLocaleMeta, type EnabledLocale } from './i18n/locales';

/** A live locale code. Derives from the locale registry (lib/i18n/locales). */
export type Locale = EnabledLocale;
export type Localized<T = string> = Record<Locale, T>;

/** Live locale codes, in registry order. Single source of truth: the registry. */
export const locales: readonly Locale[] = enabledLocaleCodes;

export const defaultLocale: Locale = DEFAULT_LOCALE;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Writing direction for a locale, read from the registry. */
export function dir(locale: Locale): 'rtl' | 'ltr' {
  return getLocaleMeta(locale)?.dir ?? 'ltr';
}

/** BCP-47 tags for Intl formatting (dates, numbers). */
export const localeLang: Record<Locale, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  ur: 'ur-IN',
  bn: 'bn-IN',
};

/**
 * Build a locale-prefixed path. The default locale (en) is served
 * unprefixed; other locales get a /{locale} prefix.
 * localePath('hi', '/services') -> '/hi/services'
 * localePath('en', '/services') -> '/services'
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** Strip a leading locale segment from a pathname, returning [locale, rest]. */
export function splitLocaleFromPath(pathname: string): [Locale, string] {
  const seg = pathname.split('/')[1];
  if (seg && isLocale(seg)) {
    const rest = pathname.slice(seg.length + 1) || '/';
    return [seg, rest];
  }
  return [defaultLocale, pathname || '/'];
}
