import type { Metadata } from 'next';
import { enabledLocales } from '@/lib/i18n/locales';
import { localeFontClass } from '@/lib/fonts';
import type { Locale } from '@/lib/i18n';

// Internal QA surface — never index it.
export const metadata: Metadata = {
  title: 'Type test',
  robots: { index: false, follow: false },
};

/**
 * /dev/type-test — eyeball QA for the Indic typography system.
 *
 * Renders the same guide fragment (H1 + body paragraph + stamp chip + a
 * money/date line) in every enabled script. Each sample block carries that
 * locale's font-variable class (localeFontClass) plus lang/dir, so all enabled
 * fonts load on this one page and each renders in its own Anek/Noto/Nastaliq
 * face. Check: Indic body leading looks >= 1.8, no clipped matras/reph, and all
 * digits stay Latin next to the ₹ sign.
 */

interface Sample {
  heading: string;
  body: string;
  chip: string;
  money: string;
}

// Numbers are deliberately Latin digits everywhere (design rule), even in
// Devanagari/Bengali/Nastaliq prose.
const SAMPLES: Record<Locale, Sample> = {
  en: {
    heading: 'Cheque Bounced? What to Do',
    body: 'Send a written demand notice within 30 days of the bank return memo. The issuer then gets 15 days to pay before a Section 138 complaint can be filed against them.',
    chip: '30 days',
    money: '₹45,000 · updated 15 July 2026',
  },
  hi: {
    heading: 'चेक बाउंस हो गया? क्या करें',
    body: 'बैंक रिटर्न मेमो मिलने के 30 दिनों के भीतर लिखित डिमांड नोटिस भेजें। इसके बाद जारीकर्ता को भुगतान के लिए 15 दिन मिलते हैं, वरना धारा 138 के तहत शिकायत दर्ज हो सकती है।',
    chip: '30 दिन',
    money: '₹45,000 · अपडेट 15 जुलाई 2026',
  },
  ur: {
    heading: 'چیک باؤنس ہو گیا؟ کیا کریں',
    body: 'بینک ریٹرن میمو ملنے کے 30 دن کے اندر تحریری ڈیمانڈ نوٹس بھیجیں۔ اس کے بعد جاری کنندہ کو ادائیگی کے لیے 15 دن ملتے ہیں، ورنہ دفعہ 138 کے تحت شکایت درج ہو سکتی ہے۔',
    chip: '30 دن',
    money: '₹45,000 · اپ ڈیٹ 15 جولائی 2026',
  },
  bn: {
    heading: 'চেক বাউন্স হয়েছে? কী করবেন',
    body: 'ব্যাঙ্ক রিটার্ন মেমো পাওয়ার 30 দিনের মধ্যে লিখিত ডিমান্ড নোটিশ পাঠান। এরপর প্রদানকারী পরিশোধের জন্য 15 দিন সময় পান, নইলে ধারা 138-এর অধীনে অভিযোগ দায়ের হতে পারে।',
    chip: '30 দিন',
    money: '₹45,000 · আপডেট 15 জুলাই 2026',
  },
};

export default function TypeTestPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-white">Typography test</h1>
        <p className="mt-2 text-sm text-gray-400">
          Guide heading + body + stamp chip + money/date line in every enabled script. Body leading
          ≥ 1.8 on Indic scripts; matras/reph must not clip; digits stay Latin next to ₹.
        </p>
      </header>

      <div className="space-y-6">
        {enabledLocales.map((meta) => {
          const s = SAMPLES[meta.code as Locale];
          return (
            <section
              key={meta.code}
              lang={meta.code}
              dir={meta.dir}
              className={`${localeFontClass(meta.code as Locale)} rounded-3xl bg-[#FAF8F3] p-6 text-[#1A1D23] shadow-xl ring-1 ring-black/5 sm:p-8`}
            >
              {/* QA label — always LTR/Latin so the metadata reads consistently. */}
              <div dir="ltr" className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6B7280]">
                <span className="rounded-full bg-[#1A1D23]/5 px-2 py-0.5 font-mono font-semibold text-[#1A1D23]">
                  {meta.code}
                </span>
                <span className="font-semibold">{meta.nativeName}</span>
                <span aria-hidden>·</span>
                <span>display: {meta.displayFont.split(',')[0].replace(/'/g, '')}</span>
                <span aria-hidden>·</span>
                <span>body: {meta.font.split(',')[0].replace(/'/g, '')}</span>
                <span aria-hidden>·</span>
                <span className="uppercase">{meta.dir}</span>
              </div>

              <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{s.heading}</h2>

              {/* font-sans re-evaluates --font-body at this locale's scope (it is
                  inherited-as-resolved otherwise, so nested locales would take the
                  document font). */}
              <p className="mt-4 max-w-[68ch] font-sans text-lg text-[#1A1D23]">{s.body}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {/* Stamp chip — the deadline motif. */}
                <span className="inline-flex -rotate-1 items-center rounded-md border-[1.5px] border-brand-red px-2.5 py-1 font-sans text-xs font-extrabold uppercase tracking-wide text-brand-red">
                  {s.chip}
                </span>
                <span className="inline-flex items-center rounded-md border-[1.5px] border-[#1A1D23]/70 px-2.5 py-1 font-sans text-sm font-bold">
                  {s.money}
                </span>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
