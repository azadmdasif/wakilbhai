import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale, locales, type Locale } from './lib/i18n';

const LOCALE_COOKIE = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function detectFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  const entries = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const qParam = params.find((p) => p.trim().startsWith('q='));
      const q = qParam ? parseFloat(qParam.split('=')[1]) : 1;
      return { tag: tag.toLowerCase(), q: Number.isNaN(q) ? 0 : q };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of entries) {
    const base = tag.split('-')[0];
    if (isLocale(base)) return base;
  }
  return null;
}

function withLocaleCookie(res: NextResponse, locale: Locale): NextResponse {
  res.cookies.set(LOCALE_COOKIE, locale, { path: '/', maxAge: COOKIE_MAX_AGE, sameSite: 'lax' });
  return res;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const firstSegment = pathname.split('/')[1];

  // Canonical English URLs are unprefixed: /en/... -> 308 to /...
  if (firstSegment === defaultLocale) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/';
    return withLocaleCookie(NextResponse.redirect(url, 308), defaultLocale);
  }

  // Explicitly prefixed locale (hi/ur/bn): serve it and remember the choice.
  if (isLocale(firstSegment)) {
    return withLocaleCookie(NextResponse.next(), firstSegment);
  }

  // Unprefixed path. First visit: honour Accept-Language for hi/ur/bn.
  const cookieValue = req.cookies.get(LOCALE_COOKIE)?.value;
  const cookieLocale = cookieValue && isLocale(cookieValue) ? cookieValue : null;
  let target: Locale = defaultLocale;
  if (cookieLocale) {
    target = cookieLocale;
  } else {
    target = detectFromAcceptLanguage(req.headers.get('accept-language')) ?? defaultLocale;
  }

  if (target !== defaultLocale) {
    const url = req.nextUrl.clone();
    url.pathname = pathname === '/' ? `/${target}` : `/${target}${pathname}`;
    return withLocaleCookie(NextResponse.redirect(url, 307), target);
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
