import type { Locale, Localized } from './lib/i18n';

export type { Locale, Localized };

export interface Category {
  slug: string; // e.g. 'money-recovery'
  title: Localized;
  description: Localized;
  icon: string; // key resolved by components/CategoryIcon
  order: number;
  /** Bar Council constraint: informational + lawyer referral only, no drafting CTA. */
  referralOnly?: boolean;
}

export interface GuideMeta {
  slug: string; // e.g. 'cheque-bounce-what-to-do'
  category: string; // category slug
  title: Localized;
  /** 2–3 sentence direct answer (featured snippet target). */
  answerBox: Localized;
  /** Vernacular long-tail queries this guide targets. */
  searchKeywords: Localized<string[]>;
  /** The money pages this guide sells. */
  relatedServiceIds: string[];
  relatedTemplateSlugs: string[];
  relatedGuideSlugs: string[];
  faqs: Localized<{ q: string; a: string }[]>;
  updatedAt: string; // ISO date (dateModified)
  publishedAt: string; // ISO date (datePublished)
  /** Byline shown on the guide and emitted as the Article author. */
  author: string;
  /** Legal reviewer: "Adv. [name], [Bar Council], [enrolment no.]". */
  reviewer: string;
}

export interface Guide extends GuideMeta {
  /** Raw MDX body for one locale. */
  body: string;
}

export interface DocTemplate {
  slug: string;
  category: string;
  title: Localized;
  description: Localized;
  fileFormats: ('docx' | 'pdf')[];
  /** true = requires WhatsApp number before download. */
  gated: boolean;
  /** Upsell: "get this professionally drafted". */
  relatedServiceId?: string;
}

export type ServiceType = 'drafting' | 'legal-notice' | 'consultation' | 'registration';

export interface PaidService {
  id: string;
  /** Category slug, or 'general' for cross-category services (consultation). */
  category: string;
  title: Localized;
  description: Localized;
  priceINR: number;
  deliveryDays: number;
  type: ServiceType;
}

export interface City {
  slug: string;
  name: Localized;
  state: string; // state key used by calculator data (e.g. 'maharashtra')
}
