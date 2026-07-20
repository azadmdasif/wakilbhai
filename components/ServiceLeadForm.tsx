'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import { WhatsAppIcon } from './Icons';

export interface ServiceLeadFormStrings {
  title: string;
  name: string;
  phone: string;
  city: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  continueOnWhatsApp: string;
}

/**
 * Quiet form fallback on the service page. Posts to /api/lead, which stores the
 * lead and returns a WhatsApp deep link prefilled with the name + city — shown
 * as a follow-up so the visitor is never dead-ended, even if the store fails.
 */
export default function ServiceLeadForm({
  locale,
  serviceId,
  serviceTitle,
  priceINR,
  fallbackWhatsappUrl,
  strings,
}: {
  locale: Locale;
  serviceId: string;
  serviceTitle: string;
  priceINR: number;
  fallbackWhatsappUrl: string;
  strings: ServiceLeadFormStrings;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [whatsappUrl, setWhatsappUrl] = useState(fallbackWhatsappUrl);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(form.get('name') ?? ''),
          phone: String(form.get('phone') ?? ''),
          city: String(form.get('city') ?? ''),
          locale,
          serviceId,
          serviceTitle,
          priceINR,
        }),
      });
      const json = (await res.json()) as { ok: boolean; whatsappUrl?: string };
      if (json.whatsappUrl) setWhatsappUrl(json.whatsappUrl);
      trackEvent('lead_submitted', { source: `service:${serviceId}`, ok: json.ok });
      setStatus(json.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full bg-white text-[#1A1D23] placeholder-gray-400 border border-black/15 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red/40';

  const continueLink = (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_cta_click', { context: 'service-lead-followup' })}
      className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white"
    >
      <WhatsAppIcon className="h-5 w-5" />
      {strings.continueOnWhatsApp}
    </a>
  );

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
        <p className="font-semibold text-[#1A1D23]">{strings.success}</p>
        {continueLink}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-black/10 bg-white/60 p-6">
      <p className="mb-4 font-bold text-[#1A1D23]">{strings.title}</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <input name="name" required aria-label={strings.name} placeholder={strings.name} className={inputClass} />
        <input
          name="phone"
          type="tel"
          required
          dir="ltr"
          aria-label={strings.phone}
          placeholder={strings.phone}
          className={inputClass}
        />
        <input name="city" required aria-label={strings.city} placeholder={strings.city} className={inputClass} />
      </div>
      {status === 'error' && (
        <div className="mt-3">
          <p className="text-sm text-brand-red">{strings.error}</p>
          {continueLink}
        </div>
      )}
      {status !== 'error' && (
        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-4 min-h-[44px] rounded-full border-2 border-[#1A1D23] px-6 py-2.5 font-bold text-[#1A1D23] transition-colors hover:bg-[#1A1D23] hover:text-white disabled:opacity-60"
        >
          {status === 'sending' ? strings.sending : strings.submit}
        </button>
      )}
    </form>
  );
}
