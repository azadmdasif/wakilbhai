'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { computeStampDuty, type StampDutyData } from '@/lib/calculators';
import { trackEvent } from '@/lib/analytics';
import type { Dict } from '@/lib/dictionaries';
import ToolResult from '@/components/tools/ToolResult';
import { toolCard, toolInput, toolLabel, toolButton } from '@/components/tools/styles';

const inr = new Intl.NumberFormat('en-IN');

/** Indicative registration charge: a common 1% of the stamp base, capped. */
function estimateRegistration(base: number): number {
  return Math.min(Math.round(base * 0.01), 30000);
}

interface Props {
  locale: Locale;
  data: StampDutyData;
  strings: Dict['ui']['calc'];
  shareUrl: string;
}

export default function RentAgreementCost({ locale, data, strings, shareUrl }: Props) {
  const T = strings.rentCost;
  const S = strings.stamp; // reuse the stamp calculator's field labels
  const stateKeys = useMemo(() => Object.keys(data.states), [data]);
  const [state, setState] = useState(stateKeys[0]);
  const [monthlyRent, setMonthlyRent] = useState('');
  const [tenure, setTenure] = useState('11');
  const [deposit, setDeposit] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const stamp = submitted
    ? computeStampDuty(data, {
        state,
        docType: 'rentAgreement',
        monthlyRent: Number(monthlyRent) || undefined,
        tenureMonths: Number(tenure) || undefined,
        deposit: Number(deposit) || undefined,
      })
    : null;
  const registration = stamp ? estimateRegistration(stamp.baseAmount) : 0;
  const total = stamp ? stamp.duty + registration : 0;

  const shareMessage = stamp
    ? `${T.shareResult.replace('{value}', `₹${inr.format(total)}`).replace('{state}', data.states[state].name[locale])} ${strings.shareSuffix.replace('{url}', shareUrl)}`
    : '';

  return (
    <div className={`${toolCard} space-y-5`}>
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          trackEvent('tool_used', { tool: 'rent-cost' });
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="rc-state" className={toolLabel}>{S.state}</label>
            <select id="rc-state" value={state} onChange={(e) => { setState(e.target.value); setSubmitted(false); }} className={toolInput}>
              {stateKeys.map((key) => (
                <option key={key} value={key}>{data.states[key].name[locale]}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rc-rent" className={toolLabel}>{S.monthlyRent}</label>
            <input id="rc-rent" type="number" min="1" required value={monthlyRent} onChange={(e) => { setMonthlyRent(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
          </div>
          <div>
            <label htmlFor="rc-tenure" className={toolLabel}>{S.tenure}</label>
            <input id="rc-tenure" type="number" min="1" max="120" required value={tenure} onChange={(e) => { setTenure(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
          </div>
          <div>
            <label htmlFor="rc-deposit" className={toolLabel}>{S.deposit}</label>
            <input id="rc-deposit" type="number" min="0" value={deposit} onChange={(e) => { setDeposit(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
          </div>
        </div>
        <button type="submit" className={toolButton}>{strings.calculate}</button>
      </form>

      {stamp && (
        <ToolResult
          primary={{ label: T.totalLabel, value: `₹${inr.format(total)}` }}
          rows={[
            { label: T.stampLabel, value: `₹${inr.format(stamp.duty)}` },
            { label: T.registrationLabel, value: `₹${inr.format(registration)}` },
          ]}
          note={strings.estimateNote}
          share={{ message: shareMessage, label: strings.shareResultLabel, slug: shareUrl.split('/').pop() ?? '' }}
        />
      )}
    </div>
  );
}
