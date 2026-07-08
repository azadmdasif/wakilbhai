'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, localeLabels, localePath, splitLocaleFromPath, type Locale } from '@/lib/i18n';

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
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchTo(locale)}
          className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${
            currentLocale === locale ? 'bg-brand-red text-white' : 'text-gray-300 hover:bg-gray-700'
          }`}
          title={localeLabels[locale].native}
          lang={locale}
        >
          {localeLabels[locale].label}
        </button>
      ))}
    </div>
  );
}
