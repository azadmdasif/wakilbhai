import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TwitterIcon, FacebookIcon, LinkedInIcon } from './Icons';
import Modal from './Modal';
import { useLanguage } from '../contexts/LanguageContext';
import { TEXTS } from '../constants';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { language } = useLanguage();
  const T = TEXTS[language];
  const navT = T.nav;
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const openModal = (type: 'disclaimer' | 'privacy' | 'terms') => {
    if (type === 'disclaimer') {
      setModalContent({ title: T.legal.disclaimerTitle, content: T.legal.disclaimerContent });
    } else if (type === 'privacy') {
      setModalContent({ title: T.legal.privacyTitle, content: T.legal.privacyContent });
    } else if (type === 'terms') {
      setModalContent({ title: T.legal.termsTitle, content: T.legal.termsContent });
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <>
      <footer className="bg-black text-gray-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-2">
              <NavLink to="/" className="flex items-center space-x-3">
                  <img src="/logo.png" alt="WakilBhai Logo" className="h-14 w-auto" />
                  <span className="font-display text-2xl font-bold tracking-wider">
                      <span className="text-white">Wakil</span>
                      <span className="text-brand-gold">Bhai</span>
                  </span>
              </NavLink>
              <p className="text-sm"> Your Local Lawyer!</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-brand-gold transition-colors"><TwitterIcon className="h-6 w-6" /></a>
                <a href="#" className="hover:text-brand-gold transition-colors"><FacebookIcon className="h-6 w-6" /></a>
                <a href="#" className="hover:text-brand-gold transition-colors"><LinkedInIcon className="h-6 w-6" /></a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><NavLink to="/" className="hover:text-brand-gold transition-colors">{navT.home}</NavLink></li>
                <li><NavLink to="/services" className="hover:text-brand-gold transition-colors">{navT.services}</NavLink></li>
                <li><NavLink to="/pricing" className="hover:text-brand-gold transition-colors">{navT.pricing}</NavLink></li>
                <li><NavLink to="/talk-to-a-lawyer" className="hover:text-brand-gold transition-colors">{navT.ask}</NavLink></li>
                <li><NavLink to="/why-wakilbhai" className="hover:text-brand-gold transition-colors">{navT.whyUs}</NavLink></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><NavLink to="/lawyers" className="hover:text-brand-gold transition-colors">{navT.findLawyer}</NavLink></li>
                <li><NavLink to="/blog" className="hover:text-brand-gold transition-colors">{navT.blog}</NavLink></li>
                <li><NavLink to="/help-guides" className="hover:text-brand-gold transition-colors">{navT.guides}</NavLink></li>
                <li><button onClick={() => openModal('privacy')} className="hover:text-brand-gold transition-colors text-left">{T.legal.privacyTitle}</button></li>
                <li><button onClick={() => openModal('terms')} className="hover:text-brand-gold transition-colors text-left">{T.legal.termsTitle}</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {year} WakilBhai. All Rights Reserved.</p>
            <p className="mt-2 text-xs max-w-2xl mx-auto">
              <strong>Disclaimer:</strong> WakilBhai is a documentation service platform. The information on this website is for informational purposes only. We connect users with legal professionals only when necessary for document attestation or specific legal consultation.
            </p>
          </div>
        </div>
      </footer>
      <Modal isOpen={!!modalContent} onClose={closeModal} title={modalContent?.title || ''}>
        {modalContent?.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </Modal>
    </>
  );
};

export default Footer;
