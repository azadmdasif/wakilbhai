import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { Inter, Exo_2 } from 'next/font/google';
import { locales, isLocale, dir, localeLang, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { SITE_URL, GTAG_ID } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const exo2 = Exo_2({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-exo2', display: 'swap' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'WakilBhai — Your Local Lawyer',
      template: '%s | WakilBhai',
    },
    description: dict.home.heroSubtitle,
    alternates: localeAlternates(locale, '/'),
    openGraph: {
      type: 'website',
      siteName: 'WakilBhai',
      images: ['/hero.png'],
    },
    icons: { icon: '/logo.png' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale as Locale);
  const navT = dict.nav;

  const nav = [
    { path: '/', text: navT.home },
    { path: '/services', text: navT.services },
    { path: '/pricing', text: navT.pricing },
    { path: '/talk-to-a-lawyer', text: navT.ask },
  ];
  const resources = {
    label: navT.resources,
    items: [
      { path: '/why-wakilbhai', text: navT.whyUs },
      { path: '/contact', text: navT.contact },
    ],
  };

  return (
    <html lang={localeLang[locale]} dir={dir(locale)} className={`${inter.variable} ${exo2.variable}`}>
      <body className="font-sans bg-brand-dark text-gray-100">
        <div className="min-h-screen flex flex-col">
          <Header locale={locale} nav={nav} resources={resources} />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">{children}</main>
          <Footer locale={locale} dict={dict} />
          <WhatsAppButton label={dict.common.whatsappCta} />
        </div>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GTAG_ID}');`}
        </Script>
      </body>
    </html>
  );
}
