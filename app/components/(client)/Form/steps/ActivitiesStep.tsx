
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormData } from '@/types/form';
import { DateRangePicker } from '../DateRangePicker';

interface ActivitiesStepProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

export default function ActivitiesStep({ formData, setFormData }: ActivitiesStepProps) {
  const [adminUnlocked, setAdminUnlocked] = useState(false);

  const seasons = Array.from({ length: 2 }, (_, i) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const baseYear = currentMonth >= 9 ? currentYear + 1 : currentYear;
    return `${baseYear - 1 + i}-${baseYear + i}`;
  });

  const handleActivityChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newActivities = [...prev.activites];
      if (!newActivities[index]) {
        newActivities[index] = {
          designation: '',
          jour: '',
          horaireDebut: '',
          horaireFin: '',
          prix: 0,
        };
      }
      newActivities[index] = {
        ...newActivities[index],
        [field]: value,
      };
      return { ...prev, activites: newActivities };
    });
  };

  const handleCarteReseauChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, carteReseau: e.target.value === 'oui' }));
  };

  const handleTimeChange = (
    index: number,
    field: 'horaireDebut' | 'horaireFin',
    type: 'hours' | 'minutes',
    value: string
  ) => {
    const currentTime = formData.activites[index]?.[field] || '00:00';
    const [hours, minutes] = currentTime.split(':');

    const newTime = type === 'hours' ? `${value}:${minutes}` : `${hours}:${value}`;

    handleActivityChange(index, field, newTime);
  };

  const generateTimeOptions = (type: 'hours' | 'minutes') => {
    if (type === 'hours') {
      return Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    } else {
      return Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, '0'));
    }
  };

  // Préremplir la date de début de saison si vide
  useEffect(() => {
    if (formData.modeReglement === '3fois' && !formData.datePaiementDebut1) {
      // Récupérer l'année de début de la saison (ex: 2024-2025 => 2024)
      const saison = formData.saison || '';
      const anneeDebut = saison.split('-')[0];
      if (anneeDebut && anneeDebut.length === 4) {
        setFormData(prev => ({ ...prev, datePaiementDebut1: anneeDebut }));
      }
    }
  }, [formData.modeReglement, formData.saison, formData.datePaiementDebut1, setFormData]);

  useEffect(() => {
    if (formData.modeReglement === '3fois' && !formData.datePaiementDebut1) {
      const saison = formData.saison || '';
      const anneeDebut = saison.split('-')[0];
      if (anneeDebut && anneeDebut.length === 4) {
        setFormData(prev => ({
          ...prev,
          anneePaiement1: parseInt(anneeDebut),
          anneePaiement2: parseInt(anneeDebut),
        }));
      }
    }
  }, [formData.modeReglement, formData.saison, formData.datePaiementDebut1, setFormData]);

  // --- Correction du bug setState pendant le render ---
  useEffect(() => {
    const nbPaiements = formData.modeReglement === '3fois' ? 3 : 1;
    if (!formData.paiementsAdmin || formData.paiementsAdmin.length !== nbPaiements) {
      setFormData(prev => ({
        ...prev,
        paiementsAdmin: Array.from({ length: nbPaiements }, () => ({ mode: '', date: '' })),
      }));
    }
    // eslint-disable-next-line
  }, [formData.modeReglement]);

  return (
    <div className="max-w-full mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Activités</h1>

      {/* Carte réseau */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Je souhaite la carte réseau des Maisons pour tous
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="carteReseau"
              value="oui"
              checked={formData.carteReseau}
              onChange={handleCarteReseauChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Oui</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="carteReseau"
              value="non"
              checked={!formData.carteReseau}
              onChange={handleCarteReseauChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Non</span>
          </label>
        </div>
      </div>

      {/* Activités */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Première activité toujours visible */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex-1 min-w-[220px] max-w-xl mx-auto md:mx-0">
            <h3 className="text-m font-medium text-gray-900 mb-1 text-center">Activité 1</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <input
                  type="text"
                  id="designation-0"
                  value={formData.activites[0]?.designation || ''}
                  onChange={e => handleActivityChange(0, 'designation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer bg-white"
                  placeholder=" "
                />
                <label
                  htmlFor="designation-0"
                  className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
                >
                  Désignation de l'atelier
                </label>
              </div>
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <select
                    id="jour-0"
                    value={formData.activites[0]?.jour || ''}
                    onChange={e => handleActivityChange(0, 'jour', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option value="">Sélectionner un jour</option>
                    <option value="Lundi">Lundi</option>
                    <option value="Mardi">Mardi</option>
                    <option value="Mercredi">Mercredi</option>
                    <option value="Jeudi">Jeudi</option>
                    <option value="Vendredi">Vendredi</option>
                    <option value="Samedi">Samedi</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="relative w-32">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="prix-0"
                    aria-label="Prix de l'activité"
                    value={formData.activites[0]?.prix || ''}
                    onChange={e => handleActivityChange(0, 'prix', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer text-right bg-white"
                    placeholder=" "
                  />
                  <label
                    htmlFor="prix-0"
                    className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm"
                  >
                    Prix (€)
                  </label>
                </div>
              </div>
              <div className="flex gap-4 items-center justify-center">
                {/* Bloc Début */}
                <div className="relative border border-gray-300 rounded-md p-3 flex-[0_0_120px] bg-white">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-500 border border-gray-300 rounded-full">
                    Début
                  </span>
                  <div className="flex items-center space-x-2 justify-center mt-1">
                    <select
                      id="horaireDebut-heures-0"
                      aria-label="Heure de début"
                      value={formData.activites[0]?.horaireDebut?.split(':')[0] || '00'}
                      onChange={e => handleTimeChange(0, 'horaireDebut', 'hours', e.target.value)}
                      className="w-12 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      {generateTimeOptions('hours').map(hour => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                    <span className="text-sm text-gray-500">h</span>
                    <select
                      id="horaireDebut-minutes-0"
                      aria-label="Minutes de début"
                      value={formData.activites[0]?.horaireDebut?.split(':')[1] || '00'}
                      onChange={e => handleTimeChange(0, 'horaireDebut', 'minutes', e.target.value)}
                      className="w-12 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      {generateTimeOptions('minutes').map(minute => (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      ))}
                    </select>
                    <span className="text-sm text-gray-500">min</span>
                  </div>
                </div>
                {/* Bloc Fin */}
                <div className="relative border border-gray-300 rounded-md p-3 flex-[0_0_120px] bg-white">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-500 border border-gray-300 rounded-full">
                    Fin
                  </span>
                  <div className="flex items-center space-x-2 justify-center mt-1">
                    <select
                      id="horaireFin-heures-0"
                      aria-label="Heure de fin"
                      value={formData.activites[0]?.horaireFin?.split(':')[0] || '00'}
                      onChange={e => handleTimeChange(0, 'horaireFin', 'hours', e.target.value)}
                      className="w-12 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      {generateTimeOptions('hours').map(hour => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                    <span className="text-sm text-gray-500">h</span>
                    <select
                      id="horaireFin-minutes-0"
                      aria-label="Minutes de fin"
                      value={formData.activites[0]?.horaireFin?.split(':')[1] || '00'}
                      onChange={e => handleTimeChange(0, 'horaireFin', 'minutes', e.target.value)}
                      className="w-12 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      {generateTimeOptions('minutes').map(minute => (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      ))}
                    </select>
                    <span className="text-sm text-gray-500">min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activités supplémentaires existantes */}
          {formData.activites.slice(1).map((activite, index) => (
            <div
              key={index + 1}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex-1 min-w-[220px] max-w-xl mx-auto md:mx-0"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-m font-medium text-gray-900">Activité {index + 2}</h3>
                <button
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      activites: prev.activites.filter((_, i) => i !== index + 1),
                    }));
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    id={`designation-${index + 1}`}
                    value={activite.designation || ''}
                    onChange={e => handleActivityChange(index + 1, 'designation', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer bg-white"
                    placeholder=" "
                  />
                  <label
                    htmlFor={`designation-${index + 1}`}
                    className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
                  >
                    Désignation de l'atelier
                  </label>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1">
                    <select
                      id={`jour-${index + 1}`}
                      value={activite.jour || ''}
                      onChange={e => handleActivityChange(index + 1, 'jour', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="">Sélectionner un jour</option>
                      <option value="Lundi">Lundi</option>
                      <option value="Mardi">Mardi</option>
                      <option value="Mercredi">Mercredi</option>
                      <option value="Jeudi">Jeudi</option>
                      <option value="Vendredi">Vendredi</option>
                      <option value="Samedi">Samedi</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="relative w-32">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      id={`prix-${index + 1}`}
                      aria-label="Prix de l'activité"
                      value={activite.prix || ''}
                      onChange={e => handleActivityChange(index + 1, 'prix', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer text-right bg-white"
                      placeholder=" "
                    />
                    <label
                      htmlFor={`prix-${index + 1}`}
                      className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm"
                    >
                      Prix (€)
                    </label>
                  </div>
                </div>
                <div className="flex gap-4 items-center justify-center">
                  {/* Bloc Début */}
                  <div className="relative border border-gray-300 rounded-md p-3 flex-[0_0_120px] bg-white">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-500 border border-gray-300 rounded-full">
                      Début
                    </span>
                    <div className="flex items-center space-x-2 justify-center mt-1">
                      <select
                        id={`horaireDebut-heures-${index + 1}`}
                        aria-label="Heure de début"
                        value={activite.horaireDebut?.split(':')[0] || '00'}
                        onChange={e =>
                          handleTimeChange(index + 1, 'horaireDebut', 'hours', e.target.value)
                        }
                        className="w-12 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                      >
                        {generateTimeOptions('hours').map(hour => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                      <span className="text-sm text-gray-500">h</span>
                      <select
                        id={`horaireDebut-minutes-${index + 1}`}
                        aria-label="Minutes de début"
                        value={activite.horaireDebut?.split(':')[1] || '00'}
                        onChange={e =>
                          handleTimeChange(index + 1, 'horaireDebut', 'minutes', e.target.value)
                        }
                        className="w-12 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                      >
                        {generateTimeOptions('minutes').map(minute => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                      <span className="text-sm text-gray-500">min</span>
                    </div>
                  </div>
                  {/* Bloc Fin */}
                  <div className="relative border border-gray-300 rounded-md p-3 flex-[0_0_120px] bg-white">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-500 border border-gray-300 rounded-full">
                      Fin
                    </span>
                    <div className="flex items-center space-x-2 justify-center mt-1">
                      <select
                        id={`horaireFin-heures-${index + 1}`}
                        aria-label="Heure de fin"
                        value={activite.horaireFin?.split(':')[0] || '00'}
                        onChange={e =>
                          handleTimeChange(index + 1, 'horaireFin', 'hours', e.target.value)
                        }
                        className="w-12 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                      >
                        {generateTimeOptions('hours').map(hour => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                      <span className="text-sm text-gray-500">h</span>
                      <select
                        id={`horaireFin-minutes-${index + 1}`}
                        aria-label="Minutes de fin"
                        value={activite.horaireFin?.split(':')[1] || '00'}
                        onChange={e =>
                          handleTimeChange(index + 1, 'horaireFin', 'minutes', e.target.value)
                        }
                        className="w-12 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                      >
                        {generateTimeOptions('minutes').map(minute => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                      <span className="text-sm text-gray-500">min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Bouton Ajouter une activité */}
          {formData.activites.length < 4 && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex-1 min-w-[220px] max-w-xl mx-auto md:mx-0">
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    activites: [
                      ...prev.activites,
                      {
                        designation: '',
                        jour: '',
                        horaireDebut: '',
                        horaireFin: '',
                        prix: 0,
                      },
                    ],
                  }));
                }}
                className="w-full h-full min-h-[200px] flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-blue-600 hover:border-blue-600 border-2 border-dashed border-gray-300 rounded-lg transition-all duration-200"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="text-sm font-medium">Ajouter une activité</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Paiement + Cadre réservé à l'administration côte à côte sur PC */}
      <div className="mt-8 md:grid md:grid-cols-2 md:gap-6">
        {/* Carte Paiement */}
        <div>
          <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm max-w-2xl mx-auto">
            <div className="mb-4">
              <div>
                <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-1">
                  Total des sommes à payer
                </label>
                <div className="flex">
                  <input
                    type="number"
                    id="total"
                    name="total"
                    value={formData.total}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, total: Number(e.target.value) }))
                    }
                    className="w-40 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.01"
                  />
                  <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md">
                    €
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="text-xs text-blue-600 underline mt-2 hover:text-blue-800 focus:outline-none"
                onClick={() => {
                  const total = formData.activites
                    .filter(act => act && typeof act.prix !== 'undefined')
                    .reduce((sum, act) => {
                      const prix = parseFloat(String(act.prix ?? '0'));
                      return sum + (isNaN(prix) ? 0 : prix);
                    }, 0);
                  setFormData(prev => ({ ...prev, total: Number(total.toFixed(2)) }));
                }}
              >
                Additionnez la somme des activités (
                {formData.activites
                  .filter(act => act && typeof act.prix !== 'undefined')
                  .reduce((sum, act) => {
                    const prix = parseFloat(String(act.prix ?? '0'));
                    return sum + (isNaN(prix) ? 0 : prix);
                  }, 0)
                  .toFixed(2)}{' '}
                €)
              </button>
            </div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Mode de règlement
              </span>
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="modeReglement"
                    value="comptant"
                    checked={formData.modeReglement === 'comptant'}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        modeReglement: e.target.value as 'comptant' | '3fois',
                      }))
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Comptant</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="modeReglement"
                    value="3fois"
                    checked={formData.modeReglement === '3fois'}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        modeReglement: e.target.value as 'comptant' | '3fois',
                      }))
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">3 fois*</span>
                </label>
              </div>
            </div>
            {formData.modeReglement === '3fois' && (
              <div className="space-y-4 mt-4">
                <div className="text-sm mb-2">
                  * 3 dates de paiement sont nécessaires
                  <br />① à l'inscription en début de saison N /{' '}
                  {formData.saison.split('-')[0] ? (
                    <b>{formData.saison.split('-')[0]}</b>
                  ) : (
                    formData.saison.split('-')[0]
                  )}
                  <br />
                  {(() => {
                    const d1 = formData.datePaiementDebut1;
                    const d2 = formData.datePaiementFin1;
                    if (d1 && d2) {
                      const date1 = new Date(d1);
                      const date2 = new Date(d2);
                      const jj1 = String(date1.getDate()).padStart(2, '0');
                      const jj2 = String(date2.getDate()).padStart(2, '0');
                      const mm = String(date1.getMonth() + 1).padStart(2, '0');
                      const yyyy = String(date1.getFullYear());
                      return <b>{`② du ${jj1} au ${jj2} / ${mm} / ${yyyy}`}</b>;
                    }
                    return '② du _ _ au _ _ / _ _ / 20_ _ ';
                  })()}
                  <br />
                  {(() => {
                    const d1 = formData.datePaiementDebut2;
                    const d2 = formData.datePaiementFin2;
                    if (d1 && d2) {
                      const date1 = new Date(d1);
                      const date2 = new Date(d2);
                      const jj1 = String(date1.getDate()).padStart(2, '0');
                      const jj2 = String(date2.getDate()).padStart(2, '0');
                      const mm = String(date1.getMonth() + 1).padStart(2, '0');
                      const yyyy = String(date1.getFullYear());
                      return <b>{`③ du ${jj1} au ${jj2} / ${mm} / ${yyyy}`}</b>;
                    }
                    return '③ du _ _ au _ _ / _ _ / 20_ _';
                  })()}
                </div>
                <div className="grid grid-cols-3 gap-4 items-end mb-4">
                  {/* Période ① */}
                  <div>
                    <div className="relative">
                      <select
                        id="saison"
                        value={formData.saison}
                        onChange={e => setFormData(prev => ({ ...prev, saison: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white peer"
                      >
                        {seasons.map(season => (
                          <option key={season.split('-')[0]} value={season.split('-')[0]}>
                            {season.split('-')[0]}
                          </option>
                        ))}
                      </select>
                      <label
                        htmlFor="saison"
                        className="absolute left-3 -top-2 text-sm text-gray-500 bg-gray-50 px-1 pointer-events-none transition-all duration-200 peer-focus:text-blue-600"
                      >
                        ① Saison
                      </label>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Période ② */}
                  <div>
                    <div className="relative">
                      <DateRangePicker
                        startDate={formData.datePaiementDebut1 || ''}
                        endDate={formData.datePaiementFin1 || ''}
                        onDateChange={(start, end) => {
                          setFormData(prev => ({
                            ...prev,
                            datePaiementDebut1: start,
                            datePaiementFin1: end,
                          }));
                        }}
                        className="[&_.react-datepicker-popper]:!left-auto [&_.react-datepicker-popper]:!right-0"
                      />
                      <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-gray-50 px-1 pointer-events-none transition-all duration-200 peer-focus:text-blue-600">
                        ② Période
                      </label>
                    </div>
                  </div>
                  {/* Période ③ */}
                  <div>
                    <div className="relative">
                      <DateRangePicker
                        startDate={formData.datePaiementDebut2 || ''}
                        endDate={formData.datePaiementFin2 || ''}
                        onDateChange={(start, end) => {
                          setFormData(prev => ({
                            ...prev,
                            datePaiementDebut2: start,
                            datePaiementFin2: end,
                          }));
                        }}
                        className="[&_.react-datepicker-popper]:!left-auto [&_.react-datepicker-popper]:!right-0"
                      />
                      <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-gray-50 px-1 pointer-events-none transition-all duration-200 peer-focus:text-blue-600">
                        ③ Période
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Carte Administration */}
        <div>
          <div
            className={`mt-8 md:mt-0 ${adminUnlocked ? 'bg-white' : 'bg-gray-100'} p-4 rounded-lg border border-gray-300 shadow-sm max-w-2xl mx-auto`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-gray-700">Cadre réservé à l'administration</div>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setAdminUnlocked(!adminUnlocked)}
              >
                {adminUnlocked ? 'Verrouiller' : 'Déverrouiller'}
              </button>
            </div>
            <div className="space-y-4">
              {(() => {
                const nbPaiements = formData.modeReglement === '3fois' ? 3 : 1;
                const labels = nbPaiements === 1 ? [''] : ['1', '2', '3'];
                if (!formData.paiementsAdmin || formData.paiementsAdmin.length !== nbPaiements) {
                  return null;
                }
                return labels.map((label, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mode de règlement{nbPaiements > 1 ? ` ${label}` : ''}
                      </label>
                      <input
                        type="text"
                        list="modes-paiement"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="À remplir par l'administration"
                        disabled={!adminUnlocked}
                        value={(formData.paiementsAdmin ?? [])[i]?.mode || ''}
                        onChange={e => {
                          if (!adminUnlocked) return;
                          const newPaiements = [...(formData.paiementsAdmin ?? [])];
                          newPaiements[i] = { ...newPaiements[i], mode: e.target.value };
                          setFormData(prev => ({ ...prev, paiementsAdmin: newPaiements }));
                        }}
                      />
                      <datalist id="modes-paiement">
                        <option value="Espèces">Espèces</option>
                        <option value="Chèque">Chèque</option>
                        <option value="Carte bancaire">Carte bancaire</option>
                        <option value="Virement">Virement</option>
                        <option value="Pass Culture">Pass Culture</option>
                        <option value="Pass Sport">Pass Sport</option>
                        <option value="CESU">CESU</option>
                        <option value="Autre">Autre</option>
                      </datalist>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date{nbPaiements > 1 ? ` ${label}` : ''}
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        disabled={!adminUnlocked}
                        value={(formData.paiementsAdmin ?? [])[i]?.date || ''}
                        onChange={e => {
                          if (!adminUnlocked) return;
                          const newPaiements = [...(formData.paiementsAdmin ?? [])];
                          newPaiements[i] = { ...newPaiements[i], date: e.target.value };
                          setFormData(prev => ({ ...prev, paiementsAdmin: newPaiements }));
                        }}
                      />
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
