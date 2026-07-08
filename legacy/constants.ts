
import type { Service, Testimonial, Lawyer, Guide, LegalDocument, BlogPost } from './types';
import { PropertyIcon, UserIcon, BriefcaseIcon, GovernmentIcon, PenSquareIcon, GlobeIcon } from './components/Icons';

export const PRICING: Record<Service['category'], number> = {
  'Rent & Property': 199,
  'Personal': 199,
  'Business': 499,
  'Govt. / Statutory': 199,
  'Online & Startup Legal': 499
};

const placeholderLongText = `This is a placeholder text. Please replace this with your actual content.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`;

const privacyPolicyEN = `
**Effective Date: August 1, 2024**

Welcome to WakilBhai ("we," "our," "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully.

**1. Information We Collect**

We may collect information about you in a variety of ways. The information we may collect on the Site includes:

*   **Personal Data:** Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you request a service or contact us.
*   **Document Information:** Specific details, facts, and data you provide for the purpose of drafting your legal documents. This is highly sensitive information, and we treat it with the utmost confidentiality.
*   **Derivative Data:** Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.
*   **Financial Data:** We do not collect or store any financial information. All payments are processed through a secure third-party payment gateway.

**2. How We Use Your Information**

Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:

*   Create and manage your service request.
*   Draft and deliver the legal documents you have requested.
*   Communicate with you regarding your request, including confirmations and follow-ups.
*   Respond to your comments and questions and provide customer support.
*   Improve our website and service offerings.
*   Comply with legal and regulatory requirements.

**3. Disclosure of Your Information**

We do not sell, trade, rent, or otherwise share your Personal Information for marketing purposes. We may share information we have collected about you in certain situations:

*   **By Law or to Protect Rights:** If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
*   **Third-Party Service Providers:** We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, and customer service.
*   **With Your Consent:** We may share your information with lawyers or other professionals for attestation or specific legal consultation, but only after receiving your explicit consent to do so.

**4. Security of Your Information**

We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.

**5. Data Retention**

We will retain your personal information and document details only for as long as is necessary for the purposes set out in this Privacy Policy, including for the purposes of satisfying any legal, accounting, or reporting requirements.

**6. Your Rights**

You have the right to request access to the personal data we hold about you, to have any inaccuracies corrected, and to request the deletion of your data once our service is complete, subject to our legal obligations.

**7. Changes to This Privacy Policy**

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.

**8. Contact Us**

If you have questions or comments about this Privacy Policy, please contact us at: contact@wakilbhai.com
`;

const termsOfServiceEN = `
**Effective Date: August 1, 2024**

Please read these Terms of Service ("Terms") carefully before using the WakilBhai website and services (the "Service") operated by us. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.

**1. Acknowledgment and Agreement**

By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.

**2. Nature of Service and Disclaimer**

WakilBhai is a legal documentation service company. We are NOT a law firm and do NOT provide any legal advice. Our services are limited to the drafting of legal documents based on the information and requirements you provide. The information on our website is for general informational purposes only and should not be considered legal advice. The engagement with WakilBhai does not create an attorney-client relationship. For legal advice or representation, you should consult with a qualified advocate.

**3. Our Services**

*   We will prepare your documents based on the information you provide. You are solely responsible for the accuracy, completeness, and truthfulness of the information you submit.
*   The fees for our services are for the drafting and preparation of documents. They do not include any applicable government fees, stamp duties, or other third-party charges, which are your responsibility.
*   While we strive for accuracy, we do not guarantee the legal validity or suitability of any document for your specific circumstances. It is your responsibility to review the final documents and, if necessary, seek independent legal advice.

**4. Payments**

All fees are due upon ordering a service. Payments are processed through a secure third-party payment gateway. We are not responsible for any issues arising from the payment gateway's services. All fees are non-refundable once work has commenced on your document.

**5. User Responsibilities**

You agree not to use the Service for any unlawful purpose or to submit any false, misleading, or fraudulent information. You are responsible for maintaining the confidentiality of any information you provide.

**6. Limitation of Liability**

To the fullest extent permitted by law, in no event will WakilBhai, its affiliates, officers, or employees be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any errors or omissions in the documents prepared; (iii) any unauthorized access to or use of our servers and/or any and all personal information stored therein. Our liability is strictly limited to the amount you paid for the Service.

**7. Intellectual Property**

The Service and its original content, features, and functionality are and will remain the exclusive property of WakilBhai. The Service is protected by copyright, trademark, and other laws of India.

**8. Governing Law and Jurisdiction**

These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.

**9. Changes to These Terms**

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.

**10. Contact Us**

If you have any questions about these Terms, please contact us at: contact@wakilbhai.com
`;

const privacyPolicyHI = `
**प्रभावी तिथि: 1 अगस्त, 2024**

वाकीलभाई ("हम," "हमारे") में आपका स्वागत है। हम आपकी गोपनीयता की रक्षा के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट पर जाते हैं और हमारी सेवाओं का उपयोग करते हैं तो हम आपकी जानकारी कैसे एकत्र, उपयोग, प्रकट और सुरक्षित करते हैं। कृपया इस गोपनीयता नीति को ध्यान से पढ़ें।

**1. हम जो जानकारी एकत्र करते हैं**

हम आपके बारे में विभिन्न तरीकों से जानकारी एकत्र कर सकते हैं। साइट पर हम जो जानकारी एकत्र कर सकते हैं उसमें शामिल हैं:

*   **व्यक्तिगत डेटा:** व्यक्तिगत रूप से पहचान योग्य जानकारी, जैसे आपका नाम, शिपिंग पता, ईमेल पता और टेलीफोन नंबर, जो आप हमें स्वेच्छा से तब देते हैं जब आप किसी सेवा का अनुरोध करते हैं या हमसे संपर्क करते हैं।
*   **दस्तावेज़ की जानकारी:** आपके कानूनी दस्तावेज़ों का मसौदा तैयार करने के उद्देश्य से आपके द्वारा प्रदान किए गए विशिष्ट विवरण, तथ्य और डेटा। यह अत्यधिक संवेदनशील जानकारी है, और हम इसे अत्यंत गोपनीयता के साथ मानते हैं।
*   **व्युत्पन्न डेटा:** जानकारी जो हमारे सर्वर स्वचालित रूप से एकत्र करते हैं जब आप साइट तक पहुँचते हैं, जैसे कि आपका आईपी पता, ब्राउज़र का प्रकार, ऑपरेटिंग सिस्टम, पहुँच का समय, और साइट तक पहुँचने से ठीक पहले और बाद में आपके द्वारा देखे गए पृष्ठ।
*   **वित्तीय डेटा:** हम कोई भी वित्तीय जानकारी एकत्र या संग्रहीत नहीं करते हैं। सभी भुगतान एक सुरक्षित तृतीय-पक्ष भुगतान गेटवे के माध्यम से संसाधित किए जाते हैं।

**2. हम आपकी जानकारी का उपयोग कैसे करते हैं**

आपके बारे में सटीक जानकारी होने से हमें आपको एक सहज, कुशल और अनुकूलित अनुभव प्रदान करने की अनुमति मिलती है। विशेष रूप से, हम आपके बारे में एकत्र की गई जानकारी का उपयोग कर सकते हैं:

*   आपके सेवा अनुरोध को बनाने और प्रबंधित करने के लिए।
*   आपके द्वारा अनुरोधित कानूनी दस्तावेजों का मसौदा तैयार करने और वितरित करने के लिए।
*   पुष्टिकरण और अनुवर्ती सहित आपके अनुरोध के संबंध में आपसे संवाद करने के लिए।
*   आपकी टिप्पणियों और सवालों का जवाब देने और ग्राहक सहायता प्रदान करने के लिए।
*   हमारी वेबसाइट और सेवा पेशकशों में सुधार करने के लिए।
*   कानूनी और नियामक आवश्यकताओं का पालन करने के लिए।

**3. आपकी जानकारी का प्रकटीकरण**

हम विपणन उद्देश्यों के लिए आपकी व्यक्तिगत जानकारी को बेचते, व्यापार करते, किराए पर नहीं देते या अन्यथा साझा नहीं करते हैं। हम कुछ स्थितियों में आपके बारे में एकत्र की गई जानकारी साझा कर सकते हैं:

*   **कानून द्वारा या अधिकारों की रक्षा के लिए:** यदि हमें लगता है कि आपके बारे में जानकारी जारी करना कानूनी प्रक्रिया का जवाब देने, हमारी नीतियों के संभावित उल्लंघनों की जांच या समाधान करने, या दूसरों के अधिकारों, संपत्ति और सुरक्षा की रक्षा के लिए आवश्यक है, तो हम आपकी जानकारी को किसी भी लागू कानून, नियम या विनियम द्वारा अनुमति या आवश्यकता के अनुसार साझा कर सकते हैं।
*   **तृतीय-पक्ष सेवा प्रदाता:** हम आपकी जानकारी को उन तृतीय पक्षों के साथ साझा कर सकते हैं जो हमारे लिए या हमारी ओर से सेवाएं प्रदान करते हैं, जिसमें भुगतान प्रसंस्करण, डेटा विश्लेषण, ईमेल डिलीवरी और ग्राहक सेवा शामिल है।
*   **आपकी सहमति से:** हम आपकी स्पष्ट सहमति प्राप्त करने के बाद ही आपकी जानकारी को वकीलों या अन्य पेशेवरों के साथ सत्यापन या विशिष्ट कानूनी परामर्श के लिए साझा कर सकते हैं।

**4. आपकी जानकारी की सुरक्षा**

हम आपकी व्यक्तिगत जानकारी की सुरक्षा में मदद के लिए प्रशासनिक, तकनीकी और भौतिक सुरक्षा उपायों का उपयोग करते हैं। यद्यपि हमने आपके द्वारा हमें प्रदान की गई व्यक्तिगत जानकारी को सुरक्षित करने के लिए उचित कदम उठाए हैं, कृपया ध्यान रखें कि हमारे प्रयासों के बावजूद, कोई भी सुरक्षा उपाय पूर्ण या अभेद्य नहीं हैं, और डेटा ट्रांसमिशन की कोई भी विधि किसी भी अवरोधन या अन्य प्रकार के दुरुपयोग के खिलाफ गारंटी नहीं दे सकती है।

**5. डेटा प्रतिधारण**

हम आपकी व्यक्तिगत जानकारी और दस्तावेज़ विवरण केवल तब तक बनाए रखेंगे जब तक इस गोपनीयता नीति में निर्धारित उद्देश्यों के लिए आवश्यक हो, जिसमें किसी भी कानूनी, लेखांकन, या रिपोर्टिंग आवश्यकताओं को पूरा करने के उद्देश्य शामिल हैं।

**6. आपके अधिकार**

आपको हमारे पास आपके बारे में रखे गए व्यक्तिगत डेटा तक पहुंच का अनुरोध करने, किसी भी अशुद्धि को ठीक करने और हमारी सेवा पूरी हो जाने के बाद आपके डेटा को हटाने का अनुरोध करने का अधिकार है, जो हमारे कानूनी दायित्वों के अधीन है।

**7. इस गोपनीयता नीति में परिवर्तन**

हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। हम इस पृष्ठ पर नई गोपनीयता नीति पोस्ट करके आपको किसी भी बदलाव के बारे में सूचित करेंगे। आपको किसी भी बदलाव के लिए समय-समय पर इस गोपनीयता नीति की समीक्षा करने की सलाह दी जाती है।

**8. हमसे संपर्क करें**

यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न या टिप्पणियाँ हैं, तो कृपया हमसे संपर्क करें: contact@wakilbhai.com
`;

const termsOfServiceHI = `
**प्रभावी तिथि: 1 अगस्त, 2024**

हमारे द्वारा संचालित वाकीलभाई वेबसाइट और सेवाओं ("सेवा") का उपयोग करने से पहले कृपया इन सेवा की शर्तों ("शर्तें") को ध्यान से पढ़ें। सेवा तक आपकी पहुंच और उपयोग इन शर्तों की आपकी स्वीकृति और अनुपालन पर निर्भर करता है।

**1. स्वीकृति और समझौता**

सेवा का उपयोग करके, आप इन शर्तों से बंधे होने के लिए सहमत हैं। यदि आप शर्तों के किसी भी हिस्से से असहमत हैं, तो आप सेवा का उपयोग नहीं कर सकते हैं।

**2. सेवा की प्रकृति और अस्वीकरण**

वाकीलभाई एक कानूनी दस्तावेज़ीकरण सेवा कंपनी है। हम कोई कानूनी फर्म नहीं हैं और कोई कानूनी सलाह नहीं देते हैं। हमारी सेवाएं आपके द्वारा प्रदान की गई जानकारी और आवश्यकताओं के आधार पर कानूनी दस्तावेजों का मसौदा तैयार करने तक सीमित हैं। हमारी वेबसाइट पर दी गई जानकारी केवल सामान्य सूचना के उद्देश्यों के लिए है और इसे कानूनी सलाह नहीं माना जाना चाहिए। वाकीलभाई के साथ जुड़ाव एक वकील-ग्राहक संबंध नहीं बनाता है। कानूनी सलाह या प्रतिनिधित्व के लिए, आपको एक योग्य अधिवक्ता से परामर्श करना चाहिए।

**3. हमारी सेवाएं**

*   हम आपके द्वारा प्रदान की गई जानकारी के आधार पर आपके दस्तावेज़ तैयार करेंगे। आप प्रस्तुत की गई जानकारी की सटीकता, पूर्णता और सच्चाई के लिए पूरी तरह से जिम्मेदार हैं।
*   हमारी सेवाओं के लिए शुल्क दस्तावेजों के मसौदा और तैयारी के लिए हैं। इनमें कोई भी लागू सरकारी शुल्क, स्टांप शुल्क, या अन्य तृतीय-पक्ष शुल्क शामिल नहीं हैं, जो आपकी जिम्मेदारी है।
*   यद्यपि हम सटीकता के लिए प्रयास करते हैं, हम आपकी विशिष्ट परिस्थितियों के लिए किसी भी दस्तावेज़ की कानूनी वैधता या उपयुक्तता की गारंटी नहीं देते हैं। अंतिम दस्तावेजों की समीक्षा करना और यदि आवश्यक हो, तो स्वतंत्र कानूनी सलाह लेना आपकी जिम्मेदारी है।

**4. भुगतान**

सेवा का आदेश देने पर सभी शुल्क देय हैं। भुगतान एक सुरक्षित तृतीय-पक्ष भुगतान गेटवे के माध्यम से संसाधित किए जाते हैं। हम भुगतान गेटवे की सेवाओं से उत्पन्न होने वाले किसी भी मुद्दे के लिए जिम्मेदार नहीं हैं। एक बार आपके दस्तावेज़ पर काम शुरू हो जाने के बाद सभी शुल्क गैर-वापसी योग्य होते हैं।

**5. उपयोगकर्ता की जिम्मेदारियां**

आप किसी भी गैर-कानूनी उद्देश्य के लिए सेवा का उपयोग नहीं करने या कोई झूठी, भ्रामक या धोखाधड़ी वाली जानकारी प्रस्तुत नहीं करने के लिए सहमत हैं। आप अपने द्वारा प्रदान की गई किसी भी जानकारी की गोपनीयता बनाए रखने के लिए जिम्मेदार हैं।

**6. दायित्व की सीमा**

कानून द्वारा अनुमत पूर्ण सीमा तक, किसी भी स्थिति में वाकीलभाई, उसके सहयोगी, अधिकारी, या कर्मचारी किसी भी अप्रत्यक्ष, आकस्मिक, विशेष, परिणामी, या दंडात्मक क्षति के लिए उत्तरदायी नहीं होंगे, जिसमें बिना किसी सीमा के, लाभ, डेटा, उपयोग, सद्भावना, या अन्य अमूर्त हानियों का नुकसान शामिल है, जो (i) सेवा तक आपकी पहुंच या उपयोग या उपयोग करने में असमर्थता; (ii) तैयार किए गए दस्तावेजों में कोई त्रुटि या चूक; (iii) हमारे सर्वर और/या उसमें संग्रहीत किसी भी और सभी व्यक्तिगत जानकारी तक कोई अनधिकृत पहुंच या उपयोग के परिणामस्वरूप होता है। हमारा दायित्व आपके द्वारा सेवा के लिए भुगतान की गई राशि तक सख्ती से सीमित है।

**7. बौद्धिक संपदा**

सेवा और इसकी मूल सामग्री, सुविधाएँ, और कार्यक्षमता वाकीलभाई की अनन्य संपत्ति हैं और रहेंगी। सेवा भारत के कॉपीराइट, ट्रेडमार्क और अन्य कानूनों द्वारा संरक्षित है।

**8. शासी कानून और क्षेत्राधिकार**

ये शर्तें भारत के कानूनों के अनुसार शासित और मानी जाएंगी, इसके कानून के प्रावधानों के टकराव की परवाह किए बिना। इन शर्तों से या इनके संबंध में उत्पन्न होने वाले किसी भी विवाद पर नई दिल्ली, भारत की अदालतों का विशेष क्षेत्राधिकार होगा।

**9. इन शर्तों में परिवर्तन**

हम अपने एकमात्र विवेक पर, इन शर्तों को किसी भी समय संशोधित करने या बदलने का अधिकार सुरक्षित रखते हैं। हम इस पृष्ठ पर नई शर्तें पोस्ट करके किसी भी बदलाव की सूचना प्रदान करेंगे।

**10. हमसे संपर्क करें**

यदि इन शर्तों के बारे में आपके कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें: contact@wakilbhai.com
`;

