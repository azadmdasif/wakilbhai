
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { GUIDES } from '../constants';
import type { Guide } from '../types';
import { ChevronDownIcon } from '../components/Icons';

const AccordionItem: React.FC<{ guide: Guide; isOpen: boolean; onClick: () => void }> = ({ guide, isOpen, onClick }) => {
  const { language } = useLanguage();

  return (
    <div className="border-b border-gray-800">
      <button
        className="w-full flex justify-between items-center text-left py-6 px-2"
        onClick={onClick}
      >
        <h3 className="text-xl font-semibold text-white">{guide.question[language]}</h3>
        <ChevronDownIcon
          className={`w-6 h-6 text-brand-gold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-6 bg-gray-900 rounded-b-lg">
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">{guide.answer[language]}</p>
        </div>
      </div>
    </div>
  );
};


const HelpGuidesPage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };
  
  const filteredGuides = GUIDES.filter(guide => 
    guide.question[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.answer[language].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">Free Legal Help Guides</h1>
        <p className="mt-4 text-lg text-gray-300">
          Simple answers to your most common legal questions.
        </p>
      </section>

      <section>
        <input
          type="text"
          placeholder="Search for a question..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none mb-8"
        />
        <div className="bg-gray-900/50 rounded-2xl shadow-lg">
            {filteredGuides.map(guide => (
                <AccordionItem 
                    key={guide.id}
                    guide={guide} 
                    isOpen={openId === guide.id} 
                    onClick={() => handleToggle(guide.id)}
                />
            ))}
        </div>
      </section>
    </div>
  );
};

export default HelpGuidesPage;