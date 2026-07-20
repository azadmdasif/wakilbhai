'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { localePath, splitLocaleFromPath, type Locale } from '@/lib/i18n';
import { buildWhatsAppUrl, whatsAppLawyerMessage } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { WhatsAppIcon } from '@/components/Icons';

/** Element ids/selectors the bar watches to decide visibility. */
const QUICK_ANSWER_ID = 'guide-quick-answer';
const DISMISS_KEY = 'sgb-dismissed';

export interface StickyGuideBarService {
  slug: string;
  price: number;
  name: string;
}

/**
 * Mobile-only sticky conversion bar for guide pages. Reveals once the reader
 * scrolls past the QuickAnswer, hides near the footer, and can be dismissed for
 * the session. Left = "WhatsApp Lawyer — Free" (shared Prompt-9 prefill); right
 * = the guide's mapped paid service, or a single free-consult CTA if none.
 */
export default function StickyGuideBar({
  locale,
  title,
  url,
  service,
  labels,
}: {
  locale: Locale;
  title: string;
  url: string;
  service?: StickyGuideBarService;
  labels: { whatsApp: string; getItDone: string; dismiss: string };
}) {
  const pathname = usePathname() || '/';
  const [, path] = splitLocaleFromPath(pathname);

  const [passedQuickAnswer, setPassedQuickAnswer] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) === '1') setDismissed(true);
  }, []);

  useEffect(() => {
    const quickAnswer = document.getElementById(QUICK_ANSWER_ID);
    const footer = document.querySelector('footer');

    // Bar shows once the QuickAnswer has scrolled above the viewport.
    const qaObserver = new IntersectionObserver(
      ([entry]) => setPassedQuickAnswer(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    // ...and hides as the footer comes into view.
    const footerObserver = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
      threshold: 0,
    });

    if (quickAnswer) qaObserver.observe(quickAnswer);
    if (footer) footerObserver.observe(footer);
    return () => {
      qaObserver.disconnect();
      footerObserver.disconnect();
    };
  }, [pathname]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* private mode / storage disabled — dismiss for this view only */
    }
    setDismissed(true);
  };

  const shown = passedQuickAnswer && !nearFooter && !dismissed;
  const whatsAppHref = buildWhatsAppUrl(whatsAppLawyerMessage({ title, url }));

  return (
    <div
      aria-hidden={!shown}
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 bg-gray-950/95 backdrop-blur border-t border-gray-800 transition-transform duration-300 motion-reduce:transition-none ${
        shown ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Dismiss — floats above the bar's top-right so it never eats button width. */}
      <button
        type="button"
        onClick={dismiss}
        aria-label={labels.dismiss}
        tabIndex={shown ? 0 : -1}
        className="absolute -top-3 end-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-gray-300 shadow-md ring-1 ring-black/20"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
        </svg>
      </button>

      {/* grid (not flex-1) so the two CTAs are exactly 50/50 even when the
          WhatsApp label is longer; min-w-0 + truncate keep them equal. */}
      <div className={`grid ${service ? 'grid-cols-2' : 'grid-cols-1'} h-14 items-center gap-2 px-3`}>
        <a
          href={whatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={shown ? 0 : -1}
          onClick={() => trackEvent('whatsapp_cta_click', { path, context: 'sticky-guide-bar' })}
          aria-label={labels.whatsApp}
          className="flex h-11 min-w-0 items-center justify-center gap-1.5 rounded-full bg-whatsapp px-2 text-[11px] font-bold leading-tight text-white sm:text-sm"
        >
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          {/* wraps to 2 lines on the narrowest phones so "Free" never gets cut */}
          <span className="line-clamp-2 text-center">{labels.whatsApp}</span>
        </a>

        {service && (
          <Link
            href={localePath(locale, `/services/${service.slug}`)}
            tabIndex={shown ? 0 : -1}
            onClick={() => trackEvent('cta_click', { cta: 'order', service: service.slug, context: 'sticky-guide-bar' })}
            aria-label={`${labels.getItDone}: ${service.name}, ₹${service.price}`}
            className="flex h-11 min-w-0 items-center justify-center rounded-full bg-brand-red px-2 text-xs font-bold text-white sm:text-sm"
          >
            <span className="truncate">
              {labels.getItDone} · ₹{service.price}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
