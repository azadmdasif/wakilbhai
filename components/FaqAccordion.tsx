interface Faq {
  q: string;
  a: string;
}

/** Accessible, zero-JS FAQ accordion using native <details>. */
export default function FaqAccordion({ title, faqs, paper = false }: { title: string; faqs: Faq[]; paper?: boolean }) {
  if (faqs.length === 0) return null;
  const t = paper
    ? {
        heading: 'text-[#1A1D23]',
        card: 'border-black/10 bg-white/70',
        summary: 'text-[#1A1D23]',
        plus: 'text-brand-red',
        answer: 'text-[#3f434c]',
      }
    : {
        heading: 'text-white',
        card: 'bg-gray-900 border-gray-800',
        summary: 'text-white',
        plus: 'text-brand-gold',
        answer: 'text-gray-300',
      };
  return (
    <section>
      <h2 className={`mb-6 font-display text-2xl font-bold ${t.heading}`}>{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details key={faq.q} className={`group rounded-xl border ${t.card}`}>
            <summary
              className={`flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold ${t.summary}`}
            >
              {faq.q}
              <span className={`shrink-0 text-xl leading-none transition-transform group-open:rotate-45 ${t.plus}`} aria-hidden>
                +
              </span>
            </summary>
            <p className={`px-5 pb-5 leading-relaxed ${t.answer}`}>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
