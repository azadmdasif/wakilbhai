import type { ReactNode } from 'react';

// Digit ranges across the live scripts: ASCII, Devanagari, Bengali,
// Arabic-Indic and Extended Arabic-Indic (Urdu). Plus ₹ figures.
const DIGITS = '0-9०-९০-৯٠-٩۰-۹';
const NUMBER_RE = new RegExp(`(₹\\s?[${DIGITS}][${DIGITS},.]*|[${DIGITS}][${DIGITS},.]*)`, 'g');

/** Wrap every number / ₹ figure in <strong>, returning React nodes. */
function withBoldNumbers(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(NUMBER_RE)) {
    const idx = match.index ?? 0;
    if (idx > last) nodes.push(text.slice(last, idx));
    nodes.push(<strong key={key++}>{match[0]}</strong>);
    last = idx + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/**
 * The 60-second answer card at the top of every guide — a paper surface with a
 * red accent bar, a "60-second answer" stamp label, a 40–60 word answer with
 * numbers/deadlines/₹ figures bolded, and up to 3 stamp chips of key numbers.
 * Written to stand alone: this is what AI answer engines quote.
 */
export default function QuickAnswer({
  id,
  quickAnswer,
  keyNumbers,
  label,
}: {
  id?: string;
  quickAnswer: string;
  keyNumbers?: string[];
  label: string;
}) {
  const chips = (keyNumbers ?? []).slice(0, 3);

  return (
    <div
      id={id}
      className="not-prose relative rounded-2xl border-s-4 border-brand-red bg-[#FAF8F3] p-5 text-[#1A1D23] shadow-lg sm:p-6"
    >
      {/* Label stamp chip */}
      <span className="inline-flex -rotate-1 items-center rounded-md border-[1.5px] border-brand-red px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-red">
        {label}
      </span>

      <p className="mt-3 text-lg leading-relaxed [&_strong]:font-bold">{withBoldNumbers(quickAnswer)}</p>

      {/* Key numbers — stamp chips */}
      {chips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((chip, i) => (
            <span
              key={chip}
              className={`inline-flex items-center rounded-md border-[1.5px] border-[#1A1D23]/70 px-2.5 py-1 text-xs font-bold ${
                i % 2 === 0 ? '-rotate-1' : 'rotate-1'
              }`}
            >
              {chip}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
