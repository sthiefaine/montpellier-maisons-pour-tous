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
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Inscription</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Carte d'inscription
                    </h3>
                    <p className="text-gray-600 mb-4">
                      La carte d'inscription au réseau des Maisons pour Tous est obligatoire et est
                      à retirer à l'accueil de la Maison pour Tous choisie contre une cotisation
                      différenciée Adulte/Enfant.
                    </p>
                    <p className="text-gray-600 mb-4">
                      Elle permet de s'inscrire à une ou plusieurs activités sur l'ensemble du
                      réseau, de septembre à juillet.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Pièces à fournir</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Pour tous</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                          <li>Fiche de renseignement à compléter</li>
                          <li>Justificatif de domicile de moins de 3 mois</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Pour les mineurs</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                          <li>Extrait d'acte de naissance ou livret de famille</li>
                          <li>Attestation CAF ou avis d'imposition</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Cotisation</h3>
                    <p className="text-gray-600 mb-4">
                      La cotisation pour chacune des activités est établie en fonction :
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>de la durée et de la régularité de l'activité choisie</li>
                      <li>de la nature de l'activité (individuelle ou collective)</li>
                      <li>
                        de votre situation personnelle (étudiants, RSA, familles nombreuses...)
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link 
                        href="/tarifs"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
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
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Animations</h2>

                <div className="space-y-6">
                  <p className="text-gray-600">
                    En moyenne chaque année, plus de 2600 évènements se déroulent dans les Maisons
                    pour Tous :
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <span className="text-2xl mb-2 block">🎭</span>
                      <p className="text-gray-900 font-medium">Spectacles</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <span className="text-2xl mb-2 block">🎨</span>
                      <p className="text-gray-900 font-medium">Expositions</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <span className="text-2xl mb-2 block">🎪</span>
                      <p className="text-gray-900 font-medium">Manifestations festives</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Ces manifestations accueillent plus de 150 000 participants chaque année.
                  </p>
                  <p className="text-gray-600">
                    L'agenda bimestriel des animations ponctuelles est disponible à l'accueil de
                    votre Maison pour Tous ou sur www.montpellier.fr
                  </p>
                </div>
              </div>
            </section>

            {/* Section Contact */}
            <section id="contact" className="scroll-mt-20">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
                
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl">
                      📞
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-purple-900">
                        Service des Maisons pour Tous
                      </h3>
                      <p className="text-purple-700">Pôle Solidarités</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm mt-1">
                          🏢
                        </div>
                        <div>
                          <p className="text-purple-900 font-medium">Adresse</p>
                          <p className="text-purple-800">Maison de la Démocratie</p>
                          <p className="text-purple-800">16 Rue de la République</p>
                          <p className="text-purple-800">34000 Montpellier</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm mt-1">
                          📞
                        </div>
                        <div>
                          <p className="text-purple-900 font-medium">Téléphone</p>
                          <a 
                            href="tel:0467348800" 
                            className="text-purple-800 hover:text-purple-600 transition-colors duration-200"
                          >
                            04 67 34 88 00
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm mt-1">
                          📧
                        </div>
                        <div>
                          <p className="text-purple-900 font-medium">Email</p>
                          <a 
                            href="mailto:service-MPT@montpellier.fr" 
                            className="text-purple-800 hover:text-purple-600 transition-colors duration-200"
                          >
                            service-MPT@montpellier.fr
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm mt-1">
                          ⏰
                        </div>
                        <div>
                          <p className="text-purple-900 font-medium">Horaires</p>
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
