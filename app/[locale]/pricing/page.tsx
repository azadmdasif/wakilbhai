import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { getCategories, getServices } from '@/lib/content';
import PageHeading from '@/components/PageHeading';
import CategoryIcon from '@/components/CategoryIcon';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return buildMetadata({
    title: dict.pricing.title,
    description: dict.pricing.subtitle,
    path: '/pricing',
    locale,
  });
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const href = (path: string) => localePath(locale, path);

  const services = getServices();
  const categories = getCategories().filter((c) => services.some((s) => s.category === c.slug));

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeading title={dict.pricing.title} subtitle={dict.pricing.subtitle} />
      <div className="grid sm:grid-cols-2 gap-6">
        {categories.map((category) => {
          const categoryServices = services.filter((s) => s.category === category.slug);
          const minPrice = Math.min(...categoryServices.map((s) => s.priceINR));
          return (
            <div key={category.slug} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <CategoryIcon icon={category.icon} className="w-8 h-8 text-brand-gold" />
                <h2 className="text-xl font-bold text-white font-display">{category.title[locale]}</h2>
              </div>
              <p className="text-3xl font-extrabold text-brand-gold font-display mb-1">
                ₹{minPrice}
                <span className="text-sm font-normal text-gray-400 ms-2">{dict.pricing.onwards}</span>
              </p>
              <p className="text-sm text-gray-400 mb-4 flex-grow">{category.description[locale]}</p>
              <Link href={href(`/services#${category.slug}`)} className="text-brand-gold font-semibold hover:underline">
                {dict.pricing.viewServices} →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
