'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { localePath, splitLocaleFromPath, type Locale } from '@/lib/i18n';
import { enabledLocales } from '@/lib/i18n/locales';
import { GlobeIcon, ChevronDownIcon } from './Icons';

/**
 * Compact language picker: a globe trigger showing the current language, which
 * opens a small dropdown of native language names. Replaces the old full-width
 * pill strip so it stays a single control on mobile and scales as more locales
 * go live. Persists the choice in NEXT_LOCALE so the middleware honours it.
 */
export default function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const [, rest] = splitLocaleFromPath(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const switchTo = (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    setOpen(false);
    router.push(localePath(locale, rest));
  };

  const current = enabledLocales.find(({ code }) => code === currentLocale);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-200 transition-colors hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Language"
      >
        <GlobeIcon className="h-5 w-5 shrink-0" />
        <span lang={current?.code} dir={current?.dir} className="hidden sm:inline">
          {current?.nativeName ?? currentLocale.toUpperCase()}
        </span>
        <ChevronDownIcon className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 z-50 mt-2 max-h-72 w-44 overflow-auto rounded-xl border border-gray-700 bg-gray-900 py-1 shadow-2xl"
        >
          {enabledLocales.map(({ code, nativeName, dir }) => {
            const active = currentLocale === code;
            return (
              <button
                key={code}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => switchTo(code as Locale)}
                className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-start text-sm transition-colors ${
                  active ? 'bg-brand-red text-white' : 'text-gray-200 hover:bg-gray-800'
                }`}
                lang={code}
                dir={dir}
              >
                {nativeName}
                {active && <span aria-hidden>✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
