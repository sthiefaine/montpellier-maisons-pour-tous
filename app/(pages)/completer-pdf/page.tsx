export default function CompleterPdf() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-6">
      <div className="max-w-5xl mx-auto text-center px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Compléter le PDF d'inscription
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">Option 1 :</span> Compléter le PDF en ligne
            </h2>
            <div className="text-left space-y-4 mb-6">
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center mr-3 shadow-sm">
                  1
                </span>
                <p className="text-gray-600">Remplissez le formulaire sur notre site</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center mr-3 shadow-sm">
                  2
                </span>
                <p className="text-gray-600">Téléchargez le PDF pré-rempli avec vos informations</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center mr-3 shadow-sm">
                  3
                </span>
                <p className="text-gray-600">Signez-le et remettez-le à votre Maison pour tous</p>
              </div>
            </div>
            <a
              href="/completer-pdf/formulaire"
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Compléter le PDF en ligne
            </a>
          </div>

          {/* Option 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">Option 2 :</span> Formulaire vierge
            </h2>
            <div className="text-left space-y-4 mb-6">
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center mr-3 shadow-sm">
                  1
                </span>
                <p className="text-gray-600">Téléchargez le formulaire vierge au format PDF</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center mr-3 shadow-sm">
                  2
                </span>
                <p className="text-gray-600">Imprimez le formulaire et complétez-le à la main</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center mr-3 shadow-sm">
                  3
                </span>
                <p className="text-gray-600">Signez-le et remettez-le à votre Maison pour tous</p>
              </div>
            </div>
            <a
              href="/MPT-Fiche-inscription-MPT.pdf"
              className="w-full flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Télécharger le formulaire vierge
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
