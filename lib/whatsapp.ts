import { WHATSAPP_NUMBER } from './site';
import type { Locale } from './i18n';

/** Build a wa.me deep link, optionally with a prefilled message. */
export function buildWhatsAppUrl(message?: string, phone: string = WHATSAPP_NUMBER): string {
  const base = `https://wa.me/${phone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

type MessageContext =
  | { kind: 'general' }
  | { kind: 'guide'; title: string; url: string }
  | { kind: 'service'; title: string; priceINR: number }
  | { kind: 'template'; title: string }
  | { kind: 'searchMiss'; query: string }
  | { kind: 'calculator'; title: string; result: string }
  | { kind: 'share'; title: string; url: string };

/**
 * Peer-to-peer share link (no recipient number). Opens WhatsApp's contact
 * picker so the reader can forward a guide into their own family/community
 * groups — the growth loop.
 */
export function buildWhatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

const T: Record<Locale, Record<string, string>> = {
  en: {
    general: 'Hi WakilBhai! I need help with a legal documentation matter.',
    guide: 'Hi WakilBhai! I was reading "{title}" ({url}) and need help with this problem.',
    service: 'Hi WakilBhai! I want to order: {title} (₹{price}). Please guide me.',
    template: 'Hi WakilBhai! I downloaded the "{title}" format. I need help with the next steps.',
    searchMiss: 'Hi WakilBhai! I searched for "{query}" on your site but did not find it. My problem is: ',
    calculator: 'Hi WakilBhai! I used the {title} tool. My result: {result}. I need help with this.',
    share: '{title} — free step-by-step guide: {url} (via WakilBhai)',
  },
  hi: {
    general: 'नमस्ते WakilBhai! मुझे एक कानूनी दस्तावेज़ के मामले में मदद चाहिए।',
    guide: 'नमस्ते WakilBhai! मैं "{title}" ({url}) पढ़ रहा/रही थी और मुझे इस समस्या में मदद चाहिए।',
    service: 'नमस्ते WakilBhai! मुझे यह ऑर्डर करना है: {title} (₹{price})। कृपया मार्गदर्शन करें।',
    template: 'नमस्ते WakilBhai! मैंने "{title}" फॉर्मेट डाउनलोड किया है। अगले कदमों में मदद चाहिए।',
    searchMiss: 'नमस्ते WakilBhai! मैंने आपकी साइट पर "{query}" खोजा पर नहीं मिला। मेरी समस्या है: ',
    calculator: 'नमस्ते WakilBhai! मैंने {title} टूल इस्तेमाल किया। मेरा परिणाम: {result}। मुझे इसमें मदद चाहिए।',
    share: '{title} — मुफ़्त स्टेप-बाय-स्टेप गाइड: {url} (WakilBhai से)',
  },
  ur: {
    general: 'السلام علیکم WakilBhai! مجھے ایک قانونی دستاویز کے معاملے میں مدد چاہیے۔',
    guide: 'السلام علیکم WakilBhai! میں "{title}" ({url}) پڑھ رہا/رہی تھی اور مجھے اس مسئلے میں مدد چاہیے۔',
    service: 'السلام علیکم WakilBhai! مجھے یہ آرڈر کرنا ہے: {title} (₹{price})۔ براہ کرم رہنمائی کریں۔',
    template: 'السلام علیکم WakilBhai! میں نے "{title}" فارمیٹ ڈاؤن لوڈ کیا ہے۔ اگلے مراحل میں مدد چاہیے۔',
    searchMiss: 'السلام علیکم WakilBhai! میں نے آپ کی سائٹ پر "{query}" تلاش کیا لیکن نہیں ملا۔ میرا مسئلہ ہے: ',
    calculator: 'السلام علیکم WakilBhai! میں نے {title} ٹول استعمال کیا۔ میرا نتیجہ: {result}۔ مجھے اس میں مدد چاہیے۔',
    share: '{title} — مفت مرحلہ وار گائیڈ: {url} (WakilBhai کی طرف سے)',
  },
  bn: {
    general: 'নমস্কার WakilBhai! আমার একটি আইনি নথির বিষয়ে সাহায্য দরকার।',
    guide: 'নমস্কার WakilBhai! আমি "{title}" ({url}) পড়ছিলাম এবং এই সমস্যায় সাহায্য দরকার।',
    service: 'নমস্কার WakilBhai! আমি অর্ডার করতে চাই: {title} (₹{price})। অনুগ্রহ করে সাহায্য করুন।',
    template: 'নমস্কার WakilBhai! আমি "{title}" ফরম্যাট ডাউনলোড করেছি। পরবর্তী ধাপে সাহায্য দরকার।',
    searchMiss: 'নমস্কার WakilBhai! আমি আপনাদের সাইটে "{query}" খুঁজেছি কিন্তু পাইনি। আমার সমস্যা: ',
    calculator: 'নমস্কার WakilBhai! আমি {title} টুল ব্যবহার করেছি। আমার ফলাফল: {result}। আমার সাহায্য দরকার।',
    share: '{title} — বিনামূল্যে ধাপে ধাপে গাইড: {url} (WakilBhai থেকে)',
  },
};

function fill(templateStr: string, vars: Record<string, string | number>): string {
  return templateStr.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
}

/** Context-aware prefilled WhatsApp message in the user's language. */
export function whatsAppMessage(locale: Locale, ctx: MessageContext): string {
  const templates = T[locale];
  switch (ctx.kind) {
    case 'general':
      return templates.general;
    case 'guide':
      return fill(templates.guide, { title: ctx.title, url: ctx.url });
    case 'service':
      return fill(templates.service, { title: ctx.title, price: ctx.priceINR });
    case 'template':
      return fill(templates.template, { title: ctx.title });
    case 'searchMiss':
      return fill(templates.searchMiss, { query: ctx.query });
    case 'calculator':
      return fill(templates.calculator, { title: ctx.title, result: ctx.result });
    case 'share':
      return fill(templates.share, { title: ctx.title, url: ctx.url });
  }
}

export function whatsAppUrlFor(locale: Locale, ctx: MessageContext): string {
  return buildWhatsAppUrl(whatsAppMessage(locale, ctx));
}
