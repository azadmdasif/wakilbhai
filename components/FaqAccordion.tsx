interface Faq {
  q: string;
  a: string;
}

/** Accessible, zero-JS FAQ accordion using native <details>. */
export default function FaqAccordion({ title, faqs }: { title: string; faqs: Faq[] }) {
  if (faqs.length === 0) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold text-white font-display mb-6">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details key={faq.q} className="group bg-gray-900 border border-gray-800 rounded-xl">
            <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 text-white font-semibold">
              {faq.q}
              <span className="text-brand-gold transition-transform group-open:rotate-45 text-xl leading-none shrink-0" aria-hidden>
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-gray-300 leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
