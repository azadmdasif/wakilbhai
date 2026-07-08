'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { localePath, splitLocaleFromPath, type Locale } from '@/lib/i18n';
import LocaleSwitcher from './LocaleSwitcher';
import { MenuIcon, XIcon, ChevronDownIcon } from './Icons';

interface NavItem {
  path: string;
  text: string;
}

interface HeaderProps {
  locale: Locale;
  nav: NavItem[];
  resources: { label: string; items: NavItem[] };
}

function Dropdown({ title, children }: { title: string; children: React.ReactNode }) {
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
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-full text-base font-bold transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 text-gray-300 hover:bg-gray-800 hover:text-white flex items-center"
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDownIcon className={`w-5 h-5 ms-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-10 py-2 start-0">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Header({ locale, nav, resources }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const pathname = usePathname() || '/';
  const [, currentPath] = splitLocaleFromPath(pathname);

  const isActive = (path: string) =>
    path === '/' ? currentPath === '/' : currentPath === path || currentPath.startsWith(`${path}/`);

  const href = (path: string) => localePath(locale, path);

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-full text-base font-bold transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 ${
      isActive(path)
        ? 'bg-brand-red text-white shadow-lg shadow-brand-red/40'
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`;

  const mobileLinkClass = (path: string) =>
    `block text-center px-4 py-3 rounded-lg text-xl font-bold transition-colors ${
      isActive(path)
        ? 'bg-brand-red text-white shadow-md shadow-brand-red/30'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
  };

  return (
    <header className="bg-black/50 backdrop-blur-sm sticky top-0 z-50 shadow-md shadow-brand-red/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href={href('/')} className="flex items-center gap-3">
              <Image src="/logo.png" alt="WakilBhai Logo" width={56} height={56} className="h-14 w-auto" />
              <span className="font-display text-2xl font-bold tracking-wider">
                <span className="text-white">Wakil</span>
                <span className="text-brand-gold">Bhai</span>
              </span>
            </Link>
          </div>
          <nav className="hidden lg:block" aria-label="Main">
            <div className="ms-10 flex items-center gap-2">
              {nav.map((link) => (
                <Link key={link.path} href={href(link.path)} className={linkClass(link.path)}>
                  {link.text}
                </Link>
              ))}
              <Dropdown title={resources.label}>
                {resources.items.map((item) => (
                  <Link
                    key={item.path}
                    href={href(item.path)}
                    className={`block px-4 py-2 text-base w-full text-start ${
                      isActive(item.path) ? 'bg-brand-red text-white' : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {item.text}
                  </Link>
                ))}
              </Dropdown>
            </div>
          </nav>
          <div className="hidden lg:block">
            <LocaleSwitcher currentLocale={locale} />
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMenuOpen}
              aria-label="Menu"
            >
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="lg:hidden" aria-label="Main">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {nav.map((link) => (
              <Link key={link.path} href={href(link.path)} className={mobileLinkClass(link.path)} onClick={closeMobileMenu}>
                {link.text}
              </Link>
            ))}
            <div className="border-t border-gray-700 my-2"></div>
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className="w-full flex justify-between items-center text-start text-gray-400 px-4 py-3 rounded-lg text-xl font-bold transition-colors hover:bg-gray-700 hover:text-white"
              aria-expanded={isResourcesOpen}
            >
              <span>{resources.label}</span>
              <ChevronDownIcon className={`w-6 h-6 transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isResourcesOpen ? 'max-h-screen' : 'max-h-0'}`}>
              <div className="ps-4 pt-2 space-y-2">
                {resources.items.map((item) => (
                  <Link key={item.path} href={href(item.path)} className={mobileLinkClass(item.path)} onClick={closeMobileMenu}>
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="pb-4 border-t border-gray-700 mt-2 pt-4">
            <div className="flex justify-center">
              <LocaleSwitcher currentLocale={locale} />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
