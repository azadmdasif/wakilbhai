/**
 * Simple in-memory sliding-window rate limiter, keyed by IP.
 * Note: per serverless instance only — good enough to stop casual abuse
 * of the assistant; swap for Upstash/KV if real enforcement is needed.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 10, windowMs = 60_000): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  const timestamps = (hits.get(key) ?? []).filter((t) => t > windowStart);
  if (timestamps.length >= limit) {
    hits.set(key, timestamps);
    return false;
  }
  timestamps.push(now);
  hits.set(key, timestamps);
  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 10_000) {
    for (const [k, v] of hits) {
      if (v.every((t) => t <= windowStart)) hits.delete(k);
    }
  }
  return true;
}
