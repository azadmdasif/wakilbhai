import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, locales, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/site';
import { getCategory, getService, getTemplate, getTemplates, getGuideMetas } from '@/lib/content';
import { whatsAppUrlFor } from '@/lib/whatsapp';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { articleSchema } from '@/lib/seo/schemas';
import { templateJsonLd } from '@/lib/jsonld';
import TemplateDownload from '@/components/TemplateDownload';
import TemplatePreview from '@/components/TemplatePreview';
import TrackedLink from '@/components/TrackedLink';
import { WhatsAppIcon } from '@/components/Icons';

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
  return buildMetadata({
    title: template.title[locale],
    description: template.description[locale],
    path: `/templates/${slug}`,
    locale,
    ogCategory: getCategory(template.category)?.title[locale],
  });
}

export default async function TemplatePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const template = getTemplate(slug);
  if (!template) notFound();
  const dict = getDict(locale);
  const T = dict.ui.template;
  const href = (path: string) => localePath(locale, path);

  const category = getCategory(template.category);
  const relatedService = template.relatedServiceId ? getService(template.relatedServiceId) : undefined;
  const relatedGuides = getGuideMetas().filter((g) => g.relatedTemplateSlugs.includes(template.slug));
  const canonical = `${SITE_URL}${href(`/templates/${slug}`)}`;

  const serviceDelivery = relatedService
    ? relatedService.type === 'consultation'
      ? dict.ui.service.sameDay
      : dict.ui.service.deliveryDays.replace('{days}', String(relatedService.deliveryDays))
    : '';
  const askFitsUrl = whatsAppUrlFor(locale, { kind: 'templateFit', title: template.title[locale] });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Article + DigitalDocument */}
      <JsonLd
        data={[
          articleSchema({ title: template.title[locale], description: template.description[locale], url: canonical }),
          templateJsonLd(template, locale),
        ]}
      />
      <Breadcrumbs
        crumbs={[
          { label: dict.ui.guide.breadcrumbHome, href: href('/') },
          { label: T.allTemplates, href: href('/templates') },
          { label: template.title[locale] },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-3">{template.title[locale]}</h1>
      {category && (
        <p className="text-sm text-brand-gold mb-5">
          <Link href={href(`/help/${category.slug}`)} className="hover:underline">
            {category.title[locale]}
          </Link>
        </p>
      )}
      <p className="text-lg text-gray-300 leading-relaxed mb-8">{template.description[locale]}</p>

      {/* Preview pane */}
      {template.preview && (
        <div className="mb-8">
          <TemplatePreview html={template.preview} label={T.previewTitle} />
        </div>
      )}

      {/* Free instant download */}
      <TemplateDownload slug={template.slug} formats={template.fileFormats} label={T.downloadFree} />

      {/* Upsell card — immediately below the download */}
      <div className="mt-4 rounded-2xl border border-brand-red/30 bg-gray-900 p-6">
        {relatedService && (
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-white">{T.upsellTitle}</p>
              <p className="mt-1 text-sm text-gray-400">
                ₹{relatedService.priceINR} · {serviceDelivery}
              </p>
            </div>
            <TrackedLink
              href={href(`/services/${relatedService.id}`)}
              event="service_order_click"
              props={{ service: relatedService.id, context: 'template-upsell' }}
              className="shrink-0 rounded-full bg-brand-red px-6 py-3 text-center font-bold text-white hover:bg-red-700 transition-colors"
            >
              {T.getDrafted}
            </TrackedLink>
          </div>
        )}
        <TrackedLink
          href={askFitsUrl}
          event="whatsapp_cta_click"
          props={{ context: 'template-ask-fits' }}
          external
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border-2 border-whatsapp px-6 py-2.5 font-bold text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          {T.askFits}
        </TrackedLink>
      </div>

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
    </div>
  );
}
