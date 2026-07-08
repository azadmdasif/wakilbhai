export const locales = ['en', 'hi', 'ur', 'bn'] as const;
export type Locale = (typeof locales)[number];
export type Localized<T = string> = Record<Locale, T>;

export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Urdu is written right-to-left; everything else is LTR. */
export function dir(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'ur' ? 'rtl' : 'ltr';
}

export const localeLabels: Record<Locale, { label: string; native: string }> = {
  en: { label: 'EN', native: 'English' },
  hi: { label: 'हिंदी', native: 'Hindi' },
  ur: { label: 'اُردُو', native: 'Urdu' },
  bn: { label: 'বাংলা', native: 'Bengali' },
};

/** BCP-47 lang attribute values. */
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
