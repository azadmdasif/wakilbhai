
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TEXTS } from '../constants';
import { PenSquareIcon, UserIcon, BriefcaseIcon, GovernmentIcon } from '../components/Icons'; // Using service icons for visual flair

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-gray-900 rounded-2xl p-8 transform transition-all duration-300 hover:shadow-xl hover:shadow-brand-red/20 hover:-translate-y-1">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full border-2 border-brand-gold mr-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white font-display">{title}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
  </div>
);

const WhyWakilBhaiPage: React.FC = () => {
  const { language } = useLanguage();
  const T = TEXTS[language].whyUs;

  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">{T.title}</h1>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">{T.subtitle}</p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <FeatureCard 
            icon={<PenSquareIcon className="w-6 h-6 text-brand-gold" />}
            title={T.feature1Title} 
            description={T.feature1Desc} 
        />
        <FeatureCard 
            icon={<BriefcaseIcon className="w-6 h-6 text-brand-gold" />}
            title={T.feature2Title} 
            description={T.feature2Desc} 
        />
        <FeatureCard 
            icon={<GovernmentIcon className="w-6 h-6 text-brand-gold" />}
            title={T.feature3Title} 
            description={T.feature3Desc} 
        />
        <FeatureCard 
            icon={<UserIcon className="w-6 h-6 text-brand-gold" />}
            title={T.feature4Title} 
            description={T.feature4Desc} 
        />
      </section>
    </div>
  );
};

export default WhyWakilBhaiPage;
