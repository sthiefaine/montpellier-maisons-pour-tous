import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormData } from '@/types/form';
import { mockFormDataMineur } from '@/app/data/mockData';

interface InitStepProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  onNext: () => void;
}

interface SavedForm extends FormData {
  createdAt: string;
  updatedAt?: string;
}

export default function InitStep({ formData, setFormData, onNext }: InitStepProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [previousForms, setPreviousForms] = useState<SavedForm[]>([]);
  const [filteredForms, setFilteredForms] = useState<SavedForm[]>([]);
  const [editingSurnom, setEditingSurnom] = useState<string | null>(null);
  const [surnomInput, setSurnomInput] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [exportedJson, setExportedJson] = useState('');
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => {
    // Charger les données du localStorage
    const savedForms = localStorage.getItem('savedForms');
    const forms = savedForms ? JSON.parse(savedForms) : [];

    // Trier les formulaires : d'abord les favoris, puis par date de création
    const sortedForms = forms.sort((a: SavedForm, b: SavedForm) => {
      if (a.favori && !b.favori) return -1;
      if (!a.favori && b.favori) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const mockFormDataMineurWithCreatedAt = {
      ...mockFormDataMineur,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPreviousForms([mockFormDataMineurWithCreatedAt]);
    setFilteredForms([mockFormDataMineurWithCreatedAt]);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredForms(previousForms);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = previousForms.filter(
        form =>
          form.nom.toLowerCase().includes(query) ||
          form.prenom.toLowerCase().includes(query) ||
          (form.surnom && form.surnom.toLowerCase().includes(query))
      );
      setFilteredForms(filtered);
    }
  }, [searchQuery, previousForms]);

  const handleFormTypeSelect = (type: 'self' | 'other') => {
    // Sauvegarder le formulaire actuel s'il contient des données
    if (formData.nom || formData.prenom) {
      const savedForms = localStorage.getItem('savedForms');
      const forms = savedForms ? JSON.parse(savedForms) : [];
      const formToSave = {
        ...formData,
        createdAt: new Date().toISOString(),
      };
      forms.push(formToSave);
      localStorage.setItem('savedForms', JSON.stringify(forms));
    }

    setFormData(prev => ({
      ...prev,
      formType: type,
      nom: '',
      prenom: '',
      dateNaissance: '',
      sexe: '',
      mineur: false,
      communeNaissance: '',
      departementNaissance: '',
      adresse: '',
      codePostal: '',
      ville: '',
      telephone: '',
      email: '',
      acceptationInformations: true,
      carteReseau: true,
      activites: [],
      total: 0,
      modeReglement: '',
      faitA: '',
      dateSignature: '',
      signature: '',
      representantLegal1: {
        type: '',
        nom: '',
        prenom: '',
        jourNaissance: '',
        moisNaissance: '',
        anneeNaissance: '',
        sexe: '',
        adresse: '',
        codePostal: '',
        ville: '',
        tel: '',
        courriel: '',
      },
      representantLegal2: {
        type: '',
        nom: '',
        prenom: '',
        jourNaissance: '',
        moisNaissance: '',
        anneeNaissance: '',
        sexe: '',
        adresse: '',
        codePostal: '',
        ville: '',
        tel: '',
        courriel: '',
      },
      domiciliation: {
        domicile1: false,
        domicile2: false,
        gardeAlternee: false,
      },
      personnes: [],
      personnesAccident: [],
      personnesHabilitees: [],
      soussigneNom: '',
      soussignePrenom: '',
      autorisationSortie: 'autorise',
      droitImage: 'autorise',
      aps: 'apte',
      caf: {
        allocataire: false,
        numeroAllocataire: '',
        nbEnfants: '',
      },
      consentement: true,
      paiementsAdmin: [],
    }));
    onNext();
  };

  const handleSurnomSubmit = (formId: string) => {
    const updatedForms = previousForms.map(f =>
      f.id === formId ? { ...f, surnom: surnomInput, updatedAt: new Date().toISOString() } : f
    );
    setPreviousForms(updatedForms);
    setFilteredForms(updatedForms);
    localStorage.setItem('savedForms', JSON.stringify(updatedForms));
    setEditingSurnom(null);
    setSurnomInput('');
  };

  const handleToggleFavori = (formId: string) => {
    const updatedForms = previousForms.map(f =>
      f.id === formId ? { ...f, favori: !f.favori, updatedAt: new Date().toISOString() } : f
    );
    // Trier à nouveau les formulaires
    const sortedForms = updatedForms.sort((a: SavedForm, b: SavedForm) => {
      if (a.favori && !b.favori) return -1;
      if (!a.favori && b.favori) return 1;
      return (
        new Date(b.updatedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.createdAt).getTime()
      );
    });
    setPreviousForms(sortedForms);
    setFilteredForms(sortedForms);
    localStorage.setItem('savedForms', JSON.stringify(sortedForms));
  };

  const handleExport = (form: SavedForm) => {
    const formToExport = { ...form };
    formToExport.signature = '';
    formToExport.id = crypto.randomUUID();
    formToExport.favori = false;
    const jsonString = JSON.stringify(formToExport, null, 2);
    setExportedJson(jsonString);
    setShowExportModal(true);
  };

  const handleImport = () => {
    try {
      const importedData = JSON.parse(importJson);
      const formsToImport = Array.isArray(importedData) ? importedData : [importedData];
      const validForms = formsToImport.filter(form => {
        return form.nom && form.prenom && form.maison && form.saison;
      });

      if (validForms.length === 0) {
        throw new Error('Aucun formulaire valide trouvé dans les données importées');
      }

      const updatedForms = [
        ...previousForms,
        ...validForms.map(form => ({
          ...form,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          signature: '',
        })),
      ];

      setPreviousForms(updatedForms);
      setFilteredForms(updatedForms);
      localStorage.setItem('savedForms', JSON.stringify(updatedForms));
      setShowImportModal(false);
      setImportJson('');
      setImportError(null);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Erreur lors de l'importation");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Initialisation</h1>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleFormTypeSelect('self')}
            className={`relative cursor-pointer transition-all duration-200 ${
              formData.formType === 'self'
                ? 'ring-2 ring-blue-500 scale-[1.02]'
                : 'hover:ring-2 hover:ring-blue-300 hover:scale-[1.02]'
            } bg-white p-6 rounded-lg border border-gray-200 shadow-sm`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Inscription pour moi-même</h2>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.formType === 'self' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}
              >
                {formData.formType === 'self' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>
            <p className="text-gray-600">Je souhaite m'inscrire personnellement aux activités</p>
          </button>

          <button
            onClick={() => handleFormTypeSelect('other')}
            className={`relative cursor-pointer transition-all duration-200 ${
              formData.formType === 'other'
                ? 'ring-2 ring-blue-500 scale-[1.02]'
                : 'hover:ring-2 hover:ring-blue-300 hover:scale-[1.02]'
            } bg-white p-6 rounded-lg border border-gray-200 shadow-sm`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Inscription pour quelqu'un d'autre
              </h2>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.formType === 'other' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}
              >
                {formData.formType === 'other' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>
            <p className="text-gray-600">
              Je souhaite inscrire un enfant ou une autre personne aux activités
            </p>
          </button>
        </div>
      </div>

      {/* Liste des formulaires précédents */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Formulaires précédents</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowImportModal(true)}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Importer
            </button>
            <button
              onClick={() => {
                const formsToExport = previousForms.map(form => {
                  const { signature, ...rest } = form;
                  return rest;
                });
                const jsonString = JSON.stringify(formsToExport, null, 2);
                setExportedJson(jsonString);
                setShowExportModal(true);
              }}
              className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Exporter tout
            </button>
          </div>
        </div>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou surnom..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute right-3 top-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="space-y-4">
          {filteredForms.map((form, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] border ${
                form.favori ? 'border-yellow-400' : 'border-gray-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 p-5">
                <div className="flex items-start w-full sm:w-auto">
                  <button
                    onClick={() => handleToggleFavori(form.id)}
                    className={`rounded-full transition-colors mt-1 ${
                      form.favori
                        ? 'text-yellow-400 hover:text-yellow-500'
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill={form.favori ? 'currentColor' : 'none'}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </button>
                  <div className="flex-1 ml-3">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {form.nom} {form.prenom}
                      </h3>
                      {form.surnom && editingSurnom !== form.id && (
                        <span className="text-sm text-gray-500">({form.surnom})</span>
                      )}
                    </div>
                    <div className="mt-2 space-y-1.5">
                      <p className="text-sm font-medium text-gray-600">
                        {form.maison.replace('Maison pour tous', '')} - {form.saison}
                      </p>
                      <div className="flex flex-wrap gap-x-4 text-sm text-gray-500">
                        <p className="flex items-center gap-1">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${form.mineur ? 'bg-blue-400' : 'bg-green-400'}`}
                          ></span>
                          {form.mineur ? 'Mineur' : 'Majeur'} -{' '}
                          {form.formType === 'self'
                            ? 'Inscription pour soi-même'
                            : "Inscription pour quelqu'un d'autre"}
                        </p>
                        <p className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {form.updatedAt ? 'Modifié' : 'Créé'} le{' '}
                          {new Date(form.updatedAt || form.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    {editingSurnom === form.id ? (
                      <>
                        <input
                          type="text"
                          value={surnomInput}
                          onChange={e => setSurnomInput(e.target.value)}
                          placeholder="Entrez un surnom"
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSurnomSubmit(form.id)}
                          className="px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => {
                            setEditingSurnom(null);
                            setSurnomInput('');
                          }}
                          className="px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingSurnom(form.id);
                          setSurnomInput(form.surnom || '');
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                      >
                        {form.surnom ? 'Modifier le surnom' : 'Ajouter un surnom'}
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    <button
                      onClick={() => {
                        setFormData(form);
                        onNext();
                      }}
                      className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      Charger
                    </button>
                    <button
                      onClick={() => {
                        const formToLoad = {
                          ...form,
                          id: crypto.randomUUID(),
                          version: form.version + 1,
                        };
                        setFormData(formToLoad);
                        onNext();
                      }}
                      className="px-3 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                        />
                      </svg>
                      Dupliquer
                    </button>
                    <button
                      onClick={() => handleExport(form)}
                      className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Exporter
                    </button>
                    <button
                      onClick={() => {
                        const updatedForms = previousForms.filter(f => f.id !== form.id);
                        setPreviousForms(updatedForms);
                        setFilteredForms(updatedForms);
                        localStorage.setItem('savedForms', JSON.stringify(updatedForms));
                      }}
                      className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredForms.length === 0 && (
            <p className="text-center text-gray-500 py-4">Aucun formulaire trouvé</p>
          )}
        </div>
      </div>

      {/* Modal d'importation */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Importer des données</h3>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportJson('');
                  setImportError(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Collez le JSON exporté ici. Les signatures ne seront pas importées.
              </p>
              <div className="relative">
                <textarea
                  value={importJson}
                  onChange={e => setImportJson(e.target.value)}
                  className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="Collez votre JSON ici..."
                />
                {importError && <p className="mt-2 text-sm text-red-600">{importError}</p>}
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportJson('');
                  setImportError(null);
                }}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                Importer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'exportation */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Exporter les données</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 font-medium">
                      Note : Les signatures ne sont pas incluses dans l'export pour des raisons de
                      sécurité.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-[50vh] text-sm">
                  {exportedJson}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(exportedJson);
                  }}
                  className="absolute bottom-4 right-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  Copier le JSON
                </button>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
