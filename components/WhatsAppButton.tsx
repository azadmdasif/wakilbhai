'use client';

import { usePathname } from 'next/navigation';
import { splitLocaleFromPath } from '@/lib/i18n';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { WhatsAppIcon } from './Icons';

// Pages that render a ConversionRail bottom bar on mobile; the floating
// button would overlap it, and the rail already offers WhatsApp.
const RAIL_PATTERNS = [/^\/help\/[^/]+\/[^/]+$/, /^\/services\/[^/]+$/, /^\/templates\/[^/]+$/, /^\/tools\/[^/]+$/, /^\/rent-agreement\/[^/]+$/];

export default function WhatsAppButton({ label, message }: { label: string; message?: string }) {
  const pathname = usePathname() || '/';
  const [, path] = splitLocaleFromPath(pathname);
  if (RAIL_PATTERNS.some((pattern) => pattern.test(path))) return null;

  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { context: 'floating-button', path })}
      className="fixed bottom-6 end-6 bg-whatsapp text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-110 z-50"
      aria-label={label}
    >
      <WhatsAppIcon className="w-8 h-8" />
    </a>
  );
}
