
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useWeb3Forms } from '../hooks/useWeb3Forms';
import { TEXTS, SERVICES, PRICING } from '../constants';
import { DocumentIcon } from '../components/Icons';
import type { Service } from '../types';

const ServiceRequestPage: React.FC = () => {
  const { language } = useLanguage();
  const T = TEXTS[language].request;
  const [searchParams] = useSearchParams();
  const [serviceName, setServiceName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setServiceName(decodeURIComponent(serviceParam));
    }
  }, [searchParams]);

  const { submit, isSubmitting, result } = useWeb3Forms({
    access_key: 'b9f95d5b-8f90-477b-a068-55293c654708',
    onSuccess: (message, data) => {
        setIsSuccess(true);
    }
  });

  const service = SERVICES.find(s => s.title[language] === serviceName || s.title['en'] === serviceName);
  const category = service?.category;
  const price = category ? PRICING[category as keyof typeof PRICING] : null;

  if (isSuccess) {
    return (
        <div className="max-w-2xl mx-auto text-center py-20 bg-gray-900 rounded-2xl shadow-lg">
             <div className="flex justify-center mb-6">
                <svg className="w-24 h-24 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
            <h1 className="text-3xl font-bold text-white font-display mb-4">{T.success}</h1>
            <p className="text-lg text-gray-300 px-4">{T.callback}</p>
        </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">{T.title}</h1>
        <p className="mt-4 text-lg text-gray-300">{T.subtitle}</p>
      </section>

      <section className="bg-gray-900 rounded-2xl p-8 md:p-12 shadow-lg">
        <div className="flex justify-center mb-6">
            <DocumentIcon className="w-16 h-16 text-brand-gold" />
        </div>
        <h2 className="text-3xl font-bold text-white text-center mb-2 font-display">{T.formTitle}</h2>
        
        {serviceName && (
             <div className="mt-4 text-center bg-gray-800 p-3 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 font-medium">{T.serviceName}</p>
                <p className="font-bold text-lg text-brand-gold">{serviceName}</p>
            </div>
        )}

        {price && (
            <div className="mt-4 text-center text-lg text-gray-300">
                {T.costInfo.replace('{price}', price.toString())}
            </div>
        )}
        
        <form onSubmit={submit} className="space-y-6 mt-8">
            <input type="hidden" name="from_site" value="WakilBhai Service Request" />
            <input type="hidden" name="service_requested" value={serviceName} />
          
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">{T.name} <span className="text-brand-red">*</span></label>
                <input id="name" type="text" name="name" required className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
            </div>

             <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">{T.email} <span className="text-brand-red">*</span></label>
                <input id="email" type="email" name="email" required className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">{T.phone} <span className="text-brand-red">*</span></label>
                <input id="phone" type="tel" name="phone" required className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
            </div>

             <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">{T.message}</label>
                <textarea id="message" name="message" rows={4} className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" placeholder="Add any specific details or questions here..."></textarea>
            </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-brand-red text-white font-bold py-3 rounded-full hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
            {isSubmitting ? T.sending : T.send}
          </button>
        </form>
        {result && !result.success && (
            <div className={`mt-4 text-center p-3 rounded-lg bg-red-900 text-red-200`}>
              {T.error}
            </div>
        )}
      </section>
    </div>
  );
};

export default ServiceRequestPage;