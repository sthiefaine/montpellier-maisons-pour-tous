import React from 'react';
import { UserIcon } from '@heroicons/react/24/solid';
import RepresentantLegalCard from './RepresentantLegalCard';
import { FormData } from '../page';

interface RepresentantLegalCardVisuelProps {
  titre: string;
  values: FormData['representantLegal1'] | FormData['representantLegal2'];
  isEditing: boolean;
  onEdit: () => void;
  onValidate?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  canCopyAdresse?: boolean;
  onCopyAdresse?: () => void;
  copyLabel?: string;
  onReset?: () => void;
}

export default function RepresentantLegalCardVisuel({
  titre,
  values,
  isEditing,
  onEdit,
  onValidate,
  onChange,
  canCopyAdresse,
  onCopyAdresse,
  copyLabel,
  onReset
}: RepresentantLegalCardVisuelProps) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <UserIcon className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">{titre}</h3>
      </div>
      {isEditing ? (
        <RepresentantLegalCard
          titre={titre}
          values={values}
          onChange={onChange}
          canCopyAdresse={canCopyAdresse}
          onCopyAdresse={onCopyAdresse}
          copyLabel={copyLabel}
          onReset={onReset}
          onValidate={onValidate}
          isEditing={isEditing}
          onEdit={onEdit}
        />
      ) : (
        <div>
          <div className="mb-2 text-sm text-gray-700">
            <div><span className="font-semibold">Nom :</span> {values.nom || <span className="italic text-gray-400">Non renseigné</span>}</div>
            <div><span className="font-semibold">Prénom :</span> {values.prenom || <span className="italic text-gray-400">Non renseigné</span>}</div>
            <div><span className="font-semibold">Date de naissance :</span> {values.jourNaissance && values.moisNaissance && values.anneeNaissance ? `${values.jourNaissance}/${values.moisNaissance}/${values.anneeNaissance}` : <span className="italic text-gray-400">Non renseignée</span>}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Modifier/Ajouter
            </button>
            {values.nom && onReset && (
              <button
                onClick={onReset}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Effacer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 