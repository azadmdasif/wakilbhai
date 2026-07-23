import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { z } from 'zod';
import type { Locale, Localized } from './i18n';
import { localized } from './i18n/localized';
import type { Dict } from './dictionaries';

const CALC_DIR = path.join(process.cwd(), 'content', 'calculators');

const faq = z.object({ q: z.string().min(1), a: z.string().min(1) });
const localizedFaqs = localized(z.array(faq));

/** Every interactive tool widget. Add a widget → add its WIDGETS entry + dict block. */
export const toolWidgets = [
  'cheque-bounce',
  'limitation',
  'notice-period',
  'rent-cost',
  'stamp-duty',
  'gratuity',
  'maintenance',
] as const;
export type ToolWidget = (typeof toolWidgets)[number];

const toolConfigSchema = z.object({
  slug: z.string().min(1),
  widget: z.enum(toolWidgets),
  /** CtaLadder service for this tool (empty string = no paid service, WhatsApp-only). */
  serviceId: z.string(),
  relatedGuideSlug: z.string().optional(),
  faqs: localizedFaqs,
});

export type ToolConfig = z.infer<typeof toolConfigSchema> & { title?: Localized };

/** Which dict.ui.calc sub-block a widget reads its title/promise/whatMeans from. */
type CalcKey = 'stamp' | 'cheque' | 'gratuity' | 'limitation' | 'notice' | 'maintenance' | 'rentCost';

/**
 * Per-widget metadata. `order` is the display priority across the tools hub and
 * the homepage top-4 (lower = shown first), roughly by search/usage potential.
 */
export const WIDGETS: Record<ToolWidget, { dictKey: CalcKey; order: number }> = {
  'cheque-bounce': { dictKey: 'cheque', order: 1 },
  'limitation': { dictKey: 'limitation', order: 2 },
  'notice-period': { dictKey: 'notice', order: 3 },
  'rent-cost': { dictKey: 'rentCost', order: 4 },
  'stamp-duty': { dictKey: 'stamp', order: 5 },
  'gratuity': { dictKey: 'gratuity', order: 6 },
  'maintenance': { dictKey: 'maintenance', order: 7 },
};

export const getTools = cache((): ToolConfig[] => {
  if (!fs.existsSync(CALC_DIR)) return [];
  const tools: ToolConfig[] = [];
  for (const entry of fs.readdirSync(CALC_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const configPath = path.join(CALC_DIR, entry.name, 'config.json');
    if (!fs.existsSync(configPath)) continue;
    const config = toolConfigSchema.parse(JSON.parse(fs.readFileSync(configPath, 'utf8')));
    if (config.slug !== entry.name) throw new Error(`Tool folder ${entry.name} does not match slug ${config.slug}`);
    tools.push(config);
  }
  return tools.sort((a, b) => a.slug.localeCompare(b.slug));
});

export const getTool = (slug: string): ToolConfig | undefined => getTools().find((t) => t.slug === slug);

/** Tools ordered by usage potential — the single source for the hub + homepage. */
export const getToolsOrdered = (): ToolConfig[] =>
  [...getTools()].sort((a, b) => WIDGETS[a.widget].order - WIDGETS[b.widget].order);

/** The dict.ui.calc sub-block for a widget (all blocks carry title/promise/whatMeans). */
function toolBlock(dict: Dict, widget: ToolWidget) {
  const c = dict.ui.calc;
  switch (WIDGETS[widget].dictKey) {
    case 'stamp':
      return c.stamp;
    case 'cheque':
      return c.cheque;
    case 'gratuity':
      return c.gratuity;
    case 'limitation':
      return c.limitation;
    case 'notice':
      return c.notice;
    case 'maintenance':
      return c.maintenance;
    case 'rentCost':
      return c.rentCost;
  }
}

/** Title / one-line promise / "what this means" explainer for a widget. */
export function toolHeadings(dict: Dict, widget: ToolWidget): { title: string; promise: string; whatMeans: string } {
  const b = toolBlock(dict, widget);
  return { title: b.title, promise: b.promise, whatMeans: b.whatMeans };
}

export function toolTitle(dict: Dict, widget: ToolWidget): string {
  return toolBlock(dict, widget).title;
}

export function getToolBody(slug: string, locale: Locale): string | undefined {
  const bodyPath = path.join(CALC_DIR, slug, `${locale}.mdx`);
  if (!fs.existsSync(bodyPath)) return undefined;
  return fs.readFileSync(bodyPath, 'utf8');
}
