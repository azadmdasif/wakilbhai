import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { HelpIcon, PenSquareIcon, DocumentIcon } from '@/components/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    title: { absolute: 'WakilBhai — Your Local Lawyer' },
    description: dict.home.heroSubtitle,
    alternates: localeAlternates(locale, '/'),
  };
}

function HowItWorksStep({
  icon,
  title,
  description,
  step,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
}) {
  return (
    <div className="text-center relative">
      <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full border-2 border-brand-gold relative">
        {icon}
        <span className="absolute -top-2 -end-2 bg-brand-gold text-brand-dark w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg">
          {step}
        </span>
      </div>
      <h3 className="text-2xl font-bold mb-2 text-white font-display">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale as Locale);
  const T = dict.home;
  const href = (path: string) => localePath(locale as Locale, path);

  return (
    <div className="space-y-24">
      <section className="relative bg-cover bg-center rounded-3xl overflow-hidden" style={{ backgroundImage: "url('/hero.png')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center pt-32 pb-40 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white font-display tracking-tight mb-4">{T.heroTitle}</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-10">{T.heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href={href('/services')}
              className="font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 bg-brand-red text-white hover:bg-red-700"
            >
              {T.ctaDocuments}
            </Link>
            <Link
              href={href('/talk-to-a-lawyer')}
              className="font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 bg-gray-700 text-white hover:bg-gray-600"
            >
              {T.ctaAsk}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-bold text-center text-white mb-16 font-display">{T.howItWorksTitle}</h2>
        <div className="grid md:grid-cols-3 gap-12 items-start relative">
          <HowItWorksStep
            icon={<HelpIcon className="w-12 h-12 text-brand-gold" />}
            title={T.howItWorksStep1Title}
            description={T.howItWorksStep1Desc}
            step={1}
          />
          <HowItWorksStep
            icon={<PenSquareIcon className="w-12 h-12 text-brand-gold" />}
            title={T.howItWorksStep2Title}
            description={T.howItWorksStep2Desc}
            step={2}
          />
          <HowItWorksStep
            icon={<DocumentIcon className="w-12 h-12 text-brand-gold" />}
            title={T.howItWorksStep3Title}
            description={T.howItWorksStep3Desc}
            step={3}
          />
        </div>
      </section>
    </div>
  );
}
