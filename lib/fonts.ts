import {
  Anek_Latin,
  Anek_Devanagari,
  Anek_Bangla,
  Noto_Sans,
  Noto_Sans_Devanagari,
  Noto_Sans_Bengali,
  Noto_Nastaliq_Urdu,
} from 'next/font/google';
import type { Locale } from './i18n';

/**
 * Per-locale font loading (next/font). Each locale gets a display face
 * (Anek {Script}) and a body face (Noto Sans {Script}); Urdu uses Noto Nastaliq
 * Urdu for both. Every instance exposes the SAME two CSS variables
 * (--font-display, --font-body) but is loaded from its own script subset, so a
 * page only ever pulls the fonts for the one locale whose class is applied.
 *
 * The variables feed Tailwind's `font-display` / `font-sans` families
 * (tailwind.config.ts), and the language registry (lib/i18n/locales.ts) mirrors
 * the family names for documentation and SSR fallbacks.
 *
 * Only enabled locales are instantiated. Add a rollout locale's pair here (and
 * to the `FONT_CLASS` map) when flipping its `enabled` flag.
 */

// English — Latin. Body is the LCP face on the default route, so it preloads.
const enBody = Noto_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap', preload: true });
const enDisplay = Anek_Latin({ subsets: ['latin'], variable: '--font-display', display: 'swap', preload: false });

// Hindi (Marathi later) — Devanagari. Latin subset kept for ₹ figures / brand.
const hiBody = Noto_Sans_Devanagari({ subsets: ['devanagari', 'latin'], variable: '--font-body', display: 'swap', preload: false });
const hiDisplay = Anek_Devanagari({ subsets: ['devanagari', 'latin'], variable: '--font-display', display: 'swap', preload: false });

// Bengali — Bangla. Latin subset kept for ₹ figures / brand.
const bnBody = Noto_Sans_Bengali({ subsets: ['bengali', 'latin'], variable: '--font-body', display: 'swap', preload: false });
const bnDisplay = Anek_Bangla({ subsets: ['bengali', 'latin'], variable: '--font-display', display: 'swap', preload: false });

// Urdu — Nastaliq (rtl). Same face for display and body; we set both variables
// explicitly so Urdu body text stays Nastaliq even when nested under another
// locale's document (e.g. the /dev/type-test page). Same source file → the
// browser fetches it once.
const urDisplay = Noto_Nastaliq_Urdu({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-display', display: 'swap', preload: false });
const urBody = Noto_Nastaliq_Urdu({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-body', display: 'swap', preload: false });

/** className that sets --font-display and --font-body for a locale. */
const FONT_CLASS: Record<Locale, string> = {
  en: `${enBody.variable} ${enDisplay.variable}`,
  hi: `${hiBody.variable} ${hiDisplay.variable}`,
  bn: `${bnBody.variable} ${bnDisplay.variable}`,
  ur: `${urBody.variable} ${urDisplay.variable}`,
};

/**
 * The font-variable class(es) to apply for a locale — on <html> for the whole
 * document, or on any element to scope a script's fonts (e.g. the type-test).
 */
export function localeFontClass(locale: Locale): string {
  return FONT_CLASS[locale];
}
