
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LAWYERS } from '../constants';
import type { Lawyer } from '../types';
import { StarIcon, MapPinIcon } from '../components/Icons';

const LawyerCard: React.FC<{ lawyer: Lawyer }> = ({ lawyer }) => {
  const { language } = useLanguage();
  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/20">
      <img className="w-full h-48 object-cover" src={lawyer.photoUrl} alt={lawyer.name} />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white font-display">{lawyer.name}</h3>
        <p className="text-sm text-brand-gold font-semibold mb-2">{lawyer.practiceAreas.join(', ')}</p>
        <p className="text-gray-400 text-sm mb-4 h-16 overflow-hidden">{lawyer.bio[language]}</p>
        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
          <span className="flex items-center"><StarIcon className="w-4 h-4 text-brand-gold mr-1" /> {lawyer.rating} ({lawyer.reviews} reviews)</span>
          <span className="flex items-center"><MapPinIcon className="w-4 h-4 mr-1"/> {lawyer.location}</span>
        </div>
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Languages</p>
          <div className="flex flex-wrap gap-2">
            {lawyer.languages.map(lang => <span key={lang} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">{lang}</span>)}
          </div>
        </div>
        <NavLink to={`/lawyers/${lawyer.id}`} className="block w-full text-center bg-brand-red text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-colors">
          View Profile
        </NavLink>
      </div>
    </div>
  );
};

const LawyerDirectoryPage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [issue, setIssue] = useState('');

  const filteredLawyers = LAWYERS.filter(lawyer => {
    return (
      (location === '' || lawyer.location.toLowerCase().includes(location.toLowerCase())) &&
      (languageFilter === '' || lawyer.languages.some(l => l.toLowerCase().includes(languageFilter.toLowerCase()))) &&
      (issue === '' || lawyer.practiceAreas.some(p => p.toLowerCase().includes(issue.toLowerCase())))
    );
  });

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">Find Your Lawyer</h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Search our network of trusted legal professionals.
        </p>
      </section>

      <section className="bg-gray-900 p-6 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Location (e.g., Delhi)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none"
          />
          <input
            type="text"
            placeholder="Language (e.g., Hindi)"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none"
          />
          <input
            type="text"
            placeholder="Legal Issue (e.g., Family Law)"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none"
          />
          <button className="w-full bg-brand-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">Search</button>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLawyers.length > 0 ? (
            filteredLawyers.map(lawyer => <LawyerCard key={lawyer.id} lawyer={lawyer} />)
          ) : (
            <p className="col-span-full text-center text-gray-400">No lawyers found matching your criteria.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default LawyerDirectoryPage;