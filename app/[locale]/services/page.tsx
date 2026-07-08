import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { getCategories, getServices } from '@/lib/content';
import PageHeading from '@/components/PageHeading';
import CategoryIcon from '@/components/CategoryIcon';

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

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const href = (path: string) => localePath(locale, path);

  const services = getServices();
  const general = services.filter((s) => s.category === 'general');
  const categories = getCategories().filter((c) => services.some((s) => s.category === c.slug));

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeading title={dict.services.title} subtitle={dict.services.subtitle} />

      {general.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {general.map((service) => (
            <Link
              key={service.id}
              href={href(`/services/${service.id}`)}
              className="flex items-center justify-between gap-4 bg-gray-900 border border-brand-gold/40 rounded-2xl p-6 hover:border-brand-gold transition-colors"
            >
              <div>
                <p className="font-bold text-white text-lg">{service.title[locale]}</p>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{service.description[locale]}</p>
              </div>
              <p className="text-brand-gold font-extrabold font-display text-2xl shrink-0">₹{service.priceINR}</p>
            </Link>
          ))}
        </div>
      )}

      {categories.map((category) => (
        <section key={category.slug} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <CategoryIcon icon={category.icon} className="w-7 h-7 text-brand-gold" />
            <h2 className="text-2xl font-bold text-white font-display">{category.title[locale]}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {services
              .filter((s) => s.category === category.slug)
              .map((service) => (
                <Link
                  key={service.id}
                  href={href(`/services/${service.id}`)}
                  className="flex items-center justify-between gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-brand-gold/50 transition-colors"
                >
                  <p className="font-bold text-white">{service.title[locale]}</p>
                  <p className="text-brand-gold font-extrabold font-display shrink-0">₹{service.priceINR}</p>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
