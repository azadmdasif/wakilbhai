'use client';

import { track as vercelTrack } from '@vercel/analytics';

/**
 * The typed funnel-event contract. Each event maps to the exact props it
 * carries, so call sites can't drift. The eight funnel events below mirror the
 * WakilBhai funnel (acquire → free WhatsApp → paid document → advocate); the
 * three `assistant_*`/`lead_*` events are retained for the AskWidget + lead
 * forms.
 */
export interface EventMap {
  /** Any free-WhatsApp-consult CTA. `context` says which one. */
  whatsapp_cta_click: { context: string };
  /** A paid document/service order was started. */
  service_order_click: { service: string; context?: string };
  /** A free template was downloaded. */
  template_download: { slug: string; format?: string };
  /** A free tool/calculator was run to a result. */
  tool_used: { tool: string };
  /** A site search — every query, so zero-result queries become the roadmap. */
  search_query: { q: string; results?: number };
  /** A tier of the CtaLadder was clicked (primary paid / secondary WhatsApp / tertiary consult). */
  cta_ladder_click: { tier: 'primary' | 'secondary' | 'tertiary'; service?: string };
  /** A guide/tool result was peer-shared to WhatsApp (the growth loop). */
  share_whatsapp: { slug: string };
  /** Reader reached 75% depth of a guide/tool page. */
  scroll_75: { slug: string };

  // Retained non-funnel events.
  lead_submitted: { source: string; ok?: boolean };
  assistant_message: { source: string };
  assistant_handoff: { source: string; reason: string };
}

export type EventName = keyof EventMap;

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  doNotTrack?: string;
};

/**
 * Respect Do Not Track: when the browser signals DNT we send nothing. This is
 * why WakilBhai needs no cookie banner beyond basic GA config — analytics are
 * suppressed for users who opt out, and GA is configured without ad-personal/
 * cross-site signals (see README → Analytics).
 */
function doNotTrackEnabled(): boolean {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as Navigator & { msDoNotTrack?: string };
  const dnt = nav.doNotTrack ?? (window as GtagWindow).doNotTrack ?? nav.msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
}

/**
 * Fire a typed funnel event. Fans out to Vercel Analytics and GA4 (gtag).
 * No-ops under Do Not Track, and never throws — analytics must not break UI.
 */
export function trackEvent<K extends EventName>(name: K, props: EventMap[K]): void {
  if (typeof window === 'undefined' || doNotTrackEnabled()) return;
  const payload = props as Record<string, string | number | boolean>;
  try {
    vercelTrack(name, payload);
  } catch {
    /* noop */
  }
  try {
    (window as GtagWindow).gtag?.('event', name, payload);
  } catch {
    /* noop */
  }
}
