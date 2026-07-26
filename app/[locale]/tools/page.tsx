import type { Metadata } from 'next';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { getToolsOrdered, toolHeadings } from '@/lib/tools';
import PageHeading from '@/components/PageHeading';
import ToolCard from '@/components/tools/ToolCard';

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
  const href = (path: string) => localePath(locale, path);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeading title={dict.ui.calc.toolsTitle} subtitle={dict.ui.calc.toolsSubtitle} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {getToolsOrdered().map((tool) => {
          const { title, promise } = toolHeadings(dict, tool.widget);
          return (
            <ToolCard
              key={tool.slug}
              href={href(`/tools/${tool.slug}`)}
              widget={tool.widget}
              name={title}
              promise={promise}
              freeLabel={dict.ui.template.free}
            />
          );
        })}
      </div>
    </div>
  );
}
