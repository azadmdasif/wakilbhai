'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { localeLang } from '@/lib/i18n';
import type { LimitationUnit } from '@/lib/data/limitation';
import { computeLimitationDeadline } from '@/lib/calculators';
import { trackEvent } from '@/lib/analytics';
import type { Dict } from '@/lib/dictionaries';
import ToolResult from '@/components/tools/ToolResult';
import { toolCard, toolInput, toolLabel } from '@/components/tools/styles';

/** One problem type, with its localized text + guide link resolved on the server. */
export interface LimitationChoice {
  id: string;
  label: string;
  countedFrom: string;
  windowLabel: string;
  citation: string;
  value: number;
  unit: LimitationUnit;
  guideHref?: string;
}

interface Props {
  locale: Locale;
  strings: Dict['ui']['calc'];
  shareUrl: string;
  choices: LimitationChoice[];
}

export default function LimitationChecker({ locale, strings, shareUrl, choices }: Props) {
  const L = strings.limitation;
  const [id, setId] = useState(choices[0]?.id ?? '');
  const [startDate, setStartDate] = useState('');

  const choice = choices.find((c) => c.id === id) ?? choices[0];
  const deadline =
    choice && startDate
      ? computeLimitationDeadline(new Date(`${startDate}T00:00:00`), choice.value, choice.unit)
      : null;
  const fmt = (d: Date) =>
    d.toLocaleDateString(localeLang[locale], { year: 'numeric', month: 'long', day: 'numeric', numberingSystem: 'latn' });

  const shareMessage = `${L.shareResult.replace('{value}', choice.windowLabel)} ${strings.shareSuffix.replace('{url}', shareUrl)}`;

  const rows = [
    { label: L.countedFromLabel, value: choice.countedFrom },
    ...(deadline ? [{ label: L.deadlineLabel, value: fmt(deadline) }] : []),
    { label: L.sourceLabel, value: choice.citation },
  ];

  return (
    <div className={`${toolCard} space-y-5`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lim-type" className={toolLabel}>{L.selectLabel}</label>
          <select
            id="lim-type"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              trackEvent('calculator_complete', { calculator: 'limitation', matter: e.target.value });
            }}
            className={toolInput}
          >
            {choices.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lim-start" className={toolLabel}>{L.startLabel}</label>
          <input id="lim-start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={toolInput} dir="ltr" />
        </div>
      </div>

      <ToolResult
        primary={{ label: L.windowLabel, value: choice.windowLabel }}
        rows={rows}
        note={strings.estimateNote}
        link={choice.guideHref ? { href: choice.guideHref, label: L.guideLinkLabel } : undefined}
        share={{ message: shareMessage, label: strings.shareResultLabel }}
      />
    </div>
  );
}
