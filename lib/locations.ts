import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { z } from 'zod';
import type { City } from '@/types';
import { localized } from './i18n/localized';
import type { StampDutyData } from './calculators';

const citySchema: z.ZodType<City> = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  name: localized(z.string().min(1)),
  state: z.string().min(1),
});

export const getCities = cache((): City[] => {
  const file = path.join(process.cwd(), 'content', 'locations', 'cities.json');
  if (!fs.existsSync(file)) return [];
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as unknown[];
  return data.map((item) => citySchema.parse(item));
});

export const getStampDutyData = cache((): StampDutyData => {
  const file = path.join(process.cwd(), 'content', 'calculators', 'stamp-duty.json');
  return JSON.parse(fs.readFileSync(file, 'utf8')) as StampDutyData;
});

/**
 * Thin-content guard: only cities whose state has differentiating data
 * (stamp duty rules + registration notes) get a page. Cities in states
 * without data are excluded from the build rather than published as
 * boilerplate. Adding a state to stamp-duty.json automatically unlocks
 * its cities.
 */
export const getBuildableCities = cache((): City[] => {
  const data = getStampDutyData();
  return getCities().filter((city) => {
    const state = data.states[city.state];
    return Boolean(state && state.rentAgreement && (state as { rentNote?: unknown }).rentNote);
  });
});

export const getCity = (slug: string): City | undefined => getBuildableCities().find((c) => c.slug === slug);

/**
 * Service x city page combinations. Adding another combo (e.g. legal
 * notices per city) is config here + reusing the same page template.
 */
export const LOCATION_PAGES = [{ pathPrefix: 'rent-agreement', serviceId: 'rent-agreement', guideSlug: 'rent-agreement-guide' }] as const;
