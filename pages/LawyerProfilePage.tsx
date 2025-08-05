
import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LAWYERS } from '../constants';
import { StarIcon, MapPinIcon, GavelIcon } from '../components/Icons';
import NotFoundPage from './NotFoundPage';

const LawyerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const lawyer = LAWYERS.find(l => l.id === id);

  if (!lawyer) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-gray-900 rounded-2xl shadow-lg p-6 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 text-center">
          <img className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-brand-gold" src={lawyer.photoUrl} alt={lawyer.name} />
          <h1 className="text-3xl font-bold text-white mt-6 font-display">{lawyer.name}</h1>
          <div className="flex items-center justify-center text-lg text-gray-300 mt-2">
            <StarIcon className="w-5 h-5 text-brand-gold mr-2" />
            <span>{lawyer.rating} ({lawyer.reviews} Reviews)</span>
          </div>
           <div className="flex items-center justify-center text-lg text-gray-300 mt-2">
            <MapPinIcon className="w-5 h-5 text-gray-400 mr-2" />
            <span>{lawyer.location}</span>
          </div>
          <NavLink to="/contact" className="mt-8 inline-block w-full text-center bg-brand-red text-white font-bold py-3 px-4 rounded-full hover:bg-red-700 transition-colors">
            Contact {lawyer.name.split(' ')[1]}
          </NavLink>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-white border-b-2 border-brand-red pb-2 mb-6 font-display">About Me</h2>
          <p className="text-gray-300 leading-relaxed">{lawyer.bio[language]}</p>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4 font-display">Areas of Practice</h3>
            <div className="flex flex-wrap gap-3">
              {lawyer.practiceAreas.map(area => (
                <span key={area} className="bg-gray-800 text-brand-gold font-semibold px-4 py-2 rounded-full flex items-center">
                  <GavelIcon className="w-4 h-4 mr-2"/>
                  {area}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4 font-display">Languages Spoken</h3>
            <div className="flex flex-wrap gap-3">
              {lawyer.languages.map(lang => (
                <span key={lang} className="bg-gray-700 text-gray-300 px-4 py-2 rounded-full">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfilePage;