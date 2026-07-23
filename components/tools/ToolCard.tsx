import Link from 'next/link';
import type { ToolWidget } from '@/lib/tools';
import {
  BanknoteIcon,
  ClockIcon,
  BriefcaseIcon,
  PropertyIcon,
  DocumentIcon,
  RupeeIcon,
  FamilyIcon,
} from '@/components/Icons';

/** One icon per widget — shared by the tools hub and the homepage tools strip. */
export const TOOL_ICONS: Record<ToolWidget, typeof RupeeIcon> = {
  'cheque-bounce': BanknoteIcon,
  'limitation': ClockIcon,
  'notice-period': BriefcaseIcon,
  'rent-cost': PropertyIcon,
  'stamp-duty': DocumentIcon,
  'gratuity': RupeeIcon,
  'maintenance': FamilyIcon,
};

/**
 * A tool card for the dark brand shell (hub + homepage): icon, name, one-line
 * promise and a "Free" stamp chip. Same component both places so the two views
 * stay identical.
 */
export default function ToolCard({
  href,
  widget,
  name,
  promise,
  freeLabel,
}: {
  href: string;
  widget: ToolWidget;
  name: string;
  promise: string;
  freeLabel: string;
}) {
  const Icon = TOOL_ICONS[widget];
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-colors hover:border-brand-gold/50"
    >
      <div className="flex items-start justify-between gap-3">
        <Icon className="h-8 w-8 shrink-0 text-brand-gold" />
        <span className="-rotate-1 rounded-md border-[1.5px] border-brand-red px-2.5 py-0.5 text-xs font-bold text-brand-red">
          {freeLabel}
        </span>
      </div>
      <h3 className="mt-4 font-display font-bold text-white transition-colors group-hover:text-brand-gold">{name}</h3>
      <p className="mt-1 text-sm text-gray-400">{promise}</p>
    </Link>
  );
}
