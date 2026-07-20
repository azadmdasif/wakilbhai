# WakilBhai

Legal documentation + lawyer-connect service for India — free guides, ready-to-use
document formats, and advocate help on WhatsApp. Built with Next.js (App Router),
TypeScript and Tailwind.

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run test`,
and `npm run seo:ping` (see IndexNow below).

## Environment variables

Set these in `.env.local` (git-ignored). All are optional — features degrade
gracefully when a var is absent.

| Variable | Used for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_GSC_TOKEN` | Google Search Console site verification | Emits `<meta name="google-site-verification">`. |
| `NEXT_PUBLIC_BING_TOKEN` | Bing Webmaster Tools site verification | Emits `<meta name="msvalidate.01">`. |
| `INDEXNOW_KEY` | IndexNow submissions | Any 8–128 char `[a-zA-Z0-9-]` string. Also served at `/{key}.txt`. |
| `NEXT_PUBLIC_TWITTER_URL` | Footer Twitter/X link | Icon is hidden when unset. |
| `NEXT_PUBLIC_FACEBOOK_URL` | Footer Facebook link | Icon is hidden when unset. |
| `NEXT_PUBLIC_LINKEDIN_URL` | Footer LinkedIn link | Icon is hidden when unset. |

`NEXT_PUBLIC_*` vars are inlined into the client bundle at build time, so a build
is required after changing them.

### Getting the verification tokens

- **Google (`NEXT_PUBLIC_GSC_TOKEN`):** [Search Console](https://search.google.com/search-console)
  → add the `https://www.wakilbhai.com` property → choose the **HTML tag** method
  → copy the value of the `content` attribute (just the token, not the whole tag)
  → set it as `NEXT_PUBLIC_GSC_TOKEN`, rebuild/deploy, then click **Verify**.
- **Bing (`NEXT_PUBLIC_BING_TOKEN`):** [Bing Webmaster Tools](https://www.bing.com/webmasters)
  → add the site → **Meta tag** verification option → copy the `content` value of
  the `msvalidate.01` tag → set it as `NEXT_PUBLIC_BING_TOKEN`, rebuild/deploy, verify.
  You can also import the site directly from Google Search Console.

## SEO surface

- `app/sitemap.ts` → `/sitemap.xml` (all routes × live locales, hreflang alternates)
- `app/robots.ts` → `/robots.txt` (allows AI crawlers explicitly)
- `public/llms.txt` → curated summary for AI answer engines
- Per-page metadata, JSON-LD and dynamic OG images live under `lib/seo/`.

### IndexNow (instant recrawl — matters for Bing/ChatGPT)

Bing powers ChatGPT browsing and other AI answer engines, so getting URLs into
Bing's index quickly is worth the extra step. [IndexNow](https://www.indexnow.org/)
pushes changed URLs to Bing (and Yandex, Seznam, Naver…) instead of waiting for a
crawl.

**One-time setup:**

1. Pick a key (e.g. `openssl rand -hex 16`) and set `INDEXNOW_KEY` in your env.
2. The key must be served as plain text at `https://www.wakilbhai.com/{key}.txt`.
   `npm run seo:ping` writes `public/{key}.txt` for you; commit it (the key is
   public by design) or generate it in your build step so it ships with the site.

**On publish:**

```bash
INDEXNOW_KEY=<key> npm run seo:ping
```

This reads every URL from the sitemap and submits them to IndexNow. Programmatic
callers can import `pingIndexNow(urls: string[])` from `lib/seo/indexnow.ts`.
