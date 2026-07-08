import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, locales, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { getLawyer, getLawyers } from '@/lib/content';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MapPinIcon } from '@/components/Icons';

export function generateStaticParams() {
  return locales.flatMap((locale) => getLawyers().map((lawyer) => ({ locale, id: lawyer.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};
  const lawyer = getLawyer(id);
  if (!lawyer) return {};
  return {
    title: lawyer.name,
    description: lawyer.bio[locale],
    alternates: localeAlternates(locale, `/lawyers/${id}`),
  };
}

export default async function LawyerProfilePage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale: rawLocale, id } = await params;
  const locale = rawLocale as Locale;
  const lawyer = getLawyer(id);
  if (!lawyer) notFound();
  const dict = getDict(locale);
  const T = dict.ui.lawyers;
  const href = (path: string) => localePath(locale, path);

  return (
    <div className="max-w-3xl mx-auto">
      <Breadcrumbs
        crumbs={[
          { label: dict.ui.guide.breadcrumbHome, href: href('/') },
          { label: T.title, href: href('/lawyers') },
          { label: lawyer.name },
        ]}
      />
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-white font-display mb-2">{lawyer.name}</h1>
        <p className="flex items-center gap-2 text-gray-400 mb-6">
          <MapPinIcon className="w-5 h-5 text-brand-gold" />
          {lawyer.location}
        </p>
        <p className="text-gray-300 leading-relaxed mb-8">{lawyer.bio[locale]}</p>
        <dl className="grid sm:grid-cols-2 gap-6 text-sm">
          <div>
            <dt className="text-gray-500 mb-1">{T.practiceAreas}</dt>
            <dd className="text-gray-200">{lawyer.practiceAreas.join(', ')}</dd>
          </div>
          <div>
            <dt className="text-gray-500 mb-1">{T.languages}</dt>
            <dd className="text-gray-200">{lawyer.languages.join(', ')}</dd>
          </div>
        </dl>
        <div className="mt-8 border-t border-gray-800 pt-6">
          <Link
            href={href('/services/consultation-call')}
            className="inline-block font-bold py-3 px-8 rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors"
          >
            {dict.ui.rail.referralCta}
          </Link>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center mt-8">{T.note}</p>
    </div>
  );
}
