import en from '@/content/i18n/en.json';
import hi from '@/content/i18n/hi.json';
import ur from '@/content/i18n/ur.json';
import bn from '@/content/i18n/bn.json';
import type { Locale } from './i18n';

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
