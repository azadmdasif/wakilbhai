/**
 * Watermarked sample of the document format. The preview HTML comes from our
 * own content collection (never user input), so dangerouslySetInnerHTML is
 * safe here. The pane is height-capped with a fade + a tiled "SAMPLE" overlay
 * so it reads as a preview, not the full downloadable file.
 */
export default function TemplatePreview({ html, label }: { html: string; label: string }) {
  const marks = Array.from({ length: 48 });
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#FAF8F3] text-[#1A1D23] shadow-lg">
      <figcaption className="border-b border-black/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
        {label}
      </figcaption>
      <div className="relative max-h-[460px] overflow-hidden px-6 py-6">
        {/* Tiled watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex flex-wrap content-center justify-center gap-x-8 gap-y-10 rotate-[-24deg] scale-150 select-none opacity-[0.06]"
        >
          {marks.map((_, i) => (
            <span key={i} className="whitespace-nowrap text-lg font-extrabold">
              SAMPLE — wakilbhai.com
            </span>
          ))}
        </div>
        {/* Format text */}
        <div
          className="relative text-[15px] leading-relaxed [&_p]:mb-3 [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF8F3] to-transparent"
      />
    </figure>
  );
}
