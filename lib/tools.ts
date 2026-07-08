import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { z } from 'zod';
import type { Locale, Localized } from './i18n';
import type { Dict } from './dictionaries';

const CALC_DIR = path.join(process.cwd(), 'content', 'calculators');

const faq = z.object({ q: z.string().min(1), a: z.string().min(1) });
const localizedFaqs = z.object({ en: z.array(faq), hi: z.array(faq), ur: z.array(faq), bn: z.array(faq) });

const toolConfigSchema = z.object({
  slug: z.string().min(1),
  /** Widget key resolved by the tools page. */
  widget: z.enum(['stamp-duty', 'cheque-bounce', 'gratuity']),
  /** ConversionRail service for this tool. */
  serviceId: z.string().min(1),
  relatedGuideSlug: z.string().optional(),
  faqs: localizedFaqs,
});

export type ToolConfig = z.infer<typeof toolConfigSchema> & { title?: Localized };

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

export function toolTitle(dict: Dict, widget: string): string {
  switch (widget) {
    case 'stamp-duty':
      return dict.ui.calc.stamp.title;
    case 'cheque-bounce':
      return dict.ui.calc.cheque.title;
    case 'gratuity':
      return dict.ui.calc.gratuity.title;
    default:
      return widget;
  }
}

export function getToolBody(slug: string, locale: Locale): string | undefined {
  const bodyPath = path.join(CALC_DIR, slug, `${locale}.mdx`);
  if (!fs.existsSync(bodyPath)) return undefined;
  return fs.readFileSync(bodyPath, 'utf8');
}
