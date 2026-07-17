import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, locales, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/site';
import { getCategories, getCategory, getGuidesByCategory, getServices, getTemplates } from '@/lib/content';
import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryIcon from '@/components/CategoryIcon';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schemas';

export function generateStaticParams() {
  return locales.flatMap((locale) => getCategories().map((category) => ({ locale, category: category.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;
  if (!isLocale(locale)) return {};
  const category = getCategory(categorySlug);
  if (!category) return {};
  return buildMetadata({
    title: category.title[locale],
    description: category.description[locale],
    path: `/help/${categorySlug}`,
    locale,
  });
}

export default async function CategoryHubPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale: rawLocale, category: categorySlug } = await params;
  const locale = rawLocale as Locale;
  const category = getCategory(categorySlug);
  if (!category) notFound();
  const dict = getDict(locale);

  const guides = getGuidesByCategory(category.slug);
  const services = getServices().filter((s) => s.category === category.slug);
  const templates = getTemplates().filter((t) => t.category === category.slug);
  const href = (path: string) => localePath(locale, path);

  return (
    <div className="max-w-5xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.ui.guide.breadcrumbHome, url: `${SITE_URL}${href('/')}` },
          { name: dict.ui.guide.breadcrumbHelp, url: `${SITE_URL}${href('/help')}` },
          { name: category.title[locale] },
        ])}
      />
      <Breadcrumbs
        crumbs={[
          { label: dict.ui.guide.breadcrumbHome, href: href('/') },
          { label: dict.ui.guide.breadcrumbHelp, href: href('/help') },
          { label: category.title[locale] },
        ]}
      />
      <div className="flex items-start gap-4 mb-10">
        <CategoryIcon icon={category.icon} className="w-12 h-12 text-brand-gold shrink-0 mt-1" />
        <div>
          <h1 className="text-4xl font-extrabold text-white font-display mb-2">{category.title[locale]}</h1>
          <p className="text-lg text-gray-400">{category.description[locale]}</p>
        </div>
      </div>

      {guides.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white font-display mb-6">{dict.ui.search.guides}</h2>
          <div className="space-y-4">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={href(`/help/${category.slug}/${guide.slug}`)}
                className="block bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-brand-gold/50 transition-colors"
              >
                <h3 className="text-xl font-bold text-white font-display mb-2">{guide.title[locale]}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{guide.answerBox[locale]}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {templates.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white font-display mb-6">{dict.ui.guide.relatedTemplates}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Link
                key={template.slug}
                href={href(`/templates/${template.slug}`)}
                className="block bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-brand-gold/50 transition-colors"
              >
                <p className="font-bold text-white mb-1">{template.title[locale]}</p>
                <p className="text-xs text-brand-gold">{dict.ui.template.free} · {template.fileFormats.map((f) => f.toUpperCase()).join(' / ')}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {services.length > 0 && !category.referralOnly && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white font-display mb-6">{dict.nav.services}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((service) => (
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
      )}
    </div>
  );
}
