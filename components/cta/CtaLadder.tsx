import { localePath, type Locale } from '@/lib/i18n';
import { buildWhatsAppUrl, whatsAppLawyerMessage } from '@/lib/whatsapp';
import TrackedLink from '@/components/TrackedLink';
import { WhatsAppIcon } from '@/components/Icons';

export interface CtaLadderService {
  slug: string;
  name: string;
  price: number;
  days: number;
}

export interface CtaLadderStrings {
  getItDone: string;
  delivered: string; // "Delivered in {days} working days"
  talkFirst: string;
  complex: string;
}

/**
 * The one conversion block per guide, placed after the cost section. Three
 * stacked tiers of decreasing visual weight:
 *   1. PRIMARY (red, filled)  — the mapped paid service, "Get it done for me".
 *   2. SECONDARY (green outline) — free WhatsApp lawyer consult (Prompt-9 link).
 *   3. TERTIARY (text link)   — full advocate consultation for complex matters.
 * `not-prose` keeps it out of the surrounding MDX prose styles.
 */
export default function CtaLadder({
  locale,
  service,
  whatsappContext,
  consultHref,
  strings,
}: {
  locale: Locale;
  service?: CtaLadderService;
  whatsappContext: { title: string; url: string };
  consultHref: string;
  strings: CtaLadderStrings;
}) {
  const whatsappHref = buildWhatsAppUrl(whatsAppLawyerMessage(whatsappContext));

  return (
    <div className="not-prose my-10 flex flex-col gap-3">
      {service && (
        <div className="rounded-2xl bg-brand-red p-6 shadow-lg">
          <p className="text-xl font-extrabold text-white font-display">
            {service.name} — ₹{service.price}
          </p>
          <p className="mt-1 text-sm text-white/85">{strings.delivered.replace('{days}', String(service.days))}</p>
          <TrackedLink
            href={localePath(locale, `/services/${service.slug}`)}
            event="cta_click"
            props={{ cta: 'ladder-primary', service: service.slug }}
            className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded-full bg-white px-6 text-base font-bold text-brand-red transition-colors hover:bg-gray-100"
          >
            {strings.getItDone}
          </TrackedLink>
        </div>
      )}

      <TrackedLink
        href={whatsappHref}
        event="whatsapp_cta_click"
        props={{ context: 'ladder-secondary' }}
        external
        className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-whatsapp px-6 py-3 text-center font-bold text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0" />
        {strings.talkFirst}
      </TrackedLink>

      <TrackedLink
        href={consultHref}
        event="cta_click"
        props={{ cta: 'ladder-tertiary' }}
        className="py-1 text-center text-sm font-medium text-[#6B7280] underline-offset-4 hover:text-brand-red hover:underline"
      >
        {strings.complex}
      </TrackedLink>
    </div>
  );
}
