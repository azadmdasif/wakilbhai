import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, locales, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/site';
import { getCategory, getGuide, getGuideMeta, getGuideMetas, getService, getTemplate } from '@/lib/content';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/seo/schemas';
import MdxContent from '@/components/MdxContent';
import FaqAccordion from '@/components/FaqAccordion';
import ConversionRail from '@/components/ConversionRail';
import AskWidget from '@/components/AskWidget';
import QuickAnswer from '@/components/guide/QuickAnswer';
import DeadlineTimeline from '@/components/guide/DeadlineTimeline';
import StepCards from '@/components/guide/StepCards';
import RelatedGuides from '@/components/guide/RelatedGuides';
import ShareOnWhatsApp from '@/components/ShareOnWhatsApp';
import StickyGuideBar from '@/components/cta/StickyGuideBar';
import CtaLadder from '@/components/cta/CtaLadder';
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
  const cat = getCategory(category);
  return buildMetadata({
    title: meta.title[locale],
    description: meta.answerBox[locale],
    path: `/help/${category}/${guideSlug}`,
    locale,
    ogCategory: cat?.title[locale],
  });
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
  const canonicalUrl = `${SITE_URL}${href(`/help/${categorySlug}/${guideSlug}`)}`;

  const stepItems = (guide.steps?.[locale] ?? []).map((s) => {
    const svc = s.serviceHint ? getService(s.serviceHint) : undefined;
    return {
      icon: s.icon,
      title: s.title,
      summary: s.summary,
      detail: <MdxContent source={s.detail} />,
      serviceHint: svc
        ? { href: href(`/services/${svc.id}`), label: dict.ui.step.weDoThis.replace('{price}', String(svc.priceINR)) }
        : undefined,
    };
  });
  const stepCardsNode = stepItems.length > 0 ? <StepCards items={stepItems} seeDetailsLabel={dict.ui.step.seeDetails} /> : null;

  return (
    <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 pb-24 lg:pb-0">
      <JsonLd
        data={[
          articleSchema({
            title: guide.title[locale],
            description: guide.answerBox[locale],
            datePublished: guide.publishedAt,
            dateModified: guide.updatedAt,
            authorName: guide.author,
            reviewerName: guide.reviewer,
            url: canonicalUrl,
          }),
          faqSchema(guide.faqs[locale]),
          breadcrumbSchema([
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

        {/* 60-second answer: the featured-snippet + AI-quote target, first thing
            rendered. id is the scroll anchor the StickyGuideBar watches. */}
        <QuickAnswer
          id="guide-quick-answer"
          quickAnswer={guide.answerBox[locale]}
          keyNumbers={guide.keyNumbers?.[locale]}
          label={dict.ui.guide.sixtySecond}
        />
        <p className="text-sm text-gray-500 mb-8 mt-4">
          {dict.common.updatedOn}: <time dateTime={guide.updatedAt}>{formatDate(guide.updatedAt, locale)}</time>
        </p>

        <MdxContent
          source={guide.body}
          ctaLadder={
            <CtaLadder
              locale={locale}
              service={
                category.referralOnly || !primaryService
                  ? undefined
                  : {
                      slug: primaryService.id,
                      name: primaryService.title[locale],
                      price: primaryService.priceINR,
                      days: primaryService.deliveryDays,
                    }
              }
              whatsappContext={{ title: guide.title[locale], url: canonicalUrl }}
              consultHref={href('/talk-to-a-lawyer')}
              strings={dict.ui.ladder}
            />
          }
          deadlineTimeline={<DeadlineTimeline items={guide.deadlines?.[locale]} label={dict.ui.guide.deadlineTimeline} />}
          stepCards={stepCardsNode}
        />

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

          <RelatedGuides slugs={guide.relatedGuideSlugs} locale={locale} heading={dict.ui.guide.relatedGuides} />

          <AskWidget locale={locale} strings={dict.ui.askWidget} source={`guide:${guide.slug}`} />

          {/* Growth loop: forward the guide into family/community WhatsApp groups. */}
          <div className="border-t border-gray-800 pt-8">
            <ShareOnWhatsApp
              locale={locale}
              title={guide.title[locale]}
              url={canonicalUrl}
              label={dict.ui.guide.shareOnWhatsApp}
            />
          </div>

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
          hideMobileBar
        />
      </div>

      {/* Mobile-only sticky conversion bar (replaces ConversionRail's mobile bar). */}
      <StickyGuideBar
        locale={locale}
        title={guide.title[locale]}
        url={canonicalUrl}
        service={
          category.referralOnly || !primaryService
            ? undefined
            : { slug: primaryService.id, price: primaryService.priceINR, name: primaryService.title[locale] }
        }
        labels={{
          whatsApp: dict.common.whatsappLawyerFree,
          getItDone: dict.ui.rail.getItDone,
          dismiss: dict.ui.rail.dismiss,
        }}
      />
    </div>
  );
}
