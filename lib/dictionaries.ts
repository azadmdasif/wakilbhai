import en from '@/messages/en.json';
import hi from '@/messages/hi.json';
import ur from '@/messages/ur.json';
import bn from '@/messages/bn.json';
import type { Locale } from './i18n';

/**
 * UI message catalogs. The full string set for every locale lives in
 * messages/{locale}.json (next-intl convention) — components read strings from
 * here via getDict(), never hard-code them. `en` is the source-of-truth shape;
 * the other locales are typed against it.
 */
export type Dict = typeof en;

const dicts: Record<Locale, Dict> = {
  en,
  hi: hi as Dict,
  ur: ur as Dict,
  bn: bn as Dict,
};

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}
