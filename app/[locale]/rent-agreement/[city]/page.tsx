import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, locales, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/site';
import { getService, getGuideMeta } from '@/lib/content';
import { getBuildableCities, getCity, getStampDutyData } from '@/lib/locations';
import { computeStampDuty } from '@/lib/calculators';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import ConversionRail from '@/components/ConversionRail';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/jsonld';

const EXAMPLE_RENT = 15000;

export function generateStaticParams() {
  return locales.flatMap((locale) => getBuildableCities().map((city) => ({ locale, city: city.slug })));
}

function fill(templateStr: string, vars: Record<string, string>): string {
  return templateStr.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
}

function buildStrings(locale: Locale, citySlug: string) {
  const city = getCity(citySlug);
  if (!city) return null;
  const data = getStampDutyData();
  const state = data.states[city.state];
  const dict = getDict(locale);
  const T = dict.ui.city;
  const inr = new Intl.NumberFormat('en-IN');

  const rule = state.rentAgreement;
  const example = computeStampDuty(data, {
    state: city.state,
    docType: 'rentAgreement',
    monthlyRent: EXAMPLE_RENT,
    tenureMonths: 11,
    deposit: EXAMPLE_RENT * 2,
  });

  const vars = {
    city: city.name[locale],
    state: state.name[locale],
    pct: String(rule.pct),
    rent: inr.format(EXAMPLE_RENT),
    duty: example ? inr.format(example.duty) : '—',
  };
  const dutyLine = fill(rule.base === 'totalRentPlusDeposit' ? T.dutyTotal : T.dutyAnnual, vars);

  return {
    city,
    state,
    dict,
    vars,
    title: fill(T.title, vars),
    metaDesc: fill(T.metaDesc, vars),
    intro: fill(T.intro, vars),
    dutyHeading: fill(T.dutyHeading, vars),
    dutyLine,
    dutyExample: fill(T.dutyExample, vars),
    rentNote: (state as { rentNote?: Record<Locale, string> }).rentNote?.[locale],
    processHeading: fill(T.processHeading, vars),
    faqs: [
      { q: fill(T.faq1q, vars), a: fill(T.faq1a, vars) },
      { q: fill(T.faq2q, vars), a: fill(T.faq2a, { ...vars, dutyLine: `${dutyLine} ${fill(T.dutyExample, vars)}` }) },
      { q: fill(T.faq3q, vars), a: fill(T.faq3a, vars) },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { locale, city } = await params;
  if (!isLocale(locale)) return {};
  const strings = buildStrings(locale, city);
  if (!strings) return {};
  return buildMetadata({
    title: strings.title,
    description: strings.metaDesc,
    path: `/rent-agreement/${city}`,
    locale,
  });
}

export default async function RentAgreementCityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale: rawLocale, city: citySlug } = await params;
  const locale = rawLocale as Locale;
  const strings = buildStrings(locale, citySlug);
  if (!strings) notFound();
  const { dict } = strings;
  const T = dict.ui;
  const href = (path: string) => localePath(locale, path);

  const service = getService('rent-agreement');
  const guide = getGuideMeta('rent-agreement-guide');
  const steps = [T.service.step1, T.service.step2, T.service.step3];

  return (
    <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 pb-24 lg:pb-0">
      <JsonLd
        data={[
          service ? serviceJsonLd(service, locale) : null,
          faqJsonLd(strings.faqs),
          breadcrumbJsonLd([
            { name: T.guide.breadcrumbHome, url: `${SITE_URL}${href('/')}` },
            { name: service ? service.title[locale] : 'Rent Agreement', url: `${SITE_URL}${href('/services/rent-agreement')}` },
            { name: strings.city.name[locale] },
          ]),
        ]}
      />
      <article>
        <Breadcrumbs
          crumbs={[
            { label: T.guide.breadcrumbHome, href: href('/') },
            { label: service ? service.title[locale] : '', href: href('/services/rent-agreement') },
            { label: strings.city.name[locale] },
          ]}
        />
        <h1 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-6">{strings.title}</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-10">{strings.intro}</p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white font-display mb-4">{strings.dutyHeading}</h2>
          <div className="bg-gray-900 border-s-4 border-brand-gold rounded-e-2xl p-5 space-y-3">
            <p className="text-gray-100">{strings.dutyLine}</p>
            <p className="text-gray-300">{strings.dutyExample}</p>
            {strings.rentNote && <p className="text-gray-400 text-sm">{strings.rentNote}</p>}
            <p className="text-xs text-gray-500">{T.calc.estimateNote}</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white font-display mb-6">{strings.processHeading}</h2>
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

        <FaqAccordion title={T.guide.faqTitle} faqs={strings.faqs} />

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white font-display mb-4">{dict.ui.city.linksHeading}</h2>
          <ul className="space-y-2">
            {guide && (
              <li>
                <Link href={href(`/help/${guide.category}/${guide.slug}`)} className="text-brand-gold hover:underline">
                  {dict.ui.city.guideLink} →
                </Link>
              </li>
            )}
            <li>
              <Link href={href('/tools/stamp-duty-calculator')} className="text-brand-gold hover:underline">
                {dict.ui.city.calcLink} →
              </Link>
            </li>
          </ul>
        </section>

        <p className="text-xs text-gray-500 border-t border-gray-800 pt-6 mt-10">{T.guide.disclaimer}</p>
      </article>

      <div>
        <ConversionRail locale={locale} dict={dict} service={service} />
      </div>
    </div>
  );
}
