/**
 * Read every URL from the sitemap and submit them to IndexNow.
 *
 *   INDEXNOW_KEY=<key> npm run seo:ping
 *
 * Also (re)writes public/{key}.txt so the key is served statically at the
 * keyLocation IndexNow verifies against. Run it after a deploy/publish.
 */
import fs from 'node:fs';
import path from 'node:path';
import sitemap from '@/app/sitemap';
import { getIndexNowKey, keyFileLocation, pingIndexNow } from '@/lib/seo/indexnow';

// tsx doesn't auto-load .env files; best-effort load .env.local then .env so
// `npm run seo:ping` works locally without exporting vars by hand.
for (const file of ['.env.local', '.env']) {
  const p = path.join(process.cwd(), file);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

async function main(): Promise<void> {
  const key = getIndexNowKey();
  if (!key) {
    console.error('✗ INDEXNOW_KEY is not set — add it to .env.local or the environment.');
    process.exit(1);
  }

  // Serve the key file statically: public/{key}.txt must contain exactly the key.
  const keyFile = path.join(process.cwd(), 'public', `${key}.txt`);
  fs.writeFileSync(keyFile, key, 'utf8');
  console.log(`• wrote ${path.relative(process.cwd(), keyFile)}  (serve at ${keyFileLocation(key)})`);

  const urls = [...new Set(sitemap().map((entry) => entry.url))];
  console.log(`• collected ${urls.length} URLs from the sitemap`);

  const result = await pingIndexNow(urls);
  if (result.ok) {
    console.log(`✓ IndexNow accepted (HTTP ${result.status}) across ${result.batches} batch(es)`);
  } else {
    console.error(`✗ IndexNow ping failed: ${result.skipped ?? `HTTP ${result.status}`}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
