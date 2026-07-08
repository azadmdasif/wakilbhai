import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { WHATSAPP_NUMBER } from '@/lib/site';
import PageHeading from '@/components/PageHeading';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    title: dict.ask.title,
    description: dict.ask.subtitle,
    alternates: localeAlternates(locale, '/talk-to-a-lawyer'),
  };
}

// Phase 0 stub: the full ask-question flow (form + assistant) lands in
// Phase 2/6. WhatsApp and phone remain the capture channels meanwhile.
export default async function TalkToLawyerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale as Locale);
  return (
    <div>
      <PageHeading title={dict.ask.title} subtitle={dict.ask.subtitle} />
      <div className="max-w-xl mx-auto bg-gray-900 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white font-display">{dict.ask.instantConsultationTitle}</h2>
        <p className="text-gray-400">{dict.ask.instantConsultationDesc}</p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-bold py-3 px-8 rounded-full text-lg bg-whatsapp text-white hover:bg-green-700 transition-colors"
        >
          {dict.common.whatsappCta}
        </a>
      </div>
    </div>
  );
}
