import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale, type Locale } from './lib/i18n';

const LOCALE_COOKIE = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function withLocaleCookie(res: NextResponse, locale: Locale): NextResponse {
  res.cookies.set(LOCALE_COOKIE, locale, { path: '/', maxAge: COOKIE_MAX_AGE, sameSite: 'lax' });
  return res;
}

/**
 * Locale routing.
 *
 * SEO stance: we NEVER auto-redirect by geography or Accept-Language — a stable
 * URL must always serve the same language to crawlers and first-time visitors.
 * The only signal we honour is the NEXT_LOCALE cookie, which is set only when a
 * human explicitly picks a language in the switcher. Default is English, served
 * unprefixed at the root.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const firstSegment = pathname.split('/')[1];

  // Canonical English URLs are unprefixed: /en/... -> 308 to /...
  if (firstSegment === defaultLocale) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/';
    return withLocaleCookie(NextResponse.redirect(url, 308), defaultLocale);
  }

  // Explicitly prefixed non-default locale (hi/ur/bn): serve it and remember it.
  if (isLocale(firstSegment)) {
    return withLocaleCookie(NextResponse.next(), firstSegment);
  }

  // Unprefixed path. Honour a previously chosen locale from the cookie only —
  // no geo/Accept-Language sniffing. A returning visitor who picked hi/ur/bn is
  // sent to their language; everyone else (incl. crawlers) gets English.
  const cookieValue = req.cookies.get(LOCALE_COOKIE)?.value;
  const cookieLocale = cookieValue && isLocale(cookieValue) ? cookieValue : null;

  if (cookieLocale && cookieLocale !== defaultLocale) {
    const url = req.nextUrl.clone();
    url.pathname = pathname === '/' ? `/${cookieLocale}` : `/${cookieLocale}${pathname}`;
    return withLocaleCookie(NextResponse.redirect(url, 307), cookieLocale);
  }

  // Serve English: internal rewrite of / -> /en so the URL stays clean.
  const url = req.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  const res = NextResponse.rewrite(url);
  return cookieLocale ? res : withLocaleCookie(res, defaultLocale);
}

export const config = {
  // Skip API routes, the static search index, Next internals, and any
  // file with an extension (assets).
  matcher: ['/((?!api|search-index|_next|.*\\..*).*)'],
};