const privacyPolicyUR = `
**تاریخ نفاذ: 1 اگست، 2024**

وکیل بھائی ("ہم"، "ہمارے") میں خوش آمدید۔ ہم آپ کی رازداری کے تحفظ کے لیے پرعزم ہیں۔ یہ پرائیویسی پالیسی وضاحت کرتی ہے کہ جب آپ ہماری ویب سائٹ پر آتے ہیں اور ہماری خدمات استعمال کرتے ہیں تو ہم آپ کی معلومات کو کیسے جمع، استعمال، ظاہر اور محفوظ کرتے ہیں۔ براہ کرم اس پرائیویسی پالیسی کو غور سے پڑھیں۔

**1. معلومات جو ہم جمع کرتے ہیں**

ہم آپ کے بارے میں مختلف طریقوں سے معلومات جمع کر سکتے ہیں۔ سائٹ پر ہم جو معلومات جمع کر سکتے ہیں ان میں شامل ہیں:

*   **ذاتی ڈیٹا:** ذاتی طور پر قابل شناخت معلومات، جیسے آپ کا نام، شپنگ ایڈریس، ای میل ایڈریس، اور ٹیلی فون نمبر، جو آپ رضاکارانہ طور پر ہمیں دیتے ہیں جب آپ کسی سروس کی درخواست کرتے ہیں یا ہم سے رابطہ کرتے ہیں۔
*   **دستاویز کی معلومات:** آپ کے قانونی دستاویزات کا مسودہ تیار کرنے کے مقصد سے آپ کی فراہم کردہ مخصوص تفصیلات، حقائق اور ڈیٹا۔ یہ انتہائی حساس معلومات ہیں، اور ہم اسے انتہائی رازداری کے ساتھ برتتے ہیں۔
*   **ماخوذ ڈیٹا:** معلومات جو ہمارے سرورز خود بخود جمع کرتے ہیں جب آپ سائٹ تک رسائی حاصل کرتے ہیں، جیسے آپ کا آئی پی ایڈریس، براؤザー کی قسم، آپریٹنگ سسٹم، رسائی کے اوقات، اور سائٹ تک رسائی سے پہلے اور بعد میں آپ کے دیکھے گئے صفحات۔
*   **مالیاتی ڈیٹا:** ہم کوئی مالی معلومات جمع یا ذخیرہ نہیں کرتے ہیں۔ تمام ادائیگیاں ایک محفوظ تھرڈ پارٹی ادائیگی گیٹ وے کے ذریعے کی جاتی ہیں۔

**2. ہم آپ کی معلومات کا استعمال کیسے کرتے ہیں**

آپ کے بارے میں درست معلومات رکھنے سے ہمیں آپ کو ایک ہموار، موثر اور اپنی مرضی کے مطابق تجربہ فراہم کرنے کی اجازت ملتی ہے۔ خاص طور پر، ہم آپ کے بارے میں جمع کردہ معلومات کا استعمال کر سکتے ہیں:

*   آپ کی سروس کی درخواست بنانے اور اس کا نظم کرنے کے لیے۔
*   آپ کی درخواست کردہ قانونی دستاویزات کا مسودہ تیار کرنے اور فراہم کرنے کے لیے۔
*   تصدیق اور فالو اپ سمیت آپ کی درخواست کے سلسلے میں آپ سے بات چیت کرنے کے لیے۔
*   آپ کے تبصروں اور سوالات کا جواب دینے اور کسٹمر سپورٹ فراہم کرنے کے لیے۔
*   ہماری ویب سائٹ اور خدمات کی پیشکش کو بہتر بنانے کے لیے۔
*   قانونی اور ریگولیٹری تقاضوں کی تعمیل کرنے کے لیے۔

**3. آپ کی معلومات کا انکشاف**

ہم مارکیٹنگ کے مقاصد کے لیے آپ کی ذاتی معلومات فروخت، تجارت، کرایہ پر یا دوسری صورت میں شیئر نہیں کرتے ہیں۔ ہم بعض حالات میں آپ کے بارے میں جمع کردہ معلومات کا اشتراک کر سکتے ہیں:

*   **قانون کے مطابق یا حقوق کے تحفظ کے لیے:** اگر ہمیں یقین ہے کہ آپ کے بارے میں معلومات کا اجراء قانونی عمل کا جواب دینے، ہماری پالیسیوں کی ممکنہ خلاف ورزیوں کی تحقیقات یا ان کا ازالہ کرنے، یا دوسروں کے حقوق، جائیداد اور حفاظت کے تحفظ کے لیے ضروری ہے، تو ہم آپ کی معلومات کو کسی بھی قابل اطلاق قانون، اصول یا ضابطے کے مطابق اجازت یا ضرورت کے مطابق شیئر کر سکتے ہیں۔
*   **تھرڈ پارٹی سروس فراہم کنندگان:** ہم آپ کی معلومات ان تیسرے فریقوں کے ساتھ شیئر کر سکتے ہیں جو ہمارے لیے یا ہماری جانب سے خدمات انجام دیتے ہیں، بشمول ادائیگی کی پروسیسنگ، ڈیٹا کا تجزیہ، ای میل کی ترسیل، اور کسٹمر سروس۔
*   **آپ کی رضامندی سے:** ہم آپ کی واضح رضامندی حاصل کرنے کے بعد ہی آپ کی معلومات وکلاء یا دیگر پیشہ ور افراد کے ساتھ تصدیق یا مخصوص قانونی مشاورت کے لیے شیئر کر سکتے ہیں۔

**4. آپ کی معلومات کی حفاظت**

ہم آپ کی ذاتی معلومات کی حفاظت میں مدد کے لیے انتظامی، تکنیکی اور جسمانی حفاظتی اقدامات استعمال کرتے ہیں۔ اگرچہ ہم نے آپ کی فراہم کردہ ذاتی معلومات کو محفوظ بنانے کے لیے معقول اقدامات کیے ہیں، براہ کرم آگاہ رہیں کہ ہماری کوششوں کے باوجود، کوئی بھی حفاظتی اقدامات کامل یا ناقابل تسخیر نہیں ہیں، اور ڈیٹا کی ترسیل کا کوئی بھی طریقہ کسی بھی مداخلت یا دیگر قسم کے غلط استعمال کے خلاف ضمانت نہیں دے سکتا۔

**5. ڈیٹا کا برقرار رکھنا**

ہم آپ کی ذاتی معلومات اور دستاویز کی تفصیلات صرف اس وقت تک برقرار رکھیں گے جب تک کہ اس پرائیویسی پالیسی میں بیان کردہ مقاصد کے لیے ضروری ہو، بشمول کسی بھی قانونی، اکاؤنٹنگ، یا رپورٹنگ کی ضروریات کو پورا کرنے کے مقاصد۔

**6. آپ کے حقوق**

آپ کو ہمارے پاس موجود آپ کے ذاتی ڈیٹا تک رسائی کی درخواست کرنے، کسی بھی غلطی کو درست کروانے، اور ہماری سروس مکمل ہونے کے بعد اپنے ڈیٹا کو حذف کرنے کی درخواست کرنے کا حق ہے، جو ہماری قانونی ذمہ داریوں کے تابع ہے۔

**7. اس پرائیویسی پالیسی میں تبدیلیاں**

ہم وقتا فوقتا اس پرائیویسی پالیسی کو اپ ڈیٹ کر سکتے ہیں۔ ہم اس صفحہ پر نئی پرائیویسی پالیسی پوسٹ کر کے آپ کو کسی بھی تبدیلی کے بارے میں مطلع کریں گے۔ آپ کو مشورہ دیا جاتا ہے کہ کسی بھی تبدیلی کے لیے وقتا فوقتا اس پرائیویسی پالیسی کا جائزہ لیں۔

**8. ہم سے رابطہ کریں**

اگر اس پرائیویسی پالیسی کے بارے میں آپ کے کوئی سوالات یا تبصرے ہیں، تو براہ کرم ہم سے رابطہ کریں: contact@wakilbhai.com
`;

const termsOfServiceUR = `
**تاریخ نفاذ: 1 اگست، 2024**

براہ کرم ہمارے ذریعے چلنے والی وکیل بھائی ویب سائٹ اور خدمات ("سروس") استعمال کرنے سے پہلے ان سروس کی شرائط ("شرائط") کو غور سے پڑھیں۔ سروس تک آپ کی رسائی اور استعمال ان شرائط کی آپ کی قبولیت اور تعمیل پر منحصر ہے۔

**1. اعتراف اور معاہدہ**

سروس تک رسائی حاصل کرکے یا استعمال کرکے، آپ ان شرائط کے پابند ہونے سے اتفاق کرتے ہیں۔ اگر آپ شرائط کے کسی بھی حصے سے متفق نہیں ہیں، تو آپ سروس تک رسائی حاصل نہیں کر سکتے۔

**2. سروس کی نوعیت اور دستبرداری**

وکیل بھائی ایک قانونی دستاویزات کی خدمت فراہم کرنے والی کمپنی ہے۔ ہم کوئی قانونی فرم نہیں ہیں اور کوئی قانونی مشورہ فراہم نہیں کرتے ہیں۔ ہماری خدمات آپ کی فراہم کردہ معلومات اور ضروریات کی بنیاد پر قانونی دستاویزات کا مسودہ تیار کرنے تک محدود ہیں۔ ہماری ویب سائٹ پر دی گئی معلومات صرف عام معلوماتی مقاصد کے لیے ہے اور اسے قانونی مشورہ نہیں سمجھا جانا چاہیے۔ وکیل بھائی کے ساتھ مشغولیت وکیل-کلائنٹ کا رشتہ قائم نہیں کرتی۔ قانونی مشورے یا نمائندگی کے لیے، آپ کو ایک اہل وکیل سے مشورہ کرنا چاہیے۔

**3. ہماری خدمات**

*   ہم آپ کی فراہم کردہ معلومات کی بنیاد پر آپ کے دستاویزات تیار کریں گے۔ آپ جمع کردہ معلومات کی درستگی، مکملیت اور سچائی کے لیے مکمل طور پر ذمہ دار ہیں۔
*   ہماری خدمات کی فیس دستاویزات کے مسودے اور تیاری کے لیے ہے۔ ان میں کوئی قابل اطلاق سرکاری فیس، اسٹامپ ڈیوٹی، یا دیگر تھرڈ پارٹی چارجز شامل نہیں ہیں، جو آپ کی ذمہ داری ہے۔
*   اگرچہ ہم درستگی کے لیے کوشش کرتے ہیں، ہم آپ کے مخصوص حالات کے لیے کسی بھی دستاویز کی قانونی جواز یا موزونیت کی ضمانت نہیں دیتے۔ حتمی دستاویزات کا جائزہ لینا اور، اگر ضروری ہو، تو آزاد قانونی مشورہ لینا آپ کی ذمہ داری ہے۔

**4. ادائیگیاں**

تمام فیسیں سروس کا آرڈر دینے پر واجب الادا ہیں۔ ادائیگیاں ایک محفوظ تھرڈ پارٹی ادائیگی گیٹ وے کے ذریعے کی جاتی ہیں۔ ہم ادائیگی گیٹ وے کی خدمات سے پیدا ہونے والے کسی بھی مسئلے کے لیے ذمہ دار نہیں ہیں۔ ایک بار جب آپ کے دستاویز پر کام شروع ہو جائے تو تمام فیسیں ناقابل واپسی ہوتی ہیں۔

**5. صارف کی ذمہ داریاں**

آپ کسی بھی غیر قانونی مقصد کے لیے سروس کا استعمال نہ کرنے یا کوئی جھوٹی، گمراہ کن یا دھوکہ دہی پر مبنی معلومات جمع نہ کرنے پر اتفاق کرتے ہیں۔ آپ اپنی فراہم کردہ کسی بھی معلومات کی رازداری کو برقرار رکھنے کے ذمہ دار ہیں۔

**6. ذمہ داری کی حد**

قانون کی طرف سے اجازت دی گئی مکمل حد تک، کسی بھی صورت میں وکیل بھائی، اس کے ملحقہ ادارے، افسران، یا ملازمین کسی بھی بالواسطہ، حادثاتی، خصوصی، نتیجہ خیز، یا تعزیری نقصانات کے لیے ذمہ دار نہیں ہوں گے، بشمول بغیر کسی حد کے، منافع، ڈیٹا، استعمال، خیر سگالی، یا دیگر غیر محسوس نقصانات کا نقصان، جو (i) سروس تک آپ کی رسائی یا استعمال یا استعمال کرنے میں ناکامی؛ (ii) تیار کردہ دستاویزات میں کوئی غلطی یا کوتاہی؛ (iii) ہمارے سرورز اور/یا اس میں ذخیرہ کردہ کسی بھی اور تمام ذاتی معلومات تک کسی بھی غیر مجاز رسائی یا استعمال کے نتیجے میں ہوتا ہے۔ ہماری ذمہ داری سختی سے آپ کی طرف سے سروس کے لیے ادا کی گئی رقم تک محدود ہے۔

**7. دانشورانہ املاک**

سروس اور اس کا اصل مواد، خصوصیات، اور فعالیت وکیل بھائی کی خصوصی ملکیت ہیں اور رہیں گی۔ سروس کاپی رائٹ، ٹریڈ مارک، اور ہندوستان کے دیگر قوانین کے ذریعے محفوظ ہے۔

**8. گورننگ قانون اور دائرہ اختیار**

یہ شرائط ہندوستان کے قوانین کے مطابق چلائی جائیں گی اور ان کی تشریح کی جائے گی، اس کے قانون کے تصادم کی دفعات سے قطع نظر۔ ان شرائط سے یا ان کے سلسلے میں پیدا ہونے والے کسی بھی تنازع پر نئی دہلی، ہندوستان کی عدالتوں کا خصوصی دائرہ اختیار ہوگا۔

**9. ان شرائط میں تبدیلیاں**

ہم اپنی واحد صوابدید پر، ان شرائط کو کسی بھی وقت تبدیل کرنے یا بدلنے کا حق محفوظ رکھتے ہیں۔ ہم اس صفحہ پر نئی شرائط پوسٹ کر کے کسی بھی تبدیلی کا نوٹس فراہم کریں گے۔

**10. ہم سے رابطہ کریں**

اگر ان شرائط کے بارے میں آپ کے کوئی سوالات ہیں، تو براہ کرم ہم سے رابطہ کریں: contact@wakilbhai.com
`;

