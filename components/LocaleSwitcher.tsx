'use client';

import { usePathname, useRouter } from 'next/navigation';
import { localePath, splitLocaleFromPath, type Locale } from '@/lib/i18n';
import { enabledLocales } from '@/lib/i18n/locales';

/**
 * Swaps the locale prefix of the current URL while preserving the path,
 * and persists the choice in the NEXT_LOCALE cookie so the middleware
 * respects it on future unprefixed visits.
 */
export default function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const [, rest] = splitLocaleFromPath(pathname);

  const switchTo = (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.push(localePath(locale, rest));
  };

  return (
    <div className="flex items-center gap-1 bg-gray-800 rounded-full p-1" role="group" aria-label="Language">
      {enabledLocales.map(({ code, nativeName, dir }) => (
        <button
          key={code}
          onClick={() => switchTo(code as Locale)}
          className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${
            currentLocale === code ? 'bg-brand-red text-white' : 'text-gray-300 hover:bg-gray-700'
          }`}
          title={nativeName}
          lang={code}
          dir={dir}
        >
          {nativeName}
        </button>
      ))}
    </div>
  );
}
