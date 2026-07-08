import { describe, expect, it } from 'vitest';
import { computeChequeBounce, computeGratuity, computeStampDuty, GRATUITY_CAP_INR, type StampDutyData } from '@/lib/calculators';
import stampData from '@/content/calculators/stamp-duty.json';

const data = stampData as unknown as StampDutyData;

describe('stamp duty calculator', () => {
  it('computes annual-rent based duty (Delhi rent agreement, 2%)', () => {
    const result = computeStampDuty(data, { state: 'delhi', docType: 'rentAgreement', monthlyRent: 20000 });
    expect(result).not.toBeNull();
    expect(result!.baseAmount).toBe(240000);
    expect(result!.duty).toBe(4800);
  });

  it('computes total-rent-plus-deposit duty (Maharashtra, 0.25%)', () => {
    const result = computeStampDuty(data, {
      state: 'maharashtra',
      docType: 'rentAgreement',
      monthlyRent: 30000,
      tenureMonths: 11,
      deposit: 100000,
    });
    expect(result!.baseAmount).toBe(430000);
    expect(result!.duty).toBe(1075);
  });

  it('computes property-value duty (UP sale deed, 7%)', () => {
    const result = computeStampDuty(data, { state: 'uttar-pradesh', docType: 'saleDeed', propertyValue: 5000000 });
    expect(result!.duty).toBe(350000);
  });

  it('returns null when required inputs are missing or state unknown', () => {
    expect(computeStampDuty(data, { state: 'delhi', docType: 'saleDeed' })).toBeNull();
    expect(computeStampDuty(data, { state: 'goa', docType: 'saleDeed', propertyValue: 1 })).toBeNull();
  });

  it('has all 8 seed states with all 3 document types', () => {
    expect(Object.keys(data.states)).toHaveLength(8);
    for (const state of Object.values(data.states)) {
      expect(state.rentAgreement.pct).toBeGreaterThan(0);
      expect(state.saleDeed.pct).toBeGreaterThan(0);
      expect(state.giftDeed.pct).toBeGreaterThan(0);
    }
  });
});

describe('cheque bounce timeline', () => {
  it('computes statutory deadlines', () => {
    const memo = new Date('2026-01-01T00:00:00Z');
    const notice = new Date('2026-01-10T00:00:00Z');
    const result = computeChequeBounce(100000, memo, notice);
    expect(result.noticeDeadline.toISOString().slice(0, 10)).toBe('2026-01-31');
    expect(result.paymentWindowEnds.toISOString().slice(0, 10)).toBe('2026-01-25');
    expect(result.complaintDeadline.toISOString().slice(0, 10)).toBe('2026-02-25');
    expect(result.maxFine).toBe(200000);
    expect(result.maxInterimCompensation).toBe(20000);
  });
});

describe('gratuity calculator', () => {
  it('applies the 15/26 formula', () => {
    const result = computeGratuity(52000, 10);
    expect(result.eligible).toBe(true);
    expect(result.gratuity).toBe(Math.round((15 / 26) * 52000 * 10));
  });

  it('rounds up service beyond 6 months', () => {
    expect(computeGratuity(26000, 7, 7).countedYears).toBe(8);
    expect(computeGratuity(26000, 7, 5).countedYears).toBe(7);
  });

  it('is not payable below 5 years of service', () => {
    const result = computeGratuity(50000, 4, 5);
    expect(result.eligible).toBe(false);
    expect(result.gratuity).toBe(0);
  });

  it('caps at the statutory maximum', () => {
    const result = computeGratuity(500000, 40);
    expect(result.capped).toBe(true);
    expect(result.gratuity).toBe(GRATUITY_CAP_INR);
  });
});
