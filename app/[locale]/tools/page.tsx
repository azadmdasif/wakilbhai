import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { getTools, toolTitle } from '@/lib/tools';
import PageHeading from '@/components/PageHeading';
import { RupeeIcon } from '@/components/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return buildMetadata({
    title: dict.ui.calc.toolsTitle,
    description: dict.ui.calc.toolsSubtitle,
    path: '/tools',
    locale,
  });
}

export default async function ToolsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeading title={dict.ui.calc.toolsTitle} subtitle={dict.ui.calc.toolsSubtitle} />
      <div className="grid sm:grid-cols-3 gap-6">
        {getTools().map((tool) => (
          <Link
            key={tool.slug}
            href={localePath(locale, `/tools/${tool.slug}`)}
            className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-brand-gold/50 transition-colors"
          >
            <RupeeIcon className="w-8 h-8 text-brand-gold mb-4" />
            <h2 className="text-lg font-bold text-white font-display group-hover:text-brand-gold transition-colors">
              {toolTitle(dict, tool.widget)}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
