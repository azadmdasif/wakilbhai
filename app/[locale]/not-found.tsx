import Link from 'next/link';
import { defaultLocale, localePath } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { getGuideMetas } from '@/lib/content';
import SearchBox from '@/components/SearchBox';
import WhatsAppConsultBlock from '@/components/WhatsAppConsultBlock';

// Locale isn't available to not-found components, so default to English.
export default function NotFound() {
  const locale = defaultLocale;
  const dict = getDict(locale);
  const guides = getGuideMetas().slice(0, 6);
  const href = (path: string) => localePath(locale, path);

  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <p className="text-6xl font-extrabold text-brand-gold font-display mb-2">404</p>
      <h1 className="text-3xl font-bold text-white font-display mb-2">{dict.ui.notFound.heading}</h1>
      <p className="text-gray-400 mb-8">{dict.ui.notFound.blurb}</p>

      <WhatsAppConsultBlock
        title={dict.ui.deadEnd.title}
        subtitle={dict.ui.deadEnd.subtitle}
        cta={dict.common.whatsappLawyerFree}
        source="not-found"
      />

      <div className="my-8">
        <SearchBox
          locale={locale}
          placeholder={dict.ui.search.placeholder}
          label={dict.ui.search.label}
          noResultsText={dict.ui.search.noResults}
          askWhatsAppText={dict.ui.search.askWhatsApp}
          typeLabels={{
            guide: dict.ui.search.guides,
            template: dict.ui.search.templates,
            service: dict.ui.search.services,
          }}
        />
      </div>

      {guides.length > 0 && (
        <div className="text-start">
          <p className="text-sm font-semibold text-gray-400 mb-3">{dict.ui.notFound.popular}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={href(`/help/${guide.category}/${guide.slug}`)}
                className="block bg-gray-900 border border-gray-800 rounded-2xl p-4 text-sm font-bold text-white hover:border-brand-gold/50 transition-colors"
              >
                {guide.title[locale]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
