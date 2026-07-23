import type { Metadata } from 'next';
import { Suspense } from 'react';
import { isLocale, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import PageHeading from '@/components/PageHeading';
import SearchResults from '@/components/search/SearchResults';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return buildMetadata({
    title: dict.ui.search.pageTitle,
    description: dict.ui.search.label,
    path: '/search',
    locale,
    // A query-driven results page has no stable content to index.
    noindex: true,
  });
}

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const s = dict.ui.search;

  return (
    <div>
      <PageHeading title={s.pageTitle} subtitle={s.label} />
      <Suspense>
        <SearchResults
          locale={locale}
          strings={{
            placeholder: s.placeholder,
            label: s.label,
            searchAction: s.searchAction,
            resultsFor: s.resultsFor,
            zeroHeading: s.zeroHeading,
            zeroLine: s.zeroLine,
            askWhatsApp: s.askWhatsApp,
            typeLabels: { guide: s.guides, template: s.templates, service: s.services, tool: s.tools },
          }}
        />
      </Suspense>
    </div>
  );
}
