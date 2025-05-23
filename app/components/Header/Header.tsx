'use client';

import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky h-[50px] top-0 z-42 bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-b border-blue-500">
      <div className="container mx-auto max-w-6xl px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <span className="text-xl font-bold text-white">🏠</span>
            <span className="text-xl font-bold text-white">Maisons Pour Tous</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-3">
            <Link
              href="/"
              className="px-3 py-1 rounded-md bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
            >
              Accueil
            </Link>
            <Link
              href="/maisons-pour-tous"
              className="px-3 py-1 rounded-md bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
            >
              Maisons
            </Link>
            <Link
              href="/activites"
              className="px-3 py-1 rounded-md bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
            >
              Activités
            </Link>
            <Link
              href="/tarifs"
              className="px-3 py-1 rounded-md bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
            >
              Tarifs
            </Link>
            <Link
              href="/infos-pratiques"
              className="px-3 py-1 rounded-md bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
            >
              Infos
            </Link>
            <Link
              href="/completer-pdf"
              className="px-3 py-1 rounded-md bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
            >
              PDF d'inscription
            </Link>
          </nav>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-blue-100 hover:text-white"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-indigo-700 border-t border-blue-500">
          <div className="container mx-auto max-w-6xl px-4 py-2">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-md bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Accueil
              </Link>
              <Link
                href="/maisons-pour-tous"
                className="px-3 py-1.5 rounded-md bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Maisons Pour Tous
              </Link>
              <Link
                href="/activites"
                className="px-3 py-1.5 rounded-md bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Activités
              </Link>
              <Link
                href="/tarifs"
                className="px-3 py-1.5 rounded-md bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Tarifs
              </Link>
              <Link
                href="/infos-pratiques"
                className="px-3 py-1.5 rounded-md bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Infos
              </Link>
              <Link
                href="/completer-pdf"
                className="px-3 py-1.5 rounded-md bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
                onClick={handleLinkClick}
              >
                PDF d'inscription
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