const privacyPolicyBN = `
**কার্যকরী তারিখ: ১ আগস্ট, ২০২৪**

ওয়াকিলভাই ("আমরা", "আমাদের")-এ আপনাকে স্বাগতম। আমরা আপনার গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আপনি যখন আমাদের ওয়েবসাইট পরিদর্শন করেন এবং আমাদের পরিষেবাগুলি ব্যবহার করেন তখন আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার, প্রকাশ এবং সুরক্ষিত করি। দয়া করে এই গোপনীয়তা নীতিটি মনোযোগ সহকারে পড়ুন।

**১. আমরা যে তথ্য সংগ্রহ করি**

আমরা বিভিন্ন উপায়ে আপনার সম্পর্কে তথ্য সংগ্রহ করতে পারি। সাইটে আমরা যে তথ্য সংগ্রহ করতে পারি তার মধ্যে রয়েছে:

*   **ব্যক্তিগত ডেটা:** ব্যক্তিগতভাবে শনাক্তযোগ্য তথ্য, যেমন আপনার নাম, শিপিং ঠিকানা, ইমেল ঠিকানা এবং টেলিফোন নম্বর, যা আপনি একটি পরিষেবার অনুরোধ করার সময় বা আমাদের সাথে যোগাযোগ করার সময় স্বেচ্ছায় আমাদের দেন।
*   **নথির তথ্য:** আপনার আইনি নথিগুলির খসড়া তৈরির উদ্দেশ্যে আপনার দ্বারা প্রদত্ত নির্দিষ্ট বিবরণ, তথ্য এবং ডেটা। এটি অত্যন্ত সংবেদনশীল তথ্য, এবং আমরা এটিকে অত্যন্ত গোপনীয়তার সাথে বিবেচনা করি।
*   **ডেরিভেটিভ ডেটা:** আমাদের সার্ভারগুলি স্বয়ংক্রিয়ভাবে সংগ্রহ করে এমন তথ্য যখন আপনি সাইটটি অ্যাক্সেস করেন, যেমন আপনার আইপি ঠিকানা, ব্রাউজারের ধরন, অপারেটিং সিস্টেম, অ্যাক্সেসের সময় এবং সাইট অ্যাক্সেস করার ঠিক আগে এবং পরে আপনি যে পৃষ্ঠাগুলি দেখেছেন।
*   **আর্থিক ডেটা:** আমরা কোনও আর্থিক তথ্য সংগ্রহ বা সংরক্ষণ করি না। সমস্ত অর্থপ্রদান একটি সুরক্ষিত তৃতীয় পক্ষের পেমেন্ট গেটওয়ের মাধ্যমে প্রক্রিয়া করা হয়।

**২. আমরা আপনার তথ্য কীভাবে ব্যবহার করি**

আপনার সম্পর্কে সঠিক তথ্য থাকা আমাদের আপনাকে একটি মসৃণ, দক্ষ এবং কাস্টমাইজড অভিজ্ঞতা প্রদান করতে দেয়। বিশেষত, আমরা আপনার সম্পর্কে সংগৃহীত তথ্য ব্যবহার করতে পারি:

*   আপনার পরিষেবা অনুরোধ তৈরি এবং পরিচালনা করতে।
*   আপনি অনুরোধ করেছেন এমন আইনি নথিগুলির খসড়া তৈরি এবং বিতরণ করতে।
*   নিশ্চিতকরণ এবং ফলো-আপ সহ আপনার অনুরোধ সম্পর্কিত আপনার সাথে যোগাযোগ করতে।
*   আপনার মন্তব্য এবং প্রশ্নের উত্তর দিতে এবং গ্রাহক সহায়তা প্রদান করতে।
*   আমাদের ওয়েবসাইট এবং পরিষেবা অফার উন্নত করতে।
*   আইনি এবং নিয়ন্ত্রক প্রয়োজনীয়তা মেনে চলতে।

**৩. আপনার তথ্য প্রকাশ**

আমরা বিপণনের উদ্দেশ্যে আপনার ব্যক্তিগত তথ্য বিক্রি, বাণিজ্য, ভাড়া বা অন্যথায় শেয়ার করি না। আমরা নির্দিষ্ট পরিস্থিতিতে আপনার সম্পর্কে সংগৃহীত তথ্য শেয়ার করতে পারি:

*   **আইন দ্বারা বা অধিকার রক্ষার জন্য:** যদি আমরা বিশ্বাস করি যে আপনার সম্পর্কে তথ্য প্রকাশ করা আইনি প্রক্রিয়ার প্রতিক্রিয়া জানাতে, আমাদের নীতির সম্ভাব্য লঙ্ঘন তদন্ত বা প্রতিকার করতে, বা অন্যদের অধিকার, সম্পত্তি এবং নিরাপত্তা রক্ষা করার জন্য প্রয়োজনীয়, আমরা আপনার তথ্য যে কোনও প্রযোজ্য আইন, নিয়ম বা প্রবিধান দ্বারা অনুমোদিত বা প্রয়োজনীয় হিসাবে শেয়ার করতে পারি।
*   **তৃতীয় পক্ষের পরিষেবা প্রদানকারী:** আমরা আপনার তথ্য তৃতীয় পক্ষের সাথে শেয়ার করতে পারি যারা আমাদের জন্য বা আমাদের পক্ষে পরিষেবা সম্পাদন করে, যার মধ্যে রয়েছে অর্থপ্রদান প্রক্রিয়াকরণ, ডেটা বিশ্লেষণ, ইমেল বিতরণ এবং গ্রাহক পরিষেবা।
*   **আপনার সম্মতিতে:** আমরা আপনার স্পষ্ট সম্মতি পাওয়ার পরেই আপনার তথ্য আইনজীবী বা অন্যান্য পেশাদারদের সাথে প্রত্যয়ন বা নির্দিষ্ট আইনি পরামর্শের জন্য শেয়ার করতে পারি।

**৪. আপনার তথ্যের নিরাপত্তা**

আমরা আপনার ব্যক্তিগত তথ্য রক্ষা করতে সাহায্য করার জন্য প্রশাসনিক, প্রযুক্তিগত এবং শারীরিক নিরাপত্তা ব্যবস্থা ব্যবহার করি। যদিও আমরা আমাদের কাছে আপনার দেওয়া ব্যক্তিগত তথ্য সুরক্ষিত করার জন্য যুক্তিসঙ্গত পদক্ষেপ নিয়েছি, দয়া করে সচেতন থাকুন যে আমাদের প্রচেষ্টা সত্ত্বেও, কোনও নিরাপত্তা ব্যবস্থাই নিখুঁত বা দুর্ভেদ্য নয়, এবং ডেটা সংক্রমণের কোনও পদ্ধতিই কোনও বাধা বা অন্য ধরনের অপব্যবহারের বিরুদ্ধে নিশ্চিত করা যায় না।

**৫. ডেটা ধরে রাখা**

আমরা আপনার ব্যক্তিগত তথ্য এবং নথির বিবরণ শুধুমাত্র ততক্ষণ পর্যন্ত ধরে রাখব যতক্ষণ এই গোপনীয়তা নীতিতে নির্ধারিত উদ্দেশ্যগুলির জন্য প্রয়োজন, যার মধ্যে কোনও আইনি, অ্যাকাউন্টিং বা রিপোর্টিং প্রয়োজনীয়তা পূরণের উদ্দেশ্যগুলিও রয়েছে।

**৬. আপনার অধিকার**

আপনার কাছে আমাদের কাছে থাকা আপনার ব্যক্তিগত ডেটাতে অ্যাক্সেসের অনুরোধ করার, কোনও ভুলত্রুটি সংশোধন করার এবং আমাদের পরিষেবা সম্পূর্ণ হওয়ার পরে আপনার ডেটা মুছে ফেলার অনুরোধ করার অধিকার রয়েছে, যা আমাদের আইনি বাধ্যবাধকতার সাপেক্ষে।

**৭. এই গোপনীয়তা নীতিতে পরিবর্তন**

আমরা সময়ে সময়ে এই গোপনীয়তা নীতি আপডেট করতে পারি। আমরা এই পৃষ্ঠায় নতুন গোপনীয়তা নীতি পোস্ট করে আপনাকে কোনও পরিবর্তন সম্পর্কে অবহিত করব। আপনাকে কোনও পরিবর্তনের জন্য পর্যায়ক্রমে এই গোপনীয়তা নীতি পর্যালোচনা করার পরামর্শ দেওয়া হচ্ছে।

**৮. আমাদের সাথে যোগাযোগ করুন**

এই গোপনীয়তা নীতি সম্পর্কে আপনার যদি কোনও প্রশ্ন বা মন্তব্য থাকে, তাহলে দয়া করে আমাদের সাথে যোগাযোগ করুন: contact@wakilbhai.com
`;

const termsOfServiceBN = `
**কার্যকরী তারিখ: ১ আগস্ট, ২০২৪**

আমাদের দ্বারা পরিচালিত ওয়াকিলভাই ওয়েবসাইট এবং পরিষেবাগুলি ("পরিষেবা") ব্যবহার করার আগে দয়া করে এই পরিষেবার শর্তাবলী ("শর্তাবলী") মনোযোগ সহকারে পড়ুন। পরিষেবাতে আপনার অ্যাক্সেস এবং ব্যবহার এই শর্তাবলীর আপনার स्वीकृति এবং সম্মতির উপর নির্ভরশীল।

**১. স্বীকৃতি এবং চুক্তি**

পরিষেবা অ্যাক্সেস বা ব্যবহার করে, আপনি এই শর্তাবলী দ্বারা আবদ্ধ হতে সম্মত হন। আপনি যদি শর্তাবলীর কোনও অংশের সাথে দ্বিমত পোষণ করেন, তাহলে আপনি পরিষেবাটি অ্যাক্সেস করতে পারবেন না।

**২. পরিষেবার প্রকৃতি এবং দাবিত্যাগ**

ওয়াকিলভাই একটি আইনি ডকুমেন্টেশন পরিষেবা সংস্থা। আমরা কোনও আইন সংস্থা নই এবং কোনও আইনি পরামর্শ প্রদান করি না। আমাদের পরিষেবাগুলি আপনার দেওয়া তথ্য এবং প্রয়োজনীয়তার উপর ভিত্তি করে আইনি নথির খসড়া তৈরি করার মধ্যে সীমাবদ্ধ। আমাদের ওয়েবসাইটের তথ্য শুধুমাত্র সাধারণ তথ্যগত উদ্দেশ্যে এবং এটিকে আইনি পরামর্শ হিসাবে বিবেচনা করা উচিত নয়। ওয়াকিলভাইয়ের সাথে জড়িত হওয়া আইনজীবী-ক্লায়েন্ট সম্পর্ক তৈরি করে না। আইনি পরামর্শ বা প্রতিনিধিত্বের জন্য, আপনার একজন যোগ্য অ্যাডভোকেটের সাথে পরামর্শ করা উচিত।

**৩. আমাদের পরিষেবা**

*   আমরা আপনার দেওয়া তথ্যের উপর ভিত্তি করে আপনার নথি প্রস্তুত করব। আপনি জমা দেওয়া তথ্যের নির্ভুলতা, সম্পূর্ণতা এবং সত্যতার জন্য সম্পূর্ণরূপে দায়ী।
*   আমাদের পরিষেবার জন্য ফি নথির খসড়া এবং প্রস্তুতির জন্য। এতে কোনও প্রযোজ্য সরকারি ফি, স্ট্যাম্প ডিউটি বা অন্যান্য তৃতীয় পক্ষের চার্জ অন্তর্ভুক্ত নয়, যা আপনার দায়িত্ব।
*   যদিও আমরা নির্ভুলতার জন্য চেষ্টা করি, আমরা আপনার নির্দিষ্ট পরিস্থিতির জন্য কোনও নথির আইনি বৈধতা বা উপযুক্ততার গ্যারান্টি দিই না। চূড়ান্ত নথিগুলি পর্যালোচনা করা এবং প্রয়োজনে স্বাধীন আইনি পরামর্শ নেওয়া আপনার দায়িত্ব।

**৪. অর্থপ্রদান**

একটি পরিষেবা অর্ডার করার সময় সমস্ত ফি প্রদেয়। অর্থপ্রদান একটি সুরক্ষিত তৃতীয় পক্ষের পেমেন্ট গেটওয়ের মাধ্যমে প্রক্রিয়া করা হয়। পেমেন্ট গেটওয়ের পরিষেবা থেকে উদ্ভূত কোনও সমস্যার জন্য আমরা দায়ী নই। আপনার নথিতে কাজ শুরু হয়ে গেলে সমস্ত ফি ফেরতযোগ্য নয়।

**৫. ব্যবহারকারীর দায়িত্ব**

আপনি কোনও বেআইনি উদ্দেশ্যে পরিষেবাটি ব্যবহার না করতে বা কোনও মিথ্যা, বিভ্রান্তিকর বা প্রতারণামূলক তথ্য জমা না দিতে সম্মত হন। আপনি আপনার দেওয়া যে কোনও তথ্যের গোপনীয়তা বজায় রাখার জন্য দায়ী।

**৬. দায়বদ্ধতার সীমাবদ্ধতা**

আইন দ্বারা অনুমোদিত পূর্ণ পরিমাণে, কোনও অবস্থাতেই ওয়াকিলভাই, এর সহযোগী, কর্মকর্তা বা কর্মচারীরা কোনও পরোক্ষ, আনুষঙ্গিক, বিশেষ, ফলস্বরূপ বা শাস্তিমূলক ক্ষতির জন্য দায়ী থাকবে না, যার মধ্যে সীমাবদ্ধতা ছাড়াই, লাভ, ডেটা, ব্যবহার, সদিচ্ছা বা অন্যান্য অস্পষ্ট ক্ষতি রয়েছে, যা (i) পরিষেবাতে আপনার অ্যাক্সেস বা ব্যবহার বা অ্যাক্সেস করতে বা ব্যবহার করতে অক্ষমতা; (ii) প্রস্তুত করা নথিগুলিতে কোনও ত্রুটি বা বাদ পড়া; (iii) আমাদের সার্ভার এবং/অথবা সেখানে সংরক্ষিত যে কোনও এবং সমস্ত ব্যক্তিগত তথ্যে কোনও অননুমোদিত অ্যাক্সেস বা ব্যবহার থেকে উদ্ভূত হয়। আমাদের দায়বদ্ধতা কঠোরভাবে আপনার দ্বারা পরিষেবার জন্য প্রদত্ত পরিমাণের মধ্যে সীমাবদ্ধ।

**৭. মেধা সম্পত্তি**

পরিষেবা এবং এর মূল বিষয়বস্তু, বৈশিষ্ট্য এবং কার্যকারিতা ওয়াকিলভাইয়ের একচেটিয়া সম্পত্তি এবং থাকবে। পরিষেবাটি কপিরাইট, ট্রেডমার্ক এবং ভারতের অন্যান্য আইন দ্বারা সুরক্ষিত।

**৮. পরিচালনা আইন এবং এখতিয়ার**

এই শর্তাবলী ভারতের আইন অনুসারে পরিচালিত এবং ব্যাখ্যা করা হবে, এর আইনের বিধানগুলির দ্বন্দ্ব নির্বিশেষে। এই শর্তাবলী থেকে বা এর সাথে সম্পর্কিত যে কোনও বিরোধ نئی দিল্লি, ভারতের আদালতের একচেটিয়া এখতিয়ারের অধীন হবে।

**৯. এই শর্তাবলীতে পরিবর্তন**

আমরা আমাদের নিজস্ব বিবেচনার ভিত্তিতে, যে কোনও সময় এই শর্তাবলী সংশোধন বা প্রতিস্থাপন করার অধিকার সংরক্ষণ করি। আমরা এই পৃষ্ঠায় নতুন শর্তাবলী পোস্ট করে কোনও পরিবর্তনের বিজ্ঞপ্তি প্রদান করব।

**১০. আমাদের সাথে যোগাযোগ করুন**

এই শর্তাবলী সম্পর্কে আপনার যদি কোনও প্রশ্ন থাকে, তাহলে দয়া করে আমাদের সাথে যোগাযোগ করুন: contact@wakilbhai.com
`;

