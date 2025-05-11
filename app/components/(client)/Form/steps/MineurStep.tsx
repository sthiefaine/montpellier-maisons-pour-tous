import { Dispatch, SetStateAction } from 'react';
import { FormData } from '@/types/form';
import { codesPostaux, villes } from '@/data/formData';

interface MineurStepProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

export default function MineurStep({ formData, setFormData }: MineurStepProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    parent: 'representantLegal1' | 'representantLegal2'
  ) => {
    let { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    if (name === 'type1' || name === 'type2') name = 'type';
    if (name === 'sexe1' || name === 'sexe2') name = 'sexe';

    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleDomiciliationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      domiciliation: {
        ...prev.domiciliation,
        [name]: checked,
      },
    }));
  };

  const formatDate = (day: string, month: string, year: string) => {
    if (!day || !month || !year || day === '00' || month === '00') return '';
    const paddedDay = day.padStart(2, '0');
    const paddedMonth = month.padStart(2, '0');
    return `${year}-${paddedMonth}-${paddedDay}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Informations représentants légaux</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Représentant légal 1 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Représentant légal 1</h2>
          <div className="flex gap-4 mb-2">
            <label>
              <input
                type="radio"
                name="type1"
                value="pere"
                checked={formData.representantLegal1.type === 'pere'}
                onChange={e => handleChange(e, 'representantLegal1')}
              />{' '}
              Père
            </label>
            <label>
              <input
                type="radio"
                name="type1"
                value="mere"
                checked={formData.representantLegal1.type === 'mere'}
                onChange={e => handleChange(e, 'representantLegal1')}
              />{' '}
              Mère
            </label>
            <label>
              <input
                type="radio"
                name="type1"
                value="autre"
                checked={formData.representantLegal1.type === 'autre'}
                onChange={e => handleChange(e, 'representantLegal1')}
              />{' '}
              Autre responsable légal
            </label>
          </div>
          <div className="relative">
            <input
              className="input mb-3 peer bg-white"
              id="nom-legal1"
              type="text"
              name="nom"
              placeholder=" "
              value={formData.representantLegal1.nom}
              onChange={e => handleChange(e, 'representantLegal1')}
            />
            <label
              htmlFor="nom-legal1"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
            >
              Nom
            </label>
          </div>
          <div className="relative">
            <input
              className="input mb-3 peer bg-white"
              id="prenom-legal1"
              type="text"
              name="prenom"
              placeholder=" "
              value={formData.representantLegal1.prenom}
              onChange={e => handleChange(e, 'representantLegal1')}
            />
            <label
              htmlFor="prenom-legal1"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
            >
              Prénom
            </label>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="relative w-full">
              <input
                type="date"
                className="input peer bg-white mb-3"
                id="dateNaissance-legal1"
                name="dateNaissance"
                value={formatDate(
                  formData.representantLegal1.jourNaissance,
                  formData.representantLegal1.moisNaissance,
                  formData.representantLegal1.anneeNaissance
                )}
                onChange={e => {
                  const date = new Date(e.target.value);
                  handleChange(
                    {
                      ...e,
                      target: {
                        ...e.target,
                        name: 'jourNaissance',
                        value: date.getDate().toString().padStart(2, '0'),
                      },
                    } as any,
                    'representantLegal1'
                  );
                  handleChange(
                    {
                      ...e,
                      target: {
                        ...e.target,
                        name: 'moisNaissance',
                        value: (date.getMonth() + 1).toString().padStart(2, '0'),
                      },
                    } as any,
                    'representantLegal1'
                  );
                  handleChange(
                    {
                      ...e,
                      target: {
                        ...e.target,
                        name: 'anneeNaissance',
                        value: date.getFullYear().toString(),
                      },
                    } as any,
                    'representantLegal1'
                  );
                }}
              />
              <label
                htmlFor="dateNaissance-legal1"
                className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
              >
                Date de naissance
              </label>
            </div>
          </div>
          <div className="flex gap-4 mb-2 items-center">
            <span className="text-gray-700">Sexe :</span>
            <label>
              <input
                type="radio"
                name="sexe1"
                value="F"
                checked={formData.representantLegal1.sexe === 'F'}
                onChange={e => handleChange(e, 'representantLegal1')}
              />{' '}
              F
            </label>
            <label>
              <input
                type="radio"
                name="sexe1"
                value="M"
                checked={formData.representantLegal1.sexe === 'M'}
                onChange={e => handleChange(e, 'representantLegal1')}
              />{' '}
              M
            </label>
          </div>
          {/* Bouton copier l'adresse de l'autre représentant */}
          <div className="mb-2">
            <button
              type="button"
              className="text-xs text-blue-600 underline hover:text-blue-800"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  representantLegal1: {
                    ...prev.representantLegal1,
                    adresse: prev.representantLegal2.adresse,
                    codePostal: prev.representantLegal2.codePostal,
                    ville: prev.representantLegal2.ville,
                    tel: prev.representantLegal2.tel,
                    courriel: prev.representantLegal2.courriel,
                  },
                }));
              }}
            >
              Copier l'adresse du représentant légal 2
            </button>
          </div>
          <div className="relative">
            <input
              className="input mb-3 peer bg-white"
              id="adresse-legal1"
              type="text"
              name="adresse"
              placeholder=" "
              value={formData.representantLegal1.adresse}
              onChange={e => handleChange(e, 'representantLegal1')}
            />
            <label
              htmlFor="adresse-legal1"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
            >
              Adresse
            </label>
          </div>
          <div className="relative">
            <input
              className="input mb-3 peer bg-white"
              id="codePostal-legal1"
              type="number"
              name="codePostal"
              placeholder=""
              value={formData.representantLegal1.codePostal}
              onChange={e => {
                handleChange(e, 'representantLegal1');
              }}
              maxLength={5}
              pattern="[0-9]{5}"
              title="Veuillez entrer un code postal valide (5 chiffres)"
              list="codes-postaux-list"
            />
            <label
              htmlFor="codePostal-legal1"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
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
              className="input mb-3 peer bg-white"
              id="ville-legal1"
              type="text"
              name="ville"
              placeholder=" "
              value={formData.representantLegal1.ville}
              onChange={e => handleChange(e, 'representantLegal1')}
              list="villes-list"
            />
            <label
              htmlFor="ville-legal1"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
            >
              Ville
            </label>
            <datalist id="villes-list">
              {villes.map(ville => (
                <option key={ville} value={ville} />
              ))}
            </datalist>
          </div>
          <div className="relative">
            <input
              className="input mb-3 peer bg-white"
              id="tel-legal1"
              type="tel"
              name="tel"
              placeholder=" "
              value={formData.representantLegal1.tel}
              onChange={e => handleChange(e, 'representantLegal1')}
            />
            <label
              htmlFor="tel-legal1"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
            >
              Téléphone
            </label>
          </div>
          <div className="relative">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  title="Veuillez entrer une adresse email valide"
                  id="courriel-legal1"
                  name="courriel"
                  value={formData.representantLegal1.courriel}
                  onChange={e => handleChange(e, 'representantLegal1')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer bg-white"
                  placeholder=" "
                />
                <label
                  htmlFor="courriel-legal1"
                  className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
                >
                  Courriel
                </label>
              </div>
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('courriel-legal1') as HTMLInputElement;
                  if (!input) return;
                  const start = input.selectionStart || 0;
                  const end = input.selectionEnd || 0;
                  const newValue =
                    formData.representantLegal1.courriel.substring(0, start) +
                    '@' +
                    formData.representantLegal1.courriel.substring(end);
                  setFormData(prev => ({
                    ...prev,
                    representantLegal1: {
                      ...prev.representantLegal1,
                      courriel: newValue,
                    },
                  }));
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
        {/* Représentant légal 2 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Représentant légal 2</h2>
          <div className="flex gap-4 mb-2">
            <label>
              <input
                type="radio"
                name="type2"
                value="pere"
                checked={formData.representantLegal2.type === 'pere'}
                onChange={e => handleChange(e, 'representantLegal2')}
              />{' '}
              Père
            </label>
            <label>
              <input
                type="radio"
                name="type2"
                value="mere"
                checked={formData.representantLegal2.type === 'mere'}
                onChange={e => handleChange(e, 'representantLegal2')}
              />{' '}
              Mère
            </label>
            <label>
              <input
                type="radio"
                name="type2"
                value="autre"
                checked={formData.representantLegal2.type === 'autre'}
                onChange={e => handleChange(e, 'representantLegal2')}
              />{' '}
              Autre responsable légal
            </label>
          </div>
          <div className="relative">
            <input
              className="input mb-3 peer bg-white"
              id="nom-legal2"
              type="text"
              name="nom"
              placeholder=" "
              value={formData.representantLegal2.nom}
              onChange={e => handleChange(e, 'representantLegal2')}
            />
            <label
              htmlFor="nom-legal2"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
            >
              Nom
            </label>
          </div>
          <div className="relative">
            <input
              className="input mb-3 peer bg-white"
              id="prenom-legal2"
              type="text"
              name="prenom"
              placeholder=" "
              value={formData.representantLegal2.prenom}
              onChange={e => handleChange(e, 'representantLegal2')}
            />
            <label
              htmlFor="prenom-legal2"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
            >
              Prénom
            </label>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="relative w-full">
              <input
                type="date"
                className="input peer bg-white mb-3"
                id="dateNaissance-legal2"
                name="dateNaissance"
                value={formatDate(
                  formData.representantLegal2.jourNaissance,
                  formData.representantLegal2.moisNaissance,
                  formData.representantLegal2.anneeNaissance
                )}
                onChange={e => {
                  const date = new Date(e.target.value);
                  handleChange(
                    {
                      ...e,
                      target: {
                        ...e.target,
                        name: 'jourNaissance',
                        value: date.getDate().toString().padStart(2, '0'),
                      },
                    } as any,
                    'representantLegal2'
                  );
                  handleChange(
                    {
                      ...e,
                      target: {
                        ...e.target,
                        name: 'moisNaissance',
                        value: (date.getMonth() + 1).toString().padStart(2, '0'),
                      },
                    } as any,
                    'representantLegal2'
                  );
                  handleChange(
                    {
                      ...e,
                      target: {
                        ...e.target,
                        name: 'anneeNaissance',
                        value: date.getFullYear().toString(),
                      },
                    } as any,
                    'representantLegal2'
                  );
                }}
              />
              <label
                htmlFor="dateNaissance-legal2"
                className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
              >
                Date de naissance
              </label>
            </div>
          </div>
          <div className="flex gap-4 mb-2 items-center">
            <span className="text-gray-700">Sexe :</span>
            <label>
              <input
                type="radio"
                name="sexe2"
                value="F"
                checked={formData.representantLegal2.sexe === 'F'}
                onChange={e => handleChange(e, 'representantLegal2')}
              />{' '}
              F
            </label>
            <label>
              <input
                type="radio"
                name="sexe2"
                value="M"
                checked={formData.representantLegal2.sexe === 'M'}
                onChange={e => handleChange(e, 'representantLegal2')}
              />{' '}
              M
            </label>
          </div>
          {/* Bouton copier l'adresse de l'autre représentant */}
          <div className="mb-2">
            <button
              type="button"
              className="text-xs text-blue-600 underline hover:text-blue-800"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  representantLegal2: {
                    ...prev.representantLegal2,
                    adresse: prev.representantLegal1.adresse,
                    codePostal: prev.representantLegal1.codePostal,
                    ville: prev.representantLegal1.ville,
                    tel: prev.representantLegal1.tel,
                    courriel: prev.representantLegal1.courriel,
                  },
                }));
              }}
            >
              Copier l'adresse du représentant légal 1
            </button>
          </div>
          <div className="relative">
            <input
              className="input mb-3 peer bg-white"
              id="adresse-legal2"
              type="text"
              name="adresse"
              placeholder=" "
              value={formData.representantLegal2.adresse}
              onChange={e => handleChange(e, 'representantLegal2')}
            />
            <label
              htmlFor="adresse-legal2"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
            >
              Adresse
            </label>
          </div>
          <div className="relative">
            <input
              className="input mb-3 peer bg-white"
              id="codePostal-legal2"
              type="number"
              name="codePostal"
              placeholder=" "
              value={formData.representantLegal2.codePostal}
              onChange={e => {
                handleChange(e, 'representantLegal2');
              }}
              maxLength={5}
              pattern="[0-9]{5}"
              title="Veuillez entrer un code postal valide (5 chiffres)"
              list="codes-postaux-list"
            />
            <label
              htmlFor="codePostal-legal2"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
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
              className="input mb-3 peer bg-white"
              id="ville-legal2"
              type="text"
              name="ville"
              placeholder=" "
              value={formData.representantLegal2.ville}
              onChange={e => handleChange(e, 'representantLegal2')}
              list="villes-list"
            />
            <label
              htmlFor="ville-legal2"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
            >
              Ville
            </label>
          </div>
          <div className="relative">
            <input
              className="input mb-3 peer bg-white"
              id="tel-legal2"
              type="tel"
              name="tel"
              placeholder=" "
              value={formData.representantLegal2.tel}
              onChange={e => handleChange(e, 'representantLegal2')}
            />
            <label
              htmlFor="tel-legal2"
              className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
            >
              Téléphone
            </label>
          </div>
          <div className="relative">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  title="Veuillez entrer une adresse email valide"
                  id="courriel-legal2"
                  name="courriel"
                  value={formData.representantLegal2.courriel}
                  onChange={e => handleChange(e, 'representantLegal2')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer bg-white"
                  placeholder=" "
                />
                <label
                  htmlFor="courriel-legal2"
                  className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
                >
                  Courriel
                </label>
              </div>
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('courriel-legal2') as HTMLInputElement;
                  if (!input) return;
                  const start = input.selectionStart || 0;
                  const end = input.selectionEnd || 0;
                  const newValue =
                    formData.representantLegal2.courriel.substring(0, start) +
                    '@' +
                    formData.representantLegal2.courriel.substring(end);
                  setFormData(prev => ({
                    ...prev,
                    representantLegal2: {
                      ...prev.representantLegal2,
                      courriel: newValue,
                    },
                  }));
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
      {/* Affichage conditionnel de la domiciliation */}
      {formData.representantLegal1.adresse &&
        formData.representantLegal2.adresse &&
        formData.representantLegal1.codePostal &&
        formData.representantLegal2.codePostal &&
        formData.representantLegal1.ville &&
        formData.representantLegal2.ville &&
        (formData.representantLegal1.adresse !== formData.representantLegal2.adresse ||
          formData.representantLegal1.codePostal !== formData.representantLegal2.codePostal ||
          formData.representantLegal1.ville !== formData.representantLegal2.ville) && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Domiciliation de l'enfant</h2>
            <div className="flex gap-6">
              <label>
                <input
                  type="checkbox"
                  name="domicile1"
                  checked={formData.domiciliation.domicile1}
                  onChange={handleDomiciliationChange}
                />{' '}
                Responsable légal 1
              </label>
              <label>
                <input
                  type="checkbox"
                  name="domicile2"
                  checked={formData.domiciliation.domicile2}
                  onChange={handleDomiciliationChange}
                />{' '}
                Responsable légal 2
              </label>
              <label>
                <input
                  type="checkbox"
                  name="gardeAlternee"
                  checked={formData.domiciliation.gardeAlternee}
                  onChange={handleDomiciliationChange}
                />{' '}
                Garde alternée
              </label>
            </div>
          </div>
        )}
    </div>
  );
}
