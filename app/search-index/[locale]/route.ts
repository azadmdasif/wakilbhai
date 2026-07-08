import { NextResponse } from 'next/server';
import { buildSearchIndex } from '@/lib/search';
import { isLocale, locales } from '@/lib/i18n';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return NextResponse.json([], { status: 404 });
  }
  return NextResponse.json(buildSearchIndex(locale));
}
