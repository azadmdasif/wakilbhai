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
    title: dict.pricing.title,
    description: dict.pricing.subtitle,
    alternates: localeAlternates(locale, '/pricing'),
  };
}

// Phase 0 stub: pricing tables come with the migrated services (Phase 1/2).
export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale as Locale);
  return (
    <div>
      <PageHeading title={dict.pricing.title} subtitle={dict.pricing.subtitle} />
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
