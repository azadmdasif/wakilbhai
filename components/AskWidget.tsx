'use client';

import { useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dict } from '@/lib/dictionaries';
import { whatsAppUrlFor } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { WhatsAppIcon } from './Icons';

const MAX_USER_TURNS = 10;

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface AskWidgetProps {
  locale: Locale;
  strings: Dict['ui']['askWidget'];
  /** Page context recorded with captured leads. */
  source: string;
}

export default function AskWidget({ locale, strings, source }: AskWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneState, setPhoneState] = useState<'hidden' | 'asking' | 'done'>('hidden');
  const listRef = useRef<HTMLDivElement>(null);

  const userTurns = messages.filter((m) => m.role === 'user').length;
  const capReached = userTurns >= MAX_USER_TURNS;
  const whatsappUrl = whatsAppUrlFor(locale, { kind: 'general' });

  const scrollDown = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    });
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy || capReached) return;
    setFailed(false);
    setInput('');
    const history = [...messages, { role: 'user' as const, text }];
    setMessages([...history, { role: 'assistant', text: '' }]);
    setBusy(true);
    trackEvent('assistant_message', { source });
    // Capture channel after the 2nd user message.
    if (history.filter((m) => m.role === 'user').length === 2 && phoneState === 'hidden') {
      setPhoneState('asking');
    }
    scrollDown();
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale, messages: history }),
      });
      if (!res.ok || !res.body) throw new Error('ask-failed');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...history, { role: 'assistant', text: acc }]);
        scrollDown();
      }
      if (!acc) throw new Error('empty');
    } catch {
      setFailed(true);
      setMessages(history);
      trackEvent('assistant_handoff', { source, reason: 'error' });
    } finally {
      setBusy(false);
    }
  };

  const submitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Assistant user',
          phone,
          locale,
          source: `assistant:${source}`,
          context: messages
            .filter((m) => m.role === 'user')
            .map((m) => m.text)
            .join(' | ')
            .slice(0, 1900),
        }),
      });
      trackEvent('lead_submitted', { source: 'assistant' });
    } finally {
      setPhoneState('done');
    }
  };

  return (
    <section className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white font-display">{strings.title}</h2>
        <p className="text-sm text-gray-400 mt-1">{strings.subtitle}</p>
      </div>

      {messages.length > 0 && (
        <div ref={listRef} className="max-h-80 overflow-y-auto p-5 space-y-4" aria-live="polite">
          {messages.map((message, index) => (
            <div key={index} className={message.role === 'user' ? 'text-end' : 'text-start'}>
              <div
                className={`inline-block max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                  message.role === 'user' ? 'bg-brand-red text-white' : 'bg-gray-800 text-gray-100'
                }`}
              >
                {message.text || (busy && index === messages.length - 1 ? strings.thinking : '')}
              </div>
            </div>
          ))}
        </div>
      )}

      {phoneState === 'asking' && (
        <form onSubmit={submitPhone} className="px-5 pb-2 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-400 w-full">{strings.phonePrompt}</span>
          <input
            type="tel"
            required
            pattern="[+]?[0-9][0-9\s-]{7,14}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={strings.phonePlaceholder}
            aria-label={strings.phonePlaceholder}
            dir="ltr"
            className="flex-1 min-w-40 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          <button type="submit" className="font-bold py-2 px-4 rounded-full bg-brand-gold text-brand-dark text-sm">
            {strings.phoneSubmit}
          </button>
        </form>
      )}
      {phoneState === 'done' && <p className="px-5 pb-2 text-sm text-green-400">{strings.phoneThanks}</p>}
      {failed && <p className="px-5 pb-2 text-sm text-red-400">{strings.error}</p>}

      {capReached ? (
        <div className="p-5 space-y-3">
          <p className="text-sm text-gray-300">{strings.capReached}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('assistant_handoff', { source, reason: 'turn-cap' })}
            className="inline-flex items-center gap-2 font-bold py-2 px-5 rounded-full bg-whatsapp text-white hover:bg-green-700 transition-colors text-sm"
          >
            <WhatsAppIcon className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      ) : (
        <form onSubmit={send} className="p-5 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={strings.placeholder}
            aria-label={strings.placeholder}
            maxLength={2000}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="font-bold py-3 px-6 rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {strings.send}
          </button>
        </form>
      )}
      <p className="px-5 pb-4 text-xs text-gray-500">{strings.disclaimer}</p>
    </section>
  );
}
