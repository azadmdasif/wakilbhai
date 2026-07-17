import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import PageHeading from '@/components/PageHeading';
import LeadForm from '@/components/LeadForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return buildMetadata({
    title: dict.book.title,
    description: dict.book.subtitle,
    path: '/book-visit',
    locale,
  });
}

export default async function BookVisitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const T = dict.book;

  return (
    <div>
      <PageHeading title={T.title} subtitle={T.subtitle} />
      <div className="max-w-xl mx-auto bg-gray-900 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white font-display mb-6">{T.formTitle}</h2>
        <LeadForm
          fields={[
            { name: 'name', label: T.name, type: 'text', required: true },
            { name: 'phone', label: T.phone, type: 'tel', required: true },
            { name: 'address', label: T.address, type: 'textarea', required: true },
            { name: 'document_type', label: T.documentType, type: 'text', required: true },
            { name: 'preferred_time', label: T.preferredTime, type: 'text' },
          ]}
          hiddenValues={{ subject: 'Doorstep visit booking', from_name: 'WakilBhai Book Visit', locale }}
          submitLabel={T.send}
          sendingLabel={T.sending}
          successMessage={T.success}
          errorMessage={T.error}
        />
      </div>
    </div>
  );
}
