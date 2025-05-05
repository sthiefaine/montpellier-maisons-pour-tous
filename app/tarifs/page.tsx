import Link from 'next/link';
export default function Tarifs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Tarification des Activités</h1>
              <p className="text-blue-100 text-lg font-medium mb-4">
                Annuelles en Maison Pour Tous
              </p>
            </div>
            <div className="flex space-x-2 text-sm">
              <Link
                href="/"
                className="bg-white/60 hover:bg-white/80 text-blue-900 px-3 py-1 rounded transition-colors"
              >
                Accueil
              </Link>
              <span className="text-blue-200">/</span>
              <span className="bg-blue-900/80 text-white px-3 py-1 rounded font-medium">
                Tarifs
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-6">
              Les Maisons pour Tous de Montpellier proposent environ 500 activités différentes dans
              des domaines variés : activités artistiques, sportives, culturelles, scientifiques,
              cours de langue, etc.
            </p>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Inscription dans les Maisons pour Tous
              </h2>
              <p className="text-gray-600">
                Lors de cette inscription unique, pour l'ensemble des Maisons pour Tous une carte
                nominative sera délivrée pour accéder aux activités des Maisons pour Tous, encadrées
                par les animateurs de la Ville ou par les associations partenaires dans le cadre du
                programme régulier et ponctuel.
              </p>
              <p className="text-gray-600">
                Le dossier d'inscription est à renouveler pour chaque saison au mois de septembre.
              </p>
              <div className="mt-4">
                <a
                  href="/MPT-Fiche-inscription-MPT.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Télécharger le formulaire d'inscription
                </a>
              </div>
            </div>
          </section>

          {/* Carte d'adhésion */}
          <section className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-8 shadow-sm border border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6">Carte d'adhésion</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-indigo-100/50">
                    <th className="px-4 py-3 text-left text-indigo-900 font-semibold">Type</th>
                    <th className="px-4 py-3 text-right text-indigo-900 font-semibold">Tarif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-100">
                  <tr className="hover:bg-indigo-50/50">
                    <td className="px-4 py-3 text-gray-600">Adulte</td>
                    <td className="px-4 py-3 text-right text-indigo-900 font-medium">135.00 €</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50">
                    <td className="px-4 py-3 text-gray-600">Enfants (moins de 18 ans)</td>
                    <td className="px-4 py-3 text-right text-indigo-900 font-medium">40.00 €</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50">
                    <td className="px-4 py-3 text-gray-600">Détenteur du Pass Culture</td>
                    <td className="px-4 py-3 text-right text-indigo-900 font-medium">Gratuit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Activités musicales */}
          <section className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-sm border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Activités musicales</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-100/50">
                    <th className="px-4 py-3 text-left text-blue-900 font-semibold">
                      Type de cours
                    </th>
                    <th className="px-4 py-3 text-right text-blue-900 font-semibold">Tarif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  <tr className="hover:bg-blue-50/50">
                    <td className="px-4 py-3 text-gray-600">
                      Séances de musique à 1 élève (30 séances minimum par an d'1 heure/semaine)
                    </td>
                    <td className="px-4 py-3 text-right text-blue-900 font-medium">500.00 €</td>
                  </tr>
                  <tr className="hover:bg-blue-50/50">
                    <td className="px-4 py-3 text-gray-600">
                      Séances de musique à 2 élèves /heure ou 30 mn par élève
                    </td>
                    <td className="px-4 py-3 text-right text-blue-900 font-medium">380.00 €</td>
                  </tr>
                  <tr className="hover:bg-blue-50/50">
                    <td className="px-4 py-3 text-gray-600">
                      Séances de musique à 3 élèves/heure ou 20 mn par élève
                    </td>
                    <td className="px-4 py-3 text-right text-blue-900 font-medium">250.00 €</td>
                  </tr>
                  <tr className="hover:bg-blue-50/50">
                    <td className="px-4 py-3 text-gray-600">Cours collectif d'1h</td>
                    <td className="px-4 py-3 text-right text-blue-900 font-medium">135.00 €</td>
                  </tr>
                  <tr className="hover:bg-blue-50/50">
                    <td className="px-4 py-3 text-gray-600">Musique et solfège 1h/semaine</td>
                    <td className="px-4 py-3 text-right text-blue-900 font-medium">580.00 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Tarification par type d'activité */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 shadow-sm border border-green-100">
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Tarification par type d'activité
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-100/50">
                    <th className="px-4 py-3 text-left text-green-900 font-semibold">
                      Type d'activité
                    </th>
                    <th className="px-4 py-3 text-right text-green-900 font-semibold">
                      Plein tarif
                    </th>
                    <th className="px-4 py-3 text-right text-green-900 font-semibold">-20%</th>
                    <th className="px-4 py-3 text-right text-green-900 font-semibold">-30%</th>
                    <th className="px-4 py-3 text-right text-green-900 font-semibold">-40%</th>
                    <th className="px-4 py-3 text-right text-green-900 font-semibold">-50%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-100">
                  <tr className="hover:bg-green-50/50">
                    <td className="px-4 py-3 text-gray-600">Cours collectifs 1h/semaine</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">135 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">108 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">94,5 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">81 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">67,5 €</td>
                  </tr>
                  <tr className="hover:bg-green-50/50">
                    <td className="px-4 py-3 text-gray-600">Cours collectifs 1h30/semaine</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">215 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">172 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">150,5 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">129 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">107,5 €</td>
                  </tr>
                  <tr className="hover:bg-green-50/50">
                    <td className="px-4 py-3 text-gray-600">Cours collectifs 2h/semaine</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">275 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">220 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">192,5 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">165 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">137,5 €</td>
                  </tr>
                  <tr className="hover:bg-green-50/50">
                    <td className="px-4 py-3 text-gray-600">Cours collectifs 3h/semaine</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">295 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">236 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">206,5 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">177 €</td>
                    <td className="px-4 py-3 text-right text-green-900 font-medium">147,5 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Réductions */}
          <section className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 shadow-sm border border-purple-100">
            <h2 className="text-2xl font-bold text-purple-900 mb-6">Réductions accordées</h2>

            {/* Réductions de 50% */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Réductions de 50%</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg shrink-0">
                    50%
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Familles monoparentales</p>
                    <p className="text-gray-600 text-sm mt-1">Sur présentation d'un justificatif</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg shrink-0">
                    50%
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Étudiants et lycéens</p>
                    <p className="text-gray-600 text-sm mt-1">Carte étudiant ou Pass Culture</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg shrink-0">
                    50%
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Bénéficiaires sociaux</p>
                    <p className="text-gray-600 text-sm mt-1">ATA, RSA, etc.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg shrink-0">
                    50%
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Personnes en situation de handicap</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Taux d'incapacité ≥ 80% (sur présentation d'un justificatif)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Autres réductions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Autres réductions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg shrink-0">
                    20%
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Comité d'entreprise</p>
                    <p className="text-gray-600 text-sm mt-1">Sur présentation d'un justificatif</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Réductions familles nombreuses */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">
                Réductions familles nombreuses
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
                    30%
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">3 enfants</p>
                    <p className="text-gray-600 text-sm">Réduction automatique</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
                    40%
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">4 enfants</p>
                    <p className="text-gray-600 text-sm">Réduction automatique</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
                    50%
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">5 enfants</p>
                    <p className="text-gray-600 text-sm">Réduction automatique</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
