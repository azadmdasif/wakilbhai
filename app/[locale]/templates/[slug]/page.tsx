import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, locales, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { getCategory, getService, getTemplate, getTemplates, getGuideMetas } from '@/lib/content';
import Breadcrumbs from '@/components/Breadcrumbs';
import TemplateDownload from '@/components/TemplateDownload';
import ConversionRail from '@/components/ConversionRail';

export function generateStaticParams() {
  return locales.flatMap((locale) => getTemplates().map((template) => ({ locale, slug: template.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const template = getTemplate(slug);
  if (!template) return {};
  return {
    title: template.title[locale],
    description: template.description[locale],
    alternates: localeAlternates(locale, `/templates/${slug}`),
  };
}

export default async function TemplatePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const template = getTemplate(slug);
  if (!template) notFound();
  const dict = getDict(locale);
  const href = (path: string) => localePath(locale, path);

  const category = getCategory(template.category);
  const relatedService = template.relatedServiceId ? getService(template.relatedServiceId) : undefined;
  const relatedGuides = getGuideMetas().filter((g) => g.relatedTemplateSlugs.includes(template.slug));

  return (
    <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 pb-24 lg:pb-0">
      <article>
        <Breadcrumbs
          crumbs={[
            { label: dict.ui.guide.breadcrumbHome, href: href('/') },
            { label: dict.ui.template.allTemplates, href: href('/templates') },
            { label: template.title[locale] },
          ]}
        />
        <h1 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-4">{template.title[locale]}</h1>
        {category && (
          <p className="text-sm text-brand-gold mb-6">
            <Link href={href(`/help/${category.slug}`)} className="hover:underline">
              {category.title[locale]}
            </Link>
          </p>
        )}
        <p className="text-lg text-gray-300 leading-relaxed mb-8">{template.description[locale]}</p>

        <TemplateDownload
          locale={locale}
          slug={template.slug}
          title={template.title[locale]}
          gated={template.gated}
          formats={template.fileFormats}
          strings={dict.ui.template}
        />

        {relatedGuides.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white font-display mb-6">{dict.ui.guide.relatedGuides}</h2>
            <div className="space-y-3">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={href(`/help/${guide.category}/${guide.slug}`)}
                  className="block bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-brand-gold/50 transition-colors"
                >
                  <p className="font-bold text-white">{guide.title[locale]}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="text-xs text-gray-500 border-t border-gray-800 pt-6 mt-12">{dict.ui.guide.disclaimer}</p>
      </article>

      <div>
        <ConversionRail locale={locale} dict={dict} service={relatedService} />
      </div>
    </div>
  );
}