export const TEXTS = {
  en: {
    nav: { home: 'Home', services: 'Services', pricing: 'Pricing', ask: 'Talk to Lawyer', contact: 'Contact', findLawyer: 'Find a Lawyer', resources: 'Resources', blog: 'Blog', guides: 'Help Guides', documents: 'Free Documents', whyUs: 'Why Us' },
    home: {
      heroTitle: 'Legal Work. Without Tension.',
      heroSubtitle: 'Every Document. Every Lawyer. Whenever You Need.',
      ctaDocuments: 'Need a Document',
      ctaAsk: 'Talk to a Lawyer',
      howItWorksTitle: 'How It Works',
      howItWorksStep1Title: 'Tell Us Your Need',
      howItWorksStep1Desc: 'Choose a service or tell us what document you need drafted.',
      howItWorksStep2Title: 'We Prepare It',
      howItWorksStep2Desc: 'Our experts draft your document with precision and care.',
      howItWorksStep3Title: 'Receive Your Document',
      howItWorksStep3Desc: 'Get your finalized documents digitally through our secure portal or physically at our office.',
      servicesTitle: 'Popular Services',
      testimonialsTitle: 'What Our Clients Say',
    },
    services: {
        title: 'Our Document Services',
        subtitle: 'We offer a wide range of legal documentation services to meet your needs.'
    },
    pricing: {
        title: 'Simple, Transparent Pricing',
        subtitle: 'No hidden fees. Choose a category to see our straightforward starting prices.',
        onwards: 'onwards',
        viewServices: 'View Services in this category'
    },
    ask: {
        title: 'Talk to a Lawyer',
        subtitle: 'Choose how you want to connect. Get an instant free call for quick questions or book a physical meeting for in-depth discussions.',
        instantConsultationTitle: 'Instant Free Consultation',
        instantConsultationDesc: 'Get a free 10-minute call for immediate advice on your legal questions.',
        callButtonText: 'Call Lawyer Now',
        physicalMeetingTitle: 'Book a Physical Meeting',
        physicalMeetingDesc: 'For more detailed matters, fill out the form to schedule an in-person meeting at our office.',
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        legalIssue: 'What is your legal issue about?',
        issueDescription: 'Briefly describe your issue (Optional)',
        selectDefault: 'Select an issue...',
        legalIssuesList: [
            { value: 'Property Dispute', label: 'Property Dispute' },
            { value: 'Family Matter (Divorce, Custody)', label: 'Family Matter (Divorce, Custody)' },
            { value: 'Criminal Case', label: 'Criminal Case' },
            { value: 'Consumer Complaint', label: 'Consumer Complaint' },
            { value: 'Business/Corporate Matter', label: 'Business/Corporate Matter' },
            { value: 'Other', label: 'Other' },
        ],
        send: 'Request Meeting',
        sending: 'Submitting Request...',
        success: 'Thank you! Your meeting request has been sent. We will contact you shortly to confirm.',
        error: 'Oops! Something went wrong. Please try again.',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Visit us, call us, or send a message. We are here to help you with all your documentation needs.',
      formTitle: 'Send us a Message',
      replyTime: 'We usually reply within a few business hours.',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      message: 'Your Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Thank you! Your message has been sent.',
      error: 'Oops! Something went wrong. Please try again.',
      ourInfo: 'Our Information',
      address: 'Shop No. 42, Legal Lane, New Delhi, India 110001',
      hours: 'Mon - Sat: 10:00 AM - 7:00 PM',
      phoneNo: '+91-7686022245',
      altPhoneNo: '+91-9831846183',
      emailAd: 'contact@wakilbhai.com',
      whatsapp: 'WhatsApp',
    },
    request: {
      title: 'Request a Service',
      subtitle: 'Please fill out the form below to request the selected document service. We will get back to you shortly.',
      formTitle: 'Service Request Form',
      serviceName: 'Selected Service',
      costInfo: 'This service starts from ₹{price} onwards.',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      message: 'Your Message (Optional)',
      send: 'Submit Request',
      sending: 'Submitting...',
      success: 'Thank you for your request!',
      error: 'Oops! Something went wrong. Please try again.',
      callback: 'We have received your request and will give you a callback soon to confirm the details.',
    },
    book: {
        title: 'Book a Home Visit',
        subtitle: 'Our executive can visit you to collect documents and details.',
        formTitle: 'Visit Request Form',
        name: 'Full Name',
        phone: 'Phone Number',
        address: 'Your Full Address',
        documentType: 'Type of Document Required',
        preferredTime: 'Preferred Time for Visit (e.g., Tomorrow, 2-4 PM)',
        send: 'Request Visit',
        sending: 'Submitting...',
        success: 'Thank you! Your visit request has been sent. We will call you to confirm.',
        error: 'Oops! Something went wrong. Please try again.',
    },
    whyUs: {
        title: 'Why Choose WakilBhai?',
        subtitle: 'We simplify legal documentation with a focus on convenience, transparency, and professional quality.',
        feature1Title: 'Expert-Drafted Documents',
        feature1Desc: 'Every document is prepared by experienced professionals, ensuring accuracy and legal compliance.',
        feature2Title: 'Transparent Pricing',
        feature2Desc: 'No hidden costs. We provide clear, upfront pricing for all our services so you know exactly what you\'re paying for.',
        feature3Title: 'Convenient Process',
        feature3Desc: 'From online requests to home visits for document collection, we make the entire process hassle-free for you.',
        feature4Title: 'Dedicated Support',
        feature4Desc: 'Our team is always available to answer your questions and guide you at every step of the way.',
    },
    legal: {
        disclaimerTitle: 'Disclaimer',
        disclaimerContent: termsOfServiceEN,
        privacyTitle: 'Privacy Policy',
        privacyContent: privacyPolicyEN,
        termsTitle: 'Terms of Service',
        termsContent: termsOfServiceEN,
    }
  },
  hi: {
    nav: { home: 'होम', services: 'सेवाएं', pricing: 'कीमत', ask: 'वकील से बात करें', contact: 'संपर्क करें', findLawyer: 'वकील खोजें', resources: 'संसाधन', blog: 'ब्लॉग', guides: 'सहायता गाइड', documents: 'मुफ्त दस्तावेज़', whyUs: 'हम क्यों' },
    home: {
      heroTitle: 'कानूनी काम। बिना तनाव के।',
      heroSubtitle: '(हर दस्तावेज़। हर वकील। जब भी आपको ज़रूरत हो।)',
      ctaDocuments: 'दस्तावेज़ प्राप्त करें',
      ctaAsk: 'वकील से बात करें',
      howItWorksTitle: 'यह कैसे काम करता है',
      howItWorksStep1Title: 'अपनी जरूरत बताएं',
      howItWorksStep1Desc: 'एक सेवा चुनें या हमें बताएं कि आपको कौन सा दस्तावेज़ चाहिए।',
      howItWorksStep2Title: 'हम तैयार करते हैं',
      howItWorksStep2Desc: 'हमारे विशेषज्ञ आपके दस्तावेज़ को सटीकता से तैयार करते हैं।',
      howItWorksStep3Title: 'अपना दस्तावेज़ प्राप्त करें',
      howItWorksStep3Desc: 'अपने अंतिम दस्तावेज़ हमारे सुरक्षित पोर्टल के माध्यम से डिजिटल रूप से या हमारे कार्यालय में भौतिक रूप से प्राप्त करें।',
      servicesTitle: 'लोकप्रिय सेवाएं',
      testimonialsTitle: 'हमारे ग्राहक क्या कहते हैं',
    },
    services: {
        title: 'हमारी दस्तावेज़ सेवाएं',
        subtitle: 'हम आपकी जरूरतों को पूरा करने के लिए कानूनी दस्तावेज़ीकरण सेवाओं की एक विस्तृत श्रृंखला प्रदान करते हैं।'
    },
    pricing: {
        title: 'सरल, पारदर्शी मूल्य-निर्धारण',
        subtitle: 'कोई छिपा हुआ शुल्क नहीं। हमारी सीधी शुरुआती कीमतें देखने के लिए एक श्रेणी चुनें।',
        onwards: 'से शुरू',
        viewServices: 'इस श्रेणी में सभी सेवाएं देखें'
    },
    ask: {
        title: 'वकील से बात करें',
        subtitle: 'चुनें कि आप कैसे जुड़ना चाहते हैं। त्वरित प्रश्नों के लिए तत्काल मुफ्त कॉल प्राप्त करें या गहन चर्चा के लिए एक भौतिक बैठक बुक करें।',
        instantConsultationTitle: 'तुरंत परामर्श',
        instantConsultationDesc: 'अपने कानूनी सवालों पर तत्काल सलाह के लिए 10 मिनट की मुफ्त कॉल प्राप्त करें।',
        callButtonText: 'वकील को अभी कॉल करें',
        physicalMeetingTitle: 'भौतिक बैठक बुक करें',
        physicalMeetingDesc: 'अधिक विस्तृत मामलों के लिए, हमारे कार्यालय में व्यक्तिगत बैठक निर्धारित करने के लिए फॉर्म भरें।',
        name: 'पूरा नाम',
        email: 'ईमेल पता',
        phone: 'फ़ोन नंबर',
        legalIssue: 'आपका कानूनी मुद्दा किस बारे में है?',
        issueDescription: 'संक्षेप में अपने मुद्दे का वर्णन करें (वैकल्पिक)',
        selectDefault: 'एक मुद्दा चुनें...',
        legalIssuesList: [
            { value: 'संपत्ति विवाद', label: 'संपत्ति विवाद' },
            { value: 'पारिवारिक मामला (तलाक, हिरासत)', label: 'पारिवारिक मामला (तलाक, हिरासत)' },
            { value: 'आपराधिक मामला', label: 'आपराधिक मामला' },
            { value: 'उपभोक्ता शिकायत', label: 'उपभोक्ता शिकायत' },
            { value: 'व्यापार/कॉर्पोरेट मामला', label: 'व्यापार/कॉर्पोरेट मामला' },
            { value: 'अन्य', label: 'अन्य' },
        ],
        send: 'मीटिंग का अनुरोध करें',
        sending: 'अनुरोध भेजा जा रहा है...',
        success: 'धन्यवाद! आपका मीटिंग अनुरोध भेज दिया गया है। हम पुष्टि करने के लिए शीघ्र ही आपसे संपर्क करेंगे।',
        error: 'उफ़! कुछ गलत हो गया।',
    },
     contact: {
      title: 'संपर्क में रहें',
      subtitle: 'हमसे मिलें, हमें कॉल करें, या एक संदेश भेजें।',
      formTitle: 'हमें एक संदेश भेजें',
      replyTime: 'हम आमतौर पर कुछ घंटों में जवाब देते हैं।',
      name: 'पूरा नाम',
      email: 'ईमेल पता',
      phone: 'फ़ोन नंबर',
      message: 'आपका संदेश',
      send: 'संदेश भेजें',
      sending: 'भेज रहा है...',
      success: 'धन्यवाद! आपका संदेश भेज दिया गया है।',
      error: 'उफ़! कुछ गलत हो गया। कृपया पुन: प्रयास करें।',
      ourInfo: 'हमारी जानकारी',
      address: 'दुकान नंबर 42, लीगल लेन, नई दिल्ली, भारत 110001',
      hours: 'सोम - शनि: सुबह 10:00 - शाम 7:00',
      phoneNo: '+91-7686022245',
      altPhoneNo: '+91-9831846183',
      emailAd: 'contact@wakilbhai.com',
      whatsapp: 'व्हाट्सएप',
    },
    request: {
      title: 'एक सेवा का अनुरोध करें',
      subtitle: 'चयनित दस्तावेज़ सेवा का अनुरोध करने के लिए कृपया नीचे दिया गया फ़ॉर्म भरें। हम शीघ्र ही आपसे संपर्क करेंगे।',
      formTitle: 'सेवा अनुरोध प्रपत्र',
      serviceName: 'चयनित सेवा',
      costInfo: 'यह सेवा ₹{price} से शुरू होती है।',
      name: 'पूरा नाम',
      email: 'ईमेल पता',
      phone: 'फ़ोन नंबर',
      message: 'आपका संदेश (वैकल्पिक)',
      send: 'अनुरोध जमा करें',
      sending: 'जमा हो रहा है...',
      success: 'आपके अनुरोध के लिए धन्यवाद!',
      error: 'उफ़! कुछ गलत हो गया। कृपया पुन: प्रयास करें।',
      callback: 'हमें आपका अनुरोध मिल गया है और विवरण की पुष्टि के लिए हम आपको जल्द ही कॉलबैक करेंगे।',
    },
    book: {
        title: 'घर पर विज़िट बुक करें',
        subtitle: 'हमारे कार्यकारी दस्तावेज़ और विवरण एकत्र करने के लिए आपसे मिल सकते हैं।',
        formTitle: 'विज़िट अनुरोध फ़ॉर्म',
        name: 'पूरा नाम',
        phone: 'फ़ोन नंबर',
        address: 'आपका पूरा पता',
        documentType: 'आवश्यक दस्तावेज़ का प्रकार',
        preferredTime: 'विज़िट के लिए पसंदीदा समय (जैसे, कल, 2-4 बजे)',
        send: 'विज़िट का अनुरोध करें',
        sending: 'सबमिट हो रहा है...',
        success: 'धन्यवाद! आपका विज़िट अनुरोध भेज दिया गया है। हम पुष्टि करने के लिए आपको कॉल करेंगे।',
        error: 'उफ़! कुछ गलत हो गया। कृपया पुन: प्रयास करें।',
    },
    whyUs: {
        title: 'वकीलभाई क्यों चुनें?',
        subtitle: 'हम सुविधा, पारदर्शिता और पेशेवर गुणवत्ता पर ध्यान केंद्रित करते हुए कानूनी दस्तावेज़ीकरण को सरल बनाते हैं।',
        feature1Title: 'विशेषज्ञ-तैयार दस्तावेज़',
        feature1Desc: 'प्रत्येक दस्तावेज़ अनुभवी पेशेवरों द्वारा तैयार किया जाता है, जो सटीकता और कानूनी अनुपालन सुनिश्चित करता है।',
        feature2Title: 'पारदर्शी मूल्य-निर्धारण',
        feature2Desc: 'कोई छिपा हुआ शुल्क नहीं। हम अपनी सभी सेवाओं के लिए स्पष्ट, अग्रिम मूल्य निर्धारण प्रदान करते हैं।',
        feature3Title: 'सुविधाजनक प्रक्रिया',
        feature3Desc: 'ऑनलाइन अनुरोधों से लेकर दस्तावेज़ संग्रह के लिए घर जाने तक, हम पूरी प्रक्रिया को आपके लिए परेशानी मुक्त बनाते हैं।',
        feature4Title: 'समर्पित समर्थन',
        feature4Desc: 'हमारी टीम आपके सवालों का जवाब देने और हर कदम पर आपका मार्गदर्शन करने के लिए हमेशा उपलब्ध है।',
    },
    legal: {
        disclaimerTitle: 'अस्वीकरण',
        disclaimerContent: termsOfServiceHI,
        privacyTitle: 'गोपनीयता नीति',
        privacyContent: privacyPolicyHI,
        termsTitle: 'सेवा की शर्तें',
        termsContent: termsOfServiceHI,
    }
  },
  ur: {
    nav: { home: 'گھر', services: 'خدمات', pricing: 'قیمتیں', ask: 'وکیل سے بات کریں', contact: 'رابطہ کریں', findLawyer: 'وکیل تلاش کریں', resources: 'وسائل', blog: 'بلاگ', guides: 'مدد گائیڈز', documents: 'مفت دستاویزات', whyUs: 'ہم کیوں' },
    home: {
      heroTitle: 'قانونی کام۔ بغیر کسی پریشانی کے۔',
      heroSubtitle: '(ہر دستاویز۔ ہر وکیل۔ جب بھی آپ کو ضرورت ہو۔)',
      ctaDocuments: 'دستاویز حاصل کریں',
      ctaAsk: 'وکیل سے بات کریں',
      howItWorksTitle: 'یہ کیسے کام کرتا ہے',
      howItWorksStep1Title: 'اپنی ضرورت بتائیں',
      howItWorksStep1Desc: 'ایک خدمت منتخب کریں یا ہمیں بتائیں کہ آپ کو کونسی دستاویز چاہیے۔',
      howItWorksStep2Title: 'ہم تیار کرتے ہیں',
      howItWorksStep2Desc: 'ہمارے ماہرین آپ کی دستاویز کو درستگی سے تیار کرتے ہیں۔',
      howItWorksStep3Title: 'اپنی دستاویز وصول کریں',
      howItWorksStep3Desc: 'اپنی حتمی دستاویزات ہمارے محفوظ پورٹل کے ذریعے ڈیجیٹل طور پر یا ہمارے دفتر میں جسمانی طور پر حاصل کریں۔',
      servicesTitle: 'مشہور خدمات',
      testimonialsTitle: 'ہمارے کلائنٹس کیا کہتے ہیں',
    },
    services: {
        title: 'ہماری دستاویزی خدمات',
        subtitle: 'ہم آپ کی ضروریات کو پورا کرنے کے لئے قانونی دستاویزات کی وسیع خدمات پیش کرتے ہیں۔'
    },
    pricing: {
        title: 'سادہ، شفاف قیمتوں کا تعین',
        subtitle: 'کوئی پوشیدہ فیس نہیں۔ ہماری سیدھی سادی ابتدائی قیمتیں دیکھنے کے لیے ایک زمرہ منتخب کریں۔',
        onwards: 'سے شروع',
        viewServices: 'اس زمرے میں تمام خدمات دیکھیں'
    },
    ask: {
        title: 'ایک وکیل سے بات کریں',
        subtitle: 'منتخب کریں کہ آپ کیسے جڑنا چاہتے ہیں۔ فوری سوالات کے لیے فوری مفت کال حاصل کریں یا گہری بات چیت کے لیے جسمانی ملاقات بک کریں۔',
        instantConsultationTitle: 'فوری مشاورت',
        instantConsultationDesc: 'اپنے قانونی سوالات پر فوری مشورے کے لیے 10 منٹ کی مفت کال حاصل کریں۔',
        callButtonText: 'ابھی وکیل کو کال کریں',
        physicalMeetingTitle: 'جسمانی ملاقات بک کریں۔',
        physicalMeetingDesc: 'مزید تفصیلی معاملات کے لیے، ہمارے دفتر میں ذاتی ملاقات کا وقت طے کرنے کے لیے فارم پُر کریں۔',
        name: 'پورا نام',
        email: 'ای میل ایڈریس',
        phone: 'فون نمبر',
        legalIssue: 'آپ کا قانونی مسئلہ کس بارے میں ہے؟',
        issueDescription: 'مختصراً اپنے مسئلے کی وضاحت کریں (اختیاری)',
        selectDefault: 'ایک مسئلہ منتخب کریں...',
        legalIssuesList: [
            { value: 'جائیداد کا تنازعہ', label: 'جائیداد کا تنازعہ' },
            { value: 'خاندانی معاملہ (طلاق، تحویل)', label: 'خاندانی معاملہ (طلاق، تحویل)' },
            { value: 'فوجداری مقدمہ', label: 'فوجداری مقدمہ' },
            { value: 'صارفین کی شکایت', label: 'صارفین کی شکایت' },
            { value: 'کاروباری/کارپوریٹ معاملہ', label: 'کاروباری/کارپوریٹ معاملہ' },
            { value: 'دیگر', label: 'دیگر' },
        ],
        send: 'ملاقات کی درخواست کریں۔',
        sending: 'درخواست جمع کرائی جا رہی ہے...',
        success: 'شکریہ! آپ کی ملاقات کی درخواست بھیج دی گئی ہے۔ ہم تصدیق کے لیے جلد ہی آپ سے رابطہ کریں گے۔',
        error: 'افوہ! کچھ غلط ہو گیا۔',
    },
     contact: {
      title: 'رابطے میں رہیں',
      subtitle: 'ہم سے ملیں، ہمیں کال کریں، یا ایک پیغام بھیجیں۔',
      formTitle: 'ہمیں ایک پیغام بھیجیں',
      replyTime: 'ہم عام طور پر چند گھنٹوں میں جواب دیتے ہیں۔',
      name: 'پورا نام',
      email: 'ای میل اڈریس',
      phone: 'فون نمبر',
      message: 'آپ کا پیغام',
      send: 'پیغام بھیجیں',
      sending: 'بھیج رہا ہے...',
      success: 'شکریہ! آپ کا پیغام بھیج دیا گیا ہے۔',
      error: 'افوہ! کچھ غلط ہو گیا. دوبارہ کوشش کریں.',
      ourInfo: 'ہماری معلومات',
      address: 'دکان نمبر 42، لیگل لین، نئی دہلی، انڈیا 110001',
      hours: 'پیر - ہفتہ: صبح 10:00 بجے سے شام 7:00 بجے تک',
      phoneNo: '+91-7686022245',
      altPhoneNo: '+91-9831846183',
      emailAd: 'contact@wakilbhai.com',
      whatsapp: 'واٹس ایپ',
    },
    request: {
      title: 'ایک سروس کی درخواست کریں',
      subtitle: 'منتخب کردہ دستاویز کی خدمت کی درخواست کرنے کے لیے براہ کرم نیچے دیا گیا فارم پُر کریں۔ ہم جلد ہی آپ سے رابطہ کریں گے۔',
      formTitle: 'سروس کی درخواست کا فارم',
      serviceName: 'منتخب کردہ سروس',
      costInfo: 'یہ سروس ₹{price} سے شروع ہوتی ہے۔',
      name: 'پورا نام',
      email: 'ای میل ایڈریس',
      phone: 'فون نمبر',
      message: 'آپ کا پیغام (اختیاری)',
      send: 'درخواست جمع کروائیں',
      sending: 'جمع کر رہا ہے...',
      success: 'آپ کی درخواست کے لئے شکریہ!',
      error: 'افوہ! کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں.',
      callback: 'ہمیں آپ کی درخواست موصول ہو گئی ہے اور تفصیلات کی تصدیق کے لیے جلد ہی آپ کو کال بیک کریں گے۔',
    },
    book: {
        title: 'گھر پر وزٹ بک کریں',
        subtitle: 'ہمارا ایگزیکٹو دستاویزات اور تفصیلات جمع کرنے کے لیے آپ سے مل سکتا ہے۔',
        formTitle: 'وزٹ درخواست فارم',
        name: 'پورا نام',
        phone: 'فون نمبر',
        address: 'آپ کا مکمل پتہ',
        documentType: 'مطلوبہ دستاویز کی قسم',
        preferredTime: 'وزٹ کے لیے ترجیحی وقت (مثلاً، کل، 2-4 بجے)',
        send: 'وزٹ کی درخواست کریں',
        sending: 'جمع کرایا جا رہا ہے...',
        success: 'شکریہ! آپ کی وزٹ کی درخواست بھیج دی گئی ہے۔ ہم تصدیق کے لیے آپ کو کال کریں گے۔',
        error: 'افسوس! کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں.',
    },
    whyUs: {
        title: 'وکیل بھائی کیوں منتخب کریں؟',
        subtitle: 'ہم سہولت، شفافیت اور پیشہ ورانہ معیار پر توجہ کے ساتھ قانونی دستاویزات کو آسان بناتے ہیں۔',
        feature1Title: 'ماہرین کے تیار کردہ دستاویزات',
        feature1Desc: 'ہر دستاویز تجربہ کار پیشہ ور افراد کے ذریعہ تیار کی جاتی ہے، درستگی اور قانونی تعمیل کو یقینی بناتی ہے۔',
        feature2Title: 'شفاف قیمتوں کا تعین',
        feature2Desc: 'کوئی پوشیدہ اخراجات نہیں۔ ہم اپنی تمام خدمات کے لیے واضح، پیشگی قیمت فراہم کرتے ہیں۔',
        feature3Title: 'آسان عمل',
        feature3Desc: 'آن لائن درخواستوں سے لے کر دستاویزات جمع کرنے کے لیے گھر کے دورے تک، ہم پورے عمل کو آپ کے لیے پریشانی سے پاک بناتے ہیں۔',
        feature4Title: 'وقف حمایت',
        feature4Desc: 'ہماری ٹیم آپ کے سوالات کا جواب دینے اور ہر قدم پر آپ کی رہنمائی کے لیے ہمیشہ دستیاب ہے۔',
    },
    legal: {
        disclaimerTitle: 'دستبرداری',
        disclaimerContent: termsOfServiceUR,
        privacyTitle: 'رازداری کی پالیسی',
        privacyContent: privacyPolicyUR,
        termsTitle: 'سروس کی شرائط',
        termsContent: termsOfServiceUR,
    }
  },
  bn: {
    nav: { home: 'হোম', services: 'পরিষেবা', pricing: 'মূল্য নির্ধারণ', ask: 'আইনজীবীর সাথে কথা বলুন', contact: 'যোগাযোগ', findLawyer: 'আইনজীবী খুঁজুন', resources: 'সম্পদ', blog: 'ব্লগ', guides: 'সহায়িকা', documents: 'বিনামূল্যে নথি', whyUs: 'কেন আমরা' },
    home: {
      heroTitle: 'আইনি কাজ। টেনশন ছাড়াই।',
      heroSubtitle: '(প্রতিটি নথি। প্রতিটি আইনজীবী। যখনই আপনার প্রয়োজন।)',
      ctaDocuments: 'একটি নথি পান',
      ctaAsk: 'আইনজীবীর সাথে কথা বলুন',
      howItWorksTitle: 'কিভাবে এটা কাজ করে',
      howItWorksStep1Title: 'আপনার প্রয়োজন বলুন',
      howItWorksStep1Desc: 'একটি পরিষেবা চয়ন করুন বা আমাদের বলুন আপনার কোন নথি প্রয়োজন।',
      howItWorksStep2Title: 'আমরা এটি প্রস্তুত করি',
      howItWorksStep2Desc: 'আমাদের বিশেষজ্ঞরা আপনার নথি নির্ভুলভাবে খসড়া করেন।',
      howItWorksStep3Title: 'আপনার নথি গ্রহণ করুন',
      howItWorksStep3Desc: 'আপনার চূড়ান্ত নথিগুলি আমাদের সুরক্ষিত পোর্টালের মাধ্যমে ডিজিটালভাবে বা আমাদের অফিসে físicamenteভাবে পান।',
      servicesTitle: 'জনপ্রিয় পরিষেবা',
      testimonialsTitle: 'আমাদের ক্লায়েন্টরা যা বলেন',
    },
    services: {
        title: 'আমাদের নথি পরিষেবা',
        subtitle: 'আপনার চাহিদা মেটাতে আমরা বিস্তৃত আইনি ডকুমেন্টেশন পরিষেবা সরবরাহ করি।'
    },
    pricing: {
        title: 'সরল, স্বচ্ছ মূল্য নির্ধারণ',
        subtitle: 'কোনো লুকানো ফি নেই। আমাদের সরাসরি শুরুর মূল্য দেখতে একটি বিভাগ নির্বাচন করুন।',
        onwards: 'থেকে শুরু',
        viewServices: 'এই বিভাগের সমস্ত পরিষেবা দেখুন'
    },
    ask: {
        title: 'আইনজীবীর সাথে কথা বলুন',
        subtitle: 'আপনি কীভাবে সংযোগ করতে চান তা চয়ন করুন। দ্রুত প্রশ্নের জন্য একটি তাত্ক্ষণিক বিনামূল্যে কল পান বা গভীর আলোচনার জন্য একটি শারীরিক মিটিং বুক করুন।',
        instantConsultationTitle: 'তাত্ক্ষণিক পরামর্শ',
        instantConsultationDesc: 'আপনার আইনি প্রশ্নের فوری পরামর্শের জন্য একটি বিনামূল্যে 10 মিনিটের কল পান।',
        callButtonText: 'এখনই আইনজীবীকে কল করুন',
        physicalMeetingTitle: 'একটি শারীরিক মিটিং বুক করুন',
        physicalMeetingDesc: 'আরও বিস্তারিত বিষয়ের জন্য, আমাদের অফিসে একটি ব্যক্তিগত মিটিংয়ের সময় নির্ধারণ করতে ফর্মটি পূরণ করুন।',
        name: 'পুরো নাম',
        email: 'ইমেল ঠিকানা',
        phone: 'ফোন নম্বর',
        legalIssue: 'আপনার আইনি সমস্যাটি কী বিষয়ে?',
        issueDescription: 'সংক্ষেপে আপনার সমস্যা বর্ণনা করুন (ঐচ্ছিক)',
        selectDefault: 'একটি সমস্যা নির্বাচন করুন...',
        legalIssuesList: [
            { value: 'সম্পত্তি বিরোধ', label: 'সম্পত্তি বিরোধ' },
            { value: 'পারিবারিক বিষয় (বিবাহবিচ্ছেদ, হেফাজত)', label: 'পারিবারিক বিষয় (বিবাহবিচ্ছেদ, হেফাজত)' },
            { value: 'ফৌজদারি মামলা', label: 'ফৌজদারি মামলা' },
            { value: 'ভোক্তা অভিযোগ', label: 'ভোক্তা অভিযোগ' },
            { value: 'ব্যবসা/কর্পোরেট বিষয়', label: 'ব্যবসা/কর্পোরেট বিষয়' },
            { value: 'অন্যান্য', label: 'অন্যান্য' },
        ],
        send: 'মিটিংয়ের জন্য অনুরোধ করুন',
        sending: 'অনুরোধ জমা দেওয়া হচ্ছে...',
        success: 'ধন্যবাদ! আপনার মিটিং অনুরোধ পাঠানো হয়েছে। আমরা নিশ্চিত করার জন্য শীঘ্রই আপনার সাথে যোগাযোগ করব।',
        error: 'ওহো! কিছু ভুল হয়েছে.',
    },
    contact: {
      title: 'যোগাযোগ করুন',
      subtitle: 'আমাদের সাথে দেখা করুন, আমাদের কল করুন, বা একটি বার্তা পাঠান।',
      formTitle: 'আমাদের একটি বার্তা পাঠান',
      replyTime: 'আমরা সাধারণত কয়েক ঘন্টার মধ্যে উত্তর দিই।',
      name: 'পুরো নাম',
      email: 'ইমেল ঠিকানা',
      phone: 'ফোন নম্বর',
      message: 'আপনার বার্তা',
      send: 'বার্তা পাঠান',
      sending: 'পাঠানো হচ্ছে...',
      success: 'ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে.',
      error: 'ওহো! কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      ourInfo: 'আমাদের তথ্য',
      address: 'দোকান নং ৪২, লিগ্যাল লেন, নতুন দিল্লি, ভারত ১১০০০১',
      hours: 'সোম - শনি: সকাল ১০:০০ - সন্ধ্যা ৭:০০',
      phoneNo: '+91-7686022245',
      altPhoneNo: '+91-9831846183',
      emailAd: 'contact@wakilbhai.com',
      whatsapp: 'হোয়াটসঅ্যাপ',
    },
    request: {
      title: 'একটি পরিষেবার অনুরোধ করুন',
      subtitle: 'নির্বাচিত নথি পরিষেবার অনুরোধ করতে দয়া করে নীচের ফর্মটি পূরণ করুন। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
      formTitle: 'পরিষেবা অনুরোধ ফর্ম',
      serviceName: 'নির্বাচিত পরিষেবা',
      costInfo: 'এই পরিষেবাটি ₹{price} থেকে শুরু।',
      name: 'পুরো নাম',
      email: 'ইমেল ঠিকানা',
      phone: 'ফোন নম্বর',
      message: 'আপনার বার্তা (ঐচ্ছিক)',
      send: 'অনুরোধ জমা দিন',
      sending: 'জমা দেওয়া হচ্ছে...',
      success: 'আপনার অনুরোধের জন্য ধন্যবাদ!',
      error: 'ওহো! কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      callback: 'আমরা আপনার অনুরোধ পেয়েছি এবং বিস্তারিত নিশ্চিত করতে শীঘ্রই আপনাকে একটি কলব্যাক দেব।',
    },
    book: {
        title: 'হোম ভিজিট বুক করুন',
        subtitle: 'আমাদের এক্সিকিউটিভ নথি এবং বিবরণ সংগ্রহ করতে আপনার সাথে দেখা করতে পারেন।',
        formTitle: 'ভিজিট অনুরোধ ফর্ম',
        name: 'পুরো নাম',
        phone: 'ফোন নম্বর',
        address: 'আপনার পুরো ঠিকানা',
        documentType: 'প্রয়োজনীয় নথির ধরন',
        preferredTime: 'ভিজিটের জন্য পছন্দের সময় (যেমন, আগামীকাল, ২-৪টা)',
        send: 'ভিজিটের অনুরোধ করুন',
        sending: 'জমা দেওয়া হচ্ছে...',
        success: 'ধন্যবাদ! আপনার ভিজিট অনুরোধ পাঠানো হয়েছে। আমরা নিশ্চিত করার জন্য আপনাকে কল করব।',
        error: 'ওহো! কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
    },
    whyUs: {
        title: 'কেন ওয়াকিলভাই বেছে নেবেন?',
        subtitle: 'আমরা সুবিধা, স্বচ্ছতা এবং পেশাদার মানের উপর ফোকাস করে আইনি ডকুমেন্টেশনকে সহজ করি।',
        feature1Title: 'বিশেষজ্ঞ-খসড়া নথি',
        feature1Desc: 'প্রতিটি নথি অভিজ্ঞ পেশাদারদের দ্বারা প্রস্তুত করা হয়, নির্ভুলতা এবং আইনি সম্মতি নিশ্চিত করে।',
        feature2Title: 'স্বচ্ছ মূল্য নির্ধারণ',
        feature2Desc: 'কোন লুকানো খরচ নেই। আমরা আমাদের সমস্ত পরিষেবার জন্য স্পষ্ট, অগ্রিম মূল্য প্রদান করি।',
        feature3Title: 'সুবিধাজনক প্রক্রিয়া',
        feature3Desc: 'অনলাইন অনুরোধ থেকে শুরু করে নথি সংগ্রহের জন্য হোম ভিজিট পর্যন্ত, আমরা পুরো প্রক্রিয়াটিকে আপনার জন্য ঝামেলামুক্ত করি।',
        feature4Title: 'ডেডিকেটেড সাপোর্ট',
        feature4Desc: 'আমাদের দল আপনার প্রশ্নের উত্তর দিতে এবং প্রতিটি পদক্ষেপে আপনাকে গাইড করতে সর্বদা উপলব্ধ।',
    },
    legal: {
        disclaimerTitle: 'দাবিত্যাগ',
        disclaimerContent: termsOfServiceBN,
        privacyTitle: 'গোপনীয়তা নীতি',
        privacyContent: privacyPolicyBN,
        termsTitle: 'পরিষেবার শর্তাবলী',
        termsContent: termsOfServiceBN,
    }
  },
};

