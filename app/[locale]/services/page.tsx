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
    title: dict.services.title,
    description: dict.services.subtitle,
    alternates: localeAlternates(locale, '/services'),
  };
}

// Phase 0 stub: the full service catalogue arrives with the content layer
// (Phase 1) and service pages (Phase 2).
export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale as Locale);
  return (
    <div>
      <PageHeading title={dict.services.title} subtitle={dict.services.subtitle} />
      <div className="text-center">
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
