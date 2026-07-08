'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { whatsAppUrlFor } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import Modal from './Modal';
import { DownloadIcon } from './Icons';

interface TemplateDownloadProps {
  locale: Locale;
  slug: string;
  title: string;
  gated: boolean;
  formats: ('docx' | 'pdf')[];
  strings: {
    download: string;
    gatedTitle: string;
    gatedName: string;
    gatedPhone: string;
    gatedSubmit: string;
    gatedNote: string;
    gatedSuccess: string;
  };
}

function fileUrl(slug: string, format: string) {
  return `/templates/${slug}.${format}`;
}

function triggerDownload(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function TemplateDownload({ locale, slug, title, gated, formats, strings }: TemplateDownloadProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingFormat, setPendingFormat] = useState<string>(formats[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const startDownload = (format: string) => {
    if (!gated) {
      trackEvent('template_download', { template: slug, format, gated: false });
      triggerDownload(fileUrl(slug, format));
      return;
    }
    setPendingFormat(format);
    setModalOpen(true);
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          locale,
          source: `template-download:${slug}`,
          context: title,
        }),
      });
      if (!res.ok) throw new Error('lead-failed');
      setState('done');
      trackEvent('template_download', { template: slug, format: pendingFormat, gated: true });
      trackEvent('lead_submitted', { source: 'template' });
      triggerDownload(fileUrl(slug, pendingFormat));
      // Follow-up channel: open WhatsApp with a thank-you/upsell message.
      window.open(whatsAppUrlFor(locale, { kind: 'template', title }), '_blank', 'noopener');
      setTimeout(() => setModalOpen(false), 1500);
    } catch {
      setState('error');
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {formats.map((format) => (
          <button
            key={format}
            onClick={() => startDownload(format)}
            className="inline-flex items-center gap-2 font-bold py-3 px-6 rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors"
          >
            <DownloadIcon className="w-5 h-5" />
            {strings.download} {format.toUpperCase()}
          </button>
        ))}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={strings.gatedTitle}>
        {state === 'done' ? (
          <p className="text-green-400 font-semibold">{strings.gatedSuccess}</p>
        ) : (
          <form onSubmit={submitLead} className="space-y-4">
            <div>
              <label htmlFor="lead-name" className="block text-sm text-gray-400 mb-1">
                {strings.gatedName}
              </label>
              <input
                id="lead-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            <div>
              <label htmlFor="lead-phone" className="block text-sm text-gray-400 mb-1">
                {strings.gatedPhone}
              </label>
              <input
                id="lead-phone"
                type="tel"
                required
                pattern="[+]?[0-9][0-9\s-]{7,14}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                dir="ltr"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            <p className="text-xs text-gray-500">{strings.gatedNote}</p>
            {state === 'error' && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
            <button
              type="submit"
              disabled={state === 'submitting'}
              className="w-full font-bold py-3 px-6 rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors disabled:opacity-60"
            >
              {strings.gatedSubmit}
            </button>
          </form>
        )}
      </Modal>
    </>
  );
}
