'use client';

import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky h-[60px] top-0 z-40 bg-white border-b border-gray-200">
      <div className="container mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">🏠</span>
            <span className="text-xl font-bold text-gray-900">Maisons Pour Tous</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Accueil
            </Link>
            <Link
              href="/maisons-pour-tous"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Maisons
            </Link>
            <Link href="/activites" className="text-gray-600 hover:text-gray-900 transition-colors">
              Activités
            </Link>
          </nav>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-6xl px-4 py-2">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors py-2">
                Accueil
              </Link>
              <Link
                href="/mpt"
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                MPT
              </Link>
              <Link
                href="/activites"
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Activités
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
