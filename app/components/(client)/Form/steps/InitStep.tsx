import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormData } from '@/types/form';

interface InitStepProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  onNext: () => void;
  onBack: () => void;
}

export default function InitStep({ formData, setFormData, onNext }: InitStepProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [previousForms, setPreviousForms] = useState<FormData[]>([]);
  const [filteredForms, setFilteredForms] = useState<FormData[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedForms = localStorage.getItem('previousForms');
      if (savedForms) {
        const parsedForms = JSON.parse(savedForms);
        setPreviousForms(parsedForms);
        setFilteredForms(parsedForms);
      }
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredForms(previousForms);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = previousForms.filter(
        form => form.nom.toLowerCase().includes(query) || form.prenom.toLowerCase().includes(query)
      );
      setFilteredForms(filtered);
    }
  }, [searchQuery, previousForms]);

  const handleFormTypeSelect = (type: 'self' | 'other') => {
    setFormData(prev => ({ ...prev, formType: type }));
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Carte pour soi-même */}
        <div
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            formData.formType === 'self'
              ? 'border-blue-500 bg-white'
              : 'border-gray-200 hover:border-blue-300 bg-white'
          }`}
          onClick={() => handleFormTypeSelect('self')}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                formData.formType === 'self' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}
            >
              {formData.formType === 'self' && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900">Pour moi-même</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Je souhaite m'inscrire pour mes propres activités
          </p>
        </div>

        {/* Carte pour quelqu'un d'autre */}
        <div
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            formData.formType === 'other'
              ? 'border-blue-500 bg-white'
              : 'border-gray-200 hover:border-blue-300 bg-white'
          }`}
          onClick={() => handleFormTypeSelect('other')}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                formData.formType === 'other' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}
            >
              {formData.formType === 'other' && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900">Pour quelqu'un d'autre</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Je souhaite inscrire une autre personne (enfant, parent, ami...)
          </p>
        </div>
      </div>

      {/* Liste des formulaires précédents */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Formulaires précédents</h2>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Rechercher par nom ou prénom..."
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
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {form.nom} {form.prenom}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {form.maison} - {form.saison}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFormData(form);
                    onNext();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Réutiliser
                </button>
              </div>
            </div>
          ))}
          {filteredForms.length === 0 && (
            <p className="text-center text-gray-500 py-4">Aucun formulaire trouvé</p>
          )}
        </div>
      </div>
    </div>
  );
}
