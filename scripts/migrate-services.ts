/**
 * One-off migration: legacy SERVICES (5 categories) -> /content/services
 * JSON grouped by the new 10-category taxonomy. Localized titles and
 * descriptions carry over verbatim.
 * Run with: npx tsx scripts/migrate-services.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { SERVICES, PRICING } from '../legacy/constants';

type Mapping = { id: string; category: string; type: 'drafting' | 'legal-notice' | 'consultation' | 'registration'; priceINR?: number };

const MAP: Record<string, Mapping> = {
  rp1: { id: 'rent-agreement', category: 'property-tenancy', type: 'drafting' },
  rp2: { id: 'lease-agreement', category: 'property-tenancy', type: 'drafting' },
  rp3: { id: 'sale-deed', category: 'property-tenancy', type: 'drafting' },
  rp4: { id: 'gift-deed', category: 'property-tenancy', type: 'drafting' },
  rp5: { id: 'property-partition-agreement', category: 'property-tenancy', type: 'drafting' },
  rp6: { id: 'builder-buyer-agreement', category: 'property-tenancy', type: 'drafting' },
  rp7: { id: 'will-drafting', category: 'family-personal', type: 'drafting' },
  rp8: { id: 'inheritance-declaration', category: 'family-personal', type: 'drafting' },
  rp9: { id: 'landlord-notice-tenant', category: 'property-tenancy', type: 'legal-notice' },
  rp10: { id: 'leave-license-agreement', category: 'property-tenancy', type: 'drafting' },
  p1: { id: 'affidavit-general', category: 'government-paperwork', type: 'drafting' },
  p2: { id: 'name-change-affidavit', category: 'government-paperwork', type: 'drafting' },
  p3: { id: 'marriage-affidavit', category: 'family-personal', type: 'drafting' },
  p4: { id: 'birth-certificate-correction-affidavit', category: 'government-paperwork', type: 'drafting' },
  p5: { id: 'lost-document-affidavit', category: 'government-paperwork', type: 'drafting' },
  p6: { id: 'passport-annexures', category: 'government-paperwork', type: 'drafting' },
  p7: { id: 'mutual-divorce-draft', category: 'family-personal', type: 'drafting' },
  p8: { id: 'domestic-violence-complaint', category: 'family-personal', type: 'drafting' },
  p9: { id: 'live-in-agreement', category: 'family-personal', type: 'drafting' },
  p10: { id: 'notarization-facilitation', category: 'government-paperwork', type: 'registration' },
  b1: { id: 'partnership-deed', category: 'business-startup', type: 'drafting' },
  b2: { id: 'employment-contract', category: 'job-salary', type: 'drafting' },
  b3: { id: 'llp-agreement', category: 'business-startup', type: 'drafting' },
  b4: { id: 'founders-agreement', category: 'business-startup', type: 'drafting' },
  b5: { id: 'freelancer-agreement', category: 'business-startup', type: 'drafting' },
  b6: { id: 'vendor-agreement', category: 'business-startup', type: 'drafting' },
  b7: { id: 'franchise-agreement', category: 'business-startup', type: 'drafting' },
  b8: { id: 'service-level-agreement', category: 'business-startup', type: 'drafting' },
  b9: { id: 'nda', category: 'business-startup', type: 'drafting' },
  b10: { id: 'mou', category: 'business-startup', type: 'drafting' },
  gs1: { id: 'rti-application', category: 'government-paperwork', type: 'drafting' },
  gs2: { id: 'noc-drafting', category: 'government-paperwork', type: 'drafting' },
  gs3: { id: 'power-of-attorney', category: 'government-paperwork', type: 'drafting' },
  gs4: { id: 'legal-notice-dispute', category: 'money-recovery', type: 'legal-notice', priceINR: 999 },
  gs5: { id: 'consumer-complaint-draft', category: 'consumer-complaints', type: 'drafting', priceINR: 499 },
  gs6: { id: 'rera-complaint', category: 'property-tenancy', type: 'drafting', priceINR: 499 },
  gs7: { id: 'accident-affidavit', category: 'vehicle-accident', type: 'drafting' },
  gs8: { id: 'court-petition-help', category: 'government-paperwork', type: 'drafting' },
  gs9: { id: 'police-complaint-draft', category: 'police-criminal', type: 'drafting' },
  gs10: { id: 'self-declaration-form', category: 'government-paperwork', type: 'drafting' },
  os1: { id: 'website-terms-conditions', category: 'business-startup', type: 'drafting' },
  os2: { id: 'privacy-policy-drafting', category: 'business-startup', type: 'drafting' },
  os3: { id: 'refund-policy', category: 'business-startup', type: 'drafting' },
  os4: { id: 'dsc-assistance', category: 'government-paperwork', type: 'registration' },
  os5: { id: 'freelancer-service-agreement', category: 'business-startup', type: 'drafting' },
  os6: { id: 'startup-founder-agreement', category: 'business-startup', type: 'drafting' },
  os7: { id: 'investor-agreement', category: 'business-startup', type: 'drafting' },
  os8: { id: 'vendor-onboarding-docs', category: 'business-startup', type: 'drafting' },
  os9: { id: 'udyam-registration', category: 'business-startup', type: 'registration' },
  os10: { id: 'cofounder-equity-agreement', category: 'business-startup', type: 'drafting' },
};

const byCategory: Record<string, unknown[]> = {};
for (const legacy of SERVICES) {
  const m = MAP[legacy.id];
  if (!m) throw new Error(`No mapping for legacy service ${legacy.id}`);
  const service = {
    id: m.id,
    category: m.category,
    title: legacy.title,
    description: legacy.description,
    priceINR: m.priceINR ?? PRICING[legacy.category],
    deliveryDays: m.type === 'legal-notice' ? 3 : m.type === 'registration' ? 3 : 2,
    type: m.type,
  };
  (byCategory[m.category] ||= []).push(service);
}

mkdirSync('content/services', { recursive: true });
for (const [category, services] of Object.entries(byCategory)) {
  writeFileSync(`content/services/${category}.json`, JSON.stringify(services, null, 2) + '\n');
  console.log(category, (services as unknown[]).length);
}
