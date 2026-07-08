import { describe, expect, it } from 'vitest';
import { getBuildableCities, getCities, getStampDutyData } from '@/lib/locations';
import { locales } from '@/lib/i18n';

describe('location pages', () => {
  it('has 50 cities with localized names', () => {
    const cities = getCities();
    expect(cities).toHaveLength(50);
    for (const city of cities) {
      for (const locale of locales) {
        expect(city.name[locale]).toBeTruthy();
      }
    }
  });

  it('thin-content guard: only cities with state stamp-duty data build', () => {
    const buildable = getBuildableCities();
    const data = getStampDutyData();
    expect(buildable.length).toBeGreaterThan(0);
    expect(buildable.length).toBeLessThan(getCities().length);
    for (const city of buildable) {
      expect(data.states[city.state]).toBeDefined();
      expect((data.states[city.state] as { rentNote?: unknown }).rentNote).toBeDefined();
    }
    // Cities in states without data must be excluded, not published thin.
    expect(buildable.find((c) => c.slug === 'patna')).toBeUndefined();
    expect(buildable.find((c) => c.slug === 'jaipur')).toBeUndefined();
    expect(buildable.find((c) => c.slug === 'mumbai')).toBeDefined();
  });
});
