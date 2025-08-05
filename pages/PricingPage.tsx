
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { TEXTS, PRICING, SERVICES } from '../constants';
import { ArrowRightIcon, PenSquareIcon } from '../components/Icons';
import type { Service } from '../types';

const PricingCard: React.FC<{ category: Service['category'], price: number, T: any }> = ({ category, price, T }) => {
    
    const categoryServices = SERVICES.filter(s => s.category === category).slice(0, 3);
    const Icon = SERVICES.find(s => s.category === category)?.icon || PenSquareIcon;
    const { language } = useLanguage();

    const handleViewServices = () => {
        // This is a placeholder for a potential scroll-to-category function
    };

    return (
        <div className="bg-gray-900 rounded-2xl p-8 flex flex-col text-center items-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/20 border-2 border-gray-800 hover:border-brand-red">
            <div className="w-20 h-20 mb-6 flex items-center justify-center bg-gray-800 rounded-full border-2 border-brand-gold">
                <Icon className="w-10 h-10 text-brand-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-display">{category}</h3>
            <p className="text-4xl font-extrabold text-white mb-2 font-display">
                <span className="text-xl font-semibold align-top">₹</span>
                {price}
                <span className="text-base font-semibold text-gray-400">/{T.onwards}</span>
            </p>
            <p className="text-gray-400 mb-6">starting price for documents in this category.</p>
            
            <ul className="space-y-2 text-gray-300 text-left mb-8 flex-grow">
                {categoryServices.map(service => (
                    <li key={service.id} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        {service.title[language]}
                    </li>
                ))}
            </ul>

            <NavLink to={`/services`} onClick={handleViewServices} className="w-full mt-auto font-semibold bg-brand-red text-white py-3 px-6 rounded-full hover:bg-red-700 flex items-center justify-center group">
                {T.viewServices} <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </NavLink>
        </div>
    );
};


const PricingPage: React.FC = () => {
    const { language } = useLanguage();
    const T = TEXTS[language].pricing;
    const categories = Object.keys(PRICING) as Array<keyof typeof PRICING>;

    return (
        <div className="space-y-16">
            <section className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">{T.title}</h1>
                <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">{T.subtitle}</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {categories.map(category => (
                    <PricingCard 
                        key={category}
                        category={category}
                        price={PRICING[category]}
                        T={T}
                    />
                ))}
            </section>
        </div>
    );
};

export default PricingPage;
