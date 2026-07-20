import { buildWhatsAppUrl, whatsAppLawyerMessage } from '@/lib/whatsapp';
import TrackedLink from './TrackedLink';
import { WhatsAppIcon } from './Icons';

/**
 * Free-consult WhatsApp block used to rescue dead-end pages (404s, empty
 * categories). Optional page context is folded into the prefilled message.
 */
export default function WhatsAppConsultBlock({
  title,
  subtitle,
  cta,
  context,
  source,
}: {
  title: string;
  subtitle: string;
  cta: string;
  context?: { title: string; url: string };
  source: string;
}) {
  const href = buildWhatsAppUrl(whatsAppLawyerMessage(context));
  return (
    <div className="rounded-2xl border border-whatsapp/30 bg-gray-900 p-6 text-center">
      <p className="text-xl font-bold text-white font-display">{title}</p>
      <p className="mt-1 text-gray-400">{subtitle}</p>
      <TrackedLink
        href={href}
        event="whatsapp_cta_click"
        props={{ context: source }}
        external
        className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white hover:bg-green-700 transition-colors"
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0" />
        {cta}
      </TrackedLink>
    </div>
  );
}
