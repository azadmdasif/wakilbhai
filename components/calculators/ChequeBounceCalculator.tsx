'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { localeLang } from '@/lib/i18n';
import { computeChequeBounce } from '@/lib/calculators';
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

export default function ChequeBounceCalculator({ locale, strings, shareUrl }: Props) {
  const T = strings.cheque;
  const today = new Date().toISOString().slice(0, 10);
  const [amount, setAmount] = useState('');
  const [memoDate, setMemoDate] = useState('');
  const [noticeDate, setNoticeDate] = useState(today);
  const [submitted, setSubmitted] = useState(false);

  const fmt = (date: Date) =>
    date.toLocaleDateString(localeLang[locale], { year: 'numeric', month: 'long', day: 'numeric', numberingSystem: 'latn' });

  const result =
    submitted && amount && memoDate
      ? computeChequeBounce(Number(amount), new Date(`${memoDate}T00:00:00`), new Date(`${noticeDate}T00:00:00`))
      : null;
  const noticeWindowExpired = result !== null && new Date() > result.noticeDeadline;

  const shareMessage = result
    ? `${T.shareResult.replace('{value}', fmt(result.complaintDeadline))} ${strings.shareSuffix.replace('{url}', shareUrl)}`
    : '';

  return (
    <div className={`${toolCard} space-y-5`}>
      <form
        className="grid gap-5 sm:grid-cols-3"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          trackEvent('tool_used', { tool: 'cheque-bounce' });
        }}
      >
        <div>
          <label htmlFor="cb-amount" className={toolLabel}>{T.amount}</label>
          <input id="cb-amount" type="number" min="1" required value={amount} onChange={(e) => { setAmount(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
        </div>
        <div>
          <label htmlFor="cb-memo" className={toolLabel}>{T.memoDate}</label>
          <input id="cb-memo" type="date" required max={today} value={memoDate} onChange={(e) => { setMemoDate(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
        </div>
        <div>
          <label htmlFor="cb-notice" className={toolLabel}>{T.noticeDate}</label>
          <input id="cb-notice" type="date" required value={noticeDate} onChange={(e) => { setNoticeDate(e.target.value); setSubmitted(false); }} className={toolInput} dir="ltr" />
        </div>
        <div className="sm:col-span-3">
          <button type="submit" className={toolButton}>{strings.calculate}</button>
        </div>
      </form>

      {result && (
        <ToolResult
          primary={{ label: T.noticeDeadline, value: fmt(result.noticeDeadline) }}
          rows={[
            { label: T.payWindow, value: fmt(result.paymentWindowEnds) },
            { label: T.complaintDeadline, value: fmt(result.complaintDeadline) },
            { label: T.maxFine, value: `₹${inr.format(result.maxFine)}` },
            { label: T.interim, value: `₹${inr.format(result.maxInterimCompensation)}` },
          ]}
          warning={noticeWindowExpired ? T.expired : undefined}
          note={strings.estimateNote}
          share={{ message: shareMessage, label: strings.shareResultLabel, slug: shareUrl.split('/').pop() ?? '' }}
        />
      )}
    </div>
  );
}
