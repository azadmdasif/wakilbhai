import { describe, expect, it } from 'vitest';
import {
  getCategories,
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
