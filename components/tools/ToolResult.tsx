import Link from 'next/link';
import ShareResult from './ShareResult';

export interface ResultRow {
  label: string;
  value: string;
  hint?: string;
}

/**
 * The shared result card for every tool. Shows one headline figure as a
 * rubber-stamp chip (the signature motif — used once here to respect the
 * max-3-stamps-per-page rule), secondary figures as a plain grid, an optional
 * warning and estimate note, and the "share my result" WhatsApp button.
 *
 * Pass `message` (a full-width status line, e.g. "not eligible") instead of
 * `primary` when there is no single figure to headline.
 */
export default function ToolResult({
  primary,
  rows = [],
  message,
  warning,
  note,
  link,
  share,
}: {
  primary?: { label: string; value: string };
  rows?: ResultRow[];
  message?: string;
  warning?: string;
  note?: string;
  link?: { href: string; label: string };
  share: { message: string; label: string };
}) {
  return (
    <div className="mt-5 rounded-2xl border border-black/10 bg-white/70 p-6" role="status">
      {warning && (
        <p className="mb-4 rounded-lg border-[1.5px] border-amber-500/50 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
          {warning}
        </p>
      )}

      {message && <p className="text-lg font-bold text-[#1A1D23]">{message}</p>}

      {primary && (
        <div>
          <p className="text-sm text-[#6B7280]">{primary.label}</p>
          <p className="mt-2 inline-block -rotate-1 rounded-md border-[1.5px] border-brand-red px-4 py-2 font-display text-2xl font-extrabold text-brand-red sm:text-3xl">
            {primary.value}
          </p>
        </div>
      )}

      {rows.length > 0 && (
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="rounded-xl border border-black/10 bg-[#FAF8F3] p-4">
              <dt className="text-xs text-[#6B7280]">{row.label}</dt>
              <dd className="mt-1 font-display text-lg font-bold text-[#1A1D23]">{row.value}</dd>
              {row.hint && <dd className="mt-1 text-xs text-[#6B7280]">{row.hint}</dd>}
            </div>
          ))}
        </dl>
      )}

      {note && <p className="mt-5 text-xs leading-relaxed text-[#6B7280]">{note}</p>}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <ShareResult message={share.message} label={share.label} />
        {link && (
          <Link href={link.href} className="text-sm font-semibold text-brand-red underline-offset-4 hover:underline">
            {link.label} →
          </Link>
        )}
      </div>
    </div>
  );
}
