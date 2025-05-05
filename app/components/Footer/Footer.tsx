import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">À propos</h3>
            <p className="text-gray-400 mb-4">
              Les Maisons Pour Tous de Montpellier proposent des activités culturelles, sportives et
              sociales pour tous les âges.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/infos-pratiques"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Infos Pratiques
                </Link>
              </li>
              <li>
                <Link 
                  href="/tarifs"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link 
                  href="/plan-du-site"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Plan du site
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              Service des Maisons pour Tous<br />
              Pôle Solidarités<br />
              16 Rue de la République<br />
              34000 Montpellier
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Maisons Pour Tous Montpellier. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
