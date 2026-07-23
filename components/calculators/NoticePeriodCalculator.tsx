'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { localeLang } from '@/lib/i18n';
import { computeNoticePeriod } from '@/lib/calculators';
import { trackEvent } from '@/lib/analytics';
import type { Dict } from '@/lib/dictionaries';
import ToolResult from '@/components/tools/ToolResult';
import { toolCard, toolInput, toolLabel, toolButton } from '@/components/tools/styles';

interface Props {
  locale: Locale;
  strings: Dict['ui']['calc'];
  shareUrl: string;
}

export default function NoticePeriodCalculator({ locale, strings, shareUrl }: Props) {
  const T = strings.notice;
  const today = new Date().toISOString().slice(0, 10);
  const [served, setServed] = useState(today);
  const [period, setPeriod] = useState('');
  const [unit, setUnit] = useState<'days' | 'months'>('months');
  const [submitted, setSubmitted] = useState(false);

  const result =
    submitted && served && period ? computeNoticePeriod(new Date(`${served}T00:00:00`), Number(period), unit) : null;
  const fmt = (d: Date) =>
    d.toLocaleDateString(localeLang[locale], { year: 'numeric', month: 'long', day: 'numeric', numberingSystem: 'latn' });

  const shareMessage = result
    ? `${T.shareResult.replace('{value}', fmt(result.lastWorkingDay))} ${strings.shareSuffix.replace('{url}', shareUrl)}`
    : '';

  return (
    <div className={`${toolCard} space-y-5`}>
      <form
        className="grid gap-5 sm:grid-cols-3"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          trackEvent('calculator_complete', { calculator: 'notice-period' });
        }}
      >
        <div>
          <label htmlFor="np-served" className={toolLabel}>{T.servedLabel}</label>
          <input id="np-served" type="date" required value={served} onChange={(e) => { setServed(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
        </div>
        <div>
          <label htmlFor="np-period" className={toolLabel}>{T.periodLabel}</label>
          <input id="np-period" type="number" min="1" required value={period} onChange={(e) => { setPeriod(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
        </div>
        <div>
          <label htmlFor="np-unit" className={toolLabel}>&nbsp;</label>
          <select id="np-unit" value={unit} onChange={(e) => { setUnit(e.target.value as 'days' | 'months'); setSubmitted(false); }} className={toolInput}>
            <option value="months">{T.unitMonths}</option>
            <option value="days">{T.unitDays}</option>
          </select>
        </div>
        <div className="sm:col-span-3">
          <button type="submit" className={toolButton}>{strings.calculate}</button>
        </div>
      </form>

      {result && (
        <ToolResult
          primary={{ label: T.lastDayLabel, value: fmt(result.lastWorkingDay) }}
          rows={[{ label: T.remainingLabel, value: String(Math.max(result.daysRemaining, 0)) }]}
          warning={result.daysRemaining < 0 ? T.servedPast : undefined}
          note={strings.estimateNote}
          share={{ message: shareMessage, label: strings.shareResultLabel }}
        />
      )}
    </div>
  );
}
