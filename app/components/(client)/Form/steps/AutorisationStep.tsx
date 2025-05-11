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
                          ...prev.personnesHabilitees.slice(0, idx),
                          prev.personnesAccident[idx],
                          ...prev.personnesHabilitees.slice(idx + 1),
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
          {formData.mineur ||
            (!formData.dateNaissance && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">
                  Autorisation de sortie de l'enfant de plus de 6 ans
                </h2>
                <div className="flex gap-6 items-center">
                  {/* Les inputs Je soussigné sont déjà affichés au-dessus */}
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="autorisationSortie"
                      value="autorise"
                      checked={formData.autorisationSortie === 'autorise'}
                      onChange={e =>
                        setFormData(prev => ({ ...prev, autorisationSortie: 'autorise' }))
                      }
                      className="ml-2 bg-white"
                    />
                    <span className="ml-1">Autorise</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="autorisationSortie"
                      value="nonAutorise"
                      checked={formData.autorisationSortie === 'nonAutorise'}
                      onChange={e =>
                        setFormData(prev => ({ ...prev, autorisationSortie: 'nonAutorise' }))
                      }
                      className="ml-2 bg-white"
                    />
                    <span className="ml-1">N'autorise pas</span>
                  </label>
                </div>
                <div className="mt-2 text-sm text-gray-700 italic">
                  {`Je soussigné ${formData.soussigneNom || formData.nom} ${formData.soussignePrenom || formData.prenom} ${formData.autorisationSortie === 'autorise' ? 'autorise' : "n'autorise pas"} le bénéficiaire de plus de 6 ans à sortir seul de la Maison pour tous après les activités.`}
                </div>
              </div>
            ))}
        </>
      )}

      {/* Droit à l'image */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Droit à l'image</h2>
        <div className="flex gap-6 items-center">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="droitImage"
              value="autorise"
              checked={formData.droitImage === 'autorise'}
              onChange={e => setFormData(prev => ({ ...prev, droitImage: 'autorise' }))}
              className="ml-2"
            />
            <span className="ml-1">Autorise</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="droitImage"
              value="nonAutorise"
              checked={formData.droitImage === 'nonAutorise'}
              onChange={e => setFormData(prev => ({ ...prev, droitImage: 'nonAutorise' }))}
              className="ml-2"
            />
            <span className="ml-1">N'autorise pas</span>
          </label>
        </div>
        <div className="mt-2 text-sm text-gray-700 italic">
          {`Je soussigné ${formData.soussigneNom || formData.nom} ${formData.soussignePrenom || formData.prenom} ${formData.droitImage === 'autorise' ? 'autorise' : "n'autorise pas"} l'établissement d'accueil à me photographier/filmer ou à photographier/filmer le bénéficiaire de la prestation.`}
        </div>
      </div>

      {/* APS */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Activités sportives (APS)</h2>
        <div className="flex gap-6 items-center">
          <span>Le bénéficiaire de la prestation est</span>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="aps"
              value="apte"
              checked={formData.aps === 'apte'}
              onChange={e => setFormData(prev => ({ ...prev, aps: 'apte' }))}
              className="ml-2"
            />
            <span className="ml-1">Apte</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="aps"
              value="inapte"
              checked={formData.aps === 'inapte'}
              onChange={e => setFormData(prev => ({ ...prev, aps: 'inapte' }))}
              className="ml-2"
            />
            <span className="ml-1">N'est pas apte</span>
          </label>
        </div>
        <div className="mt-2 text-sm text-gray-700 italic">
          {`Je soussigné ${formData.soussigneNom || formData.nom} ${formData.soussignePrenom || formData.prenom} atteste que le bénéficiaire de la prestation est ${formData.aps === 'apte' ? 'apte' : "n'est pas apte"} à la pratique des activités sportives.`}
        </div>
      </div>

      {/* CAF */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Information CAF</h2>
        <div className="flex gap-6 items-center mb-2">
          <span>Allocataire</span>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="allocataire"
              value="oui"
              checked={formData.caf.allocataire === true}
              onChange={e => handleCafChange('allocataire', true)}
              className="ml-2 bg-white"
            />
            <span className="ml-1">Oui</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="allocataire"
              value="non"
              checked={formData.caf.allocataire === false}
              onChange={e => handleCafChange('allocataire', false)}
              className="ml-2 bg-white"
            />
            <span className="ml-1">Non</span>
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
  );
}
