export interface CostRow {
  label: string;
  amount: string;
  note?: string;
}

/**
 * Paper cost table: line items (label · amount stamp chip · note) with an
 * optional footnote. Reads as a scannable card, not a wall of prose.
 */
export default function CostCard({
  title,
  rows,
  footnote,
}: {
  title: string;
  rows: CostRow[];
  footnote?: string;
}) {
  if (rows.length === 0) return null;
  return (
    <section className="not-prose rounded-2xl border border-black/10 bg-white/70 p-5 sm:p-6">
      <h2 className="mb-4 font-display text-xl font-bold text-[#1A1D23]">{title}</h2>
      <ul className="divide-y divide-black/10">
        {rows.map((row) => (
          <li key={row.label} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
            <div className="min-w-0">
              <p className="font-semibold text-[#1A1D23]">{row.label}</p>
              {row.note && <p className="text-xs text-[#6B7280]">{row.note}</p>}
            </div>
            <span className="inline-flex shrink-0 -rotate-1 items-center rounded-md border-[1.5px] border-[#1A1D23] px-2.5 py-1 text-sm font-extrabold text-[#1A1D23]">
              {row.amount}
            </span>
          </li>
        ))}
      </ul>
      {footnote && <p className="mt-4 border-t border-black/10 pt-4 text-sm leading-relaxed text-[#3f434c]">{footnote}</p>}
    </section>
  );
}
