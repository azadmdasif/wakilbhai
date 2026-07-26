# SEO / GEO monitoring runbook

A once-a-month, ~60–90 minute manual routine. This is a **runbook, not code** —
no script runs it. The goal is two things:

1. **SEO** — are our pages indexed and ranking on Google and Bing?
2. **GEO** (Generative Engine Optimization) — are AI answer engines
   (ChatGPT, Perplexity, Gemini, Google AI Overviews) **citing WakilBhai** when
   people ask the questions our guides answer?

Do it on the same day each month (e.g. the 1st). Everything you record feeds the
content roadmap: the fastest wins are usually questions we already half-answer.

Files in this folder:

- `geo-questions.json` — the 25 test questions + the WakilBhai page each should
  surface.
- `geo-log.csv` — append one row per (question × engine) each month.
- `seo-monitor.md` — this runbook.

---

## Part A — GEO check (AI answer engines)

For each question in `geo-questions.json`, in a **fresh / logged-out** session
(so personalization doesn't skew results):

1. Paste the `question` verbatim into each engine listed in `engines`:
   **ChatGPT** (with web/search on), **Perplexity**, **Gemini**, and **Google
   AI Overview** (search the question on google.com and look at the AI Overview
   box, if shown).
2. Read the answer and its sources/links. Decide **cited = yes/no**:
   - `yes` — a wakilbhai.com URL appears as a source, citation, or link.
   - `no` — WakilBhai is absent (note who *is* cited instead).
3. Append a row to `geo-log.csv`:

   ```
   month,date_checked,question_id,engine,cited,cited_url,competitors,notes
   2026-08,2026-08-01,cheque-bounce,perplexity,yes,https://www.wakilbhai.com/help/money-recovery/cheque-bounce-what-to-do,"vakilsearch, lawrato",cited as source #2
   2026-08,2026-08-01,cheque-bounce,chatgpt,no,,"indiafilings, cleartax",answer summarized generic steps, no links
   ```

   - `cited` — `yes` / `no`.
   - `cited_url` — the exact WakilBhai URL cited (blank if `cited=no`).
   - `competitors` — who got cited instead (this is the competitive map).
   - `notes` — position, whether it was quoted, anything odd.

### Acting on GEO results

- **Not cited, but we have the guide** → the page exists but isn't being picked.
  Check: is the QuickAnswer a tight 40–60 words with concrete numbers? Are FAQs
  real questions? Is the FAQPage/Article JSON-LD present (view source)? Is the
  "Updated on" date recent? Strengthen the answer-first block and re-check next
  month.
- **Not cited, and we have no guide** → this is a **content gap**. Add it to the
  roadmap (see Part B, zero-result searches — they often overlap).
- **A competitor is consistently cited** → open their page, see what structured,
  numbered, sourced content the engines are lifting, and out-answer it.
- **Cited** → note the URL; keep that page fresh so we don't lose the citation.

Trend matters more than any single month — the same 25 questions every month
turns "did an AI mention us?" into a line you can watch move.

---

## Part B — SEO monthly checklist

Copy this block into the month's notes and tick it off.

### 1. Google Search Console (search.google.com/search-console)

- [ ] **Pages / Indexing** — indexed count vs last month. Investigate any jump
      in "Not indexed" (Crawled – currently not indexed, Discovered, Duplicate,
      Excluded by noindex — remember `/search` and draft locales are noindex on
      purpose).
- [ ] **Sitemaps** — `sitemap.xml` still "Success", discovered URL count sane.
- [ ] **Performance** — top queries, top pages, total clicks/impressions vs last
      month. Note queries where we rank #5–#20 (page-2 pages one improvement away
      from traffic).
- [ ] **Core Web Vitals** + **Mobile Usability** — any URLs flagged.
- [ ] **Manual actions / Security** — must be empty.

### 2. Bing Webmaster Tools (bing.com/webmasters)

- [ ] Indexed pages count; any crawl errors.
- [ ] Sitemap submitted and processed.
- [ ] (Bing feeds Copilot/ChatGPT search — Bing indexing is part of the GEO
      story, not just Bing traffic.)
- [ ] Confirm **IndexNow** submissions are landing (recent publishes should show
      as submitted).

### 3. Top zero-result searches → the content roadmap

- [ ] In analytics, pull **`search_query` events where `results = 0`** for the
      last month (see README → Analytics; these come from the `/search` page and
      the homepage search box).
- [ ] These are, literally, guides people wanted and we didn't have. Rank by
      frequency; add the top ones to the writing queue.
- [ ] Cross-reference with GEO "not cited, no guide" gaps from Part A — overlaps
      are the highest-priority guides to write.

### 4. Guides needing "Updated on" re-verification

Per the editorial policy, every guide is re-verified against its official
sources at least quarterly (and sooner when the law changes).

- [ ] List guides whose `updatedAt` (in `content/guides/*/meta.json`) is **> 3
      months old**.
- [ ] Re-check each against its primary source (India Code, the relevant court/
      government portal). If still correct, bump `updatedAt` honestly; if the law
      or fees changed, fix the content first.
- [ ] Watch for known statutory shifts (e.g. IPC→BNS/BNSS section renumbering) —
      guides must state both old and new sections.
- [ ] Never bump a date without an actual re-check — the "Updated on" date is a
      trust signal and must stay honest.

### 5. Freshness / publishing hygiene

- [ ] New guides since last month are in `sitemap.xml` and `llms.txt`.
- [ ] `llms.txt` "Best guides / tools" lists still reflect our top pages.
- [ ] OG images render for a couple of new guides (share-preview check).

---

## Where the numbers live

- **Analytics events** (`search_query`, `whatsapp_cta_click`, etc.) — see the
  README → Analytics table. Zero-result searches drive Part B §3.
- **Guide freshness** — `content/guides/<slug>/meta.json` → `updatedAt`.
- **Sitemap / llms** — `app/sitemap.ts`, `public/llms.txt`.

Keep `geo-log.csv` append-only. Twelve months in, it's the clearest evidence of
whether the free-guides-that-AI-cites strategy is working.
