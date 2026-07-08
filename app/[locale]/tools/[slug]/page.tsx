import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { getService } from '@/lib/content';
import { getGuideMeta } from '@/lib/content';
import { getTool, getToolBody, getTools, toolTitle } from '@/lib/tools';
import stampData from '@/content/calculators/stamp-duty.json';
import type { StampDutyData } from '@/lib/calculators';
import Breadcrumbs from '@/components/Breadcrumbs';
import MdxContent from '@/components/MdxContent';
import FaqAccordion from '@/components/FaqAccordion';
import ConversionRail from '@/components/ConversionRail';
import JsonLd from '@/components/JsonLd';
import { faqJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/site';
import StampDutyCalculator from '@/components/calculators/StampDutyCalculator';
import ChequeBounceCalculator from '@/components/calculators/ChequeBounceCalculator';
import GratuityCalculator from '@/components/calculators/GratuityCalculator';
import Link from 'next/link';

export function generateStaticParams() {
  return locales.flatMap((locale) => getTools().map((tool) => ({ locale, slug: tool.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const tool = getTool(slug);
  if (!tool) return {};
  const dict = getDict(locale);
  return {
    title: toolTitle(dict, tool.widget),
    description: dict.ui.calc.toolsSubtitle,
    alternates: localeAlternates(locale, `/tools/${slug}`),
  };
}

export default async function ToolPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const tool = getTool(slug);
  const body = tool ? getToolBody(slug, locale) : undefined;
  if (!tool || !body) notFound();
  const dict = getDict(locale);
  const href = (path: string) => localePath(locale, path);

  const service = getService(tool.serviceId);
  const relatedGuide = tool.relatedGuideSlug ? getGuideMeta(tool.relatedGuideSlug) : undefined;
  const title = toolTitle(dict, tool.widget);

  return (
    <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 pb-24 lg:pb-0">
      <JsonLd
        data={[
          faqJsonLd(tool.faqs[locale]),
          breadcrumbJsonLd([
            { name: dict.ui.guide.breadcrumbHome, url: `${SITE_URL}${href('/')}` },
            { name: dict.ui.calc.toolsTitle, url: `${SITE_URL}${href('/tools')}` },
            { name: title },
          ]),
        ]}
      />
      <article>
        <Breadcrumbs
          crumbs={[
            { label: dict.ui.guide.breadcrumbHome, href: href('/') },
            { label: dict.ui.calc.toolsTitle, href: href('/tools') },
            { label: title },
          ]}
        />
        <h1 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-6">{title}</h1>

        {/* The interactive widget: the only client-side part of the page. */}
        <div className="mb-10">
          {tool.widget === 'stamp-duty' && (
            <StampDutyCalculator locale={locale} data={stampData as unknown as StampDutyData} strings={dict.ui.calc} />
          )}
          {tool.widget === 'cheque-bounce' && <ChequeBounceCalculator locale={locale} strings={dict.ui.calc} />}
          {tool.widget === 'gratuity' && <GratuityCalculator locale={locale} strings={dict.ui.calc} />}
        </div>

        <MdxContent source={body} />

        <div className="mt-12 space-y-12">
          <FaqAccordion title={dict.ui.guide.faqTitle} faqs={tool.faqs[locale]} />
          {relatedGuide && (
            <section>
              <h2 className="text-2xl font-bold text-white font-display mb-6">{dict.ui.guide.relatedGuides}</h2>
              <Link
                href={href(`/help/${relatedGuide.category}/${relatedGuide.slug}`)}
                className="block bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-brand-gold/50 transition-colors"
              >
                <p className="font-bold text-white">{relatedGuide.title[locale]}</p>
              </Link>
            </section>
          )}
          <p className="text-xs text-gray-500 border-t border-gray-800 pt-6">{dict.ui.guide.disclaimer}</p>
        </div>
      </article>

      <div>
        <ConversionRail locale={locale} dict={dict} service={service} />
      </div>
    </div>
  );
}
