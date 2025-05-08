import React from 'react';
import { FormData } from '../page';

interface AutorisationFormProps {
  form: FormData;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onAddPersonne: () => void;
  onRemovePersonne: (id: string) => void;
  onEditPersonne: (id: string, field: string, value: string) => void;
  onToggleAccident: (id: string) => void;
  onToggleHabilite: (id: string) => void;
}

function isPersonneRenseignee(p: { nom: string; prenom: string; tel: string }) {
  return p.nom.trim() || p.prenom.trim() || p.tel.trim();
}

export default function AutorisationForm({
  form,
  handleFormChange,
  onAddPersonne,
  onRemovePersonne,
  onEditPersonne,
  onToggleAccident,
  onToggleHabilite,
}: AutorisationFormProps) {
  const showSoussigné =
    form.autorisationSortie === 'autorise' ||
    form.droitImage === 'autorise' ||
    form.aps === 'apte';

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4 text-sm">
      <h2 className="text-lg font-semibold text-blue-700 mb-2">AUTORISATIONS</h2>
      {/* Liste commune des personnes */}
      <div>
        <div className="font-semibold mb-1">Liste des personnes (commune)</div>
        <div className="space-y-2">
          {form.personnes.map((p, idx) => (
            <div key={p.id} className="flex items-center gap-2 border rounded p-2 bg-gray-50">
              <input
                className="input input-sm"
                placeholder="Nom"
                value={p.nom}
                onChange={e => onEditPersonne(p.id, 'nom', e.target.value)}
              />
              <input
                className="input input-sm"
                placeholder="Prénom"
                value={p.prenom}
                onChange={e => onEditPersonne(p.id, 'prenom', e.target.value)}
              />
              <input
                className="input input-sm"
                placeholder="Tél"
                value={p.tel}
                onChange={e => onEditPersonne(p.id, 'tel', e.target.value)}
              />
              <button type="button" className="text-xs text-red-600 underline" onClick={() => onRemovePersonne(p.id)}>
                Supprimer
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="mt-2 text-xs text-blue-700 underline" onClick={onAddPersonne}>
          + Ajouter une personne
        </button>
      </div>
      {/* Sélection pour Personnes à prévenir en cas d'accident */}
      <div>
        <div className="font-semibold mb-1">Personnes à prévenir en cas d'accident</div>
        <div className="flex flex-wrap gap-4">
          {form.personnes.filter(isPersonneRenseignee).map(p => (
            <label key={p.id} className="flex items-center gap-1 border rounded px-2 py-1">
              <input
                type="checkbox"
                checked={form.personnesAccident.includes(p.id)}
                onChange={() => onToggleAccident(p.id)}
              />
              {p.nom} {p.prenom} {p.tel && <span className="text-gray-400">({p.tel})</span>}
            </label>
          ))}
        </div>
      </div>
      {/* Sélection pour Personnes habilitées à venir chercher l'enfant */}
      <div>
        <div className="font-semibold mb-1">Personnes habilitées à venir chercher l'enfant</div>
        <div className="flex flex-wrap gap-4">
          {form.personnes.filter(isPersonneRenseignee).map(p => (
            <label key={p.id} className="flex items-center gap-1 border rounded px-2 py-1">
              <input
                type="checkbox"
                checked={form.personnesHabilitees.includes(p.id)}
                onChange={() => onToggleHabilite(p.id)}
              />
              {p.nom} {p.prenom} {p.tel && <span className="text-gray-400">({p.tel})</span>}
            </label>
          ))}
        </div>
      </div>
      {/* 3. Autorisation de sortie de l'enfant de plus de 6 ans */}
      <div className="flex items-center gap-2">
        <span className="font-semibold">Autorisation de sortie de l'enfant de plus de 6 ans :</span>
        <label className="flex items-center gap-1">
          <input type="radio" name="autorisationSortie" value="autorise" checked={form.autorisationSortie === 'autorise'} onChange={handleFormChange} />
          Autorise
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="autorisationSortie" value="nAutorisePas" checked={form.autorisationSortie === 'nAutorisePas'} onChange={handleFormChange} />
          N'autorise pas
        </label>
      </div>
      {/* 4. Droit à l'image */}
      <div className="flex items-center gap-2">
        <span className="font-semibold">Droit à l'image :</span>
        <label className="flex items-center gap-1">
          <input type="radio" name="droitImage" value="autorise" checked={form.droitImage === 'autorise'} onChange={handleFormChange} />
          Autorise
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="droitImage" value="nAutorisePas" checked={form.droitImage === 'nAutorisePas'} onChange={handleFormChange} />
          N'autorise pas
        </label>
      </div>
      {/* 5. Activités sportives (APS) */}
      <div className="flex items-center gap-2">
        <span className="font-semibold">Activités sportives (APS) :</span>
        <label className="flex items-center gap-1">
          <input type="radio" name="aps" value="apte" checked={form.aps === 'apte'} onChange={handleFormChange} />
          Apte
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="aps" value="nonApte" checked={form.aps === 'nonApte'} onChange={handleFormChange} />
          N'est pas apte
        </label>
      </div>
      {/* Champ Je soussigné(e) */}
      {showSoussigné && (
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold">Je soussigné(e)&nbsp;:</span>
          <input
            name="soussigneNom"
            value={form.soussigneNom}
            onChange={handleFormChange}
            placeholder="Nom"
            className="input input-sm"
          />
          <input
            name="soussignePrenom"
            value={form.soussignePrenom}
            onChange={handleFormChange}
            placeholder="Prénom"
            className="input input-sm"
          />
        </div>
      )}
      {/* 6. Information CAF */}
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Information CAF :</span>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1">
            <input type="radio" name="caf.allocataire" value="true" checked={form.caf.allocataire === true} onChange={handleFormChange} />
            Oui
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="caf.allocataire" value="false" checked={form.caf.allocataire === false} onChange={handleFormChange} />
            Non
          </label>
          {form.caf.allocataire && (
            <>
              <input name="caf.numeroAllocataire" value={form.caf.numeroAllocataire} onChange={handleFormChange} placeholder="N° allocataire" className="input input-sm ml-2" />
              <input name="caf.nbEnfants" type="number" min={0} value={form.caf.nbEnfants} onChange={handleFormChange} placeholder="Nombre d'enfants à charge" className="input input-sm ml-2 w-32" />
            </>
          )}
        </div>
      </div>
    </div>
  );
} 