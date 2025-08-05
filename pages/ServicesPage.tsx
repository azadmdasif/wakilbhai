
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { SERVICES, TEXTS, PRICING } from '../constants';
import type { Service } from '../types';
import { ArrowRightIcon } from '../components/Icons';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const { language } = useLanguage();
  const { title, description, icon: Icon } = service;
  const serviceName = encodeURIComponent(title[language]);

  return (
    <div className="bg-gray-900 rounded-2xl p-8 flex flex-col text-center items-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/20">
      <div className="w-20 h-20 mb-6 flex items-center justify-center bg-gray-800 rounded-full border-2 border-brand-gold">
        <Icon className="w-10 h-10 text-brand-gold" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 font-display">{title[language]}</h3>
      <p className="text-gray-400 flex-grow mb-6">{description[language]}</p>
      <NavLink to={`/request-service?service=${serviceName}`} className="font-semibold text-brand-gold hover:text-yellow-300 flex items-center group">
        Start Request <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </NavLink>
    </div>
  );
};

const ServicesPage: React.FC = () => {
    const { language } = useLanguage();
    const T = TEXTS[language].services;
    
    const categories = Array.from(new Set(SERVICES.map(s => s.category)));

    const getCategoryId = (category: string) => {
        return category.toLowerCase().replace(/ & /g, '-').replace(/[/ ]/g, '-').replace(/--/g, '-');
    }

    const handleScrollToCategory = (category: string) => {
        const element = document.getElementById(getCategoryId(category));
        const headerOffset = 100; // Height of sticky header + some space
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    return (
        <div className="space-y-16">
            <section className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">{T.title}</h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                    {T.subtitle}
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    {categories.map(category => {
                        const Icon = SERVICES.find(s => s.category === category)?.icon;
                        return (
                            <button
                                key={category}
                                onClick={() => handleScrollToCategory(category)}
                                className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-3 text-lg font-bold bg-gray-800 text-white px-6 py-4 rounded-xl hover:bg-brand-red hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                            >
                                {Icon && <Icon className="w-6 h-6" />}
                                {category}
                            </button>
                        )
                    })}
                </div>
            </section>
        
            {categories.map(category => (
                <section key={category} id={getCategoryId(category)}>
                    <h2 className="text-3xl font-bold text-white mb-8 font-display border-b-2 border-brand-red pb-2 sticky top-[80px] bg-brand-dark/80 backdrop-blur-sm py-2 z-10">
                        {category}
                        {PRICING[category as keyof typeof PRICING] && (
                            <span className="text-lg font-semibold text-gray-400 ml-3">
                                (₹{PRICING[category as keyof typeof PRICING]} onwards)
                            </span>
                        )}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SERVICES.filter(s => s.category === category).map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default ServicesPage;