'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type Fuse from 'fuse.js';
import type { Locale } from '@/lib/i18n';
import type { SearchDoc } from '@/lib/search';
import { whatsAppUrlFor } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { SearchIcon, WhatsAppIcon } from '../Icons';

export interface SearchStrings {
  placeholder: string;
  label: string;
  searchAction: string;
  resultsFor: string;
  zeroHeading: string;
  zeroLine: string;
  askWhatsApp: string;
  typeLabels: Record<SearchDoc['type'], string>;
}

/**
 * The /search results page. Client-side fuzzy search (Fuse.js) over the
 * locale's guide index (title, quick-answer, category, keywords). EVERY query
 * fires `search_query` — the zero-result queries are literally our content
 * roadmap — and the empty state is a demand-capture WhatsApp block, never a
 * dead end.
 */
export default function SearchResults({ locale, strings }: { locale: Locale; strings: SearchStrings }) {
  const params = useSearchParams();
  const initialQ = params.get('q') ?? '';

  const [query, setQuery] = useState(initialQ);
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [results, setResults] = useState<SearchDoc[]>([]);
  const fuseRef = useRef<Fuse<SearchDoc> | null>(null);
  const loggedRef = useRef<Map<string, number>>(new Map());
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load Fuse.js + the prebuilt index once.
  useEffect(() => {
    let alive = true;
    (async () => {
      const [{ default: FuseCtor }, res] = await Promise.all([import('fuse.js'), fetch(`/search-index/${locale}`)]);
      const data = (await res.json()) as SearchDoc[];
      if (!alive) return;
      fuseRef.current = new FuseCtor(data, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'answer', weight: 0.2 },
          { name: 'category', weight: 0.15 },
          { name: 'keywords', weight: 0.15 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
      });
      setDocs(data);
    })();
    return () => {
      alive = false;
    };
  }, [locale]);

  const trimmed = query.trim();

  // Re-run search whenever the query or the (loaded) index changes.
  useEffect(() => {
    if (!fuseRef.current || trimmed.length < 2) {
      setResults([]);
    } else {
      setResults(fuseRef.current.search(trimmed).slice(0, 20).map((r) => r.item));
    }
  }, [trimmed, docs]);

  // Fire search_query for every settled query (deduped, debounced) — including
  // zero-result queries, which become the "guides to write next" list.
  useEffect(() => {
    if (!fuseRef.current || trimmed.length < 2) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const count = fuseRef.current!.search(trimmed).length;
      const key = trimmed.toLowerCase();
      if (loggedRef.current.get(key) === count) return; // don't re-log identical outcomes
      loggedRef.current.set(key, count);
      trackEvent('search_query', { q: trimmed.slice(0, 100), results: count });
    }, 700);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [trimmed, docs]);

  const showZero = docs !== null && trimmed.length >= 2 && results.length === 0;
  const badge = useMemo(() => strings.typeLabels, [strings.typeLabels]);

  return (
    <div className="mx-auto max-w-3xl">
      <label htmlFor="site-search" className="sr-only">
        {strings.label}
      </label>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute start-5 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-500" />
        <input
          id="site-search"
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={strings.placeholder}
          enterKeyHint="search"
          className="w-full rounded-full bg-white py-4 pe-6 ps-14 text-lg text-gray-900 placeholder-gray-500 shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-gold/50"
        />
      </div>

      {trimmed.length >= 2 && (
        <p className="mt-6 text-sm text-gray-400">
          {strings.resultsFor} “{trimmed}” · {results.length}
        </p>
      )}

      {results.length > 0 && (
        <ul className="mt-4 space-y-3">
          {results.map((doc) => (
            <li key={doc.url}>
              <Link
                href={doc.url}
                className="block rounded-2xl border border-gray-800 bg-gray-900 p-5 transition-colors hover:border-brand-gold/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold text-white">{doc.title}</p>
                  <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-gray-400">
                    {doc.type === 'service' && doc.priceINR ? `₹${doc.priceINR}` : badge[doc.type]}
                  </span>
                </div>
                {doc.answer && <p className="mt-1 line-clamp-2 text-sm text-gray-400">{doc.answer}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {showZero && (
        <div className="mt-6 rounded-2xl border border-whatsapp/30 bg-gray-900 p-8 text-center">
          <h2 className="font-display text-xl font-bold text-white">{strings.zeroHeading}</h2>
          <p className="mx-auto mt-2 max-w-md text-gray-400">{strings.zeroLine}</p>
          <a
            href={whatsAppUrlFor(locale, { kind: 'searchMiss', query: trimmed })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_cta_click', { context: 'search-zero-result' })}
            className="mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white transition-colors hover:bg-green-700"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            {strings.askWhatsApp}
          </a>
        </div>
      )}
    </div>
  );
}
