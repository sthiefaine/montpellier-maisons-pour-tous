import React, { useState } from 'react';
import { FormData } from '../page';
import RepresentantLegalCardVisuel from './RepresentantLegalCardVisuel';
import AutorisationForm from './AutorisationForm';

interface Page2FormProps {
  form: FormData;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const createSyntheticEvent = (
  name: string,
  value: string | boolean | Record<string, any>,
  type: string = 'text'
): React.ChangeEvent<HTMLInputElement> => {
  return {
    target: {
      name,
      value,
      type,
      checked: type === 'checkbox' ? Boolean(value) : undefined
    },
    currentTarget: document.createElement('input'),
    nativeEvent: new Event('change'),
    bubbles: true,
    cancelable: true,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: true,
    preventDefault: () => {},
    stopPropagation: () => {},
    isDefaultPrevented: () => false,
    isPropagationStopped: () => false,
    persist: () => {},
    timeStamp: Date.now(),
    type: 'change'
  } as React.ChangeEvent<HTMLInputElement>;
};

export default function Page2Form({ form, handleFormChange }: Page2FormProps) {
  const [isEditingRep1, setIsEditingRep1] = useState(false);
  const [isEditingRep2, setIsEditingRep2] = useState(false);

  const handleRep1Change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleFormChange(createSyntheticEvent(`representantLegal1.${name}`, value));
  };

