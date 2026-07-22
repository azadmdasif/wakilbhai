import Link from 'next/link';
import { getGuideMeta } from '@/lib/content';
import { localePath, type Locale } from '@/lib/i18n';

/** First sentence of the answer box, clamped — a one-line "why read this". */
function oneLineBenefit(answerBox: string): string {
  const firstSentence = answerBox.split(/(?<=[.!?।])\s/)[0].trim();
  if (firstSentence.length <= 120) return firstSentence;
  return `${firstSentence.slice(0, 117).trimEnd()}…`;
}

/**
 * "Related guides" block driven by a guide's front-matter relatedGuideSlugs.
 * Renders up to 4 paper cards (title + one-line benefit) — a warm reading
 * surface (CLAUDE.md) inside the dark guide shell.
 */
export default function RelatedGuides({
  slugs,
  locale,
  heading,
}: {
  slugs: string[];
  locale: Locale;
  heading: string;
}) {
  const guides = slugs
    .map(getGuideMeta)
    .filter((g): g is NonNullable<typeof g> => Boolean(g))
    .slice(0, 4);

  if (guides.length === 0) return null;

  return (
    <section aria-label={heading}>
      <h2 className="mb-6 font-display text-2xl font-bold text-[#1A1D23]">{heading}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={localePath(locale, `/help/${guide.category}/${guide.slug}`)}
            className="block rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="font-bold text-[#1A1D23] font-display mb-1">{guide.title[locale]}</p>
            <p className="text-sm text-[#6B7280] line-clamp-2">{oneLineBenefit(guide.answerBox[locale])}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
