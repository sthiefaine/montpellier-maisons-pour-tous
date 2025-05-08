import React from 'react';
import { FormData } from '../page';

interface RepresentantLegalCardProps {
  titre: string;
  values: FormData['representantLegal1'] | FormData['representantLegal2'];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCopyAdresse?: () => void;
  canCopyAdresse?: boolean;
  copyLabel?: string;
  onReset?: () => void;
  onValidate?: () => void;
  isEditing: boolean;
  onEdit: () => void;
}

export default function RepresentantLegalCard({
  titre,
  values,
  onChange,
  onCopyAdresse,
  canCopyAdresse,
  copyLabel,
  onReset,
  onValidate,
  isEditing,
  onEdit
}: RepresentantLegalCardProps) {
  if (!isEditing) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de représentant
          </label>
          <select
            name="type"
            value={values.type}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner</option>
            <option value="pere">Père</option>
            <option value="mere">Mère</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            name="nom"
            value={values.nom}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prénom
          </label>
          <input
            type="text"
            name="prenom"
            value={values.prenom}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de naissance
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              name="jourNaissance"
              value={values.jourNaissance}
              onChange={onChange}
              placeholder="JJ"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="moisNaissance"
              value={values.moisNaissance}
              onChange={onChange}
              placeholder="MM"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="anneeNaissance"
              value={values.anneeNaissance}
              onChange={onChange}
              placeholder="AAAA"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sexe
          </label>
          <select
            name="sexe"
            value={values.sexe}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse
          </label>
          <input
            type="text"
            name="adresse"
            value={values.adresse}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Code postal
          </label>
          <input
            type="text"
            name="codePostal"
            value={values.codePostal}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ville
          </label>
          <input
            type="text"
            name="ville"
            value={values.ville}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            name="tel"
            value={values.tel}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="courriel"
            value={values.courriel}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {canCopyAdresse && onCopyAdresse && (
          <button
            onClick={onCopyAdresse}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            {copyLabel || 'Copier l\'adresse'}
          </button>
        )}
        {onReset && (
          <button
            onClick={onReset}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Réinitialiser
          </button>
        )}
        <button
          onClick={onValidate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Valider
        </button>
      </div>
    </div>
  );
} 