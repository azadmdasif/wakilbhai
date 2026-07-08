
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useWeb3Forms } from '../hooks/useWeb3Forms';
import { TEXTS } from '../constants';
import { DocumentIcon } from '../components/Icons';

const BookVisitPage: React.FC = () => {
  const { language } = useLanguage();
  const T = TEXTS[language].book;
  const [searchParams] = useSearchParams();
  const [documentType, setDocumentType] = useState('');

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setDocumentType(serviceParam);
    }
  }, [searchParams]);

  const { submit, isSubmitting, result } = useWeb3Forms({
    access_key: 'b9f95d5b-8f90-477b-a068-55293c654708',
  });

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">{T.title}</h1>
        <p className="mt-4 text-lg text-gray-300">{T.subtitle}</p>
      </section>

      <section className="bg-gray-900 rounded-2xl p-8 md:p-12 shadow-lg">
        <div className="flex justify-center mb-6">
            <DocumentIcon className="w-16 h-16 text-brand-gold" />
        </div>
        <h2 className="text-3xl font-bold text-white text-center mb-2 font-display">{T.formTitle}</h2>
        <form onSubmit={submit} className="space-y-6 mt-8">
          <input type="hidden" name="from_site" value="WakilBhai Booking Form" />
          <input type="text" name="name" placeholder={T.name} required className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
          <input type="tel" name="phone" placeholder={T.phone} required className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
          <input type="text" name="address" placeholder={T.address} className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
          <input 
            type="text" 
            name="document_type"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            placeholder={T.documentType} 
            required 
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
          <input type="text" name="preferred_time" placeholder={T.preferredTime} className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
          <button type="submit" disabled={isSubmitting} className="w-full bg-brand-red text-white font-bold py-3 rounded-full hover:bg-red-700 transition-colors disabled:bg-gray-600">
            {isSubmitting ? T.sending : T.send}
          </button>
        </form>
        {result && (
            <div className={`mt-4 text-center p-3 rounded-lg ${result.success ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
              {result.success ? T.success : T.error}
            </div>
        )}
      </section>
    </div>
  );
};

export default BookVisitPage;
