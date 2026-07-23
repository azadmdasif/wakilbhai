import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLawyers } from '@/lib/content';
import PageHeading from '@/components/PageHeading';
import BciComplianceNote from '@/components/BciComplianceNote';
import { MapPinIcon } from '@/components/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return buildMetadata({
    title: dict.ui.lawyers.title,
    description: dict.ui.lawyers.subtitle,
    path: '/lawyers',
    locale,
  });
}

function initials(name: string): string {
  return name
    .replace(/^Adv\.?\s*/i, '')
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// Neutral, BCI-compliant listing: alphabetical order, no ratings, no
// superlatives, no fee promotion.
export default async function LawyerDirectoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const T = dict.ui.lawyers;
  const href = (path: string) => localePath(locale, path);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeading title={T.title} subtitle={T.subtitle} />
      <div className="grid sm:grid-cols-2 gap-6">
        {getLawyers().map((lawyer) => (
          <Link
            key={lawyer.id}
            href={href(`/lawyers/${lawyer.id}`)}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-brand-gold/50 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-14 h-14 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-brand-gold font-bold text-lg shrink-0">
                {initials(lawyer.name)}
              </span>
              <div>
                <h2 className="text-lg font-bold text-white font-display">{lawyer.name}</h2>
                <p className="flex items-center gap-1 text-sm text-gray-400">
                  <MapPinIcon className="w-4 h-4" />
                  {lawyer.location}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              <span className="text-gray-500">{T.practiceAreas}:</span> {lawyer.practiceAreas.join(', ')}
            </p>
            <p className="text-sm text-brand-gold mt-3">{T.viewProfile} →</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 max-w-2xl mx-auto">
        <BciComplianceNote dict={dict} />
        <p className="text-xs text-gray-500 text-center mt-6">{T.note}</p>
      </div>
    </div>
  );
}
