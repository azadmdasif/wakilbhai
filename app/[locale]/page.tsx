import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import heroImg from '@/public/hero.png';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { getCategories, getGuideMetas, getTemplates } from '@/lib/content';
import { getReviews } from '@/content/reviews';
import { getToolsOrdered, toolHeadings } from '@/lib/tools';
import { buildWhatsAppUrl, whatsAppLawyerMessage } from '@/lib/whatsapp';
import SearchBox from '@/components/SearchBox';
import CategoryIcon from '@/components/CategoryIcon';
import TrackedLink from '@/components/TrackedLink';
import HowItWorks from '@/components/HowItWorks';
import Reviews from '@/components/Reviews';
import ToolCard from '@/components/tools/ToolCard';
import { ShieldIcon, RupeeIcon, GlobeIcon, DocumentIcon, WhatsAppIcon } from '@/components/Icons';

/** Section header: title (start) + exactly one action link (end). */
function SectionHeader({ title, action }: { title: string; action: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white font-display">{title}</h2>
      {action}
    </div>
  );
}

const actionLinkClass = 'shrink-0 text-brand-gold font-semibold hover:underline text-sm whitespace-nowrap';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return buildMetadata({
    title: 'WakilBhai — Your Local Lawyer',
    description: dict.meta.homeDescription,
    path: '/',
    locale,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const href = (path: string) => localePath(locale, path);

  const guides = getGuideMetas();
  const templates = getTemplates();
  const chips = [
    ...guides.slice(0, 6).map((g) => ({ label: g.title[locale], href: href(`/help/${g.category}/${g.slug}`) })),
    ...templates.slice(0, 8 - Math.min(guides.length, 6)).map((t) => ({ label: t.title[locale], href: href(`/templates/${t.slug}`) })),
  ].slice(0, 8);

  const proof = [
    { icon: DocumentIcon, text: dict.ui.home.trust1 },
    { icon: ShieldIcon, text: dict.ui.home.trust2 },
    { icon: GlobeIcon, text: dict.ui.home.trust3 },
    { icon: RupeeIcon, text: dict.ui.home.trust4 },
  ];

  // Homepage has no guide context → the generic free-consult prefill.
  const whatsappHref = buildWhatsAppUrl(whatsAppLawyerMessage());

  return (
    <div className="space-y-20 md:space-y-24">
      {/* Search-first hero */}
      <section className="relative rounded-3xl overflow-hidden">
        {/* Decorative hero: static import gives intrinsic dimensions + a blur
            placeholder (no CLS). priority because it's the homepage LCP area;
            quality 60 and a container-accurate `sizes` keep the 4G payload small. */}
        <Image
          src={heroImg}
          alt=""
          fill
          priority
          quality={60}
          placeholder="blur"
          sizes="(max-width: 1280px) 100vw, 1216px"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative text-center pt-20 pb-24 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white font-display tracking-tight mb-3">
            {dict.home.heroTitle}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 mb-8">{dict.home.heroSubtitle}</p>
          <SearchBox
            locale={locale}
            placeholder={dict.ui.search.placeholder}
            label={dict.ui.search.label}
            noResultsText={dict.ui.search.noResults}
            askWhatsAppText={dict.ui.search.askWhatsApp}
            typeLabels={{
              guide: dict.ui.search.guides,
              template: dict.ui.search.templates,
              service: dict.ui.search.services,
            }}
          />
          {chips.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-3xl mx-auto">
              <span className="text-sm text-gray-400 w-full mb-1">{dict.ui.search.popular}</span>
              {chips.map((chip) => (
                <Link
                  key={chip.href}
                  href={chip.href}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-gray-100 text-sm rounded-full px-4 py-2 transition-colors"
                >
                  {chip.label}
                </Link>
              ))}
            </div>
          )}

          {/* The free path, visible above the fold. */}
          <div className="mt-8">
            <TrackedLink
              href={whatsappHref}
              event="whatsapp_cta_click"
              props={{ context: 'home-hero' }}
              external
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-base font-bold text-white shadow-lg hover:bg-green-700 transition-colors min-h-[48px]"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              {dict.ui.home.whatsappPill}
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Proof chips */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {proof.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-2.5 bg-gray-900 border border-gray-800 rounded-full px-4 py-3"
          >
            <item.icon className="w-5 h-5 text-brand-gold shrink-0" />
            <p className="text-sm font-medium text-gray-200">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Browse by problem */}
      <section>
        <SectionHeader
          title={dict.ui.home.categoriesTitle}
          action={
            <Link href={href('/help')} className={actionLinkClass}>
              {dict.ui.home.seeAllProblems} →
            </Link>
          }
        />
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {getCategories().map((category) => (
            <Link
              key={category.slug}
              href={href(`/help/${category.slug}`)}
              className="group bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center hover:border-brand-gold/60 transition-colors"
            >
              <CategoryIcon icon={category.icon} className="w-9 h-9 text-brand-gold mx-auto mb-3" />
              <p className="font-bold text-white text-sm group-hover:text-brand-gold transition-colors">
                {category.title[locale]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Free tools — top 4 from the shared registry (single source with /tools). */}
      <section>
        <SectionHeader
          title={dict.ui.home.toolsTitle}
          action={
            <Link href={href('/tools')} className={actionLinkClass}>
              {dict.ui.home.seeAllTools} →
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {getToolsOrdered()
            .slice(0, 4)
            .map((tool) => {
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
      </section>

      {/* How it works */}
      <section>
        <SectionHeader
          title={dict.ui.home.howTitle}
          action={
            <TrackedLink
              href={whatsappHref}
              event="whatsapp_cta_click"
              props={{ context: 'home-how-it-works' }}
              external
              className={actionLinkClass}
            >
              {dict.ui.home.startOnWhatsApp} →
            </TrackedLink>
          }
        />
        <HowItWorks dict={dict} />
      </section>

      {/* Verifiable reviews — renders nothing until real reviews exist (no fake filler). */}
      <Reviews
        reviews={getReviews()}
        locale={locale}
        title={dict.ui.home.reviewsTitle}
        strings={dict.ui.reviews}
        gbpUrl={process.env.GBP_REVIEW_URL}
      />
    </div>
  );
}
