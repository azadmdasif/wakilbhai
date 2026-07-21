import { WHATSAPP_NUMBER } from './site';
import type { Locale } from './i18n';

/** Build a wa.me deep link, optionally with a prefilled message. */
export function buildWhatsAppUrl(message?: string, phone: string = WHATSAPP_NUMBER): string {
  const base = `https://wa.me/${phone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * "WhatsApp Lawyer — Free" prefill (shared by the global CTA and the sticky
 * guide bar). Contextual when a page title + URL are supplied, otherwise a
 * generic ask. English by design — WakilBhai staff read the incoming message.
 */
export function whatsAppLawyerMessage(ctx?: { title: string; url: string }): string {
  return ctx
    ? `Hi WakilBhai! I need help with: ${ctx.title} (${ctx.url}). Please tell me about the free 10-minute consultation.`
    : 'Hi WakilBhai! I have a legal problem and want the free 10-minute consultation.';
}

type MessageContext =
  | { kind: 'general' }
  | { kind: 'guide'; title: string; url: string }
  | { kind: 'service'; title: string; priceINR: number }
  | { kind: 'template'; title: string }
  | { kind: 'searchMiss'; query: string }
  | { kind: 'calculator'; title: string; result: string }
  | { kind: 'share'; title: string; url: string }
  | { kind: 'serviceOrder'; title: string; priceINR: number; name?: string; city?: string }
  | { kind: 'templateFit'; title: string };

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
    serviceOrder: 'Hi WakilBhai! I want to order: {title} (₹{price}). My name: {name} My city: {city}',
    templateFit: 'Hi WakilBhai! I found the "{title}" format on your site. Can a lawyer check for free if it fits my case?',
  },
  hi: {
    general: 'नमस्ते WakilBhai! मुझे एक कानूनी दस्तावेज़ के मामले में मदद चाहिए।',
    guide: 'नमस्ते WakilBhai! मैं "{title}" ({url}) पढ़ रहा/रही थी और मुझे इस समस्या में मदद चाहिए।',
    service: 'नमस्ते WakilBhai! मुझे यह ऑर्डर करना है: {title} (₹{price})। कृपया मार्गदर्शन करें।',
    template: 'नमस्ते WakilBhai! मैंने "{title}" फॉर्मेट डाउनलोड किया है। अगले कदमों में मदद चाहिए।',
    searchMiss: 'नमस्ते WakilBhai! मैंने आपकी साइट पर "{query}" खोजा पर नहीं मिला। मेरी समस्या है: ',
    calculator: 'नमस्ते WakilBhai! मैंने {title} टूल इस्तेमाल किया। मेरा परिणाम: {result}। मुझे इसमें मदद चाहिए।',
    share: '{title} — मुफ़्त स्टेप-बाय-स्टेप गाइड: {url} (WakilBhai से)',
    serviceOrder: 'नमस्ते WakilBhai! मुझे यह ऑर्डर करना है: {title} (₹{price})। मेरा नाम: {name} मेरा शहर: {city}',
    templateFit: 'नमस्ते WakilBhai! मुझे आपकी साइट पर "{title}" फॉर्मेट मिला। क्या कोई वकील मुफ़्त में देख सकता है कि यह मेरे केस के लिए सही है?',
  },
  ur: {
    general: 'السلام علیکم WakilBhai! مجھے ایک قانونی دستاویز کے معاملے میں مدد چاہیے۔',
    guide: 'السلام علیکم WakilBhai! میں "{title}" ({url}) پڑھ رہا/رہی تھی اور مجھے اس مسئلے میں مدد چاہیے۔',
    service: 'السلام علیکم WakilBhai! مجھے یہ آرڈر کرنا ہے: {title} (₹{price})۔ براہ کرم رہنمائی کریں۔',
    template: 'السلام علیکم WakilBhai! میں نے "{title}" فارمیٹ ڈاؤن لوڈ کیا ہے۔ اگلے مراحل میں مدد چاہیے۔',
    searchMiss: 'السلام علیکم WakilBhai! میں نے آپ کی سائٹ پر "{query}" تلاش کیا لیکن نہیں ملا۔ میرا مسئلہ ہے: ',
    calculator: 'السلام علیکم WakilBhai! میں نے {title} ٹول استعمال کیا۔ میرا نتیجہ: {result}۔ مجھے اس میں مدد چاہیے۔',
    share: '{title} — مفت مرحلہ وار گائیڈ: {url} (WakilBhai کی طرف سے)',
    serviceOrder: 'السلام علیکم WakilBhai! میں یہ آرڈر کرنا چاہتا/چاہتی ہوں: {title} (₹{price})۔ میرا نام: {name} میرا شہر: {city}',
    templateFit: 'السلام علیکم WakilBhai! مجھے آپ کی سائٹ پر "{title}" فارمیٹ ملا۔ کیا کوئی وکیل مفت میں دیکھ سکتا ہے کہ یہ میرے کیس کے لیے درست ہے؟',
  },
  bn: {
    general: 'নমস্কার WakilBhai! আমার একটি আইনি নথির বিষয়ে সাহায্য দরকার।',
    guide: 'নমস্কার WakilBhai! আমি "{title}" ({url}) পড়ছিলাম এবং এই সমস্যায় সাহায্য দরকার।',
    service: 'নমস্কার WakilBhai! আমি অর্ডার করতে চাই: {title} (₹{price})। অনুগ্রহ করে সাহায্য করুন।',
    template: 'নমস্কার WakilBhai! আমি "{title}" ফরম্যাট ডাউনলোড করেছি। পরবর্তী ধাপে সাহায্য দরকার।',
    searchMiss: 'নমস্কার WakilBhai! আমি আপনাদের সাইটে "{query}" খুঁজেছি কিন্তু পাইনি। আমার সমস্যা: ',
    calculator: 'নমস্কার WakilBhai! আমি {title} টুল ব্যবহার করেছি। আমার ফলাফল: {result}। আমার সাহায্য দরকার।',
    share: '{title} — বিনামূল্যে ধাপে ধাপে গাইড: {url} (WakilBhai থেকে)',
    serviceOrder: 'নমস্কার WakilBhai! আমি অর্ডার করতে চাই: {title} (₹{price})। আমার নাম: {name} আমার শহর: {city}',
    templateFit: 'নমস্কার WakilBhai! আমি আপনাদের সাইটে "{title}" ফরম্যাট পেয়েছি। একজন উকিল কি বিনামূল্যে দেখতে পারেন এটি আমার কেসে মানানসই কিনা?',
  },
  mr: {
    general: 'नमस्कार WakilBhai! मला एका कायदेशीर कागदपत्राच्या बाबतीत मदत हवी आहे.',
    guide: 'नमस्कार WakilBhai! मी "{title}" ({url}) वाचत होतो/होते आणि मला या अडचणीत मदत हवी आहे.',
    service: 'नमस्कार WakilBhai! मला हे ऑर्डर करायचं आहे: {title} (₹{price}). कृपया मार्गदर्शन करा.',
    template: 'नमस्कार WakilBhai! मी "{title}" फॉरमॅट डाउनलोड केलं आहे. पुढील पायऱ्यांसाठी मदत हवी आहे.',
    searchMiss: 'नमस्कार WakilBhai! मी तुमच्या साइटवर "{query}" शोधलं पण सापडलं नाही. माझी अडचण अशी आहे: ',
    calculator: 'नमस्कार WakilBhai! मी {title} टूल वापरलं. माझा निकाल: {result}. मला यात मदत हवी आहे.',
    share: '{title} — मोफत टप्प्याटप्प्याने मार्गदर्शक: {url} (WakilBhai कडून)',
    serviceOrder: 'नमस्कार WakilBhai! मला हे ऑर्डर करायचं आहे: {title} (₹{price}). माझं नाव: {name} माझं शहर: {city}',
    templateFit: 'नमस्कार WakilBhai! मला तुमच्या साइटवर "{title}" फॉरमॅट मिळालं. एखादा वकील मोफत तपासू शकेल का, की ते माझ्या प्रकरणाला जुळतं?',
  },
  te: {
    general: 'నమస్తే WakilBhai! నాకు ఒక చట్టపరమైన పత్రం విషయంలో సహాయం కావాలి.',
    guide: 'నమస్తే WakilBhai! నేను "{title}" ({url}) చదువుతున్నాను, ఈ సమస్యలో నాకు సహాయం కావాలి.',
    service: 'నమస్తే WakilBhai! నేను దీన్ని ఆర్డర్ చేయాలనుకుంటున్నాను: {title} (₹{price}). దయచేసి మార్గనిర్దేశం చేయండి.',
    template: 'నమస్తే WakilBhai! నేను "{title}" ఫార్మాట్‌ను డౌన్‌లోడ్ చేశాను. తదుపరి దశలకు సహాయం కావాలి.',
    searchMiss: 'నమస్తే WakilBhai! నేను మీ సైట్‌లో "{query}" వెతికాను కానీ దొరకలేదు. నా సమస్య ఇది: ',
    calculator: 'నమస్తే WakilBhai! నేను {title} టూల్ వాడాను. నా ఫలితం: {result}. నాకు దీనిలో సహాయం కావాలి.',
    share: '{title} — ఉచిత దశలవారీ గైడ్: {url} (WakilBhai నుండి)',
    serviceOrder: 'నమస్తే WakilBhai! నేను దీన్ని ఆర్డర్ చేయాలనుకుంటున్నాను: {title} (₹{price}). నా పేరు: {name} నా నగరం: {city}',
    templateFit: 'నమస్తే WakilBhai! నేను మీ సైట్‌లో "{title}" ఫార్మాట్ చూశాను. ఇది నా కేసుకు సరిపోతుందో లేదో ఒక లాయర్ ఉచితంగా చూడగలరా?',
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
    case 'serviceOrder':
      return fill(templates.serviceOrder, {
        title: ctx.title,
        price: ctx.priceINR,
        name: ctx.name ?? '___',
        city: ctx.city ?? '___',
      });
    case 'templateFit':
      return fill(templates.templateFit, { title: ctx.title });
  }
}

export function whatsAppUrlFor(locale: Locale, ctx: MessageContext): string {
  return buildWhatsAppUrl(whatsAppMessage(locale, ctx));
}
