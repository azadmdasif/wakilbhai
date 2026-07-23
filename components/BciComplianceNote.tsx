import type { Dict } from '@/lib/dictionaries';
import { ShieldIcon } from './Icons';

/**
 * Bar Council of India compliance note for the lawyer-facing pages
 * (/talk-to-a-lawyer, /lawyers): advocates may not advertise or solicit;
 * WakilBhai is an independent platform, not a law firm, connecting users to
 * independent advocates on request — no ranking, endorsement or solicitation.
 * `paper` styles it for the warm reading surface; default suits the dark shell.
 */
export default function BciComplianceNote({ dict, paper = false }: { dict: Dict; paper?: boolean }) {
  const box = paper ? 'border-black/10 bg-white/70 text-[#1A1D23]' : 'border-gray-800 bg-gray-900 text-gray-300';
  const muted = paper ? 'text-[#6B7280]' : 'text-gray-400';
  const C = dict.ui.compliance;
  return (
    <aside className={`rounded-2xl border p-5 ${box}`} aria-label={C.bciTitle}>
      <h2 className="flex items-center gap-2 font-display text-sm font-bold">
        <ShieldIcon className="h-4 w-4 shrink-0 text-brand-red" aria-hidden />
        {C.bciTitle}
      </h2>
      <p className={`mt-2 text-xs leading-relaxed ${muted}`}>{C.bciNote}</p>
    </aside>
  );
}
