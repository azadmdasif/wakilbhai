import type { Review } from '@/content/reviews';
import type { Locale } from '@/lib/i18n';
import { localeLang } from '@/lib/i18n';
import { StarIcon, WhatsAppIcon } from './Icons';

export interface ReviewsStrings {
  googleCta: string;
  googleBadge: string;
  whatsappBadge: string;
}

/** Month-year label, Latin digits so it reads the same across scripts. */
function reviewDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(localeLang[locale], {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
    numberingSystem: 'latn',
  });
}

/** Source badge — WhatsApp keeps its reserved green; Google uses a neutral gold star. */
function SourceBadge({ review, strings }: { review: Review; strings: ReviewsStrings }) {
  if (review.source === 'whatsapp') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp/15 px-2.5 py-1 text-xs font-semibold text-whatsapp">
        <WhatsAppIcon className="h-3.5 w-3.5" aria-hidden />
        {strings.whatsappBadge}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold text-gray-200">
      <StarIcon className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
      {strings.googleBadge}
    </span>
  );
}

/**
 * Verifiable reviews grid for the homepage (dark shell). Renders NOTHING when
 * there are no reviews — no fake filler, no empty state. When `gbpUrl` is set,
 * a "Review us on Google" link is offered so real reviews can accumulate.
 */
export default function Reviews({
  reviews,
  locale,
  title,
  strings,
  gbpUrl,
}: {
  reviews: Review[];
  locale: Locale;
  title: string;
  strings: ReviewsStrings;
  gbpUrl?: string;
}) {
  if (reviews.length === 0) return null;

  return (
    <section>
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-bold text-white md:text-3xl">{title}</h2>
        {gbpUrl && (
          <a
            href={gbpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 whitespace-nowrap text-sm font-semibold text-brand-gold hover:underline"
          >
            {strings.googleCta} →
          </a>
        )}
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {reviews.map((review, i) => (
          <figure key={`${review.name}-${i}`} className="flex h-full flex-col rounded-2xl bg-gray-900 p-8 shadow-lg">
            <div className="mb-4">
              <SourceBadge review={review} strings={strings} />
            </div>
            <blockquote className="flex-grow text-gray-300">“{review.text}”</blockquote>
            <figcaption className="mt-6">
              <p className="font-bold text-white">{review.name}</p>
              <p className="text-sm text-gray-500">
                {review.city} · {review.service} · {reviewDate(review.date, locale)}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
