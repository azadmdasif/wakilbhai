import { SITE_URL } from '@/lib/site';

/**
 * IndexNow: instantly notify participating search engines (Bing, Yandex,
 * Seznam, Naver…) that URLs changed. Bing matters beyond Bing itself —
 * ChatGPT browsing and other AI answer engines read Bing's index.
 *
 * Setup: set INDEXNOW_KEY (any 8–128 char hex-ish string) and host that key as
 * a plain-text file at https://www.wakilbhai.com/{key}.txt containing exactly
 * the key. `scripts/ping-indexnow.ts` writes that file for you.
 */
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
// IndexNow accepts at most 10,000 URLs per request.
const MAX_URLS_PER_REQUEST = 10000;

export interface PingResult {
  ok: boolean;
  /** HTTP status of the last request (200/202 = accepted). */
  status?: number;
  /** Number of batched requests sent. */
  batches: number;
  /** Set when the ping was a no-op (missing key / no URLs). */
  skipped?: string;
}

/** The IndexNow key from env, or undefined when unset. */
export function getIndexNowKey(): string | undefined {
  const key = process.env.INDEXNOW_KEY?.trim();
  return key ? key : undefined;
}

/** Public URL where the key file must be served (keyLocation). */
export function keyFileLocation(key: string): string {
  return `${SITE_URL}/${key}.txt`;
}

/**
 * Notify IndexNow that the given URLs changed. No-ops (returns `skipped`) when
 * INDEXNOW_KEY is unset or `urls` is empty, so it's safe to call unconditionally.
 * URLs are sent in batches of 10,000.
 */
export async function pingIndexNow(urls: string[]): Promise<PingResult> {
  const key = getIndexNowKey();
  if (!key) return { ok: false, batches: 0, skipped: 'INDEXNOW_KEY is not set' };

  const unique = [...new Set(urls)].filter(Boolean);
  if (unique.length === 0) return { ok: true, batches: 0, skipped: 'no URLs to submit' };

  const host = new URL(SITE_URL).host;
  const keyLocation = keyFileLocation(key);

  let batches = 0;
  let status = 0;
  for (let i = 0; i < unique.length; i += MAX_URLS_PER_REQUEST) {
    const urlList = unique.slice(i, i + MAX_URLS_PER_REQUEST);
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation, urlList }),
    });
    batches += 1;
    status = res.status;
    if (!res.ok) return { ok: false, status, batches };
  }
  return { ok: true, status, batches };
}
