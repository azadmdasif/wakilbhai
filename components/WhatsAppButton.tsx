'use client';

import { WHATSAPP_NUMBER } from '@/lib/site';
import { WhatsAppIcon } from './Icons';

/**
 * Floating WhatsApp CTA. Client component so later phases can build
 * context-aware prefilled messages from the current page.
 */
export default function WhatsAppButton({ label, message }: { label: string; message?: string }) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 bg-whatsapp text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-110 z-50"
      aria-label={label}
    >
      <WhatsAppIcon className="w-8 h-8" />
    </a>
  );
}
