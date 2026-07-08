'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type Fuse from 'fuse.js';
import type { Locale } from '@/lib/i18n';
import type { SearchDoc } from '@/lib/search';
import { whatsAppUrlFor } from '@/lib/whatsapp';
import { SearchIcon, WhatsAppIcon } from './Icons';

interface SearchBoxProps {
  locale: Locale;
  placeholder: string;
  label: string;
  noResultsText: string;
  askWhatsAppText: string;
  typeLabels: { guide: string; template: string; service: string };
}

export default function SearchBox({ locale, placeholder, label, noResultsText, askWhatsAppText, typeLabels }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchDoc[]>([]);
  const [open, setOpen] = useState(false);
  const fuseRef = useRef<Fuse<SearchDoc> | null>(null);
  const loadingRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Lazy-load the index + Fuse.js only when the user engages with search,
  // keeping it out of the critical JS path.
  const ensureIndex = async () => {
    if (fuseRef.current || loadingRef.current) return;
    loadingRef.current = true;
    try {
      const [{ default: FuseCtor }, res] = await Promise.all([
        import('fuse.js'),
        fetch(`/search-index/${locale}`),
      ]);
      const docs = (await res.json()) as SearchDoc[];
      fuseRef.current = new FuseCtor(docs, {
        keys: [
          { name: 'title', weight: 0.7 },
          { name: 'keywords', weight: 0.3 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
      });
    } finally {
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const onChange = async (value: string) => {
    setQuery(value);
    setOpen(true);
    await ensureIndex();
    if (!fuseRef.current || value.trim().length < 2) {
      setResults([]);
      return;
    }
    setResults(fuseRef.current.search(value).slice(0, 8).map((r) => r.item));
  };

  const showNoResults = open && query.trim().length >= 2 && results.length === 0 && fuseRef.current !== null;

  return (
    <div ref={rootRef} className="relative max-w-2xl mx-auto">
      <div className="relative">
        <SearchIcon className="absolute start-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            ensureIndex();
            if (query) setOpen(true);
          }}
          placeholder={placeholder}
          aria-label={label}
          className="w-full bg-white text-gray-900 placeholder-gray-500 rounded-full py-4 ps-14 pe-6 text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-gold/50"
        />
      </div>
      {open && (results.length > 0 || showNoResults) && (
        <div className="absolute z-30 mt-2 w-full bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden text-start">
          {results.map((doc) => (
            <Link
              key={doc.url}
              href={doc.url}
              className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-gray-800 transition-colors"
              onClick={() => setOpen(false)}
            >
              <span className="text-gray-100">{doc.title}</span>
              <span className="text-xs text-gray-500 shrink-0">
                {doc.type === 'service' && doc.priceINR ? `₹${doc.priceINR}` : typeLabels[doc.type as keyof typeof typeLabels] ?? doc.type}
              </span>
            </Link>
          ))}
          {showNoResults && (
            <div className="px-5 py-4 space-y-3">
              <p className="text-gray-400 text-sm">
                {noResultsText} “{query}”
              </p>
              <a
                href={whatsAppUrlFor(locale, { kind: 'searchMiss', query })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold py-2 px-5 rounded-full bg-whatsapp text-white hover:bg-green-700 transition-colors text-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {askWhatsAppText}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
