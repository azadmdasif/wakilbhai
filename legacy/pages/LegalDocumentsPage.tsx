
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { DOCUMENTS } from '../constants';
import type { LegalDocument } from '../types';
import { DownloadIcon, DocumentIcon } from '../components/Icons';

const DocumentCard: React.FC<{ doc: LegalDocument }> = ({ doc }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-gray-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 transform transition-all duration-300 hover:shadow-xl hover:shadow-brand-red/20 hover:-translate-y-1">
      <div className="flex-shrink-0">
        <DocumentIcon className="w-12 h-12 text-brand-gold" />
      </div>
      <div className="flex-grow text-center sm:text-left">
        <h3 className="text-xl font-bold text-white font-display">{doc.title[language]}</h3>
        <p className="text-gray-400 text-sm mt-1">{doc.description[language]}</p>
      </div>
      <div className="flex-shrink-0">
        <a href={doc.downloadUrl} download className="inline-flex items-center justify-center bg-brand-red text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition-colors">
          <DownloadIcon className="w-5 h-5 mr-2" />
          Download
        </a>
      </div>
    </div>
  );
};

const LegalDocumentsPage: React.FC = () => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">Legal Document Templates</h1>
        <p className="mt-4 text-lg text-gray-300">
          Download common legal forms and templates for free.
        </p>
      </section>

      <section className="space-y-6">
        {DOCUMENTS.map(doc => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </section>
    </div>
  );
};

export default LegalDocumentsPage;