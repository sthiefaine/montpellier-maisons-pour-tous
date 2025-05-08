import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { StatisticsType } from '@/types';

interface HowItWorksSectionProps {
  statistics: StatisticsType;
}

export default function HowItWorksSection({ statistics }: HowItWorksSectionProps) {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
          <p className="text-lg text-gray-600">
            Rejoignez les Maisons pour Tous en quelques étapes simples
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Étape 1 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                1
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl mb-4 mx-auto">
                  📝
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  Je m'inscris
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  Récupérez votre carte d'inscription à l'accueil de votre Maison pour Tous
                  préférée.
                </p>
                <div className="text-center">
                  <Link
                    href="/infos-pratiques#inscription"
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                  >
                    En savoir plus
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                2
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-2xl mb-4 mx-auto">
                  🎯
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  Je choisis mes activités
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  Découvrez nos {statistics.uniqueActivities} activités et inscrivez-vous à celles
                  qui vous plaisent.
                </p>
                <div className="text-center">
                  <Link
                    href="/activites"
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
                  >
                    Découvrir les activités
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                3
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-2xl mb-4 mx-auto">
                  🎉
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  Je participe
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  Rejoignez vos cours et profitez des animations tout au long de l'année !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