export const SERVICES: Service[] = [
  // Rent & Property
  { id: 'rp1', category: 'Rent & Property', title: { en: 'Rental Agreement (Residential & Commercial)', hi: 'किराया समझौता (आवासीय और वाणिज्यिक)', ur: 'کرایہ کا معاہدہ (رہائشی اور تجارتی)', bn: 'ভাড়া চুক্তি (আবাসিক ও বাণিজ্যিক)' }, description: { en: 'Drafting agreements for renting residential or commercial properties.', hi: 'आवासीय या वाणिज्यिक संपत्तियों को किराए पर देने के लिए समझौतों का मसौदा तैयार करना।', ur: 'رہائشی یا تجارتی جائیدادوں کو کرائے پر دینے کے لیے معاہدوں کا مسودہ تیار کرنا۔', bn: 'আবাসিক বা বাণিজ্যিক সম্পত্তি ভাড়ার জন্য চুক্তির খসড়া তৈরি করা।' }, icon: PropertyIcon },
  { id: 'rp2', category: 'Rent & Property', title: { en: 'Lease Agreement', hi: 'पट्टा समझौता', ur: 'لیز کا معاہدہ', bn: 'লীজ চুক্তি' }, description: { en: 'Formalizing long-term property lease contracts.', hi: 'दीर्घकालिक संपत्ति पट्टा अनुबंधों को औपचारिक बनाना।', ur: 'طویل مدتی پراپرٹی لیز کے معاہدوں کو باقاعدہ بنانا۔', bn: 'দীর্ঘমেয়াদী সম্পত্তি ইজারা চুক্তি আনুষ্ঠানিক করা।' }, icon: PropertyIcon },
  { id: 'rp3', category: 'Rent & Property', title: { en: 'Sale Deed', hi: 'बिक्री विलेख', ur: 'فروخت کا معاہدہ', bn: 'বিক্রয় দলিল' }, description: { en: 'Preparing the primary legal document for property sale.', hi: 'संपत्ति की बिक्री के लिए प्राथमिक कानूनी दस्तावेज तैयार करना।', ur: 'جائیداد کی فروخت کے لیے بنیادی قانونی دستاویز تیار کرنا۔', bn: 'সম্পত্তি বিক্রয়ের জন্য প্রাথমিক আইনি নথি প্রস্তুত করা।' }, icon: PropertyIcon },
  { id: 'rp4', category: 'Rent & Property', title: { en: 'Gift Deed (Property)', hi: 'उपहार विलेख (संपत्ति)', ur: 'گفٹ ڈیڈ (جائیداد)', bn: 'উপহার দলিল (সম্পত্তি)' }, description: { en: 'Drafting deeds for voluntarily gifting a property.', hi: 'स्वेच्छा से संपत्ति उपहार में देने के लिए विलेखों का मसौदा तैयार करना।', ur: 'رضاکارانہ طور پر جائیداد تحفے میں دینے کے لیے ڈیڈ کا مسودہ تیار کرنا۔', bn: 'স্বেচ্ছায় সম্পত্তি উপহার দেওয়ার জন্য দলিলের খসড়া তৈরি করা।' }, icon: PropertyIcon },
  { id: 'rp5', category: 'Rent & Property', title: { en: 'Property Partition Agreement', hi: 'संपत्ति विभाजन समझौता', ur: 'جائیداد کی تقسیم کا معاہدہ', bn: 'সম্পত্তি বিভাজন চুক্তি' }, description: { en: 'Creating agreements for dividing property among co-owners.', hi: 'सह-मालिकों के बीच संपत्ति के बंटवारे के लिए समझौते बनाना।', ur: 'شریک مالکان کے درمیان جائیداد کی تقسیم کے لیے معاہدے بنانا۔', bn: 'সহ-মালিকদের মধ্যে সম্পত্তি ভাগের জন্য চুক্তি তৈরি করা।' }, icon: PropertyIcon },
  { id: 'rp6', category: 'Rent & Property', title: { en: 'Builder-Buyer Agreement', hi: 'बिल्डर-क्रेता समझौता', ur: 'بلڈر-خریدار معاہدہ', bn: 'বিল্ডার-ক্রেতা চুক্তি' }, description: { en: 'Securing the terms between a property developer and a buyer.', hi: 'एक संपत्ति डेवलपर और एक खरीदार के बीच शर्तों को सुरक्षित करना।', ur: 'ایک پراپرٹی ڈویلپر اور خریدار کے درمیان شرائط کو محفوظ بنانا۔', bn: 'একজন সম্পত্তি বিকাশকারী এবং একজন ক্রেতার মধ্যে শর্তাবলী সুরক্ষিত করা।' }, icon: PropertyIcon },
  { id: 'rp7', category: 'Rent & Property', title: { en: 'Will Drafting', hi: 'वसीयत का मसौदा तैयार करना', ur: 'وصیت کا مسودہ تیار کرنا', bn: 'উইল খসড়া' }, description: { en: 'Drafting a legal will for asset distribution after death.', hi: 'मृत्यु के बाद संपत्ति वितरण के लिए एक कानूनी वसीयत का मसौदा तैयार करना।', ur: 'موت کے بعد اثاثوں کی تقسیم کے لیے قانونی وصیت کا مسودہ تیار کرنا۔', bn: 'মৃত্যুর পর সম্পদ বন্টনের জন্য একটি আইনি উইল খসড়া করা।' }, icon: PropertyIcon },
  { id: 'rp8', category: 'Rent & Property', title: { en: 'Inheritance Declaration', hi: 'विरासत घोषणा', ur: 'وراثت کا اعلان', bn: 'উত্তরাধিকার ঘোষণা' }, description: { en: 'Preparing documents to declare and claim inheritance.', hi: 'विरासत की घोषणा और दावा करने के लिए दस्तावेज तैयार करना।', ur: 'وراثت کا اعلان اور دعویٰ کرنے کے لیے دستاویزات تیار کرنا۔', bn: 'উত্তরাধিকার ঘোষণা এবং দাবি করার জন্য নথি প্রস্তুত করা।' }, icon: PropertyIcon },
  { id: 'rp9', category: 'Rent & Property', title: { en: 'Landlord Notice to Tenant', hi: 'मकान मालिक द्वारा किरायेदार को नोटिस', ur: 'مکان مالک کا کرایہ دار کو نوٹس', bn: 'মালিক কর্তৃক ভাড়াটিয়াকে নোটিশ' }, description: { en: 'Drafting official notices from a landlord to a tenant.', hi: 'मकान मालिक से किरायेदार को आधिकारिक नोटिस का मसौदा तैयार करना।', ur: 'مکان مالک کی طرف سے کرایہ دار کو سرکاری نوٹس کا مسودہ تیار کرنا۔', bn: 'একজন বাড়িওয়ালার কাছ থেকে একজন ভাড়াটিয়ার কাছে অফিসিয়াল নোটিশের খসড়া তৈরি করা।' }, icon: PropertyIcon },
  { id: 'rp10', category: 'Rent & Property', title: { en: 'Leave & License Agreement', hi: 'छुट्टी और लाइसेंस समझौता', ur: 'چھٹی اور لائسنس کا معاہدہ', bn: 'লিভ ও লাইসেন্স চুক্তি' }, description: { en: 'Creating agreements for short-term occupancy of a property.', hi: 'किसी संपत्ति पर अल्पकालिक कब्जे के लिए समझौते बनाना।', ur: 'کسی پراپرٹی پر قلیل مدتی قبضے کے لیے معاہدے بنانا۔', bn: 'একটি সম্পত্তির স্বল্পমেয়াদী দখলের জন্য চুক্তি তৈরি করা।' }, icon: PropertyIcon },

  // Personal
  { id: 'p1', category: 'Personal', title: { en: 'Affidavit (General Purpose)', hi: 'शपथ पत्र (सामान्य प्रयोजन)', ur: 'حلف نامہ (عام مقصد)', bn: 'হলফনামা (সাধারণ উদ্দেশ্য)' }, description: { en: 'Creating general-purpose sworn statements for various needs.', hi: 'विभिन्न आवश्यकताओं के लिए सामान्य प्रयोजन के शपथ पत्र बनाना।', ur: 'مختلف ضروریات کے لیے عام مقصد کے حلف نامے بنانا۔', bn: 'বিভিন্ন প্রয়োজনে সাধারণ উদ্দেশ্যের হলফনামা তৈরি করা।' }, icon: UserIcon },
  { id: 'p2', category: 'Personal', title: { en: 'Name Change Affidavit', hi: 'नाम परिवर्तन शपथ पत्र', ur: 'نام کی تبدیلی کا حلف نامہ', bn: 'নাম পরিবর্তনের হলফনামা' }, description: { en: 'Official document for legally changing your name.', hi: 'कानूनी रूप से अपना नाम बदलने के लिए आधिकारिक दस्तावेज़।', ur: 'قانونی طور پر اپنا نام تبدیل کرنے کے لیے سرکاری دستاویز۔', bn: 'আইনগতভাবে আপনার নাম পরিবর্তন করার জন্য অফিসিয়াল নথি।' }, icon: UserIcon },
  { id: 'p3', category: 'Personal', title: { en: 'Marriage Affidavit', hi: 'विवाह शपथ पत्र', ur: 'شادی کا حلف نامہ', bn: 'বিবাহের হলফনামা' }, description: { en: 'Preparing affidavits to declare marital status.', hi: 'वैवाहिक स्थिति घोषित करने के लिए शपथ पत्र तैयार करना।', ur: 'ازدواجی حیثیت کا اعلان کرنے کے لیے حلف نامے تیار کرنا۔', bn: 'বৈবাহিক অবস্থা ঘোষণার জন্য হলফনামা প্রস্তুত করা।' }, icon: UserIcon },
  { id: 'p4', category: 'Personal', title: { en: 'Birth Certificate Correction Affidavit', hi: 'जन्म प्रमाण पत्र सुधार शपथ पत्र', ur: 'پیدائش کے سرٹیفکیٹ میں ترمیم کا حلف نامہ', bn: 'জন্ম সনদ সংশোধন হলফনামা' }, description: { en: 'Affidavit for correcting details in a birth certificate.', hi: 'जन्म प्रमाण पत्र में विवरण सुधारने के लिए शपथ पत्र।', ur: 'پیدائش کے سرٹیفیکیٹ میں تفصیلات درست کرنے کے لیے حلف نامہ۔', bn: 'জন্ম সনদে বিশদ সংশোধন করার জন্য হলফনামা।' }, icon: UserIcon },
  { id: 'p5', category: 'Personal', title: { en: 'Lost Document Affidavit (PAN, Aadhar, etc.)', hi: 'खोए हुए दस्तावेज़ का शपथ पत्र (पैन, आधार, आदि)', ur: 'گمشدہ دستاویز کا حلف نامہ (پین، آدھار، وغیرہ)', bn: 'হারানো নথির হলফনামা (প্যান, আধার, ইত্যাদি)' }, description: { en: 'Creating affidavits to report lost official documents.', hi: 'खोए हुए आधिकारिक दस्तावेजों की रिपोर्ट करने के लिए शपथ पत्र बनाना।', ur: 'گمشدہ سرکاری دستاویزات کی اطلاع دینے کے لیے حلف نامے بنانا۔', bn: 'হারিয়ে যাওয়া অফিসিয়াল নথি রিপোর্ট করার জন্য হলফনামা তৈরি করা।' }, icon: UserIcon },
  { id: 'p6', category: 'Personal', title: { en: 'Passport Annexures A/B/C', hi: 'पासपोर्ट अनुबंध ए/बी/सी', ur: 'پاسپورٹ انیکچرز A/B/C', bn: 'পাসপোর্ট অ্যানেক্সার A/B/C' }, description: { en: 'Assistance with various annexures required for passports.', hi: 'पासपोर्ट के लिए आवश्यक विभिन्न अनुबंधों में सहायता।', ur: 'پاسپورٹ کے لیے درکار مختلف انیکچرز میں مدد۔', bn: 'পাসপোর্টের জন্য প্রয়োজনীয় বিভিন্ন অ্যানেক্সারে সহায়তা।' }, icon: UserIcon },
  { id: 'p7', category: 'Personal', title: { en: 'Divorce Mutual Consent Draft', hi: 'तलाक आपसी सहमति का मसौदा', ur: 'طلاق باہمی رضامندی کا مسودہ', bn: 'পারস্পরিক সম্মতিতে বিবাহবিচ্ছেদের খসড়া' }, description: { en: 'Drafting petitions for divorce by mutual consent.', hi: 'आपसी सहमति से तलाक के लिए याचिकाओं का मसौदा तैयार करना।', ur: 'باہمی رضامندی سے طلاق کے لیے درخواستوں کا مسودہ تیار کرنا۔', bn: 'পারস্পরিক সম্মতিতে বিবাহবিচ্ছেদের জন্য আবেদনের খসড়া তৈরি করা।' }, icon: UserIcon },
  { id: 'p8', category: 'Personal', title: { en: 'Domestic Violence Complaint Draft', hi: 'घरेलू हिंसा शिकायत का मसौदा', ur: 'گھریلو تشدد کی شکایت کا مسودہ', bn: 'গার্হস্থ্য সহিংসতা অভিযোগের খসড়া' }, description: { en: 'Preparing drafts for filing domestic violence complaints.', hi: 'घरेलू हिंसा की शिकायत दर्ज करने के लिए मसौदा तैयार करना।', ur: 'گھریلو تشدد کی شکایات درج کرنے کے لیے مسودے تیار کرنا۔', bn: 'গার্হস্থ্য সহিংসতার অভিযোগ দায়ের করার জন্য খসড়া প্রস্তুত করা।' }, icon: UserIcon },
  { id: 'p9', category: 'Personal', title: { en: 'Live-in Relationship Agreement', hi: 'लिव-इन रिलेशनशिप समझौता', ur: 'لیو ان ریلیشن شپ کا معاہدہ', bn: 'লিভ-ইন রিলেশনশিপ চুক্তি' }, description: { en: 'Formalizing the terms of a live-in relationship.', hi: 'लिव-इन रिलेशनशिप की शर्तों को औपचारिक बनाना।', ur: 'لیو ان ریلیشن شپ کی شرائط کو باقاعدہ بنانا۔', bn: 'লিভ-ইন সম্পর্কের শর্তাবলী আনুষ্ঠানিক করা।' }, icon: UserIcon },
  { id: 'p10', category: 'Personal', title: { en: 'Notarization Facilitation (Offline)', hi: 'नोटरीकरण सुविधा (ऑफलाइन)', ur: 'نوٹرائزیشن کی سہولت (آف لائن)', bn: 'নোটারাইজেশন সুবিধা (অফলাইন)' }, description: { en: 'Assisting with the process of getting documents notarized.', hi: 'दस्तावेजों को नोटरीकृत करवाने की प्रक्रिया में सहायता करना।', ur: 'دستاویزات کو نوٹرائز کروانے کے عمل میں مدد کرنا۔', bn: 'নথি নোটারাইজড করার প্রক্রিয়ায় সহায়তা করা।' }, icon: UserIcon },

  // Business
  { id: 'b1', category: 'Business', title: { en: 'Partnership Deed', hi: 'साझेदारी विलेख', ur: 'شراکت کا معاہدہ', bn: 'অংশীদারি দলিল' }, description: { en: 'Creating the foundational legal document for a partnership firm.', hi: 'एक साझेदारी फर्म के लिए मूलभूत कानूनी दस्तावेज बनाना।', ur: 'شراکت داری فرم کے لیے بنیادی قانونی دستاویز بنانا۔', bn: 'একটি অংশীদারি সংস্থার জন্য ভিত্তিগত আইনি নথি তৈরি করা।' }, icon: BriefcaseIcon },
  { id: 'b2', category: 'Business', title: { en: 'Employment Contract', hi: 'रोजगार अनुबंध', ur: 'ملازمت کا معاہدہ', bn: 'কর্মসংস্থান চুক্তি' }, description: { en: 'Drafting standard and custom employment contracts.', hi: 'मानक और कस्टम रोजगार अनुबंधों का मसौदा तैयार करना।', ur: 'معیاری اور کسٹم ملازمت کے معاہدوں کا مسودہ تیار کرنا۔', bn: 'স্ট্যান্ডার্ড এবং কাস্টম কর্মসংস্থান চুক্তির খসড়া তৈরি করা।' }, icon: BriefcaseIcon },
  { id: 'b3', category: 'Business', title: { en: 'LLP Agreement', hi: 'एलएलपी समझौता', ur: 'ایل ایل پی معاہدہ', bn: 'এলএলপি চুক্তি' }, description: { en: 'Preparing agreements for Limited Liability Partnerships.', hi: 'सीमित देयता भागीदारी के लिए समझौते तैयार करना।', ur: 'محدود ذمہ داری شراکت داری کے لیے معاہدے تیار کرنا۔', bn: 'লিমিটেড লায়াবিলিটি পার্টনারশিপের জন্য চুক্তি প্রস্তুত করা।' }, icon: BriefcaseIcon },
  { id: 'b4', category: 'Business', title: { en: 'Founders Agreement', hi: 'संस्थापक समझौता', ur: 'بانیوں کا معاہدہ', bn: 'প্রতিষ্ঠাতা চুক্তি' }, description: { en: 'Defining roles, responsibilities, and equity among co-founders.', hi: 'सह-संस्थापकों के बीच भूमिकाओं, जिम्मेदारियों और इक्विटी को परिभाषित करना।', ur: 'شریک بانیوں کے درمیان کردار، ذمہ داریاں اور ایکویٹی کی وضاحت کرنا۔', bn: 'সহ-প্রতিষ্ঠাতাদের মধ্যে ভূমিকা, দায়িত্ব এবং ইক্যুইটি সংজ্ঞায়িত করা।' }, icon: BriefcaseIcon },
  { id: 'b5', category: 'Business', title: { en: 'Freelancer Agreement', hi: 'फ्रीलांसर समझौता', ur: 'فری لانسر معاہدہ', bn: 'ফ্রিল্যান্সার চুক্তি' }, description: { en: 'Contracts to define the terms of work with freelancers.', hi: 'फ्रीलांसरों के साथ काम की शर्तों को परिभाषित करने के लिए अनुबंध।', ur: 'فری لانسرز کے ساتھ کام کی شرائط کی وضاحت کے لیے معاہدے۔', bn: 'ফ্রিল্যান্সারদের সাথে কাজের শর্তাবলী সংজ্ঞায়িত করার জন্য চুক্তি।' }, icon: BriefcaseIcon },
  { id: 'b6', category: 'Business', title: { en: 'Vendor/Supplier Agreement', hi: 'विक्रेता/आपूर्तिकर्ता समझौता', ur: 'وینڈر/سپلائر معاہدہ', bn: 'ভেন্ডর/সরবরাহকারী চুক্তি' }, description: { en: 'Securing terms with your vendors and suppliers.', hi: 'अपने विक्रेताओं और आपूर्तिकर्ताओं के साथ शर्तों को सुरक्षित करना।', ur: 'اپنے وینڈرز اور سپلائرز کے ساتھ شرائط کو محفوظ بنانا۔', bn: 'আপনার বিক্রেতা এবং সরবরাহকারীদের সাথে শর্তাবলী সুরক্ষিত করা।' }, icon: BriefcaseIcon },
  { id: 'b7', category: 'Business', title: { en: 'Franchise Agreement', hi: 'फ्रैंचाइज़ समझौता', ur: 'فرنچائز معاہدہ', bn: 'ফ্র্যাঞ্চাইজি চুক্তি' }, description: { en: 'Legal agreements for franchising your business.', hi: 'अपने व्यवसाय की फ्रेंचाइजी के लिए कानूनी समझौते।', ur: 'اپنے کاروبار کی فرنچائزنگ کے لیے قانونی معاہدے۔', bn: 'আপনার ব্যবসা ফ্র্যাঞ্চাইজ করার জন্য আইনি চুক্তি।' }, icon: BriefcaseIcon },
  { id: 'b8', category: 'Business', title: { en: 'Service Level Agreement (SLA)', hi: 'सेवा स्तर समझौता (एसएलए)', ur: 'سروس لیول ایگریمنٹ (SLA)', bn: 'সার্ভিস লেভেল এগ্রিমেন্ট (SLA)' }, description: { en: 'Defining the level of service between a provider and a client.', hi: 'एक प्रदाता और एक ग्राहक के बीच सेवा के स्तर को परिभाषित करना।', ur: 'ایک فراہم کنندہ اور ایک کلائنٹ کے درمیان سروس کی سطح کی وضاحت کرنا۔', bn: 'একজন প্রদানকারী এবং একজন ক্লায়েন্টের মধ্যে পরিষেবার স্তর সংজ্ঞায়িত করা।' }, icon: BriefcaseIcon },
  { id: 'b9', category: 'Business', title: { en: 'Non-Disclosure Agreement (NDA)', hi: 'गैर-प्रकटीकरण समझौता (एनडीए)', ur: 'رازداری کا معاہدہ (NDA)', bn: 'নন-ডিসক্লোজার এগ্রিমেন্ট (NDA)' }, description: { en: 'Protecting confidential information shared with third parties.', hi: 'तीसरे पक्षों के साथ साझा की गई गोपनीय जानकारी की सुरक्षा करना।', ur: 'تیسرے فریق کے ساتھ اشتراک کردہ خفیہ معلومات کی حفاظت کرنا۔', bn: 'তৃতীয় পক্ষের সাথে শেয়ার করা গোপনীয় তথ্য রক্ষা করা।' }, icon: BriefcaseIcon },
  { id: 'b10', category: 'Business', title: { en: 'Memorandum of Understanding (MoU)', hi: 'समझौता ज्ञापन (एमओयू)', ur: 'مفاہمت کی یادداشت (ایم او یو)', bn: 'সমঝোতা স্মারক (MoU)' }, description: { en: 'Outlining the terms of a bilateral agreement.', hi: 'एक द्विपक्षीय समझौते की शर्तों को रेखांकित करना।', ur: 'دو طرفہ معاہدے کی شرائط کا خاکہ پیش کرنا۔', bn: 'একটি দ্বিপাক্ষিক চুক্তির শর্তাবলী রূপরেখা করা।' }, icon: BriefcaseIcon },

  // Govt. / Statutory
  { id: 'gs1', category: 'Govt. / Statutory', title: { en: 'RTI Application Draft', hi: 'आरटीआई आवेदन का मसौदा', ur: 'آر ٹی آئی درخواست کا مسودہ', bn: 'আরটিআই আবেদন খসড়া' }, description: { en: 'Drafting applications for Right to Information requests.', hi: 'सूचना का अधिकार अनुरोधों के लिए आवेदन का मसौदा तैयार करना।', ur: 'معلومات تک رسائی کے حق کی درخواستوں کا مسودہ تیار کرنا۔', bn: 'তথ্যের অধিকার অনুরোধের জন্য আবেদন খসড়া করা।' }, icon: GovernmentIcon },
  { id: 'gs2', category: 'Govt. / Statutory', title: { en: 'NOC (No Objection Certificate)', hi: 'अनापत्ति प्रमाण पत्र (एनओसी)', ur: 'عدم اعتراض کا سرٹیفکیٹ (این او سی)', bn: 'এনওসি (কোনও আপত্তি নেই प्रमाणपत्र)' }, description: { en: 'Preparation of various No Objection Certificates.', hi: 'विभिन्न अनापत्ति प्रमाण पत्र तैयार करना।', ur: 'مختلف عدم اعتراض سرٹیفکیٹ کی تیاری۔', bn: 'বিভিন্ন কোনও আপত্তি নেই प्रमाणपत्र প্রস্তুত করা।' }, icon: GovernmentIcon },
  { id: 'gs3', category: 'Govt. / Statutory', title: { en: 'Power of Attorney', hi: 'मुख्तारनामा', ur: 'پاور آف اٹارنی', bn: 'পাওয়ার অফ অ্যাটর্নি' }, description: { en: 'Granting legal authority to another person to act on your behalf.', hi: 'अपनी ओर से कार्य करने के लिए किसी अन्य व्यक्ति को कानूनी अधिकार प्रदान करना।', ur: 'اپنی طرف سے کام کرنے کے لیے کسی دوسرے شخص کو قانونی اختیار دینا۔', bn: 'আপনার পক্ষে কাজ করার জন্য অন্য ব্যক্তিকে আইনি কর্তৃত্ব প্রদান করা।' }, icon: GovernmentIcon },
  { id: 'gs4', category: 'Govt. / Statutory', title: { en: 'Legal Notice Draft (for disputes)', hi: 'कानूनी नोटिस का मसौदा (विवादों के लिए)', ur: 'قانونی نوٹس کا مسودہ (تنازعات کے لیے)', bn: 'আইনি নোটিশের খসড়া (বিরোধের জন্য)' }, description: { en: 'Drafting formal legal notices to address disputes.', hi: 'विवादों को दूर करने के लिए औपचारिक कानूनी नोटिस का मसौदा तैयार करना।', ur: 'تنازعات کو حل کرنے کے لیے رسمی قانونی نوٹس کا مسودہ تیار کرنا۔', bn: 'বিরোধ নিষ্পত্তির জন্য আনুষ্ঠানিক আইনি নোটিশের খসড়া তৈরি করা।' }, icon: GovernmentIcon },
  { id: 'gs5', category: 'Govt. / Statutory', title: { en: 'Consumer Complaint Draft', hi: 'उपभोक्ता शिकायत का मसौदा', ur: 'صارفین کی شکایت کا مسودہ', bn: 'ভোক্তা অভিযোগের খসড়া' }, description: { en: 'Preparing complaints for filing in consumer courts.', hi: 'उपभोक्ता अदालतों में दाखिल करने के लिए शिकायतें तैयार करना।', ur: 'صارفین کی عدالتوں میں دائر کرنے کے لیے شکایات تیار کرنا۔', bn: 'ভোক্তা আদালতে দাখিলের জন্য অভিযোগ প্রস্তুত করা।' }, icon: GovernmentIcon },
  { id: 'gs6', category: 'Govt. / Statutory', title: { en: 'RERA Complaint Draft', hi: 'रेरा शिकायत का मसौदा', ur: 'ریرا شکایت کا مسودہ', bn: 'RERA অভিযোগের খসড়া' }, description: { en: 'Drafting complaints under the Real Estate (Regulation and Development) Act.', hi: 'रियल एस्टेट (विनियमन और विकास) अधिनियम के तहत शिकायतों का मसौदा तैयार करना।', ur: 'ریل اسٹیٹ (ریگولیشن اینڈ ڈیولپمنٹ) ایکٹ کے تحت شکایات کا مسودہ تیار کرنا۔', bn: 'রিয়েল এস্টেট (নিয়ন্ত্রণ ও উন্নয়ন) আইনের অধীনে অভিযোগের খসড়া তৈরি করা।' }, icon: GovernmentIcon },
  { id: 'gs7', category: 'Govt. / Statutory', title: { en: 'Traffic/Accident Affidavit', hi: 'यातायात/दुर्घटना शपथ पत्र', ur: 'ٹریفک/حادثہ کا حلف نامہ', bn: 'ট্রাফিক/দুর্ঘটনা হলফনামা' }, description: { en: 'Preparing affidavits related to traffic incidents or accidents.', hi: 'यातायात की घटनाओं या दुर्घटनाओं से संबंधित शपथ पत्र तैयार करना।', ur: 'ٹریفک کے واقعات یا حادثات سے متعلق حلف نامے تیار کرنا۔', bn: 'ট্রাফিক ঘটনা বা দুর্ঘটনা সম্পর্কিত হলফনামা প্রস্তুত করা।' }, icon: GovernmentIcon },
  { id: 'gs8', category: 'Govt. / Statutory', title: { en: 'Court Petition Format Help', hi: 'न्यायालय याचिका प्रारूप सहायता', ur: 'عدالتی درخواست فارمیٹ میں مدد', bn: 'আদালতের পিটিশন ফরম্যাট সহায়তা' }, description: { en: 'Assistance with formatting various court petitions.', hi: 'विभिन्न न्यायालय याचिकाओं के प्रारूपण में सहायता।', ur: 'مختلف عدالتی درخواستوں کی فارمیٹنگ میں مدد۔', bn: 'বিভিন্ন আদালতের পিটিশন ফরম্যাট করার জন্য সহায়তা।' }, icon: GovernmentIcon },
  { id: 'gs9', category: 'Govt. / Statutory', title: { en: 'Police Complaint/FIR Draft', hi: 'पुलिस शिकायत/एफआईआर का मसौदा', ur: 'پولیس شکایت/ایف آئی آر کا مسودہ', bn: 'পুলিশ অভিযোগ/এফআইআর খসড়া' }, description: { en: 'Help with drafting police complaints and First Information Reports.', hi: 'पुलिस शिकायतों और प्रथम सूचना रिपोर्ट का मसौदा तैयार करने में मदद।', ur: 'پولیس شکایات اور فرسٹ انفارمیشن رپورٹس کا مسودہ تیار کرنے میں مدد۔', bn: 'পুলিশি অভিযোগ এবং প্রথম তথ্য প্রতিবেদন খসড়া করতে সহায়তা।' }, icon: GovernmentIcon },
  { id: 'gs10', category: 'Govt. / Statutory', title: { en: 'Self-Declaration Forms', hi: 'स्व-घोषणा पत्र', ur: 'خود اعلانیہ فارم', bn: 'স্ব-ঘোষণা ফর্ম' }, description: { en: 'Preparing self-declaration forms for various schemes and purposes.', hi: 'विभिन्न योजनाओं और उद्देश्यों के लिए स्व-घोषणा पत्र तैयार करना।', ur: 'مختلف اسکیموں اور مقاصد کے لیے خود اعلانیہ فارم تیار کرنا۔', bn: 'বিভিন্ন স্কিম এবং উদ্দেশ্যের জন্য স্ব-ঘোষণাপত্র প্রস্তুত করা।' }, icon: GovernmentIcon },

  // Online & Startup Legal
  { id: 'os1', category: 'Online & Startup Legal', title: { en: 'Website Terms & Conditions', hi: 'वेबसाइट के नियम और शर्तें', ur: 'ویب سائٹ کی شرائط و ضوابط', bn: 'ওয়েবসাইটের শর্তাবলী' }, description: { en: 'Drafting comprehensive Terms & Conditions for your website.', hi: 'आपकी वेबसाइट के लिए व्यापक नियम और शर्तें तैयार करना।', ur: 'آپ کی ویب سائٹ کے لیے جامع شرائط و ضوابط کا مسودہ تیار کرنا۔', bn: 'আপনার ওয়েবসাইটের জন্য ব্যাপক শর্তাবলী খসড়া করা।' }, icon: GlobeIcon },
  { id: 'os2', category: 'Online & Startup Legal', title: { en: 'Privacy Policy Drafting', hi: 'गोपनीयता नीति का मसौदा', ur: 'پرائیویسی پالیسی کا مسودہ', bn: 'গোপনীয়তা নীতি খসড়া' }, description: { en: 'Creating a compliant Privacy Policy for your online business.', hi: 'आपके ऑनलाइन व्यवसाय के लिए एक अनुपालन गोपनीयता नीति बनाना।', ur: 'آپ کے آن لائن کاروبار کے لیے ایک مطابق پرائیویسی پالیسی بنانا۔', bn: 'আপনার অনলাইন ব্যবসার জন্য একটি সঙ্গতিপূর্ণ গোপনীয়তা নীতি তৈরি করা।' }, icon: GlobeIcon },
  { id: 'os3', category: 'Online & Startup Legal', title: { en: 'Refund & Cancellation Policy', hi: 'धनवापसी और रद्दीकरण नीति', ur: 'رقم کی واپسی اور منسوخی کی پالیسی', bn: 'ফেরত ও বাতিলকরণ নীতি' }, description: { en: 'Defining clear refund and cancellation terms for customers.', hi: 'ग्राहकों के लिए स्पष्ट धनवापसी और रद्दीकरण की शर्तें परिभाषित करना।', ur: 'صارفین کے لیے واضح رقم کی واپسی اور منسوخی کی شرائط کی وضاحت کرنا۔', bn: 'গ্রাহকদের জন্য স্পষ্ট ফেরত এবং বাতিলকরণের শর্তাবলী সংজ্ঞায়িত করা।' }, icon: GlobeIcon },
  { id: 'os4', category: 'Online & Startup Legal', title: { en: 'Digital Signature Certificate (DSC) Assistance', hi: 'डिजिटल हस्ताक्षर प्रमाणपत्र (डीएससी) सहायता', ur: 'ڈیجیٹل دستخط سرٹیفکیٹ (DSC) میں مدد', bn: 'ডিজিটাল স্বাক্ষর সার্টিফিকেট (DSC) সহায়তা' }, description: { en: 'Guidance and assistance in obtaining a DSC.', hi: 'डीएससी प्राप्त करने में मार्गदर्शन और सहायता।', ur: 'ڈی ایس سی حاصل کرنے میں رہنمائی اور مدد۔', bn: 'ডিএসসি পেতে নির্দেশিকা এবং সহায়তা।' }, icon: GlobeIcon },
  { id: 'os5', category: 'Online & Startup Legal', title: { en: 'Freelancer Service Agreement', hi: 'फ्रीलांसर सेवा समझौता', ur: 'فری لانسر سروس کا معاہدہ', bn: 'ফ্রিল্যান্সার পরিষেবা চুক্তি' }, description: { en: 'Contracts for procuring services from freelancers for your startup.', hi: 'अपने स्टार्टअप के लिए फ्रीलांसरों से सेवाएं प्राप्त करने के लिए अनुबंध।', ur: 'اپنے اسٹارٹ اپ کے لیے فری لانسرز سے خدمات حاصل کرنے کے لیے معاہدے۔', bn: 'আপনার স্টার্টআপের জন্য ফ্রিল্যান্সারদের কাছ থেকে পরিষেবা সংগ্রহের জন্য চুক্তি।' }, icon: GlobeIcon },
  { id: 'os6', category: 'Online & Startup Legal', title: { en: 'Startup Founder Agreement', hi: 'स्टार्टअप संस्थापक समझौता', ur: 'اسٹارٹ اپ بانی کا معاہدہ', bn: 'স্টার্টআপ প্রতিষ্ঠাতা চুক্তি' }, description: { en: 'Key legal document outlining the roles and equity of founders.', hi: 'संस्थापकों की भूमिकाओं और इक्विटी को रेखांकित करने वाला प्रमुख कानूनी दस्तावेज।', ur: 'بانیوں کے کردار اور ایکویٹی کا خاکہ پیش کرنے والی کلیدی قانونی دستاویز۔', bn: 'প্রতিষ্ঠাতাদের ভূমিকা এবং ইক্যুইটির রূপরেখা সম্বলিত মূল আইনি নথি।' }, icon: GlobeIcon },
  { id: 'os7', category: 'Online & Startup Legal', title: { en: 'Investor Agreement Draft', hi: 'निवेशक समझौते का मसौदा', ur: 'سرمایہ کار کے معاہدے کا مسودہ', bn: 'বিনিয়োগকারী চুক্তির খসড়া' }, description: { en: 'Preparing agreements for bringing investors into your startup.', hi: 'अपने स्टार्टअप में निवेशकों को लाने के लिए समझौते तैयार करना।', ur: 'اپنے اسٹارٹ اپ میں سرمایہ کاروں کو لانے کے لیے معاہدے تیار کرنا۔', bn: 'আপনার স্টার্টআপে বিনিয়োগকারীদের আনার জন্য চুক্তি প্রস্তুত করা।' }, icon: GlobeIcon },
  { id: 'os8', category: 'Online & Startup Legal', title: { en: 'Vendor Onboarding Documents', hi: 'विक्रेता ऑनबोर्डिंग दस्तावेज़', ur: 'وینڈر آن بورڈنگ دستاویزات', bn: 'ভেন্ডর অনবোর্ডিং ডকুমেন্টস' }, description: { en: 'Creating a set of documents for onboarding new vendors.', hi: 'नए विक्रेताओं को ऑनबोर्ड करने के लिए दस्तावेजों का एक सेट बनाना।', ur: 'نئے وینڈرز کو آن بورڈ کرنے کے لیے دستاویزات کا ایک سیٹ بنانا۔', bn: 'নতুন বিক্রেতাদের অনবোর্ড করার জন্য একটি নথি সেট তৈরি করা।' }, icon: GlobeIcon },
  { id: 'os9', category: 'Online & Startup Legal', title: { en: 'Udyam Registration Draft', hi: 'उद्यम पंजीकरण मसौदा', ur: 'ادیم رجسٹریشن کا مسودہ', bn: 'উদ্যম নিবন্ধন খসড়া' }, description: { en: 'Assistance with drafting for Udyam registration (MSME).', hi: 'उद्यम पंजीकरण (एमएसएमई) के लिए मसौदा तैयार करने में सहायता।', ur: 'ادیم رجسٹریشن (MSME) کے لیے مسودہ تیار کرنے میں مدد۔', bn: 'উদ্যম নিবন্ধনের (MSME) জন্য খসড়া তৈরিতে সহায়তা।' }, icon: GlobeIcon },
  { id: 'os10', category: 'Online & Startup Legal', title: { en: 'Co-founder Equity Agreement', hi: 'सह-संस्थापक इक्विटी समझौता', ur: 'شریک بانی ایکویٹی معاہدہ', bn: 'সহ-প্রতিষ্ঠাতা ইক্যুইটি চুক্তি' }, description: { en: 'Defining how equity is divided and vested among co-founders.', hi: 'यह परिभाषित करना कि सह-संस्थापकों के बीच इक्विटी कैसे विभाजित और निहित है।', ur: 'یہ وضاحت کرنا کہ شریک بانیوں کے درمیان ایکویٹی کو کیسے تقسیم اور ویسٹ کیا جاتا ہے۔', bn: 'সহ-প্রতিষ্ঠাতাদের মধ্যে ইক্যুইটি কীভাবে বিভক্ত এবং ন্যস্ত করা হয় তা সংজ্ঞায়িত করা।' }, icon: GlobeIcon },
];

