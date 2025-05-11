'use client';

import Image from 'next/image';

export default function DetailFicheInscription() {
  return (
    <div>
      <h4 className="font-semibold text-base text-gray-800 mb-2">
        Détail de la fiche d'inscription
      </h4>
      <div className="flex items-center gap-6 mb-2">
        <div className="flex gap-4">
          <div className="w-20 h-28 bg-gray-100 rounded shadow-md flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer -rotate-6">
            <Image
              src="/MPT-Fiche-inscription-MPT_page-0001.jpg"
              alt="Aperçu fiche 1"
              className="w-full h-full object-contain"
              width={80}
              height={112}
              priority
            />
          </div>
          <div className="w-20 h-28 bg-gray-100 rounded shadow-md flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer rotate-6">
            <Image
              src="/MPT-Fiche-inscription-MPT_page-0002.jpg"
              alt="Aperçu fiche 2"
              className="w-full h-full object-contain"
              width={80}
              height={112}
              priority
            />
          </div>
        </div>
        <a
          href="/completer-pdf"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 shadow font-medium text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          Remplir le formulaire
        </a>
      </div>
    </div>
  );
}
