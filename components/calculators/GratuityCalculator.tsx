'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { computeGratuity } from '@/lib/calculators';
import { whatsAppUrlFor } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import type { Dict } from '@/lib/dictionaries';
import { WhatsAppIcon } from '../Icons';

const inr = new Intl.NumberFormat('en-IN');

interface Props {
  locale: Locale;
  strings: Dict['ui']['calc'];
}

export default function GratuityCalculator({ locale, strings }: Props) {
  const T = strings.gratuity;
  const [salary, setSalary] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('0');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && salary && years ? computeGratuity(Number(salary), Number(years), Number(months) || 0) : null;

  const inputClass =
    'w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold';

  const resultText = result?.eligible ? `${T.result}: ₹${inr.format(result.gratuity)}` : T.notEligible;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
      <form
        className="grid sm:grid-cols-3 gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          trackEvent('calculator_complete', { calculator: 'gratuity' });
        }}
      >
        <div>
          <label htmlFor="gr-salary" className="block text-sm text-gray-400 mb-1">{T.salary}</label>
          <input id="gr-salary" type="number" min="1" required value={salary} onChange={(e) => { setSalary(e.target.value); setSubmitted(false); }} className={inputClass} dir="ltr" />
        </div>
        <div>
          <label htmlFor="gr-years" className="block text-sm text-gray-400 mb-1">{T.years}</label>
          <input id="gr-years" type="number" min="0" max="60" required value={years} onChange={(e) => { setYears(e.target.value); setSubmitted(false); }} className={inputClass} dir="ltr" />
        </div>
        <div>
          <label htmlFor="gr-months" className="block text-sm text-gray-400 mb-1">{T.months}</label>
          <input id="gr-months" type="number" min="0" max="11" value={months} onChange={(e) => { setMonths(e.target.value); setSubmitted(false); }} className={inputClass} dir="ltr" />
        </div>
        <div className="sm:col-span-3">
          <button type="submit" className="font-bold py-3 px-8 rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors">
            {strings.calculate}
          </button>
        </div>
      </form>

      {result && (
        <div className="border-t border-gray-800 pt-5 space-y-3" role="status">
          {result.eligible ? (
            <>
              <p className="text-sm text-gray-400">
                {T.countedYears}: {result.countedYears}
              </p>
              <p className="text-2xl font-extrabold text-brand-gold font-display">
                {T.result}: ₹{inr.format(result.gratuity)}
              </p>
              {result.capped && <p className="text-xs text-amber-400">{T.capNote}</p>}
            </>
          ) : (
            <p className="text-amber-400">{T.notEligible}</p>
          )}
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