export const LAWYERS: Lawyer[] = [
    {
        id: '1',
        name: 'Adv. Rajesh Sharma',
        photoUrl: '/lawyer1.jpg',
        practiceAreas: ['Property Law', 'Family Law', 'Corporate Law'],
        bio: {
            en: 'Rajesh Sharma is a seasoned lawyer with over 15 years of experience in property disputes and family matters. He is known for his meticulous approach and client-centric advice.',
            hi: 'राजेश शर्मा संपत्ति विवादों और पारिवारिक मामलों में 15 से अधिक वर्षों के अनुभव के साथ एक अनुभवी वकील हैं। वह अपने सूक्ष्म दृष्टिकोण और ग्राहक-केंद्रित सलाह के लिए जाने जाते हैं।',
            ur: 'راجیش شرما پراپرٹی کے تنازعات اور خاندانی معاملات میں 15 سال سے زیادہ کا تجربہ رکھنے والے ایک تجربہ کار وکیل ہیں۔ وہ اپنے محتاط انداز اور کلائنٹ پر مبنی مشورے کے لیے جانے جاتے ہیں۔',
            bn: 'রাজেশ শর্মা সম্পত্তি বিরোধ এবং পারিবারিক বিষয়ে 15 বছরেরও বেশি অভিজ্ঞতার সাথে একজন অভিজ্ঞ আইনজীবী। তিনি তার সূক্ষ্ম দৃষ্টিভঙ্গি এবং ক্লায়েন্ট-কেন্দ্রিক পরামর্শের জন্য পরিচিত।',
        },
        rating: 4.9,
        reviews: 124,
        location: 'Delhi',
        languages: ['English', 'Hindi', 'Punjabi'],
    },
    {
        id: '2',
        name: 'Adv. Priya Singh',
        photoUrl: '/lawyer2.jpg',
        practiceAreas: ['Criminal Law', 'Consumer Rights', 'Startup Legal'],
        bio: {
            en: 'Priya Singh is a dynamic lawyer specializing in criminal defense and consumer protection cases. She is passionate about upholding justice and providing robust legal representation.',
            hi: 'प्रिया सिंह एक गतिशील वकील हैं जो आपराधिक बचाव और उपभोक्ता संरक्षण मामलों में विशेषज्ञता रखती हैं। वह न्याय को बनाए रखने और मजबूत कानूनी प्रतिनिधित्व प्रदान करने के प्रति जुनूनी हैं।',
            ur: 'پریا سنگھ ایک متحرک وکیل ہیں جو فوجداری دفاع اور صارفین کے تحفظ کے مقدمات میں مہارت رکھتی ہیں۔ وہ انصاف کو برقرار رکھنے اور مضبوط قانونی نمائندگی فراہم کرنے کا شوق رکھتی ہیں۔',
            bn: 'প্রিয়া সিং একজন গতিশীল আইনজীবী যিনি ফৌজদারি প্রতিরক্ষা এবং ভোক্তা সুরক্ষা মামলায় বিশেষজ্ঞ। তিনি ন্যায়বিচার বজায় রাখতে এবং শক্তিশালী আইনি প্রতিনিধিত্ব প্রদানে আগ্রহী।',
        },
        rating: 4.8,
        reviews: 98,
        location: 'Mumbai',
        languages: ['English', 'Hindi', 'Marathi'],
    },
];

