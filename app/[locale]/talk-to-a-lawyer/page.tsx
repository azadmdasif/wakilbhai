import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { whatsAppUrlFor } from '@/lib/whatsapp';
import PageHeading from '@/components/PageHeading';
import LeadForm from '@/components/LeadForm';
import AskWidget from '@/components/AskWidget';
import { WhatsAppIcon, PhoneIcon } from '@/components/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    title: dict.ask.title,
    description: dict.ask.subtitle,
    alternates: localeAlternates(locale, '/talk-to-a-lawyer'),
  };
}

export default async function TalkToLawyerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const T = dict.ask;

  return (
    <div>
      <PageHeading title={T.title} subtitle={T.subtitle} />
      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">{T.instantConsultationTitle}</h2>
            <p className="text-gray-400">{T.instantConsultationDesc}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsAppUrlFor(locale, { kind: 'general' })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-full bg-whatsapp text-white hover:bg-green-700 transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                {dict.common.whatsappCta}
              </a>
              <a
                href={`tel:+${'917686022245'}`}
                className="flex-1 flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              >
                <PhoneIcon className="w-5 h-5 text-brand-gold" />
                {T.callButtonText}
              </a>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 space-y-3">
            <h2 className="text-2xl font-bold text-white font-display">{T.physicalMeetingTitle}</h2>
            <p className="text-gray-400">{T.physicalMeetingDesc}</p>
            <Link
              href={localePath(locale, '/services/consultation-call')}
              className="inline-block font-bold py-3 px-6 rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors"
            >
              {dict.ui.rail.referralCta}
            </Link>
          </div>
        </div>
        <div className="bg-gray-900 rounded-2xl p-8">
          <LeadForm
            fields={[
              { name: 'name', label: T.name, type: 'text', required: true },
              { name: 'email', label: T.email, type: 'email' },
              { name: 'phone', label: T.phone, type: 'tel', required: true },
              { name: 'legal_issue', label: T.legalIssue, type: 'select', required: true, options: T.legalIssuesList.map((issue) => issue.label) },
              { name: 'description', label: T.issueDescription, type: 'textarea', required: true },
            ]}
            hiddenValues={{ subject: 'Talk to a lawyer request', from_name: 'WakilBhai Ask', locale }}
            submitLabel={T.send}
            sendingLabel={T.sending}
            successMessage={T.success}
            errorMessage={T.error}
            selectPlaceholder={T.selectDefault}
          />
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-8">
        <AskWidget locale={locale} strings={dict.ui.askWidget} source="talk-to-a-lawyer" />
      </div>
      <p className="text-xs text-gray-500 text-center max-w-2xl mx-auto mt-10">{dict.ui.guide.disclaimer}</p>
    </div>
  );
}
