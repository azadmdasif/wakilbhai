'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { WhatsAppIcon } from '@/components/Icons';

export interface FlowNode {
  id: string;
  question: string;
  yes: string;
  no: string;
}
export interface FlowOutcome {
  label: string;
  href?: string;
}
export interface ResolvedFlow {
  start: string;
  nodes: FlowNode[];
  outcomes: Record<string, FlowOutcome>;
}

/**
 * "Which path applies to me?" — an interactive yes/no stepper (one question at
 * a time, big Yes/No buttons, back link, progress dots). Outcomes deep-link to
 * a guide section, a service, or the WhatsApp free consult. Not a flowchart.
 */
export default function DecisionFlow({
  flow,
  labels,
}: {
  flow: ResolvedFlow;
  labels: { yes: string; no: string; back: string; startOver: string; result: string };
}) {
  const nodeMap = useMemo(() => new Map(flow.nodes.map((n) => [n.id, n])), [flow.nodes]);
  const [current, setCurrent] = useState(flow.start);
  const [history, setHistory] = useState<string[]>([]);

  // Longest question-chain from start → total progress dots.
  const maxDepth = useMemo(() => {
    const depth = (id: string, seen: Set<string>): number => {
      const node = nodeMap.get(id);
      if (!node || seen.has(id)) return 0;
      const next = new Set(seen).add(id);
      return 1 + Math.max(depth(node.yes, next), depth(node.no, next));
    };
    return depth(flow.start, new Set());
  }, [nodeMap, flow.start]);

  const node = nodeMap.get(current);
  const outcome = node ? undefined : flow.outcomes[current];

  const answer = (dir: 'yes' | 'no') => {
    if (!node) return;
    setHistory((h) => [...h, current]);
    setCurrent(dir === 'yes' ? node.yes : node.no);
  };
  const back = () => {
    setHistory((h) => {
      if (h.length === 0) return h;
      setCurrent(h[h.length - 1]);
      return h.slice(0, -1);
    });
  };
  const reset = () => {
    setCurrent(flow.start);
    setHistory([]);
  };

  const answered = history.length;

  const outcomeIsWhatsApp = outcome?.href?.includes('wa.me');
  const outcomeInternal = outcome?.href?.startsWith('/');

  const onOutcomeClick = () =>
    trackEvent(outcomeIsWhatsApp ? 'whatsapp_cta_click' : 'cta_click', { context: 'decision-flow', outcome: current });

  const outcomeClass = `mt-3 inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 py-3 text-start font-bold text-white transition-colors ${
    outcomeIsWhatsApp ? 'bg-whatsapp hover:bg-green-700' : 'bg-brand-red hover:bg-red-700'
  }`;

  return (
    <div className="not-prose rounded-2xl border border-gray-800 bg-gray-900 p-6">
      {/* Progress dots */}
      <div className="mb-5 flex items-center gap-1.5">
        {Array.from({ length: Math.max(maxDepth, 1) }).map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i < answered || (i === answered && node) ? 'w-6 bg-brand-red' : 'w-2 bg-gray-700'
            }`}
          />
        ))}
      </div>

      {node ? (
        <>
          <p className="text-lg font-bold text-white font-display sm:text-xl">{node.question}</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => answer('yes')}
              className="min-h-[52px] rounded-xl border-2 border-gray-700 bg-gray-800 text-base font-bold text-white transition-colors hover:border-brand-red hover:bg-brand-red"
            >
              {labels.yes}
            </button>
            <button
              onClick={() => answer('no')}
              className="min-h-[52px] rounded-xl border-2 border-gray-700 bg-gray-800 text-base font-bold text-white transition-colors hover:border-brand-red hover:bg-brand-red"
            >
              {labels.no}
            </button>
          </div>
        </>
      ) : outcome ? (
        <>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{labels.result}</p>
          {/* The label doubles as the CTA when there's a link; plain text otherwise. */}
          {outcome.href ? (
            outcomeInternal ? (
              <Link href={outcome.href} onClick={onOutcomeClick} className={outcomeClass}>
                {outcome.label} <span aria-hidden>→</span>
              </Link>
            ) : (
              <a
                href={outcome.href}
                onClick={onOutcomeClick}
                target={outcomeIsWhatsApp ? '_blank' : undefined}
                rel={outcomeIsWhatsApp ? 'noopener noreferrer' : undefined}
                className={outcomeClass}
              >
                {outcomeIsWhatsApp && <WhatsAppIcon className="h-5 w-5 shrink-0" />}
                {outcome.label} <span aria-hidden>→</span>
              </a>
            )
          ) : (
            <p className="mt-1 text-lg font-bold text-white font-display sm:text-xl">{outcome.label}</p>
          )}
        </>
      ) : null}

      {(answered > 0 || !node) && (
        <div className="mt-5 flex items-center gap-5 text-sm">
          {answered > 0 && (
            <button onClick={back} className="text-gray-400 transition-colors hover:text-white">
              ← {labels.back}
            </button>
          )}
          {(answered > 0 || !node) && (
            <button onClick={reset} className="text-gray-400 transition-colors hover:text-white">
              {labels.startOver}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
