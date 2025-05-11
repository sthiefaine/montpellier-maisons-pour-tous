import { Dispatch, SetStateAction } from 'react';
import { FormData } from '@/types/form';

interface AutorisationStepProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

export default function AutorisationStep({ formData, setFormData }: AutorisationStepProps) {
  // Gestion des personnes à prévenir et habilitées
  const handlePersonChange = (
    type: 'personnesAccident' | 'personnesHabilitees',
    index: number,
    field: 'nom' | 'prenom' | 'tel',
    value: string
  ) => {
    setFormData(prev => {
      const arr = Array.isArray(prev[type])
        ? [...(prev[type] as Array<{ nom: string; prenom: string; tel: string }>)]
        : [];
      if (!arr[index] || typeof arr[index] !== 'object')
        arr[index] = { nom: '', prenom: '', tel: '' };
      arr[index][field] = value;
      return { ...prev, [type]: arr };
    });
  };

  // Gestion CAF
  const handleCafChange = (
    field: 'allocataire' | 'numeroAllocataire' | 'nbEnfants',
    value: string | boolean | number
  ) => {
    setFormData(prev => ({
      ...prev,
      caf: {
        ...prev.caf,
        [field]: value,
      },
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Autorisations</h1>

      {/* Autorisation de sortie */}
      {(formData.mineur || !formData.dateNaissance) && (
        <>
          {/* Personnes habilitées à venir chercher l'enfant */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Personnes habilitées à venir chercher l'enfant (hors représentants légaux)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[0, 1].map(idx => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <div className="mb-2 font-medium">Personne {idx + 1}</div>
                  <button
                    type="button"
                    className="text-xs text-blue-600 underline hover:text-blue-800 mb-2"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        personnesHabilitees: [
                          ...prev.personnesAccident.slice(0, idx),
                          prev.personnesHabilitees[idx],
                          ...prev.personnesAccident.slice(idx + 1),
                        ],
                      }));
                    }}
                  >
                    Copier la personne {idx + 1} à prévenir en cas d'accident
                  </button>
                  <div className="input-floating">
                    <input
                      type="text"
                      placeholder=" "
                      value={formData.personnesHabilitees[idx]?.nom || ''}
                      onChange={e =>
                        handlePersonChange('personnesHabilitees', idx, 'nom', e.target.value)
                      }
                      id={`nom-habilitee-${idx}`}
                    />
                    <label htmlFor={`nom-habilitee-${idx}`}>Nom</label>
                  </div>
                  <div className="input-floating mt-2">
                    <input
                      type="text"
                      placeholder=" "
                      value={formData.personnesHabilitees[idx]?.prenom || ''}
                      onChange={e =>
                        handlePersonChange('personnesHabilitees', idx, 'prenom', e.target.value)
                      }
                      id={`prenom-habilitee-${idx}`}
                    />
                    <label htmlFor={`prenom-habilitee-${idx}`}>Prénom</label>
                  </div>
                  <div className="input-floating mt-2">
                    <input
                      type="tel"
                      placeholder=" "
                      value={formData.personnesHabilitees[idx]?.tel || ''}
                      onChange={e =>
                        handlePersonChange('personnesHabilitees', idx, 'tel', e.target.value)
                      }
                      id={`tel-habilitee-${idx}`}
                    />
                    <label htmlFor={`tel-habilitee-${idx}`}>Tél</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personnes à prévenir en cas d'accident */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Personnes à prévenir en cas d'accident (hors représentants légaux)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[0, 1].map(idx => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <div className="mb-2 font-medium">Personne {idx + 1} </div>
                  <button
                    type="button"
                    className="text-xs text-blue-600 underline hover:text-blue-800 mb-2"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        personnesAccident: [
                          ...prev.personnesAccident.slice(0, idx),
                          prev.personnesHabilitees[idx],
                          ...prev.personnesAccident.slice(idx + 1),
                        ],
                      }));
                    }}
                  >
                    Copier la personne {idx + 1} habilitée à venir chercher l'enfant
                  </button>
                  <div className="input-floating">
                    <input
                      type="text"
                      placeholder=" "
                      value={
                        (
                          formData.personnesAccident[idx] as unknown as
                            | { nom: string; prenom: string; tel: string }
                            | undefined
                        )?.nom || ''
                      }
                      onChange={e =>
                        handlePersonChange('personnesAccident', idx, 'nom', e.target.value)
                      }
                      id={`nom-accident-${idx}`}
                    />
                    <label htmlFor={`nom-accident-${idx}`}>Nom</label>
                  </div>
                  <div className="input-floating mt-2">
                    <input
                      type="text"
                      placeholder=" "
                      value={
                        (
                          formData.personnesAccident[idx] as unknown as
                            | { nom: string; prenom: string; tel: string }
                            | undefined
                        )?.prenom || ''
                      }
                      onChange={e =>
                        handlePersonChange('personnesAccident', idx, 'prenom', e.target.value)
                      }
                      id={`prenom-accident-${idx}`}
                    />
                    <label htmlFor={`prenom-accident-${idx}`}>Prénom</label>
                  </div>
                  <div className="input-floating mt-2">
                    <input
                      type="tel"
                      placeholder=" "
                      value={
                        (
                          formData.personnesAccident[idx] as unknown as
                            | { nom: string; prenom: string; tel: string }
                            | undefined
                        )?.tel || ''
                      }
                      onChange={e =>
                        handlePersonChange('personnesAccident', idx, 'tel', e.target.value)
                      }
                      id={`tel-accident-${idx}`}
                    />
                    <label htmlFor={`tel-accident-${idx}`}>Tél</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inputs Je soussigné (Nom, Prénom) */}
          <div className="flex gap-4 items-center mb-4">
            <span className="font-medium">Je soussigné</span>
            <div className="input-floating flex-grow">
              <input
                type="text"
                placeholder=" "
                value={formData.soussigneNom || (formData.formType === 'self' ? formData.nom : '')}
                onChange={e => setFormData(prev => ({ ...prev, soussigneNom: e.target.value }))}
                id="soussigne-nom"
                className="bg-white"
              />
              <label htmlFor="soussigne-nom">Nom</label>
            </div>
            <div className="input-floating flex-grow">
              <input
                type="text"
                placeholder=" "
                value={
                  formData.soussignePrenom || (formData.formType === 'self' ? formData.prenom : '')
                }
                onChange={e => setFormData(prev => ({ ...prev, soussignePrenom: e.target.value }))}
                id="soussigne-prenom"
                className="bg-white"
              />
              <label htmlFor="soussigne-prenom">Prénom</label>
            </div>
          </div>

          {/* Autorisation de sortie de l'enfant de plus de 6 ans */}
          {formData.mineur || !formData.dateNaissance ? (
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Autorisation de sortie de l'enfant de plus de 6 ans</h3>
              <div className="space-y-4">
                <div className="flex gap-6 items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="autorisationSortie"
                      value="autorise"
                      checked={formData.autorisationSortie === 'autorise'}
                      onChange={e => setFormData(prev => ({ ...prev, autorisationSortie: 'autorise' }))}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2">Autorise</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="autorisationSortie"
                      value="nonAutorise"
                      checked={formData.autorisationSortie === 'nonAutorise'}
                      onChange={e => setFormData(prev => ({ ...prev, autorisationSortie: 'nonAutorise' }))}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2">N'autorise pas</span>
                  </label>
                </div>
                <p className="text-sm text-gray-600 italic">
                  {`Je soussigné ${formData.soussigneNom || formData.nom} ${formData.soussignePrenom || formData.prenom} ${formData.autorisationSortie === 'autorise' ? 'autorise' : "n'autorise pas"} le bénéficiaire de plus de 6 ans à sortir seul de la Maison pour tous après les activités.`}
                </p>
              </div>
            </div>
          ) : null}
        </>
      )}

      <div className="space-y-6">
        {/* Droit à l'image */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Droit à l'image</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="droitImage"
                checked={formData.droitImage === 'autorise'}
                onChange={e => setFormData(prev => ({ ...prev, droitImage: e.target.checked ? 'autorise' : 'nonAutorise' }))}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="droitImage" className="ml-3 text-sm text-gray-700">
                J'autorise la prise de photos et/ou de vidéos de mon enfant dans le cadre des activités
                de la Maison pour tous
              </label>
            </div>
            <p className="text-sm text-gray-600 italic">
              L'utilisation de ces images sera réservée à la structure d'accueil (affichage, diaporama, album photos…) ainsi qu'à la communication municipale (journaux municipaux et site web). Tout autre usage devra faire l'objet d'une autorisation spécifique.
            </p>
          </div>
        </div>

        {/* APS */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Activités sportives (APS)</h3>
          <div className="space-y-4">
            <div className="flex gap-6 items-center">
              <span>Le bénéficiaire de la prestation est</span>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="aps"
                  value="apte"
                  checked={formData.aps === 'apte'}
                  onChange={e => setFormData(prev => ({ ...prev, aps: 'apte' }))}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2">Apte</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="aps"
                  value="inapte"
                  checked={formData.aps === 'inapte'}
                  onChange={e => setFormData(prev => ({ ...prev, aps: 'inapte' }))}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2">N'est pas apte</span>
              </label>
            </div>
            <p className="text-sm text-gray-600 italic">
              {`Je soussigné ${formData.soussigneNom || formData.nom} ${formData.soussignePrenom || formData.prenom} atteste que le bénéficiaire de la prestation est ${formData.aps === 'apte' ? 'apte' : "n'est pas apte"} à la pratique des activités sportives.`}
            </p>
          </div>
        </div>

        {/* CAF */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Information CAF</h3>
          <div className="space-y-4">
            <div className="flex gap-6 items-center">
              <span>Allocataire</span>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="allocataire"
                  value="oui"
                  checked={formData.caf.allocataire === true}
                  onChange={e => handleCafChange('allocataire', true)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2">Oui</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="allocataire"
                  value="non"
                  checked={formData.caf.allocataire === false}
                  onChange={e => handleCafChange('allocataire', false)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2">Non</span>
              </label>
            </div>
            {formData.caf.allocataire && (
              <div className="flex gap-4">
                <div className="input-floating flex-1">
                  <input
                    type="text"
                    placeholder=" "
                    value={formData.caf.numeroAllocataire}
                    onChange={e => handleCafChange('numeroAllocataire', e.target.value)}
                    id="numero-allocataire"
                  />
                  <label htmlFor="numero-allocataire">N° Allocataire</label>
                </div>
                <div className="input-floating flex-1">
                  <input
                    type="number"
                    min={0}
                    placeholder=" "
                    value={formData.caf.nbEnfants}
                    onChange={e => handleCafChange('nbEnfants', Number(e.target.value))}
                    id="nb-enfants"
                  />
                  <label htmlFor="nb-enfants">Nombre d'enfants à charge</label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
