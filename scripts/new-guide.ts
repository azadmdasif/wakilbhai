/**
 * Guide scaffolder — generates a complete, schema-shaped skeleton for a new
 * guide so writers start from the canonical structure instead of a blank file.
 *
 *   npm run new:guide -- --slug upi-fraud-money-recovery --category cyber-fraud --title "Money Gone in UPI Fraud?"
 *
 * Flag-driven (falls back to interactive prompts for any missing flag):
 *   --slug      kebab-case guide slug (folder name)
 *   --category  existing category slug (validated against content/categories)
 *   --title     English H1/title
 *
 * Generates content/guides/{slug}/:
 *   meta.json   every front-matter field stubbed with TODO markers, in the
 *               canonical component order the template renders (QuickAnswer →
 *               DeadlineTimeline → StepCards → CostCard → FAQs → related).
 *               English-only: other enabled locales fall back to en at parse
 *               time and sit in draftLocales until translated + reviewed.
 *   {locale}.mdx for every enabled locale — placeholder bodies (structured
 *               guides keep prose in meta.json; the template owns the order).
 *
 * Prints the pre-publish checklist at the end. The stub intentionally fails
 * `npm test` / the build until every TODO is replaced — that is the point.
 */
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';

const ROOT = process.cwd();
const GUIDES_DIR = path.join(ROOT, 'content', 'guides');
const CATEGORIES_DIR = path.join(ROOT, 'content', 'categories');

// Enabled locales, mirrored from lib/i18n/locales.ts (kept literal so the
// script stays runnable with plain tsx and no Next.js path aliases).
const ENABLED_LOCALES = ['en', 'hi', 'ur', 'bn', 'mr', 'te', 'ta', 'gu'] as const;

function parseFlags(argv: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const m = argv[i].match(/^--([a-z]+)$/);
    if (m && argv[i + 1] && !argv[i + 1].startsWith('--')) out[m[1]] = argv[++i];
  }
  return out;
}

function categorySlugs(): string[] {
  return fs
    .readdirSync(CATEGORIES_DIR)
    .filter((f) => f.endsWith('.json'))
    .flatMap((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(CATEGORIES_DIR, f), 'utf8'));
      return (Array.isArray(data) ? data : [data]).map((c: { slug: string }) => c.slug);
    });
}

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

