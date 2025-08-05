import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { TEXTS, TESTIMONIALS, SERVICES } from '../constants';
import { ArrowRightIcon, HelpIcon, PenSquareIcon, StarIcon, DocumentIcon } from '../components/Icons';

const CtaButton: React.FC<{ to: string, text: string, primary?: boolean }> = ({ to, text, primary = false}) => (
    <NavLink 
        to={to} 
        className={`font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 ${
            primary 
            ? 'bg-brand-red text-white hover:bg-red-700' 
            : 'bg-gray-700 text-white hover:bg-gray-600'
        }`}
    >
        {text}
    </NavLink>
);

const HowItWorksStep: React.FC<{ icon: React.ReactNode; title: string; description: string; step: number; }> = ({ icon, title, description, step }) => (
    <div className="text-center relative">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full border-2 border-brand-gold relative">
            {icon}
            <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-dark w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg">{step}</span>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-white font-display">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const TestimonialCard: React.FC<{ name: string; location: string; feedback: string; }> = ({ name, location, feedback }) => (
    <div className="bg-gray-900 p-8 rounded-2xl shadow-lg h-full flex flex-col">
        <div className="flex-grow">
            <div className="flex mb-4">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-brand-gold" />)}
            </div>
            <p className="text-gray-300 italic">"{feedback}"</p>
        </div>
        <div className="mt-6">
            <p className="font-bold text-white">{name}</p>
            <p className="text-sm text-gray-500">{location}</p>
        </div>
    </div>
);

const ServicePreviewCard: React.FC<{ title: string; to: string; icon: React.ReactNode }> = ({ title, to, icon }) => (
    <NavLink to={to} className="group bg-gray-900 rounded-2xl p-6 text-center hover:bg-brand-red transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-brand-red/30">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2 font-display">{title}</h3>
        <span className="text-brand-gold font-semibold group-hover:text-white transition-colors duration-300 flex items-center justify-center text-sm">
            Learn More <ArrowRightIcon className="ml-2 h-4 w-4" />
        </span>
    </NavLink>
);


const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const T = TEXTS[language].home;
  
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center rounded-3xl overflow-hidden" 
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center pt-32 pb-40 px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white font-display tracking-tight mb-4">
              {T.heroTitle}
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-10">
              {T.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <CtaButton to="/services" text={T.ctaDocuments} primary />
                <CtaButton to="/talk-to-a-lawyer" text={T.ctaAsk} />
            </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section>
        <h2 className="text-4xl font-bold text-center text-white mb-16 font-display">{T.howItWorksTitle}</h2>
        <div className="grid md:grid-cols-3 gap-12 items-start relative">
            <div className="absolute top-12 left-0 right-0 h-1 hidden md:block">
                <svg width="100%" height="100%"><line x1="16.66%" y1="50%" x2="83.33%" y2="50%" strokeDasharray="5, 10" stroke="#4B5563" strokeWidth="2"></line></svg>
            </div>
            <HowItWorksStep icon={<HelpIcon className="w-12 h-12 text-brand-gold" />} title={T.howItWorksStep1Title} description={T.howItWorksStep1Desc} step={1} />
            <HowItWorksStep icon={<PenSquareIcon className="w-12 h-12 text-brand-gold" />} title={T.howItWorksStep2Title} description={T.howItWorksStep2Desc} step={2} />
            <HowItWorksStep icon={<DocumentIcon className="w-12 h-12 text-brand-gold" />} title={T.howItWorksStep3Title} description={T.howItWorksStep3Desc} step={3} />
        </div>
      </section>
      
      {/* Popular Services Section */}
      <section>
        <h2 className="text-4xl font-bold text-center text-white mb-16 font-display">{T.servicesTitle}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.slice(0, 4).map(service => (
                <ServicePreviewCard 
                    key={service.id}
                    title={service.title[language]} 
                    to="/services"
                    icon={<service.icon className="w-16 h-16 text-brand-gold group-hover:text-white transition-colors duration-300"/>} 
                />
            ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-4xl font-bold text-center text-white mb-16 font-display">{T.testimonialsTitle}</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(testimonial => (
                <TestimonialCard key={testimonial.id} name={testimonial.name} location={testimonial.location} feedback={testimonial.feedback[language]} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
