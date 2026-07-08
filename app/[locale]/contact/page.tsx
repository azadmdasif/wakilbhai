import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import PageHeading from '@/components/PageHeading';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from '@/components/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    title: dict.contact.title,
    description: dict.contact.subtitle,
    alternates: localeAlternates(locale, '/contact'),
  };
}

// Phase 0 stub: contact info only; the Web3Forms contact form is ported in Phase 2.
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale as Locale);
  const T = dict.contact;
  return (
    <div>
      <PageHeading title={T.title} subtitle={T.subtitle} />
      <div className="max-w-xl mx-auto bg-gray-900 rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white font-display">{T.ourInfo}</h2>
        <div className="space-y-4 text-gray-300">
          <p className="flex items-center gap-3"><PhoneIcon className="w-6 h-6 text-brand-gold shrink-0" /><span dir="ltr">{T.phoneNo}</span></p>
          <p className="flex items-center gap-3"><MailIcon className="w-6 h-6 text-brand-gold shrink-0" /><span dir="ltr">{T.emailAd}</span></p>
          <p className="flex items-center gap-3"><MapPinIcon className="w-6 h-6 text-brand-gold shrink-0" />{T.address}</p>
          <p className="flex items-center gap-3"><ClockIcon className="w-6 h-6 text-brand-gold shrink-0" />{T.hours}</p>
        </div>
      </div>
    </div>
  );
}
