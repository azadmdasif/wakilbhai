# WakilBhai — Project Context

## What this is
WakilBhai (wakilbhai.com) is a legal documentation + lawyer-connect service for India. NOT a law firm — a documentation service with advocate partners. Tagline: "Legal Work. Without Tension." / "Your Local Lawyer."

## The business funnel (every design decision serves this)
1. ACQUIRE: free problem-solving guides + free templates + free tools rank on Google and get cited by AI (ChatGPT/Gemini/Perplexity/AI Overviews).
2. CONVERT (free): "WhatsApp Lawyer — Free" 10-minute consult → https://wa.me/917686022245 with prefilled message containing the page title + URL.
3. UPSELL 1: document services ₹199–₹999 (notices, agreements, affidavits), delivered in 1–3 working days.
4. UPSELL 2: paid advocate consult / case handling for complex matters.
Every page must make the NEXT action immediately obvious. One primary CTA per viewport. No dead ends — every page bottom offers the WhatsApp free consult.

## Audience
Mobile-first, tier-2/3 India, stressed, non-lawyers, often reading in Hindi/Bengali/regional languages. Reading level: simple. They search symptoms ("landlord deposit nahi de raha"), not statutes.

## Content rules (hard rules)
- Answer first: every guide opens with a 40–60 word QuickAnswer with concrete numbers (days, ₹).
- Max ~60 words of prose before the first visual component. No text walls — steps go in <StepCards>, deadlines in <DeadlineTimeline>, costs in <CostCard>, decisions in <DecisionFlow>.
- Sentences ≤ 20 words. Sections ≤ 80 words. FAQs are accordions.
- Always cite official sources (India Code, e-Daakhil, cybercrime.gov.in, state portals) with outbound links.
- Criminal-law content states BOTH old and new sections: "Section 420 IPC (now Section 318 BNS)".
- Every guide shows: Updated date, Written by, Reviewed by Adv. [name, Bar Council, enrolment no.].
- Disclaimer on every guide: documentation service, not legal advice.

## Design system (hard rules)
- Brand shell (nav, hero, footer): dark ink #101319 with brand red accent #E11D2E. Reading surfaces (guides, templates, tools): warm paper #FAF8F3, ink text #1A1D23. Long legal text is NEVER white-on-dark.
- WhatsApp green #25D366 is reserved EXCLUSIVELY for WhatsApp CTAs. Nothing else is green.
- Accent red is for primary paid CTAs and key highlights only. Muted gray #6B7280 for secondary.
- Signature motif: "stamp/postmark" chips — deadline and price chips styled like rubber-stamp impressions (subtle: 1.5px border, slight rotation -1deg, stamp-red or ink), used sparingly (max 3/page). Evokes stamp paper & registered post — the vernacular of Indian legal life.
- Type: display = Anek (multi-script Indian superfamily by Ek Type, on Google Fonts: Anek Latin/Devanagari/Bangla/Tamil/Telugu/Gujarati/Kannada/Malayalam/Odia/Gurmukhi). Body = Noto Sans + Noto Sans [script]. Urdu = Noto Nastaliq Urdu, dir="rtl".
- Spacing: 8pt grid. Prose max-width 68ch. Body 17px/1.65 mobile. Touch targets ≥ 44px.
- Motion: minimal. One scroll-reveal on step cards max. Respect prefers-reduced-motion.
- Accessibility floor: visible focus rings, alt text, contrast AA, lang attributes per locale.

## Locales
Live: en, hi, ur, bn. Rollout: mr, te, ta, gu, kn, or, ml (in that order). URL pattern /{locale}/... with en at root. hreflang across all alternates. Language switcher shows native scripts.

## SEO/GEO rules
- Unique title (≤60 chars) + meta description (140–160 chars) per page, per locale.
- JSON-LD on every page: Organization+LegalService (site), Article+FAQPage+BreadcrumbList (guides), SoftwareApplication (tools).
- Dynamic sitemap.xml, robots.txt, llms.txt. IndexNow ping on publish. OG image per guide.
- Freshness: visible "Updated on" date, kept honest.

## Conventions
- Content lives as MDX in /content/{locale}/{category}/{slug}.mdx with typed front-matter (see /lib/content/schema).
- Components in /components, shared UI in /components/ui. TypeScript strict. Tailwind.
- After each task: run the build, fix errors, git commit with a conventional message.
