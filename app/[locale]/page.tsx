import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import heroImg from '@/public/hero.png';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { getCategories, getGuideMetas, getTemplates, getTestimonials } from '@/lib/content';
import { getTools, toolTitle } from '@/lib/tools';
import SearchBox from '@/components/SearchBox';
import CategoryIcon from '@/components/CategoryIcon';
import { StarIcon, DownloadIcon, ShieldIcon, RupeeIcon, GlobeIcon, DocumentIcon } from '@/components/Icons';

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

  const trust = [
    { icon: DocumentIcon, text: dict.ui.home.trust1 },
    { icon: ShieldIcon, text: dict.ui.home.trust2 },
    { icon: GlobeIcon, text: dict.ui.home.trust3 },
    { icon: RupeeIcon, text: dict.ui.home.trust4 },
  ];

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
        </div>
      </section>

      {/* Trust strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {trust.map((item) => (
          <div key={item.text} className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-2xl p-4">
            <item.icon className="w-7 h-7 text-brand-gold shrink-0" />
            <p className="text-sm text-gray-300">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Category grid */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 font-display">
          {dict.ui.home.categoriesTitle}
        </h2>
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

      {/* Free tools & templates */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-display">{dict.ui.home.toolsTitle}</h2>
          <Link href={href('/templates')} className="text-brand-gold font-semibold hover:underline text-sm">
            {dict.ui.home.viewAll} →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getTools().map((tool) => (
            <Link
              key={tool.slug}
              href={href(`/tools/${tool.slug}`)}
              className="bg-gray-900 border border-brand-gold/30 rounded-2xl p-5 hover:border-brand-gold transition-colors"
            >
              <RupeeIcon className="w-6 h-6 text-brand-gold mb-3" />
              <p className="font-bold text-white text-sm">{toolTitle(dict, tool.widget)}</p>
              <p className="text-xs text-brand-gold mt-2">{dict.ui.template.free}</p>
            </Link>
          ))}
          {templates.slice(0, 1).map((template) => (
            <Link
              key={template.slug}
              href={href(`/templates/${template.slug}`)}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-brand-gold/50 transition-colors"
            >
              <DownloadIcon className="w-6 h-6 text-brand-gold mb-3" />
              <p className="font-bold text-white text-sm">{template.title[locale]}</p>
              <p className="text-xs text-brand-gold mt-2">{dict.ui.template.free}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 font-display">
          {dict.home.testimonialsTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {getTestimonials().map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-900 p-8 rounded-2xl shadow-lg h-full flex flex-col">
              <div className="flex-grow">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-brand-gold" />
                  ))}
                </div>
                <p className="text-gray-300 italic">“{testimonial.feedback[locale]}”</p>
              </div>
              <div className="mt-6">
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
