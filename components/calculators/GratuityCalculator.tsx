'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { computeGratuity } from '@/lib/calculators';
import { trackEvent } from '@/lib/analytics';
import type { Dict } from '@/lib/dictionaries';
import ToolResult from '@/components/tools/ToolResult';
import { toolCard, toolInput, toolLabel, toolButton } from '@/components/tools/styles';

const inr = new Intl.NumberFormat('en-IN');

interface Props {
  locale: Locale;
  strings: Dict['ui']['calc'];
  shareUrl: string;
}

export default function GratuityCalculator({ strings, shareUrl }: Props) {
  const T = strings.gratuity;
  const [salary, setSalary] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('0');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && salary && years ? computeGratuity(Number(salary), Number(years), Number(months) || 0) : null;

  const suffix = strings.shareSuffix.replace('{url}', shareUrl);
  const shareMessage =
    result?.eligible
      ? `${T.shareResult.replace('{value}', inr.format(result.gratuity))} ${suffix}`
      : `${strings.shareGeneric.replace('{url}', shareUrl)}`;

  return (
    <div className={`${toolCard} space-y-5`}>
      <form
        className="grid gap-5 sm:grid-cols-3"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          trackEvent('calculator_complete', { calculator: 'gratuity' });
        }}
      >
        <div>
          <label htmlFor="gr-salary" className={toolLabel}>{T.salary}</label>
          <input id="gr-salary" type="number" min="1" required value={salary} onChange={(e) => { setSalary(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
        </div>
        <div>
          <label htmlFor="gr-years" className={toolLabel}>{T.years}</label>
          <input id="gr-years" type="number" min="0" max="60" required value={years} onChange={(e) => { setYears(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
        </div>
        <div>
          <label htmlFor="gr-months" className={toolLabel}>{T.months}</label>
          <input id="gr-months" type="number" min="0" max="11" value={months} onChange={(e) => { setMonths(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
        </div>
        <div className="sm:col-span-3">
          <button type="submit" className={toolButton}>{strings.calculate}</button>
        </div>
      </form>

      {result && (
        result.eligible ? (
          <ToolResult
            primary={{ label: T.result, value: `₹${inr.format(result.gratuity)}` }}
            rows={[{ label: T.countedYears, value: String(result.countedYears) }]}
            note={`${result.capped ? `${T.capNote} ` : ''}${strings.estimateNote}`}
            share={{ message: shareMessage, label: strings.shareResultLabel }}
          />
        ) : (
          <ToolResult
            message={T.notEligible}
            note={strings.estimateNote}
            share={{ message: shareMessage, label: strings.shareResultLabel }}
          />
        )
      )}
    </div>
  );
}
