import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { TEXTS } from '../constants';
import type { Language } from '../types';
import { MenuIcon, XIcon, ChevronDownIcon } from './Icons';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const languages: { code: Language; label: string, native: string }[] = [
        { code: 'en', label: 'EN', native: 'English' },
        { code: 'hi', label: 'हिंदी', native: 'Hindi' },
        { code: 'ur', label: 'اُردُو', native: 'Urdu' },
        { code: 'bn', label: 'বাংলা', native: 'Bengali' },
    ];

    return (
        <div className="flex items-center space-x-1 bg-gray-800 rounded-full p-1">
            {languages.map(lang => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${language === lang.code ? 'bg-brand-red text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    title={lang.native}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
};

const Dropdown: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref]);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-5 py-2 rounded-full text-lg font-bold transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 text-gray-300 hover:bg-gray-800 hover:text-white flex items-center"
            >
                {title}
                <ChevronDownIcon className={`w-5 h-5 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-10 py-2">
                    {children}
                </div>
            )}
        </div>
    );
};

const DropdownLink: React.FC<{ to: string, text: string, onClick?: () => void }> = ({ to, text, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => `block px-4 py-2 text-base w-full text-left ${
            isActive ? 'bg-brand-red text-white' : 'text-gray-300 hover:bg-gray-800'
        }`}
    >
        {text}
    </NavLink>
);


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const { language } = useLanguage();
  const navTexts = TEXTS[language].nav;
  
  const navLinks = [
    { to: '/', text: navTexts.home },
    { to: '/services', text: navTexts.services },
    { to: '/pricing', text: navTexts.pricing },
    { to: '/talk-to-a-lawyer', text: navTexts.ask },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-5 py-2 rounded-full text-lg font-bold transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 ${
      isActive
        ? 'bg-brand-red text-white shadow-lg shadow-brand-red/40'
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`;
  
  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block text-center px-4 py-3 rounded-lg text-xl font-bold transition-colors ${
      isActive
        ? 'bg-brand-red text-white shadow-md shadow-brand-red/30'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
  }

  return (
    <header className="bg-black/50 backdrop-blur-sm sticky top-0 z-50 shadow-md shadow-brand-red/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="WakilBhai Logo" className="h-10 w-auto" />
              <span className="font-display text-2xl font-bold tracking-wider">
                <span className="text-white">Wakil</span>
                <span className="text-brand-gold">Bhai</span>
              </span>
            </NavLink>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-2">
              {navLinks.map(link => (
                <NavLink key={link.to} to={link.to} className={linkClass}>
                  {link.text}
                </NavLink>
              ))}
              <Dropdown title={navTexts.resources}>
                <DropdownLink to="/blog" text={navTexts.blog} />
                <DropdownLink to="/help-guides" text={navTexts.guides} />
                <DropdownLink to="/documents" text={navTexts.documents} />
                <DropdownLink to="/why-wakilbhai" text={navTexts.whyUs} />
                <DropdownLink to="/contact" text={navTexts.contact} />
              </Dropdown>
            </div>
          </div>
          <div className="hidden lg:block">
             <LanguageSwitcher />
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={mobileLinkClass} onClick={closeMobileMenu}>
                {link.text}
              </NavLink>
            ))}
             <div className="border-t border-gray-700 my-2"></div>
             
             <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="w-full flex justify-between items-center text-left text-gray-400 px-4 py-3 rounded-lg text-xl font-bold transition-colors hover:bg-gray-700 hover:text-white"
            >
                <span>{navTexts.resources}</span>
                <ChevronDownIcon className={`w-6 h-6 transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isResourcesOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="pl-4 pt-2 space-y-2">
                    <NavLink to="/blog" className={mobileLinkClass} onClick={closeMobileMenu}>{navTexts.blog}</NavLink>
                    <NavLink to="/help-guides" className={mobileLinkClass} onClick={closeMobileMenu}>{navTexts.guides}</NavLink>
                    <NavLink to="/documents" className={mobileLinkClass} onClick={closeMobileMenu}>{navTexts.documents}</NavLink>
                    <NavLink to="/why-wakilbhai" className={mobileLinkClass} onClick={closeMobileMenu}>{navTexts.whyUs}</NavLink>
                    <NavLink to="/contact" className={mobileLinkClass} onClick={closeMobileMenu}>{navTexts.contact}</NavLink>
                </div>
            </div>
          </div>
          <div className="pb-4 border-t border-gray-700 mt-2 pt-4">
            <div className="flex justify-center">
                <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;