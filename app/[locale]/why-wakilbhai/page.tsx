import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import PageHeading from '@/components/PageHeading';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    title: dict.whyUs.title,
    description: dict.whyUs.subtitle,
    alternates: localeAlternates(locale, '/why-wakilbhai'),
  };
}

export default async function WhyWakilBhaiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale as Locale);
  const T = dict.whyUs;
  const features = [
    { title: T.feature1Title, desc: T.feature1Desc },
    { title: T.feature2Title, desc: T.feature2Desc },
    { title: T.feature3Title, desc: T.feature3Desc },
    { title: T.feature4Title, desc: T.feature4Desc },
  ];
  return (
    <div>
      <PageHeading title={T.title} subtitle={T.subtitle} />
      <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {features.map((feature) => (
          <div key={feature.title} className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white font-display mb-3">{feature.title}</h2>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
