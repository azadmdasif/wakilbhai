/**
 * Shared class strings for the tool (calculator) UI on the warm paper reading
 * surface (CLAUDE.md). Kept as plain strings so both server and client
 * components can use them without prop drilling.
 */

/** Input/result card container. */
export const toolCard = 'rounded-2xl border border-black/10 bg-white/70 p-6';

/** Text input / date input / select. */
export const toolInput =
  'w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[#1A1D23] focus:outline-none focus:ring-2 focus:ring-brand-red';

/** Field label. */
export const toolLabel = 'mb-1 block text-sm font-medium text-[#6B7280]';

/** Primary submit button. */
export const toolButton =
  'inline-flex min-h-[48px] items-center justify-center rounded-full bg-brand-red px-8 font-bold text-white transition-colors hover:bg-red-700';
