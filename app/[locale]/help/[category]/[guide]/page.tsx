import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, locales, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { getCategory, getGuide, getGuideMeta, getGuideMetas, getService, getTemplate } from '@/lib/content';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, faqJsonLd, guideArticleJsonLd } from '@/lib/jsonld';
import MdxContent from '@/components/MdxContent';
import FaqAccordion from '@/components/FaqAccordion';
import ConversionRail from '@/components/ConversionRail';
import AskWidget from '@/components/AskWidget';
import { DownloadIcon } from '@/components/Icons';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getGuideMetas().map((guide) => ({ locale, category: guide.category, guide: guide.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; guide: string }>;
}): Promise<Metadata> {
  const { locale, category, guide: guideSlug } = await params;
  if (!isLocale(locale)) return {};
  const meta = getGuideMeta(guideSlug);
  if (!meta || meta.category !== category) return {};
  return {
    title: meta.title[locale],
    description: meta.answerBox[locale],
    alternates: localeAlternates(locale, `/help/${category}/${guideSlug}`),
    openGraph: { title: meta.title[locale], description: meta.answerBox[locale] },
  };
}

function formatDate(iso: string, locale: Locale): string {
  const lang = { en: 'en-IN', hi: 'hi-IN', ur: 'ur-IN', bn: 'bn-IN' }[locale];
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; category: string; guide: string }>;
}) {
  const { locale: rawLocale, category: categorySlug, guide: guideSlug } = await params;
  const locale = rawLocale as Locale;
  const guide = getGuide(guideSlug, locale);
  const category = getCategory(categorySlug);
  if (!guide || !category || guide.category !== categorySlug) notFound();
  const dict = getDict(locale);
  const href = (path: string) => localePath(locale, path);

  const primaryService = guide.relatedServiceIds.map(getService).find(Boolean);
  const templates = guide.relatedTemplateSlugs.map(getTemplate).filter((t) => t !== undefined);
  const relatedGuides = guide.relatedGuideSlugs.map(getGuideMeta).filter((g) => g !== undefined);
  const canonicalUrl = `${SITE_URL}${href(`/help/${categorySlug}/${guideSlug}`)}`;

  return (
    <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 pb-24 lg:pb-0">
      <JsonLd
        data={[
          guideArticleJsonLd(guide, locale),
          faqJsonLd(guide.faqs[locale]),
          breadcrumbJsonLd([
            { name: dict.ui.guide.breadcrumbHome, url: `${SITE_URL}${href('/')}` },
            { name: dict.ui.guide.breadcrumbHelp, url: `${SITE_URL}${href('/help')}` },
            { name: category.title[locale], url: `${SITE_URL}${href(`/help/${categorySlug}`)}` },
            { name: guide.title[locale] },
          ]),
        ]}
      />
      <article>
        <Breadcrumbs
          crumbs={[
            { label: dict.ui.guide.breadcrumbHome, href: href('/') },
            { label: dict.ui.guide.breadcrumbHelp, href: href('/help') },
            { label: category.title[locale], href: href(`/help/${categorySlug}`) },
            { label: guide.title[locale] },
          ]}
        />
        <h1 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-4">{guide.title[locale]}</h1>

        {/* Answer box: the featured-snippet target, first thing rendered. */}
        <div className="bg-gray-900 border-s-4 border-brand-gold rounded-e-2xl p-5 mb-4">
          <p className="text-lg text-gray-100 leading-relaxed">{guide.answerBox[locale]}</p>
        </div>
        <p className="text-sm text-gray-500 mb-8">
          {dict.common.updatedOn}: <time dateTime={guide.updatedAt}>{formatDate(guide.updatedAt, locale)}</time>
        </p>

        <MdxContent source={guide.body} />

        <div className="mt-12 space-y-12">
          <FaqAccordion title={dict.ui.guide.faqTitle} faqs={guide.faqs[locale]} />

          {templates.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white font-display mb-6">{dict.ui.guide.relatedTemplates}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Link
                    key={template.slug}
                    href={href(`/templates/${template.slug}`)}
                    className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-brand-gold/50 transition-colors"
                  >
                    <DownloadIcon className="w-6 h-6 text-brand-gold shrink-0" />
                    <div>
                      <p className="font-bold text-white">{template.title[locale]}</p>
                      <p className="text-xs text-brand-gold">{dict.ui.template.free}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {relatedGuides.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white font-display mb-6">{dict.ui.guide.relatedGuides}</h2>
              <div className="space-y-3">
                {relatedGuides.map((related) => (
                  <Link
                    key={related.slug}
                    href={href(`/help/${related.category}/${related.slug}`)}
                    className="block bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-brand-gold/50 transition-colors"
                  >
                    <p className="font-bold text-white">{related.title[locale]}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <AskWidget locale={locale} strings={dict.ui.askWidget} source={`guide:${guide.slug}`} />

          <p className="text-xs text-gray-500 border-t border-gray-800 pt-6">{dict.ui.guide.disclaimer}</p>
        </div>
      </article>

      <div>
        <ConversionRail
          locale={locale}
          dict={dict}
          service={category.referralOnly ? undefined : primaryService}
          referralOnly={category.referralOnly}
          whatsappContext={{ title: guide.title[locale], url: canonicalUrl }}
        />
      </div>
    </div>
  );
}
