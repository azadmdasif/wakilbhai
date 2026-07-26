'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { computeStampDuty, type StampDocType, type StampDutyData } from '@/lib/calculators';
import { trackEvent } from '@/lib/analytics';
import type { Dict } from '@/lib/dictionaries';
import ToolResult from '@/components/tools/ToolResult';
import { toolCard, toolInput, toolLabel, toolButton } from '@/components/tools/styles';

const inr = new Intl.NumberFormat('en-IN');

interface Props {
  locale: Locale;
  data: StampDutyData;
  strings: Dict['ui']['calc'];
  shareUrl: string;
}

export default function StampDutyCalculator({ locale, data, strings, shareUrl }: Props) {
  const T = strings.stamp;
  const stateKeys = useMemo(() => Object.keys(data.states), [data]);
  const [state, setState] = useState(stateKeys[0]);
  const [docType, setDocType] = useState<StampDocType>('rentAgreement');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [tenure, setTenure] = useState('11');
  const [deposit, setDeposit] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isRent = docType === 'rentAgreement';
  const result = submitted
    ? computeStampDuty(data, {
        state,
        docType,
        monthlyRent: Number(monthlyRent) || undefined,
        tenureMonths: Number(tenure) || undefined,
        deposit: Number(deposit) || undefined,
        propertyValue: Number(propertyValue) || undefined,
      })
    : null;

  const shareMessage = result
    ? `${T.shareResult.replace('{value}', `₹${inr.format(result.duty)}`).replace('{state}', data.states[state].name[locale])} ${strings.shareSuffix.replace('{url}', shareUrl)}`
    : '';

  return (
    <div className={`${toolCard} space-y-5`}>
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          trackEvent('tool_used', { tool: 'stamp-duty' });
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sd-state" className={toolLabel}>{T.state}</label>
            <select id="sd-state" value={state} onChange={(e) => { setState(e.target.value); setSubmitted(false); }} className={toolInput}>
              {stateKeys.map((key) => (
                <option key={key} value={key}>{data.states[key].name[locale]}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sd-doc" className={toolLabel}>{T.docType}</label>
            <select id="sd-doc" value={docType} onChange={(e) => { setDocType(e.target.value as StampDocType); setSubmitted(false); }} className={toolInput}>
              <option value="rentAgreement">{T.docRent}</option>
              <option value="saleDeed">{T.docSale}</option>
              <option value="giftDeed">{T.docGift}</option>
            </select>
          </div>
        </div>
        {isRent ? (
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="sd-rent" className={toolLabel}>{T.monthlyRent}</label>
              <input id="sd-rent" type="number" min="1" required value={monthlyRent} onChange={(e) => { setMonthlyRent(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
            </div>
            <div>
              <label htmlFor="sd-tenure" className={toolLabel}>{T.tenure}</label>
              <input id="sd-tenure" type="number" min="1" max="120" required value={tenure} onChange={(e) => { setTenure(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
            </div>
            <div>
              <label htmlFor="sd-deposit" className={toolLabel}>{T.deposit}</label>
              <input id="sd-deposit" type="number" min="0" value={deposit} onChange={(e) => { setDeposit(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="sd-value" className={toolLabel}>{T.propertyValue}</label>
            <input id="sd-value" type="number" min="1" required value={propertyValue} onChange={(e) => { setPropertyValue(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
          </div>
        )}
        <button type="submit" className={toolButton}>{strings.calculate}</button>
      </form>

      {result && (
        <ToolResult
          primary={{ label: T.dutyResult, value: `₹${inr.format(result.duty)}` }}
          rows={[{ label: T.baseResult, value: `₹${inr.format(result.baseAmount)}` }]}
          note={strings.estimateNote}
          share={{ message: shareMessage, label: strings.shareResultLabel, slug: shareUrl.split('/').pop() ?? '' }}
        />
      )}
    </div>
  );
}
