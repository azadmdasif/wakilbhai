'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { localeLang } from '@/lib/i18n';
import { computeChequeBounce } from '@/lib/calculators';
import { whatsAppUrlFor } from '@/lib/whatsapp';
import type { Dict } from '@/lib/dictionaries';
import { WhatsAppIcon } from '../Icons';

const inr = new Intl.NumberFormat('en-IN');

interface Props {
  locale: Locale;
  strings: Dict['ui']['calc'];
}

export default function ChequeBounceCalculator({ locale, strings }: Props) {
  const T = strings.cheque;
  const today = new Date().toISOString().slice(0, 10);
  const [amount, setAmount] = useState('');
  const [memoDate, setMemoDate] = useState('');
  const [noticeDate, setNoticeDate] = useState(today);
  const [submitted, setSubmitted] = useState(false);

  const fmt = (date: Date) =>
    date.toLocaleDateString(localeLang[locale], { year: 'numeric', month: 'long', day: 'numeric' });

  const result =
    submitted && amount && memoDate
      ? computeChequeBounce(Number(amount), new Date(`${memoDate}T00:00:00`), new Date(`${noticeDate}T00:00:00`))
      : null;
  const noticeWindowExpired = result !== null && new Date() > result.noticeDeadline;

  const inputClass =
    'w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold';

  const resultText = result
    ? `${T.noticeDeadline}: ${fmt(result.noticeDeadline)}; ${T.complaintDeadline}: ${fmt(result.complaintDeadline)}; ₹${inr.format(Number(amount))}`
    : '';

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
      <form
        className="grid sm:grid-cols-3 gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div>
          <label htmlFor="cb-amount" className="block text-sm text-gray-400 mb-1">{T.amount}</label>
          <input id="cb-amount" type="number" min="1" required value={amount} onChange={(e) => { setAmount(e.target.value); setSubmitted(false); }} className={inputClass} dir="ltr" />
        </div>
        <div>
          <label htmlFor="cb-memo" className="block text-sm text-gray-400 mb-1">{T.memoDate}</label>
          <input id="cb-memo" type="date" required max={today} value={memoDate} onChange={(e) => { setMemoDate(e.target.value); setSubmitted(false); }} className={inputClass} dir="ltr" />
        </div>
        <div>
          <label htmlFor="cb-notice" className="block text-sm text-gray-400 mb-1">{T.noticeDate}</label>
          <input id="cb-notice" type="date" required value={noticeDate} onChange={(e) => { setNoticeDate(e.target.value); setSubmitted(false); }} className={inputClass} dir="ltr" />
        </div>
        <div className="sm:col-span-3">
          <button type="submit" className="font-bold py-3 px-8 rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors">
            {strings.calculate}
          </button>
        </div>
      </form>

      {result && (
        <div className="border-t border-gray-800 pt-5 space-y-3" role="status">
          {noticeWindowExpired && <p className="text-sm text-amber-400">{T.expired}</p>}
          <dl className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-xl p-4">
              <dt className="text-xs text-gray-400 mb-1">{T.noticeDeadline}</dt>
              <dd className="text-lg font-bold text-brand-gold font-display">{fmt(result.noticeDeadline)}</dd>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <dt className="text-xs text-gray-400 mb-1">{T.payWindow}</dt>
              <dd className="text-lg font-bold text-white font-display">{fmt(result.paymentWindowEnds)}</dd>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <dt className="text-xs text-gray-400 mb-1">{T.complaintDeadline}</dt>
              <dd className="text-lg font-bold text-brand-gold font-display">{fmt(result.complaintDeadline)}</dd>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <dt className="text-xs text-gray-400 mb-1">{T.maxFine}</dt>
              <dd className="text-lg font-bold text-white font-display">₹{inr.format(result.maxFine)}</dd>
              <dd className="text-xs text-gray-400 mt-1">{T.interim} ₹{inr.format(result.maxInterimCompensation)}</dd>
            </div>
          </dl>
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
