import React from 'react';
import mptData from '@/data/mpt.json';
interface AdherentFormProps {
  form: {
    maison: string;
    saison: string;
    nom: string;
    prenom: string;
    sexe: string;
    mineur: boolean;
    dateNaissance: string;
    communeNaissance: string;
    departementNaissance: number;
    adresse: string;
    telephone: string;
    email: string;
    acceptationInformations: boolean;
  };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function AdherentForm({ form, handleFormChange }: AdherentFormProps) {
  return (
    <div className="space-y-4">
            <div>
        <label className="block text-gray-700 font-medium mb-1">Maison pour tous</label>
        <select
          name="maison"
          value={form.maison}
          onChange={handleFormChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          {mptData.map(mpt => (
            <option key={mpt.slug} value={mpt.codeMPT}>
              {mpt.codeMPT}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Saison</label>
        <input
          name="saison"
          value={form.saison}
          onChange={handleFormChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Nom</label>
        <input
          name="nom"
          value={form.nom}
          onChange={handleFormChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Prénom</label>
        <input
          name="prenom"
          value={form.prenom}
          onChange={handleFormChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Sexe</label>
        <select
          name="sexe"
          value={form.sexe}
          onChange={handleFormChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="Femme">Femme</option>
          <option value="Homme">Homme</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="mineur"
          checked={form.mineur}
          onChange={handleFormChange}
          className="border rounded px-3 py-2"
        />
        <label className="text-gray-700 font-medium">Mineur</label>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Date de naissance</label>
        <input
          name="dateNaissance"
          type="date"
          value={form.dateNaissance}
          onChange={handleFormChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Commune/Lieu de naissance</label>
        <input
          name="communeNaissance"
          value={form.communeNaissance}
          onChange={handleFormChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Adresse</label>
        <input
          name="adresse"
          value={form.adresse}
          onChange={handleFormChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Téléphone</label>
        <input
          name="telephone"
          value={form.telephone}
          onChange={handleFormChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleFormChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="acceptationInformations"
          checked={form.acceptationInformations}
          onChange={handleFormChange}
          className="border rounded px-3 py-2"
        />
        <label className="text-gray-700 font-medium">
          J'accepte de recevoir des informations de la MPT
        </label>
      </div>
    </div>
  );
} 