export const GUIDES: Guide[] = [
    {
        id: 'g1',
        question: {
            en: 'How do I file a Right to Information (RTI) application?',
            hi: 'मैं सूचना का अधिकार (आरटीआई) आवेदन कैसे दर्ज करूं?',
            ur: 'میں رائٹ ٹو انفارمیشن (آر ٹی آئی) کی درخواست کیسے دائر کروں؟',
            bn: 'আমি কীভাবে তথ্যের অধিকার (আরটিআই) আবেদন ফাইল করব?',
        },
        answer: {
            en: 'To file an RTI, you need to write an application to the Public Information Officer (PIO) of the concerned department. The application should clearly state the information you are seeking. You can submit it online or offline with the requisite fee (usually ₹10).',
            hi: 'आरटीआई दाखिल करने के लिए, आपको संबंधित विभाग के लोक सूचना अधिकारी (पीआईओ) को एक आवेदन लिखना होगा। आवेदन में स्पष्ट रूप से वह जानकारी होनी चाहिए जो आप मांग रहे हैं। आप इसे अपेक्षित शुल्क (आमतौर पर ₹10) के साथ ऑनलाइन या ऑफलाइन जमा कर सकते हैं।',
            ur: 'آر ٹی آئی فائل کرنے کے لیے، آپ کو متعلقہ محکمے کے پبلک انفارمیشن آفیسر (PIO) کو ایک درخواست لکھنی ہوگی۔ درخواست میں واضح طور پر وہ معلومات بیان ہونی چاہیے جو آپ مانگ رہے ہیں۔ آپ اسے مطلوبہ فیس (عام طور پر ₹10) کے ساتھ آن لائن یا آف لائن جمع کرا سکتے ہیں۔',
            bn: 'আরটিআই ফাইল করার জন্য, আপনাকে সংশ্লিষ্ট বিভাগের পাবলিক ইনফরমেশন অফিসারের (পিআইও) কাছে একটি আবেদন লিখতে হবে। আবেদনে আপনি যে তথ্য চাইছেন তা স্পষ্টভাবে উল্লেখ করতে হবে। আপনি এটি প্রয়োজনীয় ফি (সাধারণত ₹১০) সহ অনলাইন বা অফলাইনে জমা দিতে পারেন।',
        },
    },
    {
        id: 'g2',
        question: {
            en: 'What is the difference between a lease and a rental agreement?',
            hi: 'पट्टा और किराया समझौते में क्या अंतर है?',
            ur: 'لیز اور کرائے کے معاہدے میں کیا فرق ہے؟',
            bn: 'লীজ এবং ভাড়া চুক্তির মধ্যে পার্থক্য কী?',
        },
        answer: {
            en: 'A rental agreement is typically short-term (month-to-month) and renews automatically. A lease agreement is for a fixed long term (e.g., one year) and provides more stability for both the landlord and tenant.',
            hi: 'एक किराया समझौता आम तौर पर अल्पकालिक (महीने-दर-महीने) होता है और स्वचालित रूप से नवीनीकृत हो जाता है। एक पट्टा समझौता एक निश्चित लंबी अवधि (उदाहरण के लिए, एक वर्ष) के लिए होता है और मकान मालिक और किरायेदार दोनों के लिए अधिक स्थिरता प्रदान करता है।',
            ur: 'کرائے کا معاہدہ عام طور پر قلیل مدتی (مہینہ بہ مہینہ) ہوتا ہے اور خود بخود تجدید ہو جاتا ہے۔ لیز کا معاہدہ ایک مقررہ طویل مدت (مثلاً، ایک سال) کے لیے ہوتا ہے اور مالک مکان اور کرایہ دار دونوں کے لیے زیادہ استحکام فراہم کرتا ہے۔',
            bn: 'একটি ভাড়া চুক্তি সাধারণত স্বল্পমেয়াদী (মাস থেকে মাস) হয় এবং স্বয়ংক্রিয়ভাবে পুনর্নবীকরণ হয়। একটি ইজারা চুক্তি একটি নির্দিষ্ট দীর্ঘ মেয়াদের জন্য (যেমন, এক বছর) এবং বাড়িওয়ালা এবং ভাড়াটে উভয়ের জন্য আরও স্থিতিশীলতা প্রদান করে।',
        },
    },
];

