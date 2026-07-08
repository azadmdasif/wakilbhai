'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { computeStampDuty, type StampDocType, type StampDutyData } from '@/lib/calculators';
import { whatsAppUrlFor } from '@/lib/whatsapp';
import type { Dict } from '@/lib/dictionaries';
import { WhatsAppIcon } from '../Icons';

const inr = new Intl.NumberFormat('en-IN');

interface Props {
  locale: Locale;
  data: StampDutyData;
  strings: Dict['ui']['calc'];
}

export default function StampDutyCalculator({ locale, data, strings }: Props) {
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

  const inputClass =
    'w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold';

  const resultText = result ? `${T.dutyResult}: ₹${inr.format(result.duty)} (${data.states[state].name[locale]})` : '';

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="sd-state" className="block text-sm text-gray-400 mb-1">{T.state}</label>
            <select id="sd-state" value={state} onChange={(e) => { setState(e.target.value); setSubmitted(false); }} className={inputClass}>
              {stateKeys.map((key) => (
                <option key={key} value={key}>{data.states[key].name[locale]}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sd-doc" className="block text-sm text-gray-400 mb-1">{T.docType}</label>
            <select id="sd-doc" value={docType} onChange={(e) => { setDocType(e.target.value as StampDocType); setSubmitted(false); }} className={inputClass}>
              <option value="rentAgreement">{T.docRent}</option>
              <option value="saleDeed">{T.docSale}</option>
              <option value="giftDeed">{T.docGift}</option>
            </select>
          </div>
        </div>
        {isRent ? (
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label htmlFor="sd-rent" className="block text-sm text-gray-400 mb-1">{T.monthlyRent}</label>
              <input id="sd-rent" type="number" min="1" required value={monthlyRent} onChange={(e) => { setMonthlyRent(e.target.value); setSubmitted(false); }} className={inputClass} dir="ltr" />
            </div>
            <div>
              <label htmlFor="sd-tenure" className="block text-sm text-gray-400 mb-1">{T.tenure}</label>
              <input id="sd-tenure" type="number" min="1" max="120" required value={tenure} onChange={(e) => { setTenure(e.target.value); setSubmitted(false); }} className={inputClass} dir="ltr" />
            </div>
            <div>
              <label htmlFor="sd-deposit" className="block text-sm text-gray-400 mb-1">{T.deposit}</label>
              <input id="sd-deposit" type="number" min="0" value={deposit} onChange={(e) => { setDeposit(e.target.value); setSubmitted(false); }} className={inputClass} dir="ltr" />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="sd-value" className="block text-sm text-gray-400 mb-1">{T.propertyValue}</label>
            <input id="sd-value" type="number" min="1" required value={propertyValue} onChange={(e) => { setPropertyValue(e.target.value); setSubmitted(false); }} className={inputClass} dir="ltr" />
          </div>
        )}
        <button type="submit" className="font-bold py-3 px-8 rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors">
          {strings.calculate}
        </button>
      </form>

      {result && (
        <div className="border-t border-gray-800 pt-5 space-y-3" role="status">
          <p className="text-sm text-gray-400">{T.baseResult}: ₹{inr.format(result.baseAmount)}</p>
          <p className="text-2xl font-extrabold text-brand-gold font-display">
            {T.dutyResult}: ₹{inr.format(result.duty)}
          </p>
          <p className="text-xs text-gray-500">{strings.estimateNote}</p>
          <a
            href={whatsAppUrlFor(locale, { kind: 'calculator', title: T.title, result: resultText })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold py-2 px-5 rounded-full bg-whatsapp text-white hover:bg-green-700 transition-colors text-sm"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {strings.whatsappResult}
          </a>
        </div>
      )}
    </div>
  );
}
