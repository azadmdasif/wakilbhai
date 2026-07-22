/**
 * Single source of truth for the locales WakilBhai ships.
 *
 * Every locale-aware concern derives from this registry: the `Locale` union and
 * `locales` list (lib/i18n), the language switcher, the hreflang alternates, and
 * the per-script font stacks. To launch a rollout language, flip its `enabled`
 * flag to true — nothing else needs editing.
 *
 *   code        — URL/hreflang code and BCP-47 primary subtag
 *   nativeName  — the language's own name, shown in the switcher (native script)
 *   dir         — writing direction for <html dir>
 *   displayFont — CSS stack for headings/display (Anek {Script}; Nastaliq for ur)
 *   font        — CSS stack for body text (Noto Sans {Script}; Nastaliq for ur)
 *   enabled     — whether the locale is live (has content + a URL prefix)
 *
 * The actual next/font loading (and script subsetting) lives in lib/fonts.ts;
 * these stacks are the declarative mirror used for docs and SSR fallbacks.
 *
 * Order is authoritative (CLAUDE.md): live locales first (en, hi, ur, bn), then
 * the rollout order (mr, te, ta, gu, kn, or, ml), then pa.
 */

// Per-script fallbacks reused across locales that share a script family.
const SANS = "'Noto Sans', system-ui, -apple-system, Segoe UI, sans-serif";
const DEVANAGARI = `'Noto Sans Devanagari', ${SANS}`;
const ANEK_DEVANAGARI = `'Anek Devanagari', ${DEVANAGARI}`;
const NASTALIQ = "'Noto Nastaliq Urdu', serif";

export const LOCALES = [
  { code: 'en', nativeName: 'English', dir: 'ltr', displayFont: `'Anek Latin', ${SANS}`, font: SANS, enabled: true },
  { code: 'hi', nativeName: 'हिंदी', dir: 'ltr', displayFont: ANEK_DEVANAGARI, font: DEVANAGARI, enabled: true },
  { code: 'ur', nativeName: 'اردو', dir: 'rtl', displayFont: NASTALIQ, font: NASTALIQ, enabled: true },
  { code: 'bn', nativeName: 'বাংলা', dir: 'ltr', displayFont: `'Anek Bangla', 'Noto Sans Bengali', ${SANS}`, font: `'Noto Sans Bengali', ${SANS}`, enabled: true },
  // Rollout order: mr, te live; ta, gu, kn, or, ml pending.
  { code: 'mr', nativeName: 'मराठी', dir: 'ltr', displayFont: ANEK_DEVANAGARI, font: DEVANAGARI, enabled: true },
  { code: 'te', nativeName: 'తెలుగు', dir: 'ltr', displayFont: `'Anek Telugu', 'Noto Sans Telugu', ${SANS}`, font: `'Noto Sans Telugu', ${SANS}`, enabled: true },
  { code: 'ta', nativeName: 'தமிழ்', dir: 'ltr', displayFont: `'Anek Tamil', 'Noto Sans Tamil', ${SANS}`, font: `'Noto Sans Tamil', ${SANS}`, enabled: true },
  { code: 'gu', nativeName: 'ગુજરાતી', dir: 'ltr', displayFont: `'Anek Gujarati', 'Noto Sans Gujarati', ${SANS}`, font: `'Noto Sans Gujarati', ${SANS}`, enabled: true },
  { code: 'kn', nativeName: 'ಕನ್ನಡ', dir: 'ltr', displayFont: `'Anek Kannada', 'Noto Sans Kannada', ${SANS}`, font: `'Noto Sans Kannada', ${SANS}`, enabled: false },
  { code: 'or', nativeName: 'ଓଡ଼ିଆ', dir: 'ltr', displayFont: `'Anek Odia', 'Noto Sans Oriya', ${SANS}`, font: `'Noto Sans Oriya', ${SANS}`, enabled: false },
  { code: 'ml', nativeName: 'മലയാളം', dir: 'ltr', displayFont: `'Anek Malayalam', 'Noto Sans Malayalam', ${SANS}`, font: `'Noto Sans Malayalam', ${SANS}`, enabled: false },
  // Punjabi (Gurmukhi) — registered but disabled until content lands.
  { code: 'pa', nativeName: 'ਪੰਜਾਬੀ', dir: 'ltr', displayFont: `'Anek Gurmukhi', 'Noto Sans Gurmukhi', ${SANS}`, font: `'Noto Sans Gurmukhi', ${SANS}`, enabled: false },
] as const satisfies readonly LocaleMeta[];

export interface LocaleMeta {
  code: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  displayFont: string;
  font: string;
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
