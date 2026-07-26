import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import TrackedLink from '@/components/TrackedLink';
import Disclaimer from '@/components/Disclaimer';
import { WhatsAppIcon, ArrowRightIcon } from '@/components/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return buildMetadata({
    title: dict.ui.editorial.title,
    description: dict.ui.editorial.metaDesc,
    path: '/editorial-policy',
    locale,
  });
}

/** Primary/official portals our guides cite — links are the same in every locale. */
const SOURCES: { name: string; url: string }[] = [
  { name: 'India Code (statutes)', url: 'https://www.indiacode.nic.in' },
  { name: 'e-Daakhil (consumer complaints)', url: 'https://edaakhil.nic.in' },
  { name: 'National Cyber Crime Reporting Portal', url: 'https://cybercrime.gov.in' },
  { name: 'eCourts Services', url: 'https://ecourts.gov.in' },
  { name: 'Supreme Court of India', url: 'https://www.sci.gov.in' },
  { name: 'NCDRC (consumer commission)', url: 'https://ncdrc.nic.in' },
  { name: 'Bar Council of India', url: 'https://www.barcouncilofindia.org' },
];

// Correction reports go to the editorial team on WhatsApp; English by design —
// WakilBhai staff read the incoming message.
const CORRECTION_MESSAGE = 'Hi WakilBhai! I want to report a correction on a guide. The page and the issue are: ';

export default async function EditorialPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale as Locale);
  const T = dict.ui.editorial;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Warm paper reading surface (CLAUDE.md): long policy text is never white-on-dark. */}
      <article className="rounded-3xl bg-[#FAF8F3] px-5 py-8 text-[#1A1D23] shadow-xl ring-1 ring-black/5 sm:px-9 sm:py-12">
        <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{T.title}</h1>
        <p className="mt-6 max-w-[68ch] leading-relaxed">{T.intro}</p>

        <section className="mt-10">
          <h2 className="mb-3 font-display text-2xl font-bold">{T.researchHeading}</h2>
          <p className="max-w-[68ch] leading-relaxed">{T.researchBody}</p>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 font-display text-2xl font-bold">{T.sourcesHeading}</h2>
          <p className="max-w-[68ch] leading-relaxed">{T.sourcesIntro}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm font-semibold text-[#1A1D23] transition-colors hover:border-brand-red/50"
                >
                  {s.name}
                  <ArrowRightIcon className="h-3.5 w-3.5 -rotate-45 text-brand-red" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 font-display text-2xl font-bold">{T.reviewHeading}</h2>
          <p className="max-w-[68ch] leading-relaxed">{T.reviewBody}</p>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 font-display text-2xl font-bold">{T.freshnessHeading}</h2>
          <p className="max-w-[68ch] leading-relaxed">{T.freshnessBody}</p>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 font-display text-2xl font-bold">{T.correctionsHeading}</h2>
          <p className="max-w-[68ch] leading-relaxed">{T.correctionsBody}</p>
          <div className="mt-5">
            <TrackedLink
              href={buildWhatsAppUrl(CORRECTION_MESSAGE)}
              event="whatsapp_cta_click"
              props={{ context: 'editorial-correction' }}
              external
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-whatsapp px-6 py-3 font-bold text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              {T.correctionsCta}
            </TrackedLink>
          </div>
        </section>

        <Disclaimer dict={dict} paper className="mt-10" />
      </article>
    </div>
  );
}
