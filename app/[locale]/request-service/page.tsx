import type { Metadata } from 'next';
import { Suspense } from 'react';
import { isLocale, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { getServices } from '@/lib/content';
import PageHeading from '@/components/PageHeading';
import ServiceRequestForm from '@/components/ServiceRequestForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    title: dict.request.title,
    description: dict.request.subtitle,
    alternates: localeAlternates(locale, '/request-service'),
    robots: { index: false }, // checkout-style page, not a landing page
  };
}

export default async function RequestServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const T = dict.request;

  const services = getServices().map((s) => ({ id: s.id, title: s.title[locale], priceINR: s.priceINR }));

  return (
    <div>
      <PageHeading title={T.title} subtitle={T.subtitle} />
      <div className="max-w-xl mx-auto bg-gray-900 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white font-display mb-6">{T.formTitle}</h2>
        <Suspense>
          <ServiceRequestForm
            services={services}
            strings={{
              serviceName: T.serviceName,
              costInfo: T.costInfo,
              name: T.name,
              email: T.email,
              phone: T.phone,
              message: T.message,
              send: T.send,
              sending: T.sending,
              success: T.success,
              error: T.error,
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}
