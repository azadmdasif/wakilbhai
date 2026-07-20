/**
 * Single source of truth for the locales WakilBhai ships.
 *
 * Every locale-aware concern derives from this registry: the `Locale` union and
 * `locales` list (lib/i18n), the language switcher, and the hreflang alternates.
 * To launch a rollout language, flip its `enabled` flag to true — nothing else
 * needs editing.
 *
 *   code    — URL/hreflang code and BCP-47 primary subtag
 *   native  — the language's own name, shown in the switcher
 *   dir     — writing direction for <html dir>
 *   enabled — whether the locale is live (has content + a URL prefix)
 */
export const LOCALES = [
  { code: 'en', native: 'English', dir: 'ltr', enabled: true },
  { code: 'hi', native: 'हिंदी', dir: 'ltr', enabled: true },
  { code: 'ur', native: 'اردو', dir: 'rtl', enabled: true },
  { code: 'bn', native: 'বাংলা', dir: 'ltr', enabled: true },
  // Rollout order (not yet live): mr, te, ta, gu, kn, or, ml
  { code: 'mr', native: 'मराठी', dir: 'ltr', enabled: false },
  { code: 'te', native: 'తెలుగు', dir: 'ltr', enabled: false },
  { code: 'ta', native: 'தமிழ்', dir: 'ltr', enabled: false },
  { code: 'gu', native: 'ગુજરાતી', dir: 'ltr', enabled: false },
  { code: 'kn', native: 'ಕನ್ನಡ', dir: 'ltr', enabled: false },
  { code: 'or', native: 'ଓଡ଼ିଆ', dir: 'ltr', enabled: false },
  { code: 'ml', native: 'മലയാളം', dir: 'ltr', enabled: false },
] as const satisfies readonly LocaleMeta[];

export interface LocaleMeta {
  code: string;
  native: string;
  dir: 'ltr' | 'rtl';
  enabled: boolean;
}

/** Every code in the registry, live or not. */
export type LocaleCode = (typeof LOCALES)[number]['code'];

/** Codes of currently live locales — the app's `Locale` union derives from this. */
export type EnabledLocale = Extract<(typeof LOCALES)[number], { enabled: true }>['code'];

/** The default locale, served unprefixed and used for hreflang x-default. */
export const DEFAULT_LOCALE: EnabledLocale = 'en';

/** Registry entries for live locales only, in declared order. */
export const enabledLocales: readonly LocaleMeta[] = LOCALES.filter((l) => l.enabled);

/** Live locale codes, in declared order. */
export const enabledLocaleCodes = enabledLocales.map((l) => l.code) as EnabledLocale[];

/** Look up a locale's registry entry by code. */
export function getLocaleMeta(code: string): LocaleMeta | undefined {
  return LOCALES.find((l) => l.code === code);
}