  const handleRep2Change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleFormChange(createSyntheticEvent(`representantLegal2.${name}`, value));
  };

  const handleDomiciliationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    // S'assurer que toutes les valeurs sont définies
    const newDomiciliation = {
      domicile1: value === 'domicile1',
      domicile2: value === 'domicile2',
      gardeAlternee: value === 'gardeAlternee'
    };

    // Mettre à jour l'état avec les nouvelles valeurs
    handleFormChange(createSyntheticEvent('domiciliation', newDomiciliation));
  };

  const handleResetRep1 = () => {
    const emptyRep = {
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
    };
    Object.entries(emptyRep).forEach(([key, value]) => {
      handleFormChange(createSyntheticEvent(`representantLegal1.${key}`, value));
    });
  };

  const handleResetRep2 = () => {
    const emptyRep = {
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
    };
    Object.entries(emptyRep).forEach(([key, value]) => {
      handleFormChange(createSyntheticEvent(`representantLegal2.${key}`, value));
    });
  };

  // Gestion des personnes (ajout, suppression, édition, sélection)
  const onAddPersonne = () => {
    updateFormField('personnes', [
      ...form.personnes,
      { id: generateId(), nom: '', prenom: '', tel: '' },
    ], 'custom');
  };

  const onRemovePersonne = (id: string) => {
    updateFormField('personnes', form.personnes.filter(p => p.id !== id), 'custom');
    updateFormField('personnesAccident', form.personnesAccident.filter(pid => pid !== id), 'custom');
    updateFormField('personnesHabilitees', form.personnesHabilitees.filter(pid => pid !== id), 'custom');
  };

  const onEditPersonne = (id: string, field: string, value: string) => {
    updateFormField('personnes', form.personnes.map(p => p.id === id ? { ...p, [field]: value } : p), 'custom');
  };

  const onToggleAccident = (id: string) => {
    const exists = form.personnesAccident.includes(id);
    if (!exists && form.personnesAccident.length >= 2) return;
    updateFormField('personnesAccident', exists
      ? form.personnesAccident.filter(pid => pid !== id)
      : [...form.personnesAccident, id], 'custom');
  };

  const onToggleHabilite = (id: string) => {
    const exists = form.personnesHabilitees.includes(id);
    if (!exists && form.personnesHabilitees.length >= 2) return;
    updateFormField('personnesHabilitees', exists
      ? form.personnesHabilitees.filter(pid => pid !== id)
      : [...form.personnesHabilitees, id], 'custom');
  };

  const generateId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

  const safeObjectSpread = (obj: any) => {
    if (
      obj &&
      typeof obj === 'object' &&
      !Array.isArray(obj) &&
      Object.prototype.toString.call(obj) === '[object Object]'
    ) {
      return obj;
    }
    return {};
  };

  const updateFormField = (
    name: string,
    value: any,
    type: string = 'text'
  ) => {
    if (name === 'caf.allocataire') {
      handleFormChange({
        target: {
          name,
          value,
          type,
        },
      } as any);
      return;
    }
    if (name.includes('.')) {
      const parts = name.split('.');
      if (parts.length === 2) {
        const parentValue = form[parts[0] as keyof typeof form];
        handleFormChange({
          target: {
            name: parts[0],
            value: Object.assign({}, (typeof parentValue === 'object' && parentValue !== null && !Array.isArray(parentValue)) ? parentValue : {}, { [parts[1]]: value }),
            type,
          },
        } as any);
      } else if (parts.length === 3) {
        const arr = parts[0];
        const idx = Number(parts[1]);
        const field = parts[2];
        const arrValue = form[arr as keyof typeof form];
        if (Array.isArray(arrValue)) {
          handleFormChange({
            target: {
              name: arr,
              value: arrValue.map((item, i) =>
                i === idx && typeof item === 'object' && item !== null && !Array.isArray(item)
                  ? { ...item, [field]: value }
                  : item
              ),
              type,
            },
          } as any);
        }
      }
      return;
    }
    handleFormChange({
      target: {
        name,
        value,
        type,
      },
    } as any);
  };

  return (
    <div className="space-y-6">
      <RepresentantLegalCardVisuel
        titre="Représentant légal 1"
        values={form.representantLegal1}
        isEditing={isEditingRep1}
        onEdit={() => setIsEditingRep1(true)}
        onValidate={() => setIsEditingRep1(false)}
        onChange={handleRep1Change}
        canCopyAdresse={true}
        onCopyAdresse={() => {
          handleFormChange(createSyntheticEvent('representantLegal1.adresse', form.adresse));
          handleFormChange(createSyntheticEvent('representantLegal1.codePostal', form.codePostal));
          handleFormChange(createSyntheticEvent('representantLegal1.ville', form.ville));
        }}
        copyLabel="Copier l'adresse de l'enfant"
        onReset={handleResetRep1}
      />

      <RepresentantLegalCardVisuel
        titre="Représentant légal 2"
        values={form.representantLegal2}
        isEditing={isEditingRep2}
        onEdit={() => setIsEditingRep2(true)}
        onValidate={() => setIsEditingRep2(false)}
        onChange={handleRep2Change}
        canCopyAdresse={true}
        onCopyAdresse={() => {
          handleFormChange(createSyntheticEvent('representantLegal2.adresse', form.adresse));
          handleFormChange(createSyntheticEvent('representantLegal2.codePostal', form.codePostal));
          handleFormChange(createSyntheticEvent('representantLegal2.ville', form.ville));
        }}
        copyLabel="Copier l'adresse de l'enfant"
        onReset={handleResetRep2}
      />

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Domiciliation</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="domicile1"
              name="domiciliation"
              value="domicile1"
              checked={Boolean(form.domiciliation?.domicile1)}
              onChange={handleDomiciliationChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="domicile1" className="text-gray-700">
              Domicile du représentant légal 1
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="domicile2"
              name="domiciliation"
              value="domicile2"
              checked={Boolean(form.domiciliation?.domicile2)}
              onChange={handleDomiciliationChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="domicile2" className="text-gray-700">
              Domicile du représentant légal 2
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="gardeAlternee"
              name="domiciliation"
              value="gardeAlternee"
              checked={Boolean(form.domiciliation?.gardeAlternee)}
              onChange={handleDomiciliationChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="gardeAlternee" className="text-gray-700">
              Garde alternée
            </label>
          </div>
        </div>
      </div>
      {/* Section Autorisations */}
      <AutorisationForm
        form={form}
        handleFormChange={handleFormChange}
        onAddPersonne={onAddPersonne}
        onRemovePersonne={onRemovePersonne}
        onEditPersonne={onEditPersonne}
        onToggleAccident={onToggleAccident}
        onToggleHabilite={onToggleHabilite}
      />
    </div>
  );
}
