import Link from 'next/link';
import { localePath, localeLang, type Locale } from '@/lib/i18n';
import { findPersonByName, isRealReviewer } from '@/content/people';

/**
 * Guide credit line: "Updated on … · Written by {author} · Reviewed by Adv.
 * {name}, {barCouncil}". Author and a genuine advocate reviewer link to their
 * indexable /people/{slug} profile. When the assigned reviewer is still a
 * placeholder (or unknown), we do NOT print a name — the line honestly reads
 * "Review pending", matching the omission of `reviewedBy` in the Article schema.
 */

function formatDate(iso: string, locale: Locale): string {
  // numberingSystem: 'latn' keeps digits Latin so dates read the same across scripts.
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(localeLang[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    numberingSystem: 'latn',
  });
}

export interface ByLineLabels {
  updatedOn: string;
  writtenBy: string;
  reviewedBy: string;
  reviewPending: string;
}

export default function ByLine({
  locale,
  authorName,
  reviewerName,
  updatedAt,
  labels,
}: {
  locale: Locale;
  authorName: string;
  reviewerName: string;
  updatedAt: string;
  labels: ByLineLabels;
}) {
  const author = findPersonByName(authorName);
  const reviewer = findPersonByName(reviewerName);
  const realReviewer = isRealReviewer(reviewer) ? reviewer : undefined;

  const link = 'font-semibold text-[#1A1D23] underline decoration-black/20 underline-offset-2 hover:decoration-brand-red';

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#6B7280]">
      <span>
        {labels.updatedOn}: <time dateTime={updatedAt}>{formatDate(updatedAt, locale)}</time>
      </span>
      <span aria-hidden>·</span>
      <span>
        {labels.writtenBy}{' '}
        {author ? (
          <Link href={localePath(locale, `/people/${author.slug}`)} className={link}>
            {author.name}
          </Link>
        ) : (
          authorName
        )}
      </span>
      <span aria-hidden>·</span>
      <span>
        {realReviewer ? (
          <>
            {labels.reviewedBy}{' '}
            <Link href={localePath(locale, `/people/${realReviewer.slug}`)} className={link}>
              Adv. {realReviewer.name}
            </Link>
            {realReviewer.barCouncil ? `, ${realReviewer.barCouncil}` : ''}
          </>
        ) : (
          <span className="italic">{labels.reviewPending}</span>
        )}
      </span>
    </div>
  );
}
