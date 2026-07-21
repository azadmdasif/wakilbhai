import { z } from 'zod';
import { enabledLocaleCodes } from './locales';
import type { Locale } from '../i18n';

/**
 * A localized-field Zod schema: `en` is required, every other enabled locale is
 * optional, and any locale missing from the source falls back to `en` at parse
 * time. Every content loader (guides, services, templates, cities, tools,
 * lawyers, testimonials) uses this so a locale can be enabled in the registry
 * and translated content-by-content — untranslated strings render in English
 * until filled, and direct `field[locale]` access is always safe.
 */
export function localized<T>(inner: z.ZodType<T>): z.ZodType<Record<Locale, T>> {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const code of enabledLocaleCodes) shape[code] = code === 'en' ? inner : inner.optional();
  return z
    .object(shape)
    .transform((obj) => {
      const out = {} as Record<Locale, T>;
      for (const code of enabledLocaleCodes) out[code] = (obj[code] ?? obj.en) as T;
      return out;
    }) as unknown as z.ZodType<Record<Locale, T>>;
}
