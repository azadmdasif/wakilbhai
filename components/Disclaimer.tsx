import type { Dict } from '@/lib/dictionaries';

/**
 * The sitewide legal disclaimer, rendered from a single source of truth
 * (dict.common.disclaimerFull) so the wording stays identical everywhere:
 * WakilBhai is a documentation service, not a law firm; nothing here is legal
 * advice; no advocate–client relationship is created. `paper` styles it for the
 * warm reading surface; the default suits the dark shell.
 */
export default function Disclaimer({
  dict,
  paper = false,
  className = '',
}: {
  dict: Dict;
  paper?: boolean;
  className?: string;
}) {
  const tone = paper ? 'border-black/10 text-[#6B7280]' : 'border-gray-800 text-gray-500';
  return (
    <p className={`border-t pt-6 text-xs leading-relaxed ${tone} ${className}`}>
      <strong className="font-semibold">{dict.legal.disclaimerTitle}:</strong> {dict.common.disclaimerFull}
    </p>
  );
}
