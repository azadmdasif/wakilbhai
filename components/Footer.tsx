import Link from 'next/link';
import Image from 'next/image';
import { localePath, type Locale } from '@/lib/i18n';
import type { Dict } from '@/lib/dictionaries';
import { getGuideMetas } from '@/lib/content';
import { TwitterIcon, FacebookIcon, LinkedInIcon } from './Icons';

export default function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const year = new Date().getFullYear();
  const navT = dict.nav;
  const href = (path: string) => localePath(locale, path);
  // Internal linking: surface the top guides on every page.
  const topGuides = getGuideMetas().slice(0, 10);

  // Social links come from env; an icon is shown only when its URL is set.
  const socials = [
    { url: process.env.NEXT_PUBLIC_TWITTER_URL, Icon: TwitterIcon, label: 'Twitter' },
    { url: process.env.NEXT_PUBLIC_FACEBOOK_URL, Icon: FacebookIcon, label: 'Facebook' },
    { url: process.env.NEXT_PUBLIC_LINKEDIN_URL, Icon: LinkedInIcon, label: 'LinkedIn' },
  ].filter((s): s is { url: string; Icon: typeof TwitterIcon; label: string } => Boolean(s.url));

  return (
    <footer className="bg-black text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <Link href={href('/')} className="flex items-center gap-3">
              <Image src="/logo.png" alt="WakilBhai Logo" width={56} height={56} className="h-14 w-auto" />
              <span className="font-display text-2xl font-bold tracking-wider">
                <span className="text-white">Wakil</span>
                <span className="text-brand-gold">Bhai</span>
              </span>
            </Link>
            <p className="text-sm">{dict.common.tagline}</p>
            {socials.length > 0 && (
              <div className="flex gap-4">
                {socials.map(({ url, Icon, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="hover:text-brand-gold transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{dict.common.quickLinks}</h3>
            <ul className="space-y-2">
              <li><Link href={href('/')} className="hover:text-brand-gold transition-colors">{navT.home}</Link></li>
              <li><Link href={href('/services')} className="hover:text-brand-gold transition-colors">{navT.services}</Link></li>
              <li><Link href={href('/pricing')} className="hover:text-brand-gold transition-colors">{navT.pricing}</Link></li>
              <li><Link href={href('/talk-to-a-lawyer')} className="hover:text-brand-gold transition-colors">{navT.ask}</Link></li>
              <li><Link href={href('/why-wakilbhai')} className="hover:text-brand-gold transition-colors">{navT.whyUs}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{dict.common.resources}</h3>
            <ul className="space-y-2">
              <li><Link href={href('/help')} className="hover:text-brand-gold transition-colors">{navT.guides}</Link></li>
              <li><Link href={href('/templates')} className="hover:text-brand-gold transition-colors">{navT.documents}</Link></li>
              <li><Link href={href('/lawyers')} className="hover:text-brand-gold transition-colors">{navT.findLawyer}</Link></li>
              <li><Link href={href('/about')} className="hover:text-brand-gold transition-colors">{dict.common.about}</Link></li>
              <li><Link href={href('/editorial-policy')} className="hover:text-brand-gold transition-colors">{dict.common.editorialPolicy}</Link></li>
              <li><Link href={href('/contact')} className="hover:text-brand-gold transition-colors">{navT.contact}</Link></li>
              <li><Link href={href('/privacy')} className="hover:text-brand-gold transition-colors">{dict.legal.privacyTitle}</Link></li>
              <li><Link href={href('/terms')} className="hover:text-brand-gold transition-colors">{dict.legal.termsTitle}</Link></li>
            </ul>
          </div>
        </div>
        {topGuides.length > 0 && (
          <div className="mt-12 border-t border-gray-800 pt-8">
            <h3 className="text-sm font-semibold text-white mb-4">{dict.ui.guide.breadcrumbHelp}</h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {topGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link href={href(`/help/${guide.category}/${guide.slug}`)} className="hover:text-brand-gold transition-colors">
                    {guide.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {year} WakilBhai. {dict.common.allRightsReserved}</p>
          <p className="mt-2 text-xs max-w-2xl mx-auto">
            <strong>{dict.legal.disclaimerTitle}:</strong> {dict.common.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
