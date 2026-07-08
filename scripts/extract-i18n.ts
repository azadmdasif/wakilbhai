/**
 * One-off migration script: dumps the legacy TEXTS object from
 * legacy/constants.ts into per-locale JSON dictionaries under /content/i18n.
 * Run with: npx tsx scripts/extract-i18n.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { TEXTS } from '../legacy/constants';

const locales = ['en', 'hi', 'ur', 'bn'] as const;
const outDir = join(__dirname, '..', 'content', 'i18n');
mkdirSync(outDir, { recursive: true });

for (const locale of locales) {
  const dict = (TEXTS as Record<string, unknown>)[locale];
  writeFileSync(join(outDir, `${locale}.json`), JSON.stringify(dict, null, 2) + '\n');
  console.log(`wrote ${locale}.json`);
}
