import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { getCategories, getTemplates } from '@/lib/content';
import PageHeading from '@/components/PageHeading';
import CategoryIcon from '@/components/CategoryIcon';
import { DownloadIcon } from '@/components/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return buildMetadata({
    title: dict.ui.template.indexTitle,
    description: dict.ui.template.indexSubtitle,
    path: '/templates',
    locale,
  });
}

export default async function TemplatesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const href = (path: string) => localePath(locale, path);

  const templates = getTemplates();
  const categories = getCategories().filter((c) => templates.some((t) => t.category === c.slug));

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeading title={dict.ui.template.indexTitle} subtitle={dict.ui.template.indexSubtitle} />
      {categories.map((category) => (
        <section key={category.slug} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <CategoryIcon icon={category.icon} className="w-7 h-7 text-brand-gold" />
            <h2 className="text-2xl font-bold text-white font-display">{category.title[locale]}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {templates
              .filter((t) => t.category === category.slug)
              .map((template) => (
                <Link
                  key={template.slug}
                  href={href(`/templates/${template.slug}`)}
                  className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-brand-gold/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-white font-display group-hover:text-brand-gold transition-colors">
                      {template.title[locale]}
                    </h3>
                    <DownloadIcon className="w-6 h-6 text-brand-gold shrink-0" />
                  </div>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">{template.description[locale]}</p>
                  <p className="text-xs text-brand-gold mt-3">
                    {dict.ui.template.free} · {template.fileFormats.map((f) => f.toUpperCase()).join(' / ')}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
