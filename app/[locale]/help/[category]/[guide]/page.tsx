import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales, localePath, isLocale, localeLang, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/site';
import { getCategory, getLocalizedGuide, getGuideMeta, getGuideMetas, getService, getTemplate, guideLocales } from '@/lib/content';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/seo/schemas';
import MdxContent from '@/components/MdxContent';
import FaqAccordion from '@/components/FaqAccordion';
import QuickAnswer from '@/components/guide/QuickAnswer';
import DeadlineTimeline from '@/components/guide/DeadlineTimeline';
import { buildWhatsAppUrl, whatsAppLawyerMessage } from '@/lib/whatsapp';
import StepCards from '@/components/guide/StepCards';
import DecisionFlow from '@/components/guide/DecisionFlow';
import CostCard from '@/components/guide/CostCard';
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
  const available = guideLocales(meta);
  const isDraftLocale = !available.includes(locale);
  return buildMetadata({
    title: meta.title[locale],
    description: meta.answerBox[locale],
    path: `/help/${category}/${guideSlug}`,
    locale,
    ogCategory: cat?.title[locale],
    availableLocales: available,
    noindex: isDraftLocale,
  });
}

function formatDate(iso: string, locale: Locale): string {
  // numberingSystem: 'latn' keeps digits Latin (₹/dates read the same across
  // scripts) even where the locale's default numbering is native.
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(localeLang[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    numberingSystem: 'latn',
  });
}

