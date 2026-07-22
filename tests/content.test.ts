import { describe, expect, it } from 'vitest';
import {
  getAllGuides,
  getCategories,
  getCategoryGuides,
  getGuide,
  getGuideMetas,
  getServices,
  getTemplates,
  validateContent,
} from '@/lib/content';
import { locales } from '@/lib/i18n';
import fs from 'node:fs';
import path from 'node:path';

describe('content layer', () => {
  it('loads and validates all content without errors', () => {
    expect(() => validateContent()).not.toThrow();
  });

  it('has the 10 category hubs in order', () => {
    const categories = getCategories();
    expect(categories.map((c) => c.slug)).toEqual([
      'property-tenancy',
      'family-personal',
      'money-recovery',
      'consumer-complaints',
      'job-salary',
      'police-criminal',
      'cyber-fraud',
      'vehicle-accident',
      'business-startup',
      'government-paperwork',
    ]);
  });

  it('marks police-criminal as referral-only (no drafting CTA)', () => {
    const policeCriminal = getCategories().find((c) => c.slug === 'police-criminal');
    expect(policeCriminal?.referralOnly).toBe(true);
  });

  it('includes the migrated catalogue and the new notice services', () => {
    const ids = new Set(getServices().map((s) => s.id));
    for (const id of [
      'rent-agreement',
      'legal-notice-cheque-bounce',
      'legal-notice-security-deposit',
      'legal-notice-unpaid-salary',
      'legal-notice-consumer',
      'consultation-call',
    ]) {
      expect(ids.has(id), `missing service ${id}`).toBe(true);
    }
    expect(getServices().length).toBeGreaterThanOrEqual(45);
  });

  it('has at least 10 templates with placeholder files present', () => {
    const templates = getTemplates();
    expect(templates.length).toBeGreaterThanOrEqual(10);
    for (const template of templates) {
      for (const format of template.fileFormats) {
        const file = path.join(process.cwd(), 'public', 'templates', `${template.slug}.${format}`);
        expect(fs.existsSync(file), `missing ${file}`).toBe(true);
      }
    }
  });

  it('every localized field is filled in all four locales', () => {
    for (const item of [...getCategories(), ...getTemplates()]) {
      for (const locale of locales) {
        expect(item.title[locale]).toBeTruthy();
        expect(item.description[locale]).toBeTruthy();
      }
    }
    for (const service of getServices()) {
      for (const locale of locales) {
        expect(service.title[locale]).toBeTruthy();
        expect(service.description[locale]).toBeTruthy();
      }
    }
    for (const guide of getGuideMetas()) {
      for (const locale of locales) {
        expect(guide.title[locale]).toBeTruthy();
        expect(guide.answerBox[locale]).toBeTruthy();
      }
    }
  });
});

describe('typed guide front-matter (GuideFrontmatter)', () => {
  it('resolves and validates every guide in every locale', () => {
    for (const locale of locales) {
      const guides = getAllGuides(locale);
      expect(guides.length).toBe(getGuideMetas().length);
      for (const g of guides) {
        expect(g.locale).toBe(locale);
        expect(g.title).toBeTruthy();
        expect(g.quickAnswer).toBeTruthy();
        // reviewer is structured, not a raw string
        expect(g.reviewer.name.startsWith('Adv.')).toBe(true);
        expect(g.reviewer.barCouncil).toContain('Bar Council');
        expect(g.reviewer.enrolment.length).toBeGreaterThan(0);
        expect(typeof g.draft).toBe('boolean');
      }
    }
  });

  it('getGuide matches on locale + category + slug, and drops mismatches', () => {
    const g = getGuide('en', 'money-recovery', 'cheque-bounce-what-to-do');
    expect(g?.slug).toBe('cheque-bounce-what-to-do');
    expect(g?.serviceSlug).toBe('legal-notice-cheque-bounce');
    expect(g?.servicePrice).toBe(999);
    expect(g?.costs?.rows.length).toBeGreaterThan(0);
    // wrong category → undefined
    expect(getGuide('en', 'property-tenancy', 'cheque-bounce-what-to-do')).toBeUndefined();
  });

  it('draft flag follows the guide\'s draftLocales per locale', () => {
    expect(getGuide('en', 'money-recovery', 'cheque-bounce-what-to-do')?.draft).toBe(false);
    // mr/te/ta/gu are the rollout locales, still in draft review
    expect(getGuide('mr', 'money-recovery', 'cheque-bounce-what-to-do')?.draft).toBe(true);
    expect(getGuide('ta', 'money-recovery', 'cheque-bounce-what-to-do')?.draft).toBe(true);
  });

  it('getCategoryGuides returns only that category, typed', () => {
    const guides = getCategoryGuides('en', 'money-recovery');
    expect(guides.every((g) => g.category === 'money-recovery')).toBe(true);
    expect(guides.map((g) => g.slug)).toContain('cheque-bounce-what-to-do');
  });
});
