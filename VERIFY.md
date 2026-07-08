# VERIFY — facts that need human verification

Items marked `{/* VERIFY: ... */}` in MDX content (MDX uses JSX comments,
not HTML `<!-- -->`), plus operational to-dos that cannot be resolved from
the repo. Find them all with:

```
grep -rn "VERIFY" content/
```

Remove entries as they are verified.

## Template files

- [ ] All files in `/public/templates/*.{pdf,docx}` are **placeholders**
      generated in Phase 1. Replace with real drafted formats before
      promoting template downloads.

## Guide content facts (flagged inline)

- [ ] **cheque-bounce-what-to-do** — state-wise court-fee schedules for
      Sec 138 complaints; availability of dedicated NI Act courts by city.
- [ ] **security-deposit-not-returned** — small-causes-court pecuniary
      limits per state; which states have notified rent authorities under
      Model Tenancy Act-based laws.
- [ ] **rent-agreement-guide** — **all stamp duty rates in the state
      table** (Delhi, Maharashtra, Karnataka, UP, West Bengal, Tamil Nadu,
      Telangana, Gujarat) against current state schedules; acceptance of
      unregistered agreements as address proof.
- [ ] **unpaid-salary-what-to-do** — labour codes implementation status
      per state; IBC operational-debt threshold (₹1 crore); typical labour
      office conciliation timelines.
- [ ] **consumer-forum-complaint-guide** — pecuniary jurisdiction limits
      (District ≤ ₹50 lakh, State ≤ ₹2 cr per 2021 notification); current
      e-Daakhil fee slabs (nil up to ₹5 lakh claims).

## Calculator data (flagged `verify: true` in JSON)

- [ ] **content/calculators/stamp-duty.json** — every rate for all 8 seed
      states is indicative and must be checked against the current state
      stamp schedules (rent agreement, sale deed, gift deed rates).
- [ ] **Gratuity cap** — lib/calculators.ts assumes the ₹20 lakh statutory
      maximum; confirm the current notified ceiling.

## Deliberate migration decisions (for the owner to confirm)

- [ ] **Legacy blog not ported.** All three legacy blog posts contained
      only placeholder body text ("This is a placeholder text…"), so
      publishing them would create thin/duplicate content. The /help
      guides replace them; add real posts as MDX under /content when
      written. Legacy redirects for /blog land on /help (Phase 3).
- [ ] **Lawyer photos/ratings dropped.** Legacy lawyer profile photos
      don't exist in /public and ratings/review counts sit badly with a
      neutral, Bar Council-compliant listing. Directory is alphabetical,
      no superlatives.