/** Body is "real" prose only if something survives stripping MDX comments/whitespace. */
function hasBodyProse(body: string): boolean {
  return body.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').trim().length > 0;
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; category: string; guide: string }>;
}) {
  const { locale: rawLocale, category: categorySlug, guide: guideSlug } = await params;
  const locale = rawLocale as Locale;
  const guide = getLocalizedGuide(guideSlug, locale);
  const category = getCategory(categorySlug);
  if (!guide || !category || guide.category !== categorySlug) notFound();
  const dict = getDict(locale);
  const gt = dict.ui.guide;
  const href = (path: string) => localePath(locale, path);

  const primaryService = guide.relatedServiceIds.map(getService).find(Boolean);
  const templates = guide.relatedTemplateSlugs.map(getTemplate).filter((t) => t !== undefined);
  const canonicalUrl = `${SITE_URL}${href(`/help/${categorySlug}/${guideSlug}`)}`;

  // ── Structured slots resolved from front-matter (template owns the order) ──
  const deadlines = guide.deadlines?.[locale];

  const stepItems = (guide.steps?.[locale] ?? []).map((s) => {
    const svc = s.serviceHint ? getService(s.serviceHint) : undefined;
    return {
      icon: s.icon,
      title: s.title,
      summary: s.summary,
      detail: <MdxContent source={s.detail} paper />,
      serviceHint: svc
        ? { href: href(`/services/${svc.id}`), label: dict.ui.step.weDoThis.replace('{price}', String(svc.priceINR)) }
        : undefined,
    };
  });

  const costs = guide.costs?.[locale];

  // Resolve decision-flow outcome hrefs: whatsapp token, internal path, or anchor.
  const resolveOutcomeHref = (h?: string): string | undefined => {
    if (!h) return undefined;
    if (h === 'whatsapp') return buildWhatsAppUrl(whatsAppLawyerMessage({ title: guide.title[locale], url: canonicalUrl }));
    if (h.startsWith('/')) return href(h);
    return h;
  };
  const df = guide.decisionFlow;

  const bodyProse = hasBodyProse(guide.body);

  return (
    <div className="mx-auto max-w-3xl pb-24 lg:pb-0">
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
            { name: gt.breadcrumbHome, url: `${SITE_URL}${href('/')}` },
            { name: gt.breadcrumbHelp, url: `${SITE_URL}${href('/help')}` },
            { name: category.title[locale], url: `${SITE_URL}${href(`/help/${categorySlug}`)}` },
            { name: guide.title[locale] },
          ]),
        ]}
      />

      <Breadcrumbs
        crumbs={[
          { label: gt.breadcrumbHome, href: href('/') },
          { label: gt.breadcrumbHelp, href: href('/help') },
          { label: category.title[locale], href: href(`/help/${categorySlug}`) },
          { label: guide.title[locale] },
        ]}
      />

      {/* Warm paper reading surface (CLAUDE.md): long legal text is never white-on-dark. */}
      <article className="rounded-3xl bg-[#FAF8F3] px-5 py-8 text-[#1A1D23] shadow-xl ring-1 ring-black/5 sm:px-9 sm:py-12">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-[#1A1D23] sm:text-4xl">
          {guide.title[locale]}
        </h1>

        {/* Meta row: Updated · Written by · Reviewed by Adv. */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#6B7280]">
          <span>
            {dict.common.updatedOn}: <time dateTime={guide.updatedAt}>{formatDate(guide.updatedAt, locale)}</time>
          </span>
          <span aria-hidden>·</span>
          <span>
            {gt.writtenBy} {guide.author}
          </span>
          <span aria-hidden>·</span>
          <span>
            {gt.reviewedBy} {guide.reviewer}
          </span>
        </div>

        {/* 60-second answer: the featured-snippet + AI-quote target. id is the
            scroll anchor the StickyGuideBar watches. */}
        <div className="mt-8">
          <QuickAnswer
            id="guide-quick-answer"
            quickAnswer={guide.answerBox[locale]}
            keyNumbers={guide.keyNumbers?.[locale]}
            label={gt.sixtySecond}
          />
        </div>

        {/* Statutory clock */}
        {deadlines && deadlines.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-2 font-display text-2xl font-bold text-[#1A1D23]">{gt.deadlineTimeline}</h2>
            <DeadlineTimeline items={deadlines} label={gt.deadlineTimeline} />
          </section>
        )}

        {/* Decision flow — "which path applies to me?" */}
        {df && (
          <section className="mt-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-[#1A1D23]">{gt.decisionTitle}</h2>
            <DecisionFlow
              flow={{
                start: df.start,
                nodes: df.nodes.map((n) => ({ id: n.id, question: n.question[locale], yes: n.yes, no: n.no })),
                outcomes: Object.fromEntries(
                  Object.entries(df.outcomes).map(([k, o]) => [k, { label: o.label[locale], href: resolveOutcomeHref(o.href) }]),
                ),
              }}
              labels={dict.ui.decision}
            />
          </section>
        )}

        {/* Step-by-step */}
        {stepItems.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-[#1A1D23]">{gt.stepsTitle}</h2>
            <StepCards items={stepItems} seeDetailsLabel={dict.ui.step.seeDetails} />
          </section>
        )}

        {/* Costs */}
        {costs && (
          <section className="mt-10">
            <CostCard title={gt.costsTitle} rows={costs.rows} footnote={costs.footnote} />
          </section>
        )}

        {/* Legacy long-form body (guides not yet migrated to structured front-matter). */}
        {bodyProse && (
          <div className="mt-10">
            <MdxContent source={guide.body} paper />
          </div>
        )}

        {/* The one conversion block per guide. */}
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

        {/* Free templates for this problem */}
        {templates.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-[#1A1D23]">{gt.relatedTemplates}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {templates.map((template) => (
                <Link
                  key={template.slug}
                  href={href(`/templates/${template.slug}`)}
                  className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/70 p-5 transition-colors hover:border-brand-red/50"
                >
                  <DownloadIcon className="h-6 w-6 shrink-0 text-brand-red" />
                  <div>
                    <p className="font-bold text-[#1A1D23]">{template.title[locale]}</p>
                    <p className="text-xs font-semibold text-brand-red">{dict.ui.template.free}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ accordions */}
        <div className="mt-12">
          <FaqAccordion title={gt.faqTitle} faqs={guide.faqs[locale]} paper />
        </div>

        {/* Related guides */}
        <div className="mt-12">
          <RelatedGuides slugs={guide.relatedGuideSlugs} locale={locale} heading={gt.relatedGuides} />
        </div>

        {/* Growth loop: forward the guide into family/community WhatsApp groups. */}
        <div className="mt-12 border-t border-black/10 pt-8">
          <ShareOnWhatsApp locale={locale} title={guide.title[locale]} url={canonicalUrl} label={gt.shareOnWhatsApp} />
        </div>

        <p className="mt-8 border-t border-black/10 pt-6 text-xs leading-relaxed text-[#6B7280]">{gt.disclaimer}</p>
      </article>

      {/* Mobile-only sticky conversion bar. */}
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
