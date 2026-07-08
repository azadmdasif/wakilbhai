import React from 'react';
import { WhatsAppIcon } from './Icons';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/917686022245" // Updated WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-whatsapp text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-110 z-50"
      aria-label="Contact us on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8" />
    </a>
  );
};

export default WhatsAppButton;