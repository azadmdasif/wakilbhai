import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import PageHeading from '@/components/PageHeading';
import LeadForm from '@/components/LeadForm';
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

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const T = dict.contact;

  return (
    <div>
      <PageHeading title={T.title} subtitle={T.subtitle} />
      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-gray-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white font-display mb-6">{T.formTitle}</h2>
          <LeadForm
            fields={[
              { name: 'name', label: T.name, type: 'text', required: true },
              { name: 'email', label: T.email, type: 'email' },
              { name: 'phone', label: T.phone, type: 'tel', required: true },
              { name: 'message', label: T.message, type: 'textarea', required: true },
            ]}
            hiddenValues={{ subject: 'Contact form', from_name: 'WakilBhai Contact', locale }}
            submitLabel={T.send}
            sendingLabel={T.sending}
            successMessage={T.success}
            errorMessage={T.error}
          />
          <p className="text-xs text-gray-500 mt-4">{T.replyTime}</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-8 space-y-6 h-fit">
          <h2 className="text-2xl font-bold text-white font-display">{T.ourInfo}</h2>
          <div className="space-y-4 text-gray-300">
            <p className="flex items-center gap-3"><PhoneIcon className="w-6 h-6 text-brand-gold shrink-0" /><span dir="ltr">{T.phoneNo}</span></p>
            <p className="flex items-center gap-3"><MailIcon className="w-6 h-6 text-brand-gold shrink-0" /><span dir="ltr">{T.emailAd}</span></p>
            <p className="flex items-center gap-3"><MapPinIcon className="w-6 h-6 text-brand-gold shrink-0" />{T.address}</p>
            <p className="flex items-center gap-3"><ClockIcon className="w-6 h-6 text-brand-gold shrink-0" />{T.hours}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
