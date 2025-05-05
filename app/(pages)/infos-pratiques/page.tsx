import Link from 'next/link';

export default function InfosPratiques() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Infos Pratiques</h1>
              <p className="text-blue-100 text-lg font-medium mb-4">
                Tout ce qu'il faut savoir sur les Maisons Pour Tous
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
                Infos Pratiques
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Section Inscription */}
            <section id="inscription" className="scroll-mt-20">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Inscription</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      Carte d'inscription
                    </h3>
                    <p className="text-gray-600 mb-4 text-lg">
                      La carte d'inscription au réseau des Maisons pour Tous est obligatoire et est
                      à retirer à l'accueil de la Maison pour Tous choisie contre une cotisation
                      différenciée Adulte/Enfant.
                    </p>
                    <p className="text-gray-600 mb-4 text-lg">
                      Elle permet de s'inscrire à une ou plusieurs activités sur l'ensemble du
                      réseau, de septembre à juillet.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Pièces à fournir</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-6 shadow-md">
                        <h4 className="font-semibold text-gray-900 mb-4 text-lg">Pour tous</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg">
                          <li>Fiche de renseignement à compléter</li>
                          <li>Justificatif de domicile de moins de 3 mois</li>
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-6 shadow-md">
                        <h4 className="font-semibold text-gray-900 mb-4 text-lg">Pour les mineurs</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg">
                          <li>Extrait d'acte de naissance ou livret de famille</li>
                          <li>Attestation CAF ou avis d'imposition</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cotisation</h3>
                    <p className="text-gray-600 mb-4 text-lg">
                      La cotisation pour chacune des activités est établie en fonction :
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-3 ml-4 text-lg">
                      <li>de la durée et de la régularité de l'activité choisie</li>
                      <li>de la nature de l'activité (individuelle ou collective)</li>
                      <li>
                        de votre situation personnelle (étudiants, RSA, familles nombreuses...)
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Link 
                        href="/tarifs"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        Consulter les tarifs détaillés
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section Animations */}
            <section id="animations" className="scroll-mt-20">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Animations</h2>

                <div className="space-y-8">
                  <p className="text-gray-600 text-lg">
                    En moyenne chaque année, plus de 2600 évènements se déroulent dans les Maisons
                    pour Tous :
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-100 to-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300">
                      <span className="text-4xl mb-4 block">🎭</span>
                      <p className="text-gray-900 font-semibold text-lg">Spectacles</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300">
                      <span className="text-4xl mb-4 block">🎨</span>
                      <p className="text-gray-900 font-semibold text-lg">Expositions</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300">
                      <span className="text-4xl mb-4 block">🎪</span>
                      <p className="text-gray-900 font-semibold text-lg">Manifestations festives</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Ces manifestations accueillent plus de 150 000 participants chaque année.
                  </p>
                  <p className="text-gray-600 text-lg">
                    L'agenda bimestriel des animations ponctuelles est disponible à l'accueil de
                    votre Maison pour Tous ou sur www.montpellier.fr
                  </p>
                </div>
              </div>
            </section>

            {/* Section Contact */}
            <section id="contact" className="scroll-mt-20">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact</h2>
                
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-8 shadow-md">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 text-2xl shadow-md">
                      📞
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-purple-900">
                        Service des Maisons pour Tous
                      </h3>
                      <p className="text-purple-700 text-lg">Pôle Solidarités</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 text-lg mt-1 shadow-sm">
                          🏢
                        </div>
                        <div>
                          <p className="text-purple-900 font-semibold text-lg">Adresse</p>
                          <p className="text-purple-800">Maison de la Démocratie</p>
                          <p className="text-purple-800">16 Rue de la République</p>
                          <p className="text-purple-800">34000 Montpellier</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 text-lg mt-1 shadow-sm">
                          📞
                        </div>
                        <div>
                          <p className="text-purple-900 font-semibold text-lg">Téléphone</p>
                          <a 
                            href="tel:0467348800" 
                            className="text-purple-800 hover:text-purple-600 transition-colors duration-200 text-lg"
                          >
                            04 67 34 88 00
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 text-lg mt-1 shadow-sm">
                          📧
                        </div>
                        <div>
                          <p className="text-purple-900 font-semibold text-lg">Email</p>
                          <a 
                            href="mailto:service-MPT@montpellier.fr" 
                            className="text-purple-800 hover:text-purple-600 transition-colors duration-200 text-lg"
                          >
                            service-MPT@montpellier.fr
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 text-lg mt-1 shadow-sm">
                          ⏰
                        </div>
                        <div>
                          <p className="text-purple-900 font-semibold text-lg">Horaires</p>
                          <p className="text-purple-800">Lundi - Vendredi</p>
                          <p className="text-purple-800">9h - 12h / 14h - 17h</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
