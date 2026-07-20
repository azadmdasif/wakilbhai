'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  FileText,
  Send,
  Clock,
  Gavel,
  Mail,
  Scale,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Phone,
  FileSignature,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  'file-text': FileText,
  send: Send,
  clock: Clock,
  gavel: Gavel,
  mail: Mail,
  scale: Scale,
  banknote: Banknote,
  shield: ShieldCheck,
  check: CheckCircle2,
  alert: AlertTriangle,
  phone: Phone,
  signature: FileSignature,
};

export interface StepCardItem {
  icon: string;
  title: string;
  summary: string;
  /** Pre-rendered MDX detail (collapsed). */
  detail: ReactNode;
  /** Micro-CTA shown in the expanded card. */
  serviceHint?: { href: string; label: string };
}

/**
 * Numbered, sequenced how-to cards that replace long "Step 1/2/3" prose. Each
 * card: number badge + lucide icon + ≤8-word title + ≤2-line summary, with
 * "See details" expanding the full MDX. Cards below the fold scroll-reveal with
 * a stagger; content is visible by default (no-JS safe) and reduced-motion
 * skips the animation entirely.
 */
export default function StepCards({ items, seeDetailsLabel }: { items: StepCardItem[]; seeDetailsLabel: string }) {
  const [hidden, setHidden] = useState<boolean[]>(() => items.map(() => false));
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          setHidden((prev) => {
            if (!prev[idx]) return prev;
            const next = [...prev];
            next[idx] = false;
            return next;
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    const toHide: number[] = [];
    refs.current.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top > window.innerHeight * 0.85) {
        toHide.push(i);
        observer.observe(el);
      }
    });
    if (toHide.length) setHidden((prev) => prev.map((v, i) => (toHide.includes(i) ? true : v)));

    return () => observer.disconnect();
  }, []);

  return (
    <ol className="not-prose space-y-4">
      {items.map((item, i) => {
        const Icon = ICONS[item.icon] ?? FileText;
        return (
          <li
            key={i}
            data-idx={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            style={{ transitionDelay: `${(i % 3) * 90}ms` }}
            className={`rounded-2xl border border-gray-800 bg-gray-900 p-5 transition-all duration-500 ease-out motion-reduce:!transition-none ${
              hidden[i] ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red/15 text-brand-red">
                <Icon className="h-5 w-5" aria-hidden />
                <span className="absolute -end-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[11px] font-extrabold text-white">
                  {i + 1}
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{item.summary}</p>
                <details className="group mt-3">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-sm font-semibold text-brand-gold">
                    {seeDetailsLabel}
                    <span className="transition-transform group-open:rotate-90" aria-hidden>
                      →
                    </span>
                  </summary>
                  <div className="mt-3 border-t border-gray-800 pt-3 text-gray-300">
                    {item.detail}
                    {item.serviceHint && (
                      <Link
                        href={item.serviceHint.href}
                        className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-red px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700"
                      >
                        {item.serviceHint.label} <span aria-hidden>→</span>
                      </Link>
                    )}
                  </div>
                </details>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
