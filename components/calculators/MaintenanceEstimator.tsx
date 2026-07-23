'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { computeMaintenanceRange } from '@/lib/calculators';
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

export default function MaintenanceEstimator({ strings, shareUrl }: Props) {
  const T = strings.maintenance;
  const [income, setIncome] = useState('');
  const [dependants, setDependants] = useState('1');
  const [submitted, setSubmitted] = useState(false);

  const range = submitted && income ? computeMaintenanceRange(Number(income), Number(dependants) || 1) : null;
  const rangeText = range ? `₹${inr.format(range.low)}–₹${inr.format(range.high)}` : '';
  const shareMessage = `${T.shareResult.replace('{value}', rangeText)} ${strings.shareSuffix.replace('{url}', shareUrl)}`;

  return (
    <div className={`${toolCard} space-y-5`}>
      {/* Strong, unmissable disclaimer — maintenance is never formulaic. */}
      <p className="rounded-xl border-[1.5px] border-brand-red/40 bg-brand-red/5 p-4 text-sm font-medium text-[#1A1D23]">
        {T.disclaimer}
      </p>

      <form
        className="grid gap-5 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          trackEvent('calculator_complete', { calculator: 'maintenance' });
        }}
      >
        <div>
          <label htmlFor="mt-income" className={toolLabel}>{T.incomeLabel}</label>
          <input id="mt-income" type="number" min="1" required value={income} onChange={(e) => { setIncome(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
        </div>
        <div>
          <label htmlFor="mt-dep" className={toolLabel}>{T.dependantsLabel}</label>
          <input id="mt-dep" type="number" min="1" max="10" value={dependants} onChange={(e) => { setDependants(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className={toolButton}>{strings.calculate}</button>
        </div>
      </form>

      {range && (
        <ToolResult
          primary={{ label: T.rangeLabel, value: rangeText }}
          note={T.note}
          share={{ message: shareMessage, label: strings.shareResultLabel }}
        />
      )}
    </div>
  );
}
