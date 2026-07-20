'use client';

import { track as vercelTrack } from '@vercel/analytics';

type EventName =
  | 'search'
  | 'search_zero_results'
  | 'template_download'
  | 'cta_click'
  | 'whatsapp_click'
  | 'whatsapp_cta_click'
  | 'calculator_complete'
  | 'assistant_message'
  | 'assistant_handoff'
  | 'lead_submitted';

/**
 * Funnel event helper: fans out to Vercel Analytics and gtag.
 * Never throws — analytics must not break the UI.
 */
export function trackEvent(name: EventName, props?: Record<string, string | number | boolean>) {
  try {
    vercelTrack(name, props);
  } catch {
    /* noop */
  }
  try {
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.('event', name, props ?? {});
  } catch {
    /* noop */
  }
}
