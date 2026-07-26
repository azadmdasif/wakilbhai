import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locales, localePath, isLocale, type Locale } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/site';
import { getPeople, getPerson } from '@/content/people';
import { buildWhatsAppUrl, whatsAppLawyerMessage } from '@/lib/whatsapp';
import JsonLd from '@/components/seo/JsonLd';
import { personSchema } from '@/lib/seo/schemas';
import TrackedLink from '@/components/TrackedLink';
import { WhatsAppIcon, ArrowRightIcon } from '@/components/Icons';

export function generateStaticParams() {
  return locales.flatMap((locale) => getPeople().map((p) => ({ locale, slug: p.slug })));
}

/** Fill {name}/{barCouncil} tokens in a localized meta-description template. */
function fillTokens(tpl: string, tokens: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => tokens[k] ?? '');
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const person = getPerson(slug);
  if (!person) return {};
  const dict = getDict(locale);
  const P = dict.ui.people;
  const isAdvocate = person.role === 'advocate-reviewer';
  const displayName = isAdvocate ? `Adv. ${person.name}` : person.name;
  const description = person.placeholder
    ? P.pendingBody
    : isAdvocate
      ? fillTokens(P.reviewerMetaDesc, { name: person.name, barCouncil: person.barCouncil ?? '' })
      : fillTokens(P.authorMetaDesc, { name: person.name });
  return buildMetadata({
    title: displayName,
    description,
    path: `/people/${person.slug}`,
    locale,
    // Unverified partner profiles are kept out of the index until real details
    // land and `placeholder` flips to false.
    noindex: person.placeholder,
  });
}

const stamp = 'inline-block -rotate-1 rounded-md border-[1.5px] px-3 py-1 text-xs font-bold';

export default async function PersonPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const person = getPerson(slug);
  if (!person) notFound();
  const dict = getDict(locale);
  const P = dict.ui.people;
  const href = (path: string) => localePath(locale, path);

  const isAdvocate = person.role === 'advocate-reviewer';
  const displayName = isAdvocate ? `Adv. ${person.name}` : person.name;
  const roleLabel = isAdvocate ? P.reviewerRole : P.authorRole;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Verified profiles carry Person JSON-LD; placeholders emit none (and are noindex). */}
      {!person.placeholder && (
        <JsonLd
          data={personSchema({
            name: displayName,
            url: `${SITE_URL}${href(`/people/${person.slug}`)}`,
            jobTitle: roleLabel,
            description: person.bio,
            knowsAbout: person.areas,
            affiliation: person.barCouncil,
            image: person.photo ? `${SITE_URL}${person.photo}` : undefined,
          })}
        />
      )}

      {/* Warm paper reading surface (CLAUDE.md). */}
      <article className="rounded-3xl bg-[#FAF8F3] px-5 py-8 text-[#1A1D23] shadow-xl ring-1 ring-black/5 sm:px-9 sm:py-12">
        <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{displayName}</h1>

        <p className="mt-3">
          <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-[#6B7280]">{roleLabel}</span>
        </p>

        {person.placeholder ? (
          /* Honest "being finalised" state — no bio, credentials or schema until verified. */
          <div className="mt-8 rounded-2xl border-[1.5px] border-dashed border-brand-red/40 bg-white/70 p-6">
            <h2 className="font-display text-lg font-bold text-brand-red">{P.pendingTitle}</h2>
            <p className="mt-2 leading-relaxed text-[#6B7280]">{P.pendingBody}</p>
          </div>
        ) : (
          <>
            {isAdvocate && (person.barCouncil || person.enrolmentNo) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {person.barCouncil && (
                  <span className={`${stamp} border-brand-red text-brand-red`}>
                    {P.barCouncil}: {person.barCouncil}
                  </span>
                )}
                {person.enrolmentNo && (
                  <span className={`${stamp} border-black/40 text-[#1A1D23]`}>
                    {P.enrolment}: {person.enrolmentNo}
                  </span>
                )}
              </div>
            )}

            <p className="mt-6 max-w-[68ch] leading-relaxed">{person.bio}</p>

            {person.areas.length > 0 && (
              <section className="mt-8">
                <h2 className="mb-3 font-display text-lg font-bold">{P.areasHeading}</h2>
                <ul className="flex flex-wrap gap-2">
                  {person.areas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm text-[#1A1D23]"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        {/* No dead ends. */}
        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-black/10 pt-6">
          <TrackedLink
            href={buildWhatsAppUrl(whatsAppLawyerMessage())}
            event="whatsapp_cta_click"
            props={{ context: 'person-profile' }}
            external
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-whatsapp px-6 py-3 font-bold text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            {dict.common.whatsappLawyerFree}
          </TrackedLink>
          <Link href={href('/help')} className="inline-flex items-center gap-1 font-semibold text-brand-red hover:underline">
            {P.backToGuides}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}
