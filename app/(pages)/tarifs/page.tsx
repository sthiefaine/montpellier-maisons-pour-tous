import Link from 'next/link';
import DetailFicheInscription from '@/app/components/DetailFicheInscription';

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
          <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
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
                <DetailFicheInscription />
            </div>
          </section>

          {/* Carte d'adhésion */}
          <section className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-4 shadow-sm border border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6">Carte d'adhésion</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-indigo-100/50">
                    <th className="px-2 py-2 text-left text-indigo-900 font-semibold">Type</th>
                    <th className="px-1 py-2 text-right text-indigo-900 font-semibold">Tarif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-100">
                  <tr className="hover:bg-indigo-50/50">
                    <td className="px-2 py-2 text-gray-600">Adulte</td>
                    <td className="px-1 py-2 text-right text-indigo-900 font-medium whitespace-nowrap">
                      7,00&nbsp;€
                    </td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50">
                    <td className="px-2 py-2 text-gray-600">Enfants (moins de 18 ans)</td>
                    <td className="px-1 py-2 text-right text-indigo-900 font-medium whitespace-nowrap">
                      3,50&nbsp;€
                    </td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50">
                    <td className="px-2 py-2 text-gray-600">Détenteur du Pass Culture</td>
                    <td className="px-1 py-2 text-right text-indigo-900 font-medium whitespace-nowrap">
                      Gratuit
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">
                Cette carte permet d'accéder à certains ateliers ponctuels et manifestations
                proposés par les Maisons pour Tous sans tarification supplémentaire.
              </p>
            </div>
          </section>

          {/* Activités musicales */}
          <section className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 shadow-sm border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Activités musicales</h2>
            <div className="overflow-x-auto">
              <table className="w-full mt-8">
                <thead>
                  <tr className="bg-blue-100/50">
                    <th className="px-2 py-2 text-left text-blue-900 font-semibold">
                      Activités musicales
                    </th>
                    <th className="px-1 py-2 text-right text-blue-900 font-semibold">Musique</th>
                    <th className="px-1 py-2 text-right text-blue-900 font-semibold">
                      Musique et solfège 1h/semaine
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  <tr className="hover:bg-blue-50/50">
                    <td className="px-2 py-2 text-gray-600">
                      Tarification séances de musique à 1 élève (30 séances minimum par an d'1
                      heure/semaine)
                    </td>
                    <td className="px-1 py-2 text-right text-blue-900 font-medium whitespace-nowrap">
                      500,00&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-blue-900 font-medium whitespace-nowrap">
                      580,00&nbsp;€
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50/50">
                    <td className="px-2 py-2 text-gray-600">
                      Tarification séances de musique à 2 élèves /heure ou 30 mn par élève (30
                      séances minimum par an d'1 heure/semaine)
                    </td>
                    <td className="px-1 py-2 text-right text-blue-900 font-medium whitespace-nowrap">
                      380,00&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-blue-900 font-medium whitespace-nowrap">
                      460,00&nbsp;€
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50/50">
                    <td className="px-2 py-2 text-gray-600">
                      Tarification séances de musique à 3 élèves/heure ou 20 mn par élève (30
                      séances minimum par an d'1 heure/semaine)
                    </td>
                    <td className="px-1 py-2 text-right text-blue-900 font-medium whitespace-nowrap">
                      250,00&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-blue-900 font-medium whitespace-nowrap">
                      330,00&nbsp;€
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50/50">
                    <td className="px-2 py-2 text-gray-600">Cours collectif d'1h</td>
                    <td className="px-1 py-2 text-right text-blue-900 font-medium whitespace-nowrap">
                      135,00&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-blue-900 font-medium whitespace-nowrap"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Réductions */}
          <section className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 shadow-sm border border-purple-100">
            <h2 className="text-2xl font-bold text-purple-900 mb-6">Les réductions :</h2>
            <div className="overflow-x-auto">
              <table className="w-full mb-6">
                <thead>
                  <tr className="bg-purple-100/50">
                    <th className="px-2 py-2 text-left text-purple-900 font-semibold" colSpan={2}>
                      Réductions accordées pour les activités collectives et cours individuels
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100">
                  <tr>
                    <td className="px-2 py-2 text-gray-700">
                      Familles monoparentales sur présentation d'un justificatif, réduction
                      applicable pour le parent et les enfants
                    </td>
                    <td className="px-2 py-2 text-right text-purple-900 font-medium">50%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-700">
                      Étudiants (engagés dans un cursus d'enseignement supérieur), lycéens et
                      détenteurs du Pass Culture
                    </td>
                    <td className="px-2 py-2 text-right text-purple-900 font-medium">50%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-700">
                      Bénéficiaires de l'allocation temporaire d'attente (ATA), solidarité
                      spécifique, supplémentaire de retraite, revenu de solidarité active (RSA)
                    </td>
                    <td className="px-2 py-2 text-right text-purple-900 font-medium">50%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-700">
                      Adhérents de Groupe d'Entraide Mutuelle (GEM)
                    </td>
                    <td className="px-2 py-2 text-right text-purple-900 font-medium">50%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-700">
                      Personnes en situation de handicap sur présentation d'une carte d'invalidité
                      de 80% minimum
                    </td>
                    <td className="px-2 py-2 text-right text-purple-900 font-medium">50%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-700">
                      Réduction comité d'entreprises (COSC...)
                    </td>
                    <td className="px-2 py-2 text-right text-purple-900 font-medium">20%</td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full mb-6">
                <thead>
                  <tr className="bg-purple-100/50">
                    <th className="px-2 py-2 text-left text-purple-900 font-semibold" colSpan={2}>
                      Réductions pour les familles nombreuses
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100">
                  <tr>
                    <td className="px-2 py-2 text-gray-700">
                      Pour les enfants de familles de 3 enfants
                    </td>
                    <td className="px-2 py-2 text-right text-purple-900 font-medium">30%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-700">
                      Pour les enfants de familles de 4 enfants
                    </td>
                    <td className="px-2 py-2 text-right text-purple-900 font-medium">40%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-700">
                      Pour les enfants de familles de 5 enfants
                    </td>
                    <td className="px-2 py-2 text-right text-purple-900 font-medium">50%</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-purple-900 mb-2">
                Pour les inscriptions en cours d'année, il sera appliqué le plein tarif jusqu'à
                octobre puis une cotisation calculée au prorata temporis à compter de novembre des
                mois restants à faire jusqu'à la fin de la session.
              </p>
            </div>
          </section>

          {/* Tarification par type d'activité */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 shadow-sm border border-green-100">
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Tarification par type d'activité
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-100/50">
                    <th className="px-2 py-2 text-left text-green-900 font-semibold">
                      Type d'activité
                    </th>
                    <th className="px-1 py-2 text-right text-green-900 font-semibold">
                      Plein tarif
                    </th>
                    <th className="px-1 py-2 text-right text-green-900 font-semibold">-20%</th>
                    <th className="px-1 py-2 text-right text-green-900 font-semibold">-30%</th>
                    <th className="px-1 py-2 text-right text-green-900 font-semibold">-40%</th>
                    <th className="px-1 py-2 text-right text-green-900 font-semibold">-50%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-100">
                  <tr>
                    <td className="px-2 py-2 text-gray-600">Cours collectifs 1h/semaine</td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      135&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      108&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      94,5&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      81&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      67,5&nbsp;€
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-600">Cours collectifs 1h30/semaine</td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      215&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      172&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      150,5&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      129&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      107,5&nbsp;€
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-600">Cours collectifs 2h/semaine</td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      275&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      220&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      192,5&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      165&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      137,5&nbsp;€
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-600">Cours collectifs 3h/semaine</td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      295&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      236&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      206,5&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      177&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      147,5&nbsp;€
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-600">
                      Séances de musique individuel 1h/semaine
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      500&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      400&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      350&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      300&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      250&nbsp;€
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-600">
                      Séances de musique à 2 élèves /heure ou 30 mn par élève
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      380&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      304&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      266&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      228&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      190&nbsp;€
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-600">
                      Séances de musique à 3 élèves/heure ou 20 mn par élève
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      250&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      200&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      175&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      150&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      125&nbsp;€
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-600">
                      Cours collectif de solfège 1h/semaine
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      80&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      64&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      56&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      48&nbsp;€
                    </td>
                    <td className="px-1 py-2 text-right text-green-900 font-medium whitespace-nowrap">
                      40&nbsp;€
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Conditions de remboursement */}
          <section className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-4 shadow-sm border border-yellow-100 mt-12">
            <h2 className="text-2xl font-bold text-yellow-900 mb-4">
              Conditions de remboursement&nbsp;:
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold text-green-700">
                Un remboursement facile, simple et rapide&nbsp;!
              </span>
            </p>
            <p className="text-gray-700">
              Nous mettons tout en œuvre pour que votre remboursement soit le plus serein possible.
              Si vous devez interrompre une activité pour l'une des raisons suivantes&nbsp;:
              cessation de l'activité de la part de la Maison pour Tous, raison médicale, changement
              d'emploi ou de temps professionnel, déménagement, perte d'emploi (à la date de prise
              d'effet de la nouvelle situation), il vous suffit de présenter un justificatif. La
              démarche est rapide et notre équipe vous accompagne pour que tout soit simple et sans
              stress.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
