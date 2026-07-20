import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return buildMetadata({
    title: dict.ui.pages.editorialTitle,
    description: dict.ui.pages.editorialBody.slice(0, 155),
    path: '/editorial-policy',
    locale,
  });
}

export default async function EditorialPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale as Locale);
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-white font-display mb-8">{dict.ui.pages.editorialTitle}</h1>
      <p className="text-lg text-gray-300 leading-relaxed">{dict.ui.pages.editorialBody}</p>
    </article>
  );
}
