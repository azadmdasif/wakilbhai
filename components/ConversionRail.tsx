import { localePath, type Locale } from '@/lib/i18n';
import type { Dict } from '@/lib/dictionaries';
import { whatsAppUrlFor } from '@/lib/whatsapp';
import type { PaidService } from '@/types';
import TrackedLink from './TrackedLink';
import { WhatsAppIcon } from './Icons';

interface ConversionRailProps {
  locale: Locale;
  dict: Dict;
  service?: PaidService;
  /** Bar Council constraint: police-criminal pages get referral instead of a drafting CTA. */
  referralOnly?: boolean;
  /** Context appended to the WhatsApp prefill, e.g. the guide title. */
  whatsappContext?: { title: string; url: string };
  /** Suppress the mobile fixed bottom bar (guide pages use StickyGuideBar instead). */
  hideMobileBar?: boolean;
}

/**
 * The money component: primary CTA for the mapped paid service, secondary
 * WhatsApp CTA. Renders as a sticky sidebar card on desktop (place inside a
 * sidebar column) and a fixed bottom bar on mobile.
 */
export default function ConversionRail({ locale, dict, service, referralOnly, whatsappContext, hideMobileBar }: ConversionRailProps) {
  const rail = dict.ui.rail;
  const whatsappUrl = whatsappContext
    ? whatsAppUrlFor(locale, { kind: 'guide', title: whatsappContext.title, url: whatsappContext.url })
    : service
      ? whatsAppUrlFor(locale, { kind: 'service', title: service.title[locale], priceINR: service.priceINR })
      : whatsAppUrlFor(locale, { kind: 'general' });
  const context = whatsappContext?.url ?? service?.id ?? 'general';

  if (referralOnly || !service) {
    const consultHref = localePath(locale, '/services/consultation-call');
    return (
      <>
        <aside className="hidden lg:block sticky top-24 bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-white font-display">{rail.referralHeading}</h2>
          <p className="text-sm text-gray-400">{rail.referralText}</p>
          <TrackedLink
            href={consultHref}
            event="cta_click"
            props={{ cta: 'consultation', context }}
            className="block text-center font-bold py-3 px-6 rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors"
          >
            {rail.referralCta}
          </TrackedLink>
          <TrackedLink
            href={whatsappUrl}
            event="whatsapp_click"
            props={{ context }}
            external
            className="flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5 text-whatsapp" />
            {rail.whatsappCta}
          </TrackedLink>
        </aside>
        {!hideMobileBar && (
          <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-gray-950/95 backdrop-blur border-t border-gray-800 p-3 flex gap-3">
            <TrackedLink
              href={consultHref}
              event="cta_click"
              props={{ cta: 'consultation', context }}
              className="flex-1 text-center font-bold py-3 px-4 rounded-full bg-brand-red text-white text-sm"
            >
              {rail.referralCta}
            </TrackedLink>
            <TrackedLink
              href={whatsappUrl}
              event="whatsapp_click"
              props={{ context }}
              external
              ariaLabel={rail.whatsappCta}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-whatsapp text-white shrink-0"
            >
              <WhatsAppIcon className="w-6 h-6" />
            </TrackedLink>
          </div>
        )}
      </>
    );
  }

  const orderHref = localePath(locale, `/services/${service.id}`);
  const deliveryText =
    service.type === 'consultation'
      ? dict.ui.service.sameDay
      : rail.delivery.replace('{days}', String(service.deliveryDays));

  return (
    <>
      <aside className="hidden lg:block sticky top-24 bg-gray-900 border border-brand-gold/30 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white font-display">{rail.heading}</h2>
        <div>
          <p className="text-white font-semibold">{service.title[locale]}</p>
          <p className="text-3xl font-extrabold text-brand-gold font-display mt-1">₹{service.priceINR}</p>
          <p className="text-xs text-gray-400 mt-1">{deliveryText}</p>
        </div>
        <TrackedLink
          href={orderHref}
          event="cta_click"
          props={{ cta: 'order', service: service.id, context }}
          className="block text-center font-bold py-3 px-6 rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors"
        >
          {rail.orderCta}
        </TrackedLink>
        <TrackedLink
          href={whatsappUrl}
          event="whatsapp_click"
          props={{ context }}
          external
          className="flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        >
          <WhatsAppIcon className="w-5 h-5 text-whatsapp" />
          {rail.whatsappCta}
        </TrackedLink>
      </aside>
      {!hideMobileBar && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-gray-950/95 backdrop-blur border-t border-gray-800 p-3 flex items-center gap-3">
          <TrackedLink
            href={orderHref}
            event="cta_click"
            props={{ cta: 'order', service: service.id, context }}
            className="flex-1 text-center font-bold py-3 px-4 rounded-full bg-brand-red text-white text-sm"
          >
            {rail.orderCta} · ₹{service.priceINR}
          </TrackedLink>
          <TrackedLink
            href={whatsappUrl}
            event="whatsapp_click"
            props={{ context }}
            external
            ariaLabel={rail.whatsappCta}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-whatsapp text-white shrink-0"
          >
            <WhatsAppIcon className="w-6 h-6" />
          </TrackedLink>
        </div>
      )}
    </>
  );
}
