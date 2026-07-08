import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    title: dict.legal.privacyTitle,
    alternates: localeAlternates(locale, '/privacy'),
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale as Locale);

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-white font-display mb-8">{dict.legal.privacyTitle}</h1>
      <div className="text-gray-300 leading-relaxed space-y-4">
        {dict.legal.privacyContent.split('\n\n').map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line">{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
