import { redirect } from 'next/navigation';
import { localePath, type Locale } from '@/lib/i18n';

/** /how-it-works is an alias — the content lives at /about#how. */
export default async function HowItWorksRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`${localePath(locale as Locale, '/about')}#how`);
}
