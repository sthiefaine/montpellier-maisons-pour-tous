import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div>
          <h3 className="text-lg font-semibold mb-4">À propos</h3>
          <p className="text-gray-400 mb-4">
            Les Maisons Pour Tous de Montpellier proposent des activités culturelles, sportives et
            sociales pour tous les âges.
          </p>
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
