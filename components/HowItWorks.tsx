import { WhatsAppIcon, PenSquareIcon, GavelIcon } from './Icons';
import type { Dict } from '@/lib/dictionaries';

/**
 * The 3-step "How it works" strip (Tell us on WhatsApp → We draft → Advocate
 * sends it) — shared by the homepage and /about#how. `paper` renders it for
 * the warm reading surface; default is the dark shell.
 */
export default function HowItWorks({ dict, paper = false, id }: { dict: Dict; paper?: boolean; id?: string }) {
  const steps = [
    { icon: WhatsAppIcon, text: dict.ui.home.step1 },
    { icon: PenSquareIcon, text: dict.ui.home.step2 },
    { icon: GavelIcon, text: dict.ui.home.step3 },
  ];
  const card = paper ? 'border-black/10 bg-white/70' : 'bg-gray-900 border-gray-800';
  const text = paper ? 'text-[#1A1D23]' : 'text-white';
  const iconColor = paper ? 'text-brand-red' : 'text-brand-gold';

  return (
    <div id={id} className="grid sm:grid-cols-3 gap-4 scroll-mt-24">
      {steps.map((step, i) => (
        <div key={step.text} className={`flex items-center gap-4 border rounded-2xl p-5 ${card}`}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red/15 text-brand-red font-extrabold font-display">
            {i + 1}
          </span>
          <div className="flex items-center gap-2">
            <step.icon className={`w-5 h-5 shrink-0 ${iconColor}`} />
            <p className={`font-bold text-sm ${text}`}>{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
