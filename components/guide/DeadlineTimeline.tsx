export interface Deadline {
  label: string;
  duration: string;
  startsFrom: string;
}

/**
 * Statutory-clock visual: horizontal on desktop, vertical on mobile. Each node
 * is a duration stamp chip + label + "counted from" caption, connected by a
 * pure-CSS line (no library). The visual is aria-hidden; a screen-reader
 * ordered list carries the same steps in order.
 */
export default function DeadlineTimeline({ items, label }: { items?: Deadline[]; label: string }) {
  if (!items || items.length === 0) return null;

  return (
    <section aria-label={label} className="not-prose my-10">
      {/* Screen-reader ordered-list fallback */}
      <ol className="sr-only">
        {items.map((d, i) => (
          <li key={i}>
            {d.duration} — {d.label} ({d.startsFrom})
          </li>
        ))}
      </ol>

      {/* Visual timeline */}
      <ol aria-hidden className="flex flex-col sm:flex-row">
        {items.map((d, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="relative flex gap-4 pb-8 last:pb-0 sm:flex-1 sm:flex-col sm:gap-0 sm:pb-0">
              {/* Marker + connector */}
              <div className="relative flex w-3.5 justify-center sm:h-3.5 sm:w-full sm:items-center">
                {!isLast && (
                  <span
                    className="absolute left-1/2 top-1/2 h-full w-0.5 -translate-x-1/2 bg-[#1A1D23]/20 sm:left-1/2 sm:top-1/2 sm:h-0.5 sm:w-full sm:-translate-y-1/2"
                  />
                )}
                <span className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full bg-brand-red ring-4 ring-[#FAF8F3]" />
              </div>

              {/* Content */}
              <div className="-mt-1 flex-1 sm:mt-3 sm:flex-none sm:px-2 sm:text-center">
                <span className="inline-flex -rotate-1 items-center rounded-md border-[1.5px] border-brand-red px-2.5 py-1 text-xs font-extrabold text-brand-red">
                  {d.duration}
                </span>
                <p className="mt-2 text-sm font-bold text-[#1A1D23]">{d.label}</p>
                <p className="mt-1 text-xs text-[#6B7280]">{d.startsFrom}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
