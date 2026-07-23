/**
 * Verifiable customer reviews.
 *
 * ⚠️  ONLY add entries here that are REAL and independently verifiable:
 *   - source "google"   → the review actually exists on our Google Business
 *                          Profile (so a reader can find it there), and
 *   - source "whatsapp" → a genuine WhatsApp message from the customer, quoted
 *                          with their consent.
 * Never invent, embellish or pad this list. If there are no real reviews yet,
 * leave the array empty — the homepage Reviews section then hides itself
 * entirely rather than showing fake social proof.
 *
 * Keep each `text` to 40 words or fewer (enforced by getReviews at load time).
 */

export type ReviewSource = 'google' | 'whatsapp';

export interface Review {
  /** Reviewer's name as they gave it (first name / initial is fine). */
  name: string;
  /** City, for local relatability. */
  city: string;
  /** The service or guide they used, e.g. "Rent agreement" or "Legal notice". */
  service: string;
  /** ISO date (YYYY-MM-DD) the review was left. */
  date: string;
  /** The review text, verbatim. ≤ 40 words. */
  text: string;
  source: ReviewSource;
}

/**
 * Real reviews only — empty until we have verifiable ones (see file header).
 *
 * Shape reference (do NOT publish until real):
 * {
 *   name: 'Rahul',
 *   city: 'Pune',
 *   service: 'Rent agreement',
 *   date: '2026-06-01',
 *   text: 'Got my rent agreement drafted and delivered in two days over WhatsApp. Clear pricing, no running around.',
 *   source: 'whatsapp',
 * }
 */
export const reviews: Review[] = [];

const MAX_WORDS = 40;

/**
 * Verified reviews, newest first. Throws at load time if any entry breaks the
 * ≤40-word rule, so an over-long review fails the build instead of shipping.
 */
export function getReviews(): Review[] {
  for (const r of reviews) {
    const words = r.text.trim().split(/\s+/).filter(Boolean).length;
    if (words > MAX_WORDS) {
      throw new Error(`Review by ${r.name} (${r.city}) is ${words} words; max is ${MAX_WORDS}.`);
    }
  }
  return [...reviews].sort((a, b) => b.date.localeCompare(a.date));
}
