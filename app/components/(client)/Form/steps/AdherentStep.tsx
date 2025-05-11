import { Dispatch, SetStateAction, useEffect } from 'react';
import { FormData } from '@/types/form';
import { departements, villes, codesPostaux } from '@/data/formData';

interface AdherentStepProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

export default function AdherentStep({ formData, setFormData }: AdherentStepProps) {
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      consentement: true,
      departementNaissance: 0,
    }));
  }, []);

  useEffect(() => {
    if (formData.dateNaissance) {
      const birthDate = new Date(formData.dateNaissance);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const isMinor =
        age < 18 ||
        (age === 18 && monthDiff < 0) ||
        (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate());

      setFormData(prev => ({ ...prev, mineur: isMinor }));
    }
  }, [formData.dateNaissance]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Informations de l'adhérent</h1>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer bg-white"
              placeholder=" "
            />
            <label
              htmlFor="nom"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm px-1 bg-white"
            >
              Nom
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer bg-white"
              placeholder=" "
            />
            <label
              htmlFor="prenom"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm px-1 bg-white"
            >
              Prénom
            </label>
          </div>
        </div>

        <div className="relative">
          <input
            type="date"
            id="dateNaissance"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
            min={`${new Date().getFullYear() - 125}-01-01`}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer bg-white [&::-webkit-datetime-edit-year-field]:focus:bg-blue-50 [&::-webkit-datetime-edit-month-field]:hidden [&::-webkit-datetime-edit-day-field]:hidden"
            placeholder=" "
          />
          <label
            htmlFor="dateNaissance"
            className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm px-1 bg-white"
          >
            Année de naissance
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              id="communeNaissance"
              name="communeNaissance"
              value={formData.communeNaissance}
              onChange={handleChange}
              list="villes-list"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer bg-white"
              placeholder=" "
            />
            <label
              htmlFor="communeNaissance"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm px-1 bg-white"
            >
              Ville de naissance
            </label>
            <datalist id="villes-list">
              {villes.map(ville => (
                <option key={ville} value={ville} />
              ))}
            </datalist>
          </div>
          <div className="relative">
            <input
              type="text"
              id="departementNaissance"
              name="departementNaissance"
              value={formData.departementNaissance === 0 ? '' : formData.departementNaissance}
              onChange={handleChange}
              list="departements-list"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer bg-white"
              placeholder=" "
            />
            <label
              htmlFor="departementNaissance"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm px-1 bg-white"
            >
              Département de naissance
            </label>
            <datalist id="departements-list">
              {departements.map(departement => (
                <option key={departement.value} value={departement.value}>
                  {departement.label}
                </option>
              ))}
            </datalist>
            <p className="mt-1 text-xs text-gray-500">
              * Utilisez 99 si vous êtes né(e) à l'étranger
            </p>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer bg-white"
            placeholder=" "
          />
          <label
            htmlFor="adresse"
            className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm px-1 bg-white"
          >
            Adresse actuelle
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="number"
              id="codePostal"
              name="codePostal"
              value={formData.codePostal}
              onChange={handleChange}
              list="codes-postaux-list"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer bg-white"
              placeholder=" "
            />
            <label
              htmlFor="codePostal"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm px-1 bg-white"
            >
              Code postal
            </label>
            <datalist id="codes-postaux-list">
              {codesPostaux.map(code => (
                <option key={code} value={code} />
              ))}
            </datalist>
          </div>
          <div className="relative">
            <input
              type="text"
              id="ville"
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              list="villes-list"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer bg-white"
              placeholder=" "
            />
            <label
              htmlFor="ville"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm px-1 bg-white"
            >
              Ville
            </label>
            <datalist id="villes-list">
              {villes.map(ville => (
                <option key={ville} value={ville} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer bg-white"
              placeholder=" "
            />
            <label
              htmlFor="telephone"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm px-1 bg-white"
            >
              Téléphone
            </label>
          </div>
          <div className="relative">
            <div className="relative">
              <div className="flex">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Veuillez entrer une adresse email valide"
                    className="w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer bg-white"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm px-1 bg-white"
                  >
                    Email
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('email') as HTMLInputElement;
                    const start = input.selectionStart || 0;
                    const end = input.selectionEnd || 0;
                    const newValue =
                      formData.email.substring(0, start) + '@' + formData.email.substring(end);
                    setFormData(prev => ({ ...prev, email: newValue }));
                    setTimeout(() => {
                      input.focus();
                      input.setSelectionRange(start + 1, start + 1);
                    }, 0);
                  }}
                  className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200 transition-colors"
                  title="Insérer @"
                >
                  @
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="consentement"
                name="consentement"
                type="checkbox"
                checked={formData.consentement}
                onChange={handleConsentChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="consentement" className="text-sm text-gray-700">
                J'accepte de recevoir des informations sur les activités de la Maison pour tous
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
