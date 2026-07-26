import en from '@/messages/en.json';
import hi from '@/messages/hi.json';
import ur from '@/messages/ur.json';
import bn from '@/messages/bn.json';
import mr from '@/messages/mr.json';
import te from '@/messages/te.json';
import ta from '@/messages/ta.json';
import gu from '@/messages/gu.json';
import type { Locale } from './i18n';

/**
 * UI message catalogs. The full string set for every locale lives in
 * messages/{locale}.json (next-intl convention) — components read strings from
 * here via getDict(), never hard-code them. `en` is the source-of-truth shape.
 *
 * A locale file only needs the strings that have been translated: at load time
 * each catalog is deep-merged over English, so any untranslated key falls back
 * to en instead of rendering `undefined`. This lets a rollout locale (mr, te)
 * ship the high-traffic strings first and fill in the rest over time.
 */
export type Dict = typeof en;

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

/** Recursively overlay `override` onto `base`, returning a full `base`-shaped object. */
function deepMerge<T>(base: T, override: DeepPartial<T>): T {
  if (Array.isArray(base)) return (override ?? base) as T;
  if (base && typeof base === 'object') {
    const out = { ...base } as Record<string, unknown>;
    for (const key of Object.keys(base as Record<string, unknown>)) {
      const o = (override as Record<string, unknown> | undefined)?.[key];
      if (o !== undefined) out[key] = deepMerge((base as Record<string, unknown>)[key], o as never);
    }
    return out as T;
  }
  return (override ?? base) as T;
}

// Every non-English catalog deep-merges over en: fully-translated locales
// (hi/ur/bn) get safety against newly-added keys, rollout locales get their
// designed partial-translation behaviour. en stays the source of truth shape.
const dicts: Record<Locale, Dict> = {
  en,
  hi: deepMerge(en, hi as DeepPartial<Dict>),
  ur: deepMerge(en, ur as DeepPartial<Dict>),
  bn: deepMerge(en, bn as DeepPartial<Dict>),
  mr: deepMerge(en, mr as DeepPartial<Dict>),
  te: deepMerge(en, te as DeepPartial<Dict>),
  ta: deepMerge(en, ta as DeepPartial<Dict>),
  gu: deepMerge(en, gu as DeepPartial<Dict>),
};

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}
