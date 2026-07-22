import { z } from 'zod';
import { enabledLocaleCodes } from '../i18n/locales';
import type { Locale } from '../i18n';

/**
 * The typed, per-locale front-matter contract for a guide — the single source
 * of truth for a guide's data shape. Content is stored per guide as a localized
 * meta.json plus an MDX body (see ./index); resolving that for one locale yields
 * a `GuideFrontmatter`, which is validated against this schema at load/build.
 * An invalid guide therefore fails the build with a readable, path-pointed
 * Zod error rather than rendering broken.
 */

const reviewerSchema = z.object({
  /** e.g. "Adv. Rohan Mehta" */
  name: z.string().min(1),
  /** e.g. "Bar Council of Maharashtra & Goa" */
  barCouncil: z.string().min(1),
  /** enrolment number, e.g. "MAH/2214/2011" */
  enrolment: z.string().min(1),
});

const deadlineSchema = z.object({
  label: z.string().min(1),
  duration: z.string().min(1),
  startsFrom: z.string().min(1),
});

const stepSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  /** MDX detail, rendered inside the expandable step card. */
  detail: z.string().min(1),
  /** Optional service id the step upsells. */
  serviceHint: z.string().optional(),
});

const costsSchema = z.object({
  rows: z.array(z.object({ label: z.string().min(1), amount: z.string().min(1), note: z.string().optional() })).min(1),
  footnote: z.string().optional(),
});

const faqSchema = z.object({ q: z.string().min(1), a: z.string().min(1) });

/** A live locale code (registry-derived). */
const localeSchema = z.enum(enabledLocaleCodes as [Locale, ...Locale[]]);

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected an ISO date (YYYY-MM-DD)');

export const guideFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'kebab-case slug expected'),
  category: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'kebab-case category slug expected'),
  locale: localeSchema,
  /** Meta description for SEO (140–160 chars in en; may be shorter in others). */
  description: z.string().min(1),
  /** The 40–60 word "60-second answer" surfaced at the top of the guide. */
  quickAnswer: z.string().min(1),
  keyNumbers: z.array(z.string().min(1)),
  deadlines: z.array(deadlineSchema),
  steps: z.array(stepSchema),
  costs: costsSchema.optional(),
  faqs: z.array(faqSchema),
  /** Slugs of related guides. */
  relatedSlugs: z.array(z.string()),
  /** Primary paid service this guide maps to (omitted for referral-only categories). */
  serviceSlug: z.string().optional(),
  servicePrice: z.number().int().positive().optional(),
  /** Slugs of free templates offered for this problem. */
  templates: z.array(z.string()),
  /** Last-updated date (dateModified). */
  updated: isoDate,
  author: z.string().min(1),
  reviewer: reviewerSchema,
  /** True when this locale's translation is scaffolded but not yet review-approved. */
  draft: z.boolean(),
});

export type GuideFrontmatter = z.infer<typeof guideFrontmatterSchema>;
export type Reviewer = z.infer<typeof reviewerSchema>;

/**
 * Parse the canonical reviewer string ("Adv. [name], [Bar Council …],
 * [enrolment no.]" — the CLAUDE.md format) into its structured parts. Throws a
 * readable error if it is not exactly three comma-separated segments, so a
 * malformed byline fails the build instead of silently mis-splitting.
 */
export function parseReviewer(raw: string): Reviewer {
  const parts = raw.split(',').map((p) => p.trim());
  if (parts.length !== 3 || parts.some((p) => p.length === 0)) {
    throw new Error(
      `Invalid reviewer byline: ${JSON.stringify(raw)}. Expected "Adv. Name, Bar Council of …, EnrolmentNo".`,
    );
  }
  const [name, barCouncil, enrolment] = parts;
  return { name, barCouncil, enrolment };
}
