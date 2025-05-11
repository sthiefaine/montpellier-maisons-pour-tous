import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function InfoSection() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Infos Pratiques</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inscription */}
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  📝
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Inscription</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Carte d'inscription obligatoire pour accéder aux activités. Cotisation différenciée
                selon votre profil.
              </p>
              <Link
                href="/infos-pratiques#inscription"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
              >
                En savoir plus
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            {/* Animations */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  🎉
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Animations</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Plus de 2600 événements par an : spectacles, expositions, manifestations festives...
              </p>
              <Link
                href="/infos-pratiques#animations"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                En savoir plus
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            {/* Tarifs */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  💰
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Tarifs</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Découvrez nos tarifs adaptés à votre situation et les différentes formules
                d'abonnement disponibles.
              </p>
              <Link
                href="/tarifs"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
              >
                En savoir plus
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  📞
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Contact</h3>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p className="text-gray-600">Service des Maisons pour Tous - Pôle Solidarités</p>
                <Link
                  href="/infos-pratiques#contact"
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                >
                  En savoir plus
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
