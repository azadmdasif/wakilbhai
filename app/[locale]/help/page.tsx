import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { getCategories, getGuidesByCategory } from '@/lib/content';
import PageHeading from '@/components/PageHeading';
import CategoryIcon from '@/components/CategoryIcon';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    title: dict.ui.guide.breadcrumbHelp,
    description: dict.ui.home.categoriesTitle,
    alternates: localeAlternates(locale, '/help'),
  };
}

export default async function HelpIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);

  return (
    <div>
      <PageHeading title={dict.ui.guide.breadcrumbHelp} subtitle={dict.ui.home.categoriesTitle} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCategories().map((category) => {
          const guideCount = getGuidesByCategory(category.slug).length;
          return (
            <Link
              key={category.slug}
              href={localePath(locale, `/help/${category.slug}`)}
              className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-brand-gold/50 transition-colors"
            >
              <CategoryIcon icon={category.icon} className="w-10 h-10 text-brand-gold mb-4" />
              <h2 className="text-xl font-bold text-white font-display mb-2 group-hover:text-brand-gold transition-colors">
                {category.title[locale]}
              </h2>
              <p className="text-sm text-gray-400">{category.description[locale]}</p>
              {guideCount > 0 && (
                <p className="text-xs text-brand-gold mt-3">
                  {guideCount} {dict.ui.search.guides}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
