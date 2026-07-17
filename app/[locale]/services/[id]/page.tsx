import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, locales, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { getCategory, getGuideMetas, getService, getServices } from '@/lib/content';
import { whatsAppUrlFor } from '@/lib/whatsapp';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { serviceJsonLd } from '@/lib/jsonld';
import { ClockIcon, WhatsAppIcon } from '@/components/Icons';

export function generateStaticParams() {
  return locales.flatMap((locale) => getServices().map((service) => ({ locale, id: service.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};
  const service = getService(id);
  if (!service) return {};
  return buildMetadata({
    title: `${service.title[locale]} — ₹${service.priceINR}`,
    description: service.description[locale],
    path: `/services/${id}`,
    locale,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale: rawLocale, id } = await params;
  const locale = rawLocale as Locale;
  const service = getService(id);
  if (!service) notFound();
  const dict = getDict(locale);
  const T = dict.ui.service;
  const href = (path: string) => localePath(locale, path);

  const category = service.category === 'general' ? undefined : getCategory(service.category);
  const relatedGuides = getGuideMetas().filter((g) => g.relatedServiceIds.includes(service.id));
  const deliveryText =
    service.type === 'consultation' ? T.sameDay : T.deliveryDays.replace('{days}', String(service.deliveryDays));
  const whatsappUrl = whatsAppUrlFor(locale, { kind: 'service', title: service.title[locale], priceINR: service.priceINR });
  const steps = [T.step1, T.step2, T.step3];

  return (
    <div className="max-w-3xl mx-auto pb-24 lg:pb-0">
      <JsonLd data={serviceJsonLd(service, locale)} />
      <Breadcrumbs
        crumbs={[
          { label: dict.ui.guide.breadcrumbHome, href: href('/') },
          { label: dict.nav.services, href: href('/services') },
          { label: service.title[locale] },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-6">{service.title[locale]}</h1>

      <div className="bg-gray-900 border border-brand-gold/30 rounded-2xl p-6 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <p className="text-4xl font-extrabold text-brand-gold font-display">₹{service.priceINR}</p>
          <p className="flex items-center gap-2 text-sm text-gray-400">
            <ClockIcon className="w-5 h-5 text-brand-gold" />
            {deliveryText}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`${href('/request-service')}?service=${service.id}`}
            className="flex-1 text-center font-bold py-3 px-6 rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors"
          >
            {T.orderNow}
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5 text-whatsapp" />
            {dict.ui.rail.whatsappCta}
          </a>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white font-display mb-4">{T.included}</h2>
        <p className="text-gray-300 leading-relaxed">{service.description[locale]}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white font-display mb-6">{T.process}</h2>
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-brand-gold text-brand-dark font-bold flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <p className="text-gray-300">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {relatedGuides.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white font-display mb-6">{T.relatedGuides}</h2>
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

      {category && (
        <p className="text-sm text-gray-500">
          <Link href={href(`/help/${category.slug}`)} className="text-brand-gold hover:underline">
            {category.title[locale]}
          </Link>
        </p>
      )}
      <p className="text-xs text-gray-500 border-t border-gray-800 pt-6 mt-10">{dict.ui.guide.disclaimer}</p>
    </div>
  );
}
