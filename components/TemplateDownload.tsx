'use client';

import { trackEvent } from '@/lib/analytics';
import { DownloadIcon } from './Icons';

/**
 * Free, instant template download — no email wall. Each format downloads on
 * click and fires a tracked `template_download` event.
 */
export default function TemplateDownload({
  slug,
  formats,
  label,
}: {
  slug: string;
  formats: ('docx' | 'pdf')[];
  label: string;
}) {
  const download = (format: string) => {
    trackEvent('template_download', { slug, format });
    const a = document.createElement('a');
    a.href = `/templates/${slug}.${format}`;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="flex flex-wrap gap-3">
      {formats.map((format, i) => (
        <button
          key={format}
          onClick={() => download(format)}
          className={`inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 py-3 font-bold transition-colors ${
            i === 0
              ? 'bg-brand-red text-white hover:bg-red-700'
              : 'border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white'
          }`}
        >
          <DownloadIcon className="h-5 w-5" />
          {label} · {format.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
