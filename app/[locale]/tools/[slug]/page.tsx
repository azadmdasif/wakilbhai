import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { getService, getGuideMeta } from '@/lib/content';
import { getTool, getTools, toolHeadings } from '@/lib/tools';
import stampData from '@/content/calculators/stamp-duty.json';
import type { StampDutyData } from '@/lib/calculators';
import { SITE_URL } from '@/lib/site';
import ToolShell from '@/components/tools/ToolShell';
import type { CtaLadderService } from '@/components/cta/CtaLadder';
import StampDutyCalculator from '@/components/calculators/StampDutyCalculator';
import ChequeBounceCalculator from '@/components/calculators/ChequeBounceCalculator';
import GratuityCalculator from '@/components/calculators/GratuityCalculator';

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
  const { title, promise } = toolHeadings(dict, tool.widget);
  return buildMetadata({ title, description: promise, path: `/tools/${slug}`, locale });
}

export default async function ToolPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const tool = getTool(slug);
  if (!tool) notFound();
  const dict = getDict(locale);
  const href = (path: string) => localePath(locale, path);

  const { title, promise, whatMeans } = toolHeadings(dict, tool.widget);
  const canonicalUrl = `${SITE_URL}${href(`/tools/${slug}`)}`;

  // Map the tool's paid service (if any) into a CtaLadder tier.
  const svc = tool.serviceId ? getService(tool.serviceId) : undefined;
  const service: CtaLadderService | undefined = svc
    ? { slug: svc.id, name: svc.title[locale], price: svc.priceINR, days: svc.deliveryDays }
    : undefined;

  const relatedMeta = tool.relatedGuideSlug ? getGuideMeta(tool.relatedGuideSlug) : undefined;
  const relatedGuide = relatedMeta
    ? { href: href(`/help/${relatedMeta.category}/${relatedMeta.slug}`), title: relatedMeta.title[locale] }
    : undefined;

  return (
    <ToolShell
      locale={locale}
      dict={dict}
      slug={slug}
      title={title}
      promise={promise}
      whatMeans={whatMeans}
      canonicalUrl={canonicalUrl}
      service={service}
      faqs={tool.faqs[locale]}
      relatedGuide={relatedGuide}
    >
      {tool.widget === 'stamp-duty' && (
        <StampDutyCalculator locale={locale} data={stampData as unknown as StampDutyData} strings={dict.ui.calc} shareUrl={canonicalUrl} />
      )}
      {tool.widget === 'cheque-bounce' && <ChequeBounceCalculator locale={locale} strings={dict.ui.calc} shareUrl={canonicalUrl} />}
      {tool.widget === 'gratuity' && <GratuityCalculator locale={locale} strings={dict.ui.calc} shareUrl={canonicalUrl} />}
    </ToolShell>
  );
}
