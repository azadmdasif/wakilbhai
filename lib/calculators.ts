import type { Localized } from './i18n';
import type { LimitationUnit } from './data/limitation';

// ---------- Stamp duty ----------

export type StampDocType = 'rentAgreement' | 'saleDeed' | 'giftDeed';
export type StampBase = 'avgAnnualRent' | 'totalRentPlusDeposit' | 'propertyValue';

export interface StampRule {
  base: StampBase;
  pct: number;
  verify?: boolean;
}

export interface StampStateData {
  name: Localized;
  rentAgreement: StampRule;
  saleDeed: StampRule;
  giftDeed: StampRule;
}

export interface StampDutyData {
  states: Record<string, StampStateData>;
}

export interface StampDutyInput {
  state: string;
  docType: StampDocType;
  monthlyRent?: number;
  tenureMonths?: number;
  deposit?: number;
  propertyValue?: number;
}

export function computeStampDuty(data: StampDutyData, input: StampDutyInput): { duty: number; baseAmount: number } | null {
  const stateData = data.states[input.state];
  if (!stateData) return null;
  const rule = stateData[input.docType];
  let baseAmount: number;
  switch (rule.base) {
    case 'avgAnnualRent':
      if (!input.monthlyRent) return null;
      baseAmount = input.monthlyRent * 12;
      break;
    case 'totalRentPlusDeposit':
      if (!input.monthlyRent || !input.tenureMonths) return null;
      baseAmount = input.monthlyRent * input.tenureMonths + (input.deposit ?? 0);
      break;
    case 'propertyValue':
      if (!input.propertyValue) return null;
      baseAmount = input.propertyValue;
      break;
  }
  const duty = Math.round((baseAmount * rule.pct) / 100);
  return { duty, baseAmount };
}

// ---------- Cheque bounce timeline ----------

export interface ChequeBounceResult {
  /** Last date to send the Sec 138 demand notice (memo date + 30 days). */
  noticeDeadline: Date;
  /** End of the drawer's 15-day payment window, counted from noticeDate. */
  paymentWindowEnds: Date;
  /** Last date to file the complaint (1 month after the payment window ends). */
  complaintDeadline: Date;
  /** Statutory fine can extend to twice the cheque amount. */
  maxFine: number;
  /** Interim compensation under Sec 143A can be up to 20%. */
  maxInterimCompensation: number;
}

function addDays(date: Date, days: number): Date {
  const out = new Date(date);
  out.setDate(out.getDate() + days);
  return out;
}

function addMonths(date: Date, months: number): Date {
  const out = new Date(date);
  out.setMonth(out.getMonth() + months);
  return out;
}

function addYears(date: Date, years: number): Date {
  const out = new Date(date);
  out.setFullYear(out.getFullYear() + years);
  return out;
}

export function computeChequeBounce(amount: number, memoDate: Date, noticeDate?: Date): ChequeBounceResult {
  const notice = noticeDate ?? new Date();
  const paymentWindowEnds = addDays(notice, 15);
  return {
    noticeDeadline: addDays(memoDate, 30),
    paymentWindowEnds,
    complaintDeadline: addMonths(paymentWindowEnds, 1),
    maxFine: amount * 2,
    maxInterimCompensation: Math.round(amount * 0.2),
  };
}

// ---------- Gratuity ----------

export interface GratuityResult {
  eligible: boolean;
  /** Years counted for the formula (service beyond 6 months rounds up). */
  countedYears: number;
  /** 15/26 x last drawn (basic + DA) x years, capped at the statutory maximum. */
  gratuity: number;
  capped: boolean;
}

export const GRATUITY_CAP_INR = 2000000; // statutory maximum, Payment of Gratuity Act (VERIFY: current cap)

export function computeGratuity(lastDrawnSalary: number, years: number, extraMonths = 0): GratuityResult {
  const totalYears = years + extraMonths / 12;
  const eligible = totalYears >= 5;
  const countedYears = extraMonths >= 6 ? years + 1 : years;
  const raw = Math.round((15 / 26) * lastDrawnSalary * countedYears);
  const gratuity = eligible ? Math.min(raw, GRATUITY_CAP_INR) : 0;
  return { eligible, countedYears, gratuity, capped: eligible && raw > GRATUITY_CAP_INR };
}

// ---------- Limitation deadline ----------

/** The last date to file, counting a limitation window forward from a start date. */
export function computeLimitationDeadline(startDate: Date, value: number, unit: LimitationUnit): Date {
  switch (unit) {
    case 'years':
      return addYears(startDate, value);
    case 'months':
      return addMonths(startDate, value);
    case 'days':
      return addDays(startDate, value);
  }
}

// ---------- Employment notice period ----------

export interface NoticePeriodResult {
  /** The last working day = served date + the notice length. */
  lastWorkingDay: Date;
  /** Whole days from today until the last working day (negative if past). */
  daysRemaining: number;
}

export function computeNoticePeriod(servedDate: Date, value: number, unit: 'days' | 'months'): NoticePeriodResult {
  const lastWorkingDay = unit === 'months' ? addMonths(servedDate, value) : addDays(servedDate, value);
  const today = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.ceil(
    (Date.UTC(lastWorkingDay.getFullYear(), lastWorkingDay.getMonth(), lastWorkingDay.getDate()) -
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) /
      msPerDay,
  );
  return { lastWorkingDay, daysRemaining };
}
