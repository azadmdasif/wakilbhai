/**
 * Limitation-period lookup data.
 *
 * Windows are sourced primarily from the Schedule to the Limitation Act, 1963
 * (article numbers cited per entry). Two of the most-searched windows are
 * governed by their own special statutes — cheque-bounce complaints by the
 * Negotiable Instruments Act, 1881 and consumer complaints by the Consumer
 * Protection Act, 2019 — and are cited to those Acts instead. Verify the
 * current provision before relying on it; special laws can override the
 * Limitation Act, and courts can condone delay in some cases.
 *
 * Localized problem labels and the "counted from" text live in the dictionary
 * (ui.calc.limitation.items[id]); this file holds only the neutral, non-locale
 * data (the window, the statutory citation and the matching guide slug).
 */

export type LimitationUnit = 'years' | 'months' | 'days';

export interface LimitationEntry {
  /** Stable id — also the dictionary key for the label + "counted from" text. */
  id: string;
  window: { value: number; unit: LimitationUnit };
  /** Statutory citation shown as the source, e.g. "Article 55, Limitation Act, 1963". */
  citation: string;
  /** Matching guide slug, resolved to a link by the tool page. */
  guideSlug?: string;
}

export const LIMITATION: LimitationEntry[] = [
  { id: 'money-lent', window: { value: 3, unit: 'years' }, citation: 'Article 19–21, Limitation Act, 1963', guideSlug: 'friend-not-returning-money' },
  { id: 'breach-of-contract', window: { value: 3, unit: 'years' }, citation: 'Article 55, Limitation Act, 1963' },
  { id: 'price-of-goods', window: { value: 3, unit: 'years' }, citation: 'Article 14, Limitation Act, 1963' },
  { id: 'arrears-of-rent', window: { value: 3, unit: 'years' }, citation: 'Article 52, Limitation Act, 1963' },
  { id: 'security-deposit', window: { value: 3, unit: 'years' }, citation: 'Article 22, Limitation Act, 1963', guideSlug: 'security-deposit-not-returned' },
  { id: 'immovable-possession', window: { value: 12, unit: 'years' }, citation: 'Article 65, Limitation Act, 1963', guideSlug: 'illegal-possession-eviction' },
  { id: 'property-partition', window: { value: 12, unit: 'years' }, citation: 'Article 110, Limitation Act, 1963' },
  { id: 'cheque-138', window: { value: 1, unit: 'months' }, citation: 'Section 142(b), Negotiable Instruments Act, 1881', guideSlug: 'cheque-bounce-what-to-do' },
  { id: 'consumer-complaint', window: { value: 2, unit: 'years' }, citation: 'Section 69, Consumer Protection Act, 2019', guideSlug: 'consumer-forum-complaint-guide' },
  { id: 'residuary', window: { value: 3, unit: 'years' }, citation: 'Article 113, Limitation Act, 1963' },
];

export const getLimitationEntry = (id: string): LimitationEntry | undefined => LIMITATION.find((e) => e.id === id);
