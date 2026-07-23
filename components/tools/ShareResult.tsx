'use client';

import { buildWhatsAppShareUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { WhatsAppIcon } from '../Icons';

/**
 * "Share my result on WhatsApp" — the growth-loop peer share. `message` is the
 * fully-composed, localized brag with the result and the tool URL baked in
 * (e.g. "My gratuity comes to ₹X — calculated free at wakilbhai.com/…").
 * Opens WhatsApp's contact picker (no recipient) so it forwards to friends.
 * WhatsApp green is reserved exclusively for WhatsApp CTAs (CLAUDE.md).
 */
export default function ShareResult({ message, label, slug }: { message: string; label: string; slug: string }) {
  return (
    <a
      href={buildWhatsAppShareUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('share_whatsapp', { slug })}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-whatsapp px-5 py-2.5 text-sm font-bold text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
    >
      <WhatsAppIcon className="h-4 w-4 shrink-0" />
      {label}
    </a>
  );
}
