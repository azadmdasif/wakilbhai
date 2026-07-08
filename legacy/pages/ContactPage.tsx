import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useWeb3Forms } from '../hooks/useWeb3Forms';
import { TEXTS } from '../constants';
import { MapPinIcon, ClockIcon, PhoneIcon, MailIcon, WhatsAppIcon } from '../components/Icons';

const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const T = TEXTS[language].contact;
  
  const { submit, isSubmitting, result } = useWeb3Forms({
    access_key: 'b9f95d5b-8f90-477b-a068-55293c654708', // This should be replaced with a real key
  });

  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">{T.title}</h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{T.subtitle}</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-gray-900 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-2 font-display">{T.formTitle}</h2>
          <p className="text-sm text-gray-400 mb-6">{T.replyTime}</p>
          <form onSubmit={submit} className="space-y-6">
            <input type="hidden" name="from_site" value="WakilBhai Contact Form" />
            <input type="text" name="name" placeholder={T.name} required className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
            <input type="email" name="email" placeholder={T.email} required className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
            <input type="tel" name="phone" placeholder={T.phone} className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
            <textarea name="message" placeholder={T.message} rows={5} required className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none"></textarea>
            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-red text-white font-bold py-3 rounded-full hover:bg-red-700 transition-colors disabled:bg-gray-600">
              {isSubmitting ? T.sending : T.send}
            </button>
          </form>
          {result && (
            <div className={`mt-4 text-center p-3 rounded-lg ${result.success ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
              {result.success ? T.success : T.error}
            </div>
          )}
        </div>
        
        <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 font-display">{T.ourInfo}</h2>
                <div className="space-y-5 text-gray-300">
                    <div className="flex items-start"><MapPinIcon className="w-6 h-6 mr-4 text-brand-gold mt-1 flex-shrink-0" /><p><strong>Address:</strong><br/>{T.address}</p></div>
                    <div className="flex items-center"><ClockIcon className="w-6 h-6 mr-4 text-brand-gold flex-shrink-0" /><p><strong>Hours:</strong> {T.hours}</p></div>
                    <div className="flex items-center"><PhoneIcon className="w-6 h-6 mr-4 text-brand-gold flex-shrink-0" /><p><strong>Phone:</strong> <a href={`tel:${T.phoneNo}`} className="text-brand-gold hover:underline">{T.phoneNo}</a></p></div>
                    <div className="flex items-center">
                        <WhatsAppIcon className="w-6 h-6 mr-4 text-brand-gold flex-shrink-0" />
                        <p><strong>{T.whatsapp}:</strong> <a href={`https://wa.me/917686022245`} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">{T.phoneNo}</a></p>
                    </div>
                    <div className="flex items-center"><MailIcon className="w-6 h-6 mr-4 text-brand-gold flex-shrink-0" /><p><strong>Email:</strong> <a href={`mailto:${T.emailAd}`} className="text-brand-gold hover:underline">{T.emailAd}</a></p></div>
                </div>
            </div>
            <div className="bg-gray-900 rounded-2xl shadow-lg h-64 overflow-hidden">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.996180393623!2d77.2132323150825!3d28.63000798241777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3f0a8c2c8d%3A0x5fa7763fe134542!2sSupreme%20Court%20of%20India!5e0!3m2!1sen!2sin!4v1690000000000" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                ></iframe>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;