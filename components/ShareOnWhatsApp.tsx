'use client';

import { buildWhatsAppShareUrl, whatsAppMessage } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import type { Locale } from '@/lib/i18n';
import { WhatsAppIcon } from './Icons';

/**
 * "Share this guide on WhatsApp" — a peer-to-peer forward button. This is the
 * growth loop: legal help travels through family and community WhatsApp groups.
 * WhatsApp green (#25D366) outline, reserved exclusively for WhatsApp CTAs.
 */
export default function ShareOnWhatsApp({
  locale,
  title,
  url,
  slug,
  label,
}: {
  locale: Locale;
  title: string;
  url: string;
  slug: string;
  label: string;
}) {
  const href = buildWhatsAppShareUrl(whatsAppMessage(locale, { kind: 'share', title, url }));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('share_whatsapp', { slug })}
      className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto rounded-full border-2 border-whatsapp px-6 py-3 font-bold text-whatsapp transition-colors hover:bg-whatsapp hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
    >
      <WhatsAppIcon className="h-5 w-5" />
      {label}
    </a>
  );
}
