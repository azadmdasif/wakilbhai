'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { splitLocaleFromPath } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { WhatsAppIcon } from '@/components/Icons';

// Pages whose ConversionRail already renders a bottom-bar WhatsApp CTA on
// mobile; a second fixed button would overlap it. Prompt 10's global sticky
// bar will unify these — at which point this becomes the bar's left half.
const RAIL_PATTERNS = [
  /^\/help\/[^/]+\/[^/]+$/,
  /^\/services\/[^/]+$/,
  /^\/templates\/[^/]+$/,
  /^\/tools\/[^/]+$/,
  /^\/rent-agreement\/[^/]+$/,
];

// Strip the "| WakilBhai" / "— WakilBhai" brand suffix from document.title.
const BRAND_SUFFIX = /\s*[|—–]\s*WakilBhai.*$/;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * Global "WhatsApp Lawyer — Free" pill. Prefills a WhatsApp message with the
 * current page's title + URL when there's page context, otherwise a generic
 * ask. Fixed bottom-right on desktop, full-width bottom pill on mobile.
 */
export default function WhatsAppLawyerButton({ label }: { label: string }) {
  const pathname = usePathname() || '/';
  const [, path] = splitLocaleFromPath(pathname);

  const [shown, setShown] = useState(false);
  const [pageTitle, setPageTitle] = useState('');

  // Read the title after mount so the first client render matches SSR (no
  // hydration mismatch on href).
  useEffect(() => {
    setPageTitle(document.title.replace(BRAND_SUFFIX, '').trim());
  }, [pathname]);

  // Subtle entrance after 400ms; instant for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia?.(REDUCED_MOTION).matches) {
      setShown(true);
      return;
    }
    const timer = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(timer);
  }, []);

  if (RAIL_PATTERNS.some((pattern) => pattern.test(path))) return null;

  const hasContext = path !== '/' && pageTitle.length > 0;
  const message = hasContext
    ? `Hi WakilBhai! I need help with: ${pageTitle} (${SITE_URL}${pathname}). Please tell me about the free 10-minute consultation.`
    : 'Hi WakilBhai! I have a legal problem and want the free 10-minute consultation.';

  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={() => trackEvent('whatsapp_cta_click', { path })}
      className={[
        'fixed z-50 bottom-4 inset-x-4 sm:inset-x-auto sm:end-6',
        'inline-flex items-center justify-center gap-2 min-h-[44px]',
        'rounded-full bg-whatsapp px-5 py-3 font-bold text-white shadow-lg',
        'transition-all duration-300 hover:bg-green-700 motion-reduce:transition-none',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
      ].join(' ')}
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="whitespace-nowrap">{label}</span>
    </a>
  );
}
