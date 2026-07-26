import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n';
import type { Dict } from '@/lib/dictionaries';
import { SITE_URL } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import Disclaimer from '@/components/Disclaimer';
import CtaLadder, { type CtaLadderService } from '@/components/cta/CtaLadder';
import JsonLd from '@/components/seo/JsonLd';
import ScrollDepth from '@/components/analytics/ScrollDepth';
import { softwareApplicationSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schemas';

export interface ToolShellRelatedGuide {
  href: string;
  title: string;
}

/**
 * The shared shell every tool renders inside, on the warm paper reading
 * surface (CLAUDE.md): title + one-line promise, the interactive widget
 * (`children`), a 60-word "What this means" explainer, the CtaLadder mapped to
 * a relevant service, FAQs, a related guide, the disclaimer, and JSON-LD
 * (SoftwareApplication + FAQPage + BreadcrumbList).
 */
export default function ToolShell({
  locale,
  dict,
  slug,
  title,
  promise,
  whatMeans,
  canonicalUrl,
  service,
  faqs,
  relatedGuide,
  children,
}: {
  locale: Locale;
  dict: Dict;
  slug: string;
  title: string;
  promise: string;
  whatMeans: string;
  canonicalUrl: string;
  service?: CtaLadderService;
  faqs: { q: string; a: string }[];
  relatedGuide?: ToolShellRelatedGuide;
  children: React.ReactNode;
}) {
  const href = (path: string) => localePath(locale, path);
  const gt = dict.ui.guide;
  const C = dict.ui.calc;

  return (
    <div className="mx-auto max-w-3xl pb-24 lg:pb-0">
      <ScrollDepth slug={slug} />
      <JsonLd
        data={[
          softwareApplicationSchema({ name: title, description: promise, url: canonicalUrl }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: gt.breadcrumbHome, url: `${SITE_URL}${href('/')}` },
            { name: C.toolsTitle, url: `${SITE_URL}${href('/tools')}` },
            { name: title },
          ]),
        ]}
      />

      <Breadcrumbs
        crumbs={[
          { label: gt.breadcrumbHome, href: href('/') },
          { label: C.toolsTitle, href: href('/tools') },
          { label: title },
        ]}
      />

      {/* Warm paper reading surface. */}
      <article className="rounded-3xl bg-[#FAF8F3] px-5 py-8 text-[#1A1D23] shadow-xl ring-1 ring-black/5 sm:px-9 sm:py-12">
        <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-[68ch] text-lg text-[#6B7280]">{promise}</p>

        {/* The interactive widget (input card + result card). */}
        <div className="mt-8">{children}</div>

        {/* What this means — the 60-word plain-language explainer. */}
        <section className="mt-10">
          <h2 className="mb-3 font-display text-2xl font-bold">{C.whatMeansHeading}</h2>
          <p className="max-w-[68ch] leading-relaxed">{whatMeans}</p>
        </section>

        {/* The one conversion block. */}
        <CtaLadder
          locale={locale}
          service={service}
          whatsappContext={{ title, url: canonicalUrl }}
          consultHref={href('/talk-to-a-lawyer')}
          strings={dict.ui.ladder}
        />

        {faqs.length > 0 && (
          <div className="mt-8">
            <FaqAccordion title={gt.faqTitle} faqs={faqs} paper />
          </div>
        )}

        {relatedGuide && (
          <section className="mt-10">
            <h2 className="mb-4 font-display text-2xl font-bold">{gt.relatedGuides}</h2>
            <Link
              href={relatedGuide.href}
              className="block rounded-2xl border border-black/10 bg-white/70 p-5 transition-colors hover:border-brand-red/50"
            >
              <p className="font-bold text-[#1A1D23]">{relatedGuide.title}</p>
            </Link>
          </section>
        )}

        <Disclaimer dict={dict} paper className="mt-10" />
      </article>
    </div>
  );
}
