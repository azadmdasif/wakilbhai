
import React, { ReactNode, useEffect, useState } from 'react';
import { XIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
        // Delay showing to allow for mounting and transition
        const timer = setTimeout(() => setShow(true), 10);
        return () => clearTimeout(timer);
    } else {
        setShow(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-gray-900 rounded-2xl shadow-xl w-full max-w-3xl m-4 max-h-[90vh] flex flex-col transform transition-all duration-300 ease-out ${show ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-10'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white font-display">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full p-2 transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto">
          <div className="text-gray-300 leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
