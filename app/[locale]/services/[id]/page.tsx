import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { isLocale, locales, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { getCategory, getGuideMeta, getGuideMetas, getService, getServices } from '@/lib/content';
import { whatsAppUrlFor } from '@/lib/whatsapp';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { serviceJsonLd } from '@/lib/jsonld';
import ServiceLeadForm from '@/components/ServiceLeadForm';
import { WhatsAppIcon } from '@/components/Icons';

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
    ogCategory: service.category === 'general' ? undefined : getCategory(service.category)?.title[locale],
  });
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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

  // Related guide: front-matter slug wins, else the first guide that maps here.
  const relatedGuide =
    (service.relatedGuideSlug ? getGuideMeta(service.relatedGuideSlug) : undefined) ??
    getGuideMetas().find((g) => g.relatedServiceIds.includes(service.id));

  const deliveryText =
    service.type === 'consultation' ? T.sameDay : T.deliveryDays.replace('{days}', String(service.deliveryDays));

  // Primary CTA: order on WhatsApp, blanks for name/city the visitor fills in.
  const orderWhatsappUrl = whatsAppUrlFor(locale, {
    kind: 'serviceOrder',
    title: service.title[locale],
    priceINR: service.priceINR,
  });

  const whatYouGet = service.whatYouGet?.[locale]?.slice(0, 5) ?? [];
  const documentsNeeded = service.documentsNeeded?.[locale] ?? [];
  const faqs = service.faqs?.[locale] ?? [];
  const steps = [T.step1, T.step2, T.step3];

  return (
    <div className="max-w-3xl mx-auto">
      <JsonLd data={serviceJsonLd(service, locale)} />
      <Breadcrumbs
        crumbs={[
          { label: dict.ui.guide.breadcrumbHome, href: href('/') },
          { label: dict.nav.services, href: href('/services') },
          { label: service.title[locale] },
        ]}
      />

      {/* Reading surface: paper. */}
      <article className="bg-[#FAF8F3] text-[#1A1D23] rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold font-display max-w-xl">{service.title[locale]}</h1>
          {/* Price stamp-chip */}
          <span className="inline-flex -rotate-1 items-center rounded-md border-[1.5px] border-brand-red px-3 py-1.5 text-2xl font-extrabold font-display text-brand-red">
            ₹{service.priceINR}
          </span>
        </div>
        <p className="mt-2 text-sm font-medium text-[#6B7280]">{deliveryText}</p>

        {/* What you get */}
        <section className="mt-8">
          <h2 className="text-xl font-bold font-display mb-4">{T.whatYouGet}</h2>
          {whatYouGet.length > 0 ? (
            <ul className="space-y-3">
              {whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-whatsapp" />
                  <span className="text-[#1A1D23]">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="leading-relaxed text-[#1A1D23]">{service.description[locale]}</p>
          )}
        </section>

        {/* Documents needed */}
        {documentsNeeded.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold font-display mb-4">{T.documentsNeeded}</h2>
            <ul className="space-y-2">
              {documentsNeeded.map((doc) => (
                <li key={doc} className="flex items-start gap-3 text-[#1A1D23]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" aria-hidden />
                  {doc}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sample */}
        {service.sampleImage && (
          <section className="mt-8">
            <h2 className="text-xl font-bold font-display mb-4">{T.sampleTitle}</h2>
            <Image
              src={service.sampleImage}
              alt={`${service.title[locale]} — ${T.sampleTitle}`}
              width={800}
              height={1000}
              className="w-full max-w-sm rounded-xl border border-black/10"
            />
          </section>
        )}

        {/* 3-step delivery timeline */}
        <section className="mt-8">
          <h2 className="text-xl font-bold font-display mb-6">{T.process}</h2>
          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step} className="relative flex flex-col gap-2 rounded-2xl bg-white/70 border border-black/10 p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-white font-extrabold font-display">
                  {i + 1}
                </span>
                <p className="text-sm text-[#1A1D23]">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* PRIMARY CTA */}
        <a
          href={orderWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand-red px-6 text-lg font-bold text-white shadow-lg hover:bg-red-700 transition-colors"
        >
          <WhatsAppIcon className="h-6 w-6" />
          {T.orderOnWhatsApp}
        </a>

        {/* Quiet form fallback */}
        <div className="mt-4">
          <ServiceLeadForm
            locale={locale}
            serviceId={service.id}
            serviceTitle={service.title[locale]}
            priceINR={service.priceINR}
            fallbackWhatsappUrl={orderWhatsappUrl}
            strings={{
              title: T.formTitle,
              name: T.formName,
              phone: T.formPhone,
              city: T.formCity,
              submit: T.formSubmit,
              sending: T.formSending,
              success: T.formSuccess,
              error: T.formError,
              continueOnWhatsApp: T.continueOnWhatsApp,
            }}
          />
        </div>

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold font-display mb-4">{dict.ui.guide.faqTitle}</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-black/10 bg-white/60">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-[#1A1D23]">
                    {faq.q}
                    <span className="shrink-0 text-xl leading-none text-brand-red transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 leading-relaxed text-[#3f434c]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Back to the related guide */}
        {relatedGuide && (
          <p className="mt-10 border-t border-black/10 pt-6">
            <Link href={href(`/help/${relatedGuide.category}/${relatedGuide.slug}`)} className="font-semibold text-brand-red hover:underline">
              {T.readGuide}: {relatedGuide.title[locale]} →
            </Link>
          </p>
        )}

        <p className="mt-8 text-xs text-[#6B7280]">{dict.ui.guide.disclaimer}</p>

        {category && (
          <p className="mt-2 text-xs">
            <Link href={href(`/help/${category.slug}`)} className="text-[#6B7280] hover:text-brand-red hover:underline">
              {category.title[locale]}
            </Link>
          </p>
        )}
      </article>
    </div>
  );
}
