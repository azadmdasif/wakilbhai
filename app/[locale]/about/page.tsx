import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildWhatsAppUrl, whatsAppLawyerMessage } from '@/lib/whatsapp';
import TrackedLink from '@/components/TrackedLink';
import HowItWorks from '@/components/HowItWorks';
import { DocumentIcon, ShieldIcon, MailIcon, WhatsAppIcon } from '@/components/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return buildMetadata({
    title: dict.ui.about.title,
    description: dict.ui.about.metaDesc,
    path: '/about',
    locale,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale as Locale);
  const T = dict.ui.about;

  const processSteps = [
    { icon: DocumentIcon, title: T.processStep1Title, body: T.processStep1Body },
    { icon: ShieldIcon, title: T.processStep2Title, body: T.processStep2Body },
    { icon: MailIcon, title: T.processStep3Title, body: T.processStep3Body },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      {/* Warm paper reading surface (CLAUDE.md): long text never white-on-dark. */}
      <article className="rounded-3xl bg-[#FAF8F3] px-5 py-8 text-[#1A1D23] shadow-xl ring-1 ring-black/5 sm:px-9 sm:py-12">
        <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{T.title}</h1>

        {/* The honest positioning line — a stamp-style callout, first thing read. */}
        <p className="mt-6 inline-block -rotate-1 rounded-md border-[1.5px] border-brand-red px-4 py-2 text-sm font-bold text-brand-red">
          {T.positioning}
        </p>

        <section className="mt-10">
          <h2 className="mb-3 font-display text-2xl font-bold">{T.whoHeading}</h2>
          <p className="max-w-[68ch] leading-relaxed">{T.whoBody}</p>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 font-display text-2xl font-bold">{T.networkHeading}</h2>
          <p className="max-w-[68ch] leading-relaxed">{T.networkBody}</p>
        </section>

        {/* Drafted → advocate-reviewed → sent */}
        <section className="mt-10">
          <h2 className="mb-4 font-display text-2xl font-bold">{T.processHeading}</h2>
          <ol className="space-y-4">
            {processSteps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white/70 p-5">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <step.icon className="h-5 w-5" aria-hidden />
                  <span className="absolute -end-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[11px] font-extrabold text-white">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <h3 className="font-display font-bold">{step.title}</h3>
                  <p className="mt-1 text-sm text-[#6B7280]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 font-display text-2xl font-bold">{T.citiesHeading}</h2>
          <p className="max-w-[68ch] leading-relaxed">{T.citiesBody}</p>
        </section>

        {/* The homepage 3-step visual, anchored for /how-it-works. */}
        <section className="mt-10">
          <h2 className="mb-4 font-display text-2xl font-bold">{T.howHeading}</h2>
          <HowItWorks dict={dict} paper id="how" />
        </section>

        <p className="mt-10 border-t border-black/10 pt-6 text-sm leading-relaxed text-[#6B7280]">{T.disclaimerNote}</p>

        {/* No dead ends: the free consult path. */}
        <div className="mt-6">
          <TrackedLink
            href={buildWhatsAppUrl(whatsAppLawyerMessage())}
            event="whatsapp_cta_click"
            props={{ context: 'about-page' }}
            external
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-whatsapp px-6 py-3 font-bold text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            {dict.common.whatsappLawyerFree}
          </TrackedLink>
        </div>
      </article>
    </div>
  );
}
