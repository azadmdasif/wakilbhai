import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { z } from 'zod';
import type { Category, DocTemplate, Guide, GuideMeta, PaidService } from '@/types';
import { locales, type Locale } from './i18n';

const CONTENT_DIR = path.join(process.cwd(), 'content');

const localizedString = z.object({ en: z.string().min(1), hi: z.string().min(1), ur: z.string().min(1), bn: z.string().min(1) });
const localizedStringArray = z.object({
  en: z.array(z.string()),
  hi: z.array(z.string()),
  ur: z.array(z.string()),
  bn: z.array(z.string()),
});
const faq = z.object({ q: z.string().min(1), a: z.string().min(1) });
const localizedFaqs = z.object({ en: z.array(faq), hi: z.array(faq), ur: z.array(faq), bn: z.array(faq) });

const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'kebab-case slug expected');

export const categorySchema: z.ZodType<Category> = z.object({
  slug,
  title: localizedString,
  description: localizedString,
  icon: z.string().min(1),
  order: z.number().int().nonnegative(),
  referralOnly: z.boolean().optional(),
});

export const guideMetaSchema: z.ZodType<GuideMeta> = z.object({
  slug,
  category: slug,
  title: localizedString,
  answerBox: localizedString,
  searchKeywords: localizedStringArray,
  relatedServiceIds: z.array(z.string()),
  relatedTemplateSlugs: z.array(z.string()),
  relatedGuideSlugs: z.array(z.string()),
  faqs: localizedFaqs,
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD expected'),
});

export const templateSchema: z.ZodType<DocTemplate> = z.object({
  slug,
  category: slug,
  title: localizedString,
  description: localizedString,
  fileFormats: z.array(z.enum(['docx', 'pdf'])).min(1),
  gated: z.boolean(),
  relatedServiceId: z.string().optional(),
});

export const serviceSchema: z.ZodType<PaidService> = z.object({
  id: slug,
  category: z.string().min(1),
  title: localizedString,
  description: localizedString,
  priceINR: z.number().int().positive(),
  deliveryDays: z.number().int().nonnegative(),
  type: z.enum(['drafting', 'legal-notice', 'consultation', 'registration']),
});

function readJsonFiles(dir: string): { file: string; data: unknown }[] {
  const abs = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => ({ file: path.join(dir, f), data: JSON.parse(fs.readFileSync(path.join(abs, f), 'utf8')) }));
}

function parseAll<T>(schema: z.ZodType<T>, dir: string): T[] {
  const out: T[] = [];
  for (const { file, data } of readJsonFiles(dir)) {
    // A file may contain a single object or an array of them.
    const items = Array.isArray(data) ? data : [data];
    for (const item of items) {
      const result = schema.safeParse(item);
      if (!result.success) {
        throw new Error(`Invalid content in ${file}: ${result.error.message}`);
      }
      out.push(result.data);
    }
  }
  return out;
}

export const getCategories = cache((): Category[] => parseAll(categorySchema, 'categories').sort((a, b) => a.order - b.order));

export const getCategory = (slugValue: string): Category | undefined => getCategories().find((c) => c.slug === slugValue);

export const getServices = cache((): PaidService[] => parseAll(serviceSchema, 'services'));

export const getService = (id: string): PaidService | undefined => getServices().find((s) => s.id === id);

export const getTemplates = cache((): DocTemplate[] => parseAll(templateSchema, 'templates'));

export const getTemplate = (slugValue: string): DocTemplate | undefined => getTemplates().find((t) => t.slug === slugValue);

export const getGuideMetas = cache((): GuideMeta[] => {
  const guidesDir = path.join(CONTENT_DIR, 'guides');
  if (!fs.existsSync(guidesDir)) return [];
  const metas: GuideMeta[] = [];
  for (const entry of fs.readdirSync(guidesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const metaPath = path.join(guidesDir, entry.name, 'meta.json');
    if (!fs.existsSync(metaPath)) {
      throw new Error(`Guide folder ${entry.name} is missing meta.json`);
    }
    const result = guideMetaSchema.safeParse(JSON.parse(fs.readFileSync(metaPath, 'utf8')));
    if (!result.success) {
      throw new Error(`Invalid guide meta ${entry.name}: ${result.error.message}`);
    }
    if (result.data.slug !== entry.name) {
      throw new Error(`Guide folder ${entry.name} does not match slug ${result.data.slug}`);
    }
    metas.push(result.data);
  }
  return metas.sort((a, b) => a.slug.localeCompare(b.slug));
});

export const getGuideMeta = (slugValue: string): GuideMeta | undefined => getGuideMetas().find((g) => g.slug === slugValue);

export const getGuidesByCategory = (category: string): GuideMeta[] => getGuideMetas().filter((g) => g.category === category);

export function getGuide(slugValue: string, locale: Locale): Guide | undefined {
  const meta = getGuideMeta(slugValue);
  if (!meta) return undefined;
  const bodyPath = path.join(CONTENT_DIR, 'guides', slugValue, `${locale}.mdx`);
  if (!fs.existsSync(bodyPath)) return undefined;
  return { ...meta, body: fs.readFileSync(bodyPath, 'utf8') };
}

/**
 * Cross-reference integrity check for the whole content tree.
 * Throws with a readable message on the first broken reference.
 * Used by tests and can be run at build time.
 */
export function validateContent(): void {
  const categorySlugs = new Set(getCategories().map((c) => c.slug));
  const serviceIds = new Set(getServices().map((s) => s.id));
  const templateSlugs = new Set(getTemplates().map((t) => t.slug));
  const guideSlugs = new Set(getGuideMetas().map((g) => g.slug));

  if (categorySlugs.size !== getCategories().length) throw new Error('Duplicate category slug');
  if (serviceIds.size !== getServices().length) throw new Error('Duplicate service id');
  if (templateSlugs.size !== getTemplates().length) throw new Error('Duplicate template slug');

  for (const service of getServices()) {
    if (service.category !== 'general' && !categorySlugs.has(service.category)) {
      throw new Error(`Service ${service.id} references unknown category ${service.category}`);
    }
  }
  for (const template of getTemplates()) {
    if (!categorySlugs.has(template.category)) {
      throw new Error(`Template ${template.slug} references unknown category ${template.category}`);
    }
    if (template.relatedServiceId && !serviceIds.has(template.relatedServiceId)) {
      throw new Error(`Template ${template.slug} references unknown service ${template.relatedServiceId}`);
    }
  }
  for (const guide of getGuideMetas()) {
    if (!categorySlugs.has(guide.category)) {
      throw new Error(`Guide ${guide.slug} references unknown category ${guide.category}`);
    }
    for (const id of guide.relatedServiceIds) {
      if (!serviceIds.has(id)) throw new Error(`Guide ${guide.slug} references unknown service ${id}`);
    }
    for (const t of guide.relatedTemplateSlugs) {
      if (!templateSlugs.has(t)) throw new Error(`Guide ${guide.slug} references unknown template ${t}`);
    }
    for (const g of guide.relatedGuideSlugs) {
      if (!guideSlugs.has(g)) throw new Error(`Guide ${guide.slug} references unknown guide ${g}`);
    }
    for (const locale of locales) {
      const bodyPath = path.join(CONTENT_DIR, 'guides', guide.slug, `${locale}.mdx`);
      if (!fs.existsSync(bodyPath)) {
        throw new Error(`Guide ${guide.slug} is missing ${locale}.mdx`);
      }
    }
  }
}