async function main(): Promise<void> {
  const flags = parseFlags(process.argv.slice(2));
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const slug = flags.slug ?? (await rl.question('Guide slug (kebab-case): ')).trim();
  const category = flags.category ?? (await rl.question(`Category [${categorySlugs().join(', ')}]: `)).trim();
  const title = flags.title ?? (await rl.question('English title (≤60 chars): ')).trim();
  rl.close();

  if (!KEBAB.test(slug)) throw new Error(`Slug ${JSON.stringify(slug)} is not kebab-case.`);
  if (!categorySlugs().includes(category)) {
    throw new Error(`Unknown category ${JSON.stringify(category)}. Existing: ${categorySlugs().join(', ')}`);
  }
  if (!title) throw new Error('Title is required.');

  const dir = path.join(GUIDES_DIR, slug);
  if (fs.existsSync(dir)) throw new Error(`content/guides/${slug} already exists.`);

  const today = new Date().toISOString().slice(0, 10);
  const nonEnglish = ENABLED_LOCALES.filter((l) => l !== 'en');

  // Front-matter skeleton, fields ordered to match the canonical render order.
  const meta = {
    slug,
    category,
    title: { en: title },
    answerBox: { en: 'TODO: 40–60 word direct answer with concrete numbers (days, ₹). This is the featured-snippet + AI-quote target.' },
    keyNumbers: { en: ['TODO: stamp chip 1 (e.g. "30 days to act")', 'TODO: chip 2', 'TODO: chip 3 (₹ figure)'] },
    deadlines: {
      en: [
        { label: 'TODO: first statutory step', duration: 'TODO: e.g. 24 hours', startsFrom: 'TODO: counted from' },
        { label: 'TODO: next step', duration: 'TODO', startsFrom: 'TODO' },
      ],
    },
    steps: {
      en: [
        { icon: 'file-text', title: 'TODO: step 1 (≤8 words)', summary: 'TODO: ≤2-line summary.', detail: 'TODO: full MDX detail with **bold numbers** and [official-source links](https://example.gov.in). Cite both old and new criminal sections where relevant: "Section 420 IPC (now Section 318 BNS)".' },
        { icon: 'send', title: 'TODO: step 2', summary: 'TODO', detail: 'TODO', serviceHint: 'TODO-or-delete: service id for the micro-CTA' },
        { icon: 'clock', title: 'TODO: step 3', summary: 'TODO', detail: 'TODO' },
        { icon: 'gavel', title: 'TODO: step 4', summary: 'TODO', detail: 'TODO' },
      ],
    },
    costs: {
      en: {
        rows: [
          { label: 'TODO: line item', amount: 'TODO: ₹ or Free', note: 'TODO: note' },
          { label: 'TODO: line item', amount: 'TODO', note: 'TODO' },
        ],
        footnote: 'TODO: penalties / what-to-expect footnote.',
      },
    },
    searchKeywords: { en: ['TODO: symptom-language query 1', 'TODO: query 2', 'TODO: query 3'] },
    relatedServiceIds: ['TODO: existing service id (see content/services)'],
    relatedTemplateSlugs: ['TODO-or-empty: existing template slug (≥1 preferred)'],
    relatedGuideSlugs: ['TODO: 2 existing guide slugs'],
    faqs: {
      en: [
        { q: 'TODO: question 1?', a: 'TODO: concise answer.' },
        { q: 'TODO: question 2?', a: 'TODO' },
        { q: 'TODO: question 3?', a: 'TODO' },
        { q: 'TODO: question 4?', a: 'TODO' },
        { q: 'TODO: question 5?', a: 'TODO' },
      ],
    },
    updatedAt: today,
    publishedAt: today,
    author: 'WakilBhai Editorial Team',
    reviewer: 'TODO: Adv. Name, Bar Council of …, ENROLMENT/NO/YEAR',
    // en ships first; translations graduate out of draft after review.
    draftLocales: nonEnglish,
  };

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');

  // Placeholder bodies. The page template renders the canonical order
  // (H1 → meta row → QuickAnswer → DeadlineTimeline → DecisionFlow → StepCards
  // → CostCard → CtaLadder → templates → FAQ → related → share → disclaimer)
  // from meta.json — prose lives in the structured fields, not here.
  const body =
    '{/* Structured guide — content lives in meta.json; the template renders the canonical order: QuickAnswer → DeadlineTimeline → DecisionFlow → StepCards → CostCard → CtaLadder → templates → FAQ → related. Add supplementary prose here ONLY if it cannot fit a structured slot (keep gaps ≤80 words). */}\n';
  for (const locale of ENABLED_LOCALES) fs.writeFileSync(path.join(dir, `${locale}.mdx`), body);

  console.log(`\n✓ Scaffolded content/guides/${slug}/ (meta.json + ${ENABLED_LOCALES.length} locale bodies)`);
  console.log(`✓ Category "${category}" hub page picks the guide up automatically once meta.json validates.\n`);
  console.log('Pre-publish checklist:');
  for (const item of [
    'quickAnswer (answerBox) ≤ 60 words, with concrete numbers (days, ₹)',
    '≥ 4 FAQs answered (5 stubbed)',
    '≥ 1 free template linked in relatedTemplateSlugs (or consciously empty)',
    'reviewer assigned: "Adv. Name, Bar Council …, enrolment no."',
    'official-source outbound links in step details (India Code / e-Daakhil / cybercrime.gov.in / RBI / state portals)',
    'criminal sections dual-coded: "Section 420 IPC (now Section 318 BNS)"',
    'relatedServiceIds / relatedGuideSlugs point at existing content',
    'run: npx vitest run tests/content.test.ts  (build fails on any leftover TODO shape errors)',
  ]) {
    console.log(`  [ ] ${item}`);
  }
  console.log('\nWhen a translation passes review, remove its code from draftLocales to go indexable.');
}

main().catch((err) => {
  console.error(`✗ ${err instanceof Error ? err.message : err}`);
  process.exit(1);
});
