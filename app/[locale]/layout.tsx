import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { Anek_Latin, Noto_Sans, Noto_Sans_Devanagari, Noto_Sans_Bengali, Noto_Nastaliq_Urdu } from 'next/font/google';
import { locales, isLocale, dir, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { SITE_URL, GTAG_ID } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppLawyerButton from '@/components/cta/WhatsAppLawyerButton';
import JsonLd from '@/components/seo/JsonLd';
import { organizationSchema } from '@/lib/seo/schemas';
import '../globals.css';

// Body/primary text face (Noto Sans, Latin). The ONLY face we preload — it's
// what most above-the-fold text renders in. Everything else loads on demand.
const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap', preload: true });

// Display face for headings (Anek). Not the primary text face → not preloaded.
const anek = Anek_Latin({ subsets: ['latin'], variable: '--font-display', display: 'swap', preload: false });

// Per-script body faces. Each shares the --font-script slot and is applied only
// on its own locale route (subset-per-locale), so English visitors never fetch
// Devanagari/Bengali/Nastaliq. None are preloaded.
const notoDevanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], variable: '--font-script', display: 'swap', preload: false });
const notoBengali = Noto_Sans_Bengali({ subsets: ['bengali'], variable: '--font-script', display: 'swap', preload: false });
const notoNastaliqUrdu = Noto_Nastaliq_Urdu({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-script', display: 'swap', preload: false });

/** The script font class to apply for a locale (empty for Latin/en). */
function scriptFontClass(locale: Locale): string {
  switch (locale) {
    case 'hi':
      return notoDevanagari.variable;
    case 'bn':
      return notoBengali.variable;
    case 'ur':
      return notoNastaliqUrdu.variable;
    default:
      return '';
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Search-engine ownership verification, read from env so tokens never live in
 * the repo. Emits <meta name="google-site-verification"> and
 * <meta name="msvalidate.01"> (Bing) only when their tokens are set.
 */
function verificationMeta(): Metadata['verification'] {
  const google = process.env.NEXT_PUBLIC_GSC_TOKEN;
  const bing = process.env.NEXT_PUBLIC_BING_TOKEN;
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { 'msvalidate.01': bing } } : {}),
  };
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
    description: dict.meta.homeDescription,
    alternates: localeAlternates(locale, '/'),
    openGraph: {
      type: 'website',
      siteName: 'WakilBhai',
      images: ['/hero.png'],
    },
    icons: { icon: '/logo.png' },
    verification: verificationMeta(),
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
    { path: '/help', text: navT.guides },
    { path: '/services', text: navT.services },
    { path: '/pricing', text: navT.pricing },
    { path: '/talk-to-a-lawyer', text: navT.ask },
  ];
  const resources = {
    label: navT.resources,
    items: [
      { path: '/templates', text: navT.documents },
      { path: '/tools', text: dict.ui.calc.toolsTitle },
      { path: '/lawyers', text: navT.findLawyer },
      { path: '/why-wakilbhai', text: navT.whyUs },
      { path: '/contact', text: navT.contact },
    ],
  };

  return (
    <html lang={locale} dir={dir(locale)} className={`${notoSans.variable} ${anek.variable} ${scriptFontClass(locale)}`.trim()}>
      <head>
        {/* Legacy SPA used hash routing (/#/services); hashes never reach the
            server, so map them to real paths on first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(location.hash.indexOf('#/')===0){location.replace(location.hash.slice(1))}`,
          }}
        />
        <JsonLd data={organizationSchema()} />
      </head>
      <body className="font-sans bg-brand-dark text-gray-100">
        <div className="min-h-screen flex flex-col">
          <Header locale={locale} nav={nav} resources={resources} />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">{children}</main>
          <Footer locale={locale} dict={dict} />
          <WhatsAppLawyerButton label={dict.common.whatsappLawyerFree} />
        </div>
        <Analytics />
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
