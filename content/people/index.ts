/**
 * People registry — the single source of truth for the humans (and the
 * editorial team) credited across WakilBhai: guide authors and the independent
 * advocate partners who review legal content.
 *
 * Two roles:
 *   - `author`            — writes/maintains a guide (may be a named person or
 *                           the in-house editorial team).
 *   - `advocate-reviewer` — an independent advocate who has legally reviewed a
 *                           guide. Their name only appears as a public trust
 *                           signal once `placeholder` is false.
 *
 * ⚠️  TODO(trust): EVERY advocate entry below is a PLACEHOLDER. The names, bar
 * councils, enrolment numbers and bios are structured stand-ins so the byline,
 * profile pages and schema plumbing are wired end-to-end — they are NOT real
 * advocates and NOTHING has been reviewed by them yet. Until a partner is
 * genuinely onboarded:
 *   1. replace their entry with the real name / Bar Council / enrolment no.,
 *   2. confirm the bio + practice areas with the advocate, then
 *   3. set `placeholder: false`.
 * While `placeholder` is true the guide byline honestly shows "Review pending"
 * and no `reviewedBy` is emitted in the Article schema — we never claim a
 * review that did not happen.
 */

export type PersonRole = 'author' | 'advocate-reviewer';

export interface Person {
  /** URL slug → /people/{slug}. Derived from the display name. */
  slug: string;
  /** Display name, WITHOUT the "Adv." honorific (added at render time). */
  name: string;
  role: PersonRole;
  /** Enrolling Bar Council — advocate-reviewers only. */
  barCouncil?: string;
  /** State Bar Council enrolment number — advocate-reviewers only. */
  enrolmentNo?: string;
  /** ~60-word bio for the profile page. */
  bio: string;
  /** Public path to a headshot in /public, if we have one. */
  photo?: string;
  /** Practice / editorial areas, used on the profile and in `knowsAbout`. */
  areas: string[];
  /**
   * True until real, verified details are in place. Placeholder advocates are
   * never surfaced as a review credit (byline shows "Review pending", schema
   * omits `reviewedBy`); their profile page carries a visible pending notice.
   */
  placeholder: boolean;
}

/**
 * Convert a display name to a slug. Kept trivial and deterministic so the same
 * name always resolves to the same profile URL and registry entry.
 */
export function personSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/^adv\.?\s+/, '') // drop a leading "Adv." honorific
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const people: Person[] = [
  {
    slug: 'wakilbhai-editorial-team',
    name: 'WakilBhai Editorial Team',
    role: 'author',
    bio: 'The WakilBhai editorial team researches every guide from official sources — India Code, court and government portals, and state legal-aid material — and writes it in plain language for non-lawyers. Drafts are sent to an independent advocate for legal review before publication and re-checked each quarter to stay current.',
    areas: ['Legal research', 'Plain-language drafting', 'Consumer rights', 'Documentation'],
    // The editorial team is a real in-house function, so it is credited as an
    // author without the placeholder caveat — but see the TODO below to add
    // named writers as the team grows.
    // TODO(trust): split into named individual authors when available.
    placeholder: false,
  },

  // ─── Advocate reviewers — ALL PLACEHOLDER (see file header) ───────────────
  {
    slug: 'rohan-mehta',
    name: 'Rohan Mehta',
    role: 'advocate-reviewer',
    barCouncil: 'Bar Council of Maharashtra & Goa',
    enrolmentNo: 'MAH/2214/2011', // TODO(trust): PLACEHOLDER enrolment — unverified.
    bio: 'PLACEHOLDER PROFILE. An advocate practising in the civil and property courts of Maharashtra, focused on tenancy, real-estate documentation and consumer disputes. This entry is a structured stand-in used to wire up the review byline; the details are not yet verified and no guide has actually been reviewed by this person.',
    areas: ['Property', 'Tenancy & rent', 'Consumer disputes', 'Civil litigation'],
    placeholder: true,
  },
  {
    slug: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'advocate-reviewer',
    barCouncil: 'Bar Council of Delhi',
    enrolmentNo: 'D/1284/2016', // TODO(trust): PLACEHOLDER enrolment — unverified.
    bio: 'PLACEHOLDER PROFILE. An advocate based in Delhi with an interest in consumer protection, cyber-crime complaints and family matters. This entry is a structured stand-in used to wire up the review byline; the details are not yet verified and no guide has actually been reviewed by this person.',
    areas: ['Consumer protection', 'Cyber-crime', 'Family law', 'Women’s rights'],
    placeholder: true,
  },
  {
    slug: 'arjun-nair',
    name: 'Arjun Nair',
    role: 'advocate-reviewer',
    barCouncil: 'Bar Council of Kerala',
    enrolmentNo: 'KER/0973/2012', // TODO(trust): PLACEHOLDER enrolment — unverified.
    bio: 'PLACEHOLDER PROFILE. An advocate practising in Kerala across labour, service and administrative matters, including pensions and government-scheme grievances. This entry is a structured stand-in used to wire up the review byline; the details are not yet verified and no guide has actually been reviewed by this person.',
    areas: ['Labour & employment', 'Pensions', 'Government schemes', 'Administrative law'],
    placeholder: true,
  },
  {
    slug: 'sneha-iyer',
    name: 'Sneha Iyer',
    role: 'advocate-reviewer',
    barCouncil: 'Bar Council of Tamil Nadu & Puducherry',
    enrolmentNo: 'TN/1187/2013', // TODO(trust): PLACEHOLDER enrolment — unverified.
    bio: 'PLACEHOLDER PROFILE. An advocate in Tamil Nadu working on motor-accident claims, criminal complaints and cheque-bounce cases. This entry is a structured stand-in used to wire up the review byline; the details are not yet verified and no guide has actually been reviewed by this person.',
    areas: ['Motor accident claims', 'Criminal complaints', 'Cheque bounce', 'Negotiable instruments'],
    placeholder: true,
  },
];

const bySlug = new Map(people.map((p) => [p.slug, p]));
const byName = new Map(people.map((p) => [personSlug(p.name), p]));

/** Every registered person, in registry order. */
export function getPeople(): Person[] {
  return people;
}

/** Look up a person by their profile slug. */
export function getPerson(slug: string): Person | undefined {
  return bySlug.get(slug);
}

/**
 * Resolve a raw byline name (as stored on a guide, e.g. "Adv. Priya Sharma" or
 * "WakilBhai Editorial Team") to a registry Person, matching on the slugified
 * name so the "Adv." honorific and punctuation don't matter. Returns undefined
 * when no entry matches.
 */
export function findPersonByName(name: string): Person | undefined {
  return byName.get(personSlug(name));
}

/**
 * A person is credited as a genuine reviewer only when they exist in the
 * registry, hold the advocate-reviewer role, and are no longer a placeholder.
 * Everything else honestly renders as "Review pending".
 */
export function isRealReviewer(person: Person | undefined): person is Person {
  return !!person && person.role === 'advocate-reviewer' && !person.placeholder;
}