export const DOCUMENTS: LegalDocument[] = [
    {
        id: 'doc1',
        title: { en: 'General Power of Attorney', hi: 'सामान्य मुख्तारनामा', ur: 'جنرل پاور آف اٹارنی', bn: 'সাধারণ পাওয়ার অফ অ্যাটর্নি' },
        description: { en: 'A template for granting broad legal authority to another person.', hi: 'किसी अन्य व्यक्ति को व्यापक कानूनी अधिकार प्रदान करने के लिए एक टेम्पलेट।', ur: 'کسی دوسرے شخص کو وسیع قانونی اختیارات دینے کے لیے ایک ٹیمپلیٹ۔', bn: 'অন্য ব্যক্তিকে ব্যাপক আইনি কর্তৃত্ব দেওয়ার জন্য একটি টেমপ্লেট।' },
        downloadUrl: '/docs/power_of_attorney_template.pdf',
    },
    {
        id: 'doc2',
        title: { en: 'Residential Rental Agreement', hi: 'आवासीय किराया समझौता', ur: 'رہائشی کرایہ کا معاہدہ', bn: 'আবাসিক ভাড়া চুক্তি' },
        description: { en: 'A standard template for a residential property rental agreement.', hi: 'एक आवासीय संपत्ति किराया समझौते के लिए एक मानक टेम्पलेट।', ur: 'رہائشی جائیداد کے کرایہ کے معاہدے کے لیے ایک معیاری ٹیمپلیٹ۔', bn: 'একটি আবাসিক সম্পত্তি ভাড়া চুক্তির জন্য একটি আদর্শ টেমপ্লেট।' },
        downloadUrl: '/docs/rental_agreement_template.pdf',
    },
];

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: 'understanding-tenant-rights',
        title: { en: 'Understanding Your Rights as a Tenant in India', hi: 'भारत में एक किरायेदार के रूप में अपने अधिकारों को समझना', ur: 'بھارت میں کرایہ دار کی حیثیت سے اپنے حقوق کو سمجھنا', bn: 'ভারতে একজন ভাড়াটে হিসাবে আপনার অধিকার বোঝা' },
        imageUrl: '/blog1.jpg',
        category: 'Property Law',
        author: 'Adv. Rajesh Sharma',
        date: 'August 10, 2023',
        content: { en: placeholderLongText, hi: placeholderLongText, ur: placeholderLongText, bn: placeholderLongText },
    },
    {
        slug: 'starting-a-business-legal-checklist',
        title: { en: '5 Legal Essentials Before Starting Your Business', hi: 'अपना व्यवसाय शुरू करने से पहले 5 कानूनी अनिवार्यताएं', ur: 'اپنا کاروبار شروع کرنے سے پہلے 5 قانونی لوازمات', bn: 'আপনার ব্যবসা শুরু করার আগে ৫টি আইনি প্রয়োজনীয়তা' },
        imageUrl: '/blog2.jpg',
        category: 'Startup Legal',
        author: 'Adv. Priya Singh',
        date: 'August 15, 2023',
        content: { en: placeholderLongText, hi: placeholderLongText, ur: placeholderLongText, bn: placeholderLongText },
    },
     {
        slug: 'consumer-rights-ecommerce',
        title: { en: 'Know Your Consumer Rights in E-commerce', hi: 'ई-कॉमर्स में अपने उपभोक्ता अधिकारों को जानें', ur: 'ای کامرس میں اپنے صارفی حقوق کو جانیں', bn: 'ই-কমার্সে আপনার ভোক্তা অধিকার জানুন' },
        imageUrl: '/blog3.jpg',
        category: 'Consumer Rights',
        author: 'WakilBhai Team',
        date: 'August 20, 2023',
        content: { en: placeholderLongText, hi: placeholderLongText, ur: placeholderLongText, bn: placeholderLongText },
    },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Ravi Kumar', location: 'Delhi', feedback: { en: 'WakilBhai made getting my rental agreement so simple. They drafted it perfectly and the whole process was seamless. No hassle!', hi: 'वकीलभाई ने मेरा किराया समझौता बनवाना बहुत आसान कर दिया। उन्होंने इसे पूरी तरह से तैयार किया और पूरी प्रक्रिया सहज थी। कोई झंझट नहीं!', ur: 'وکیل بھائی نے میرا کرائے کا معاہدہ بنوانا بہت آسان بنا دیا۔ انہوں نے اسے بالکل صحیح طریقے سے تیار کیا اور پورا عمل بغیر کسی رکاوٹ کے تھا۔ کوئی پریشانی نہیں!', bn: 'ওয়াকিলভাই আমার ভাড়া চুক্তি পাওয়া খুব সহজ করে দিয়েছে। তারা এটি নিখুঁতভাবে খসড়া করেছে এবং পুরো প্রক্রিয়াটি নির্বিঘ্ন ছিল। কোন ঝামেলা নেই!' } },
  { id: 2, name: 'Sunita Patil', location: 'Mumbai', feedback: { en: 'I needed an affidavit urgently. The team at WakilBhai was quick, professional, and very affordable. Highly recommended!', hi: 'मुझे तत्काल एक शपथ पत्र की आवश्यकता थी। वकीलभाई की टीम तेज, पेशेवर और बहुत सस्ती थी। अत्यधिक अनुशंसित!', ur: 'مجھے فوری طور پر ایک حلف نامے کی ضرورت تھی۔ وکیل بھائی کی ٹیم تیز، پیشہ ور اور بہت سستی تھی۔ بہت سفارش کی جاتی ہے!', bn: 'আমার জরুরিভাবে একটি হলফনামা দরকার ছিল। ওয়াকিলভাইয়ের দলটি দ্রুত, পেশাদার এবং খুব সাশ্রয়ী ছিল। অত্যন্ত প্রস্তাবিত!' } },
  { id: 3, name: 'Imran Ahmed', location: 'Hyderabad', feedback: { en: 'The service was so convenient. They understood my needs and collected all the details for my partnership deed efficiently. Excellent work.', hi: 'सेवा बहुत सुविधाजनक थी। उन्होंने मेरी जरूरतों को समझा और मेरी साझेदारी विलेख के लिए सभी विवरण कुशलता से एकत्र किए। उत्कृष्ट कार्य।', ur: 'سروس بہت آسان تھی۔ انہوں نے میری ضروریات کو سمجھا اور میری شراکت داری کے معاہدے کے لیے تمام تفصیلات مؤثر طریقے سے جمع کیں۔ بہترین کام۔', bn: 'পরিষেবাটি খুব সুবিধাজনক ছিল। তারা আমার প্রয়োজন বুঝতে পেরেছিল এবং আমার অংশীদারিত্বের দলিলের জন্য দক্ষতার সাথে সমস্ত বিবরণ সংগ্রহ করেছে। চমৎকার কাজ।' } },
];
