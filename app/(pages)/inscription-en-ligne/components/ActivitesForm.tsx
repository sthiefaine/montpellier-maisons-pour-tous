import React from 'react';

export interface Activite {
  designation: string;
  jour: string;
  horaireDebut: string;
  horaireFin: string;
}

interface ActivitesFormProps {
  form: {
    carteReseau: boolean | null;
    activites: Activite[];
    total: string;
    modeReglement: string;
    datePaiementDebut1: number;
    datePaiementFin1: number;
    moisPaiement1: number;
    datePaiementDebut2: number;
    datePaiementFin2: number;
    moisPaiement2: number;
    anneePaiement1: number;
    anneePaiement2: number;
    faitA: string;
    signature: string;
    saison: string;
  };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleActiviteChange: (index: number, field: keyof Activite, value: string) => void;
}

const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export default function ActivitesForm({
  form,
  handleFormChange,
  handleActiviteChange,
}: ActivitesFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold">Carte réseau des Maisons pour tous</label>
        <div className="flex gap-4 mt-1">
          <label>
            <input
              type="radio"
              name="carteReseau"
              value="oui"
              checked={form.carteReseau === true}
              onChange={() =>
                handleFormChange({
                  target: { name: 'carteReseau', value: 'true', type: 'radio' },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />{' '}
            Oui
          </label>
          <label>
            <input
              type="radio"
              name="carteReseau"
              value="non"
              checked={form.carteReseau === false}
              onChange={() =>
                handleFormChange({
                  target: { name: 'carteReseau', value: 'false', type: 'radio' },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />{' '}
            Non
          </label>
        </div>
      </div>
      <div>
        <label className="block font-semibold mb-2">Désignation de l'atelier</label>
        <div className="grid grid-cols-5 gap-2 font-semibold text-xs">
          <div>Activité</div>
          <div>Jour</div>
          <div>Début</div>
          <div>Fin</div>
        </div>
        {form.activites.map((activite, idx) => (
          <div className="grid grid-cols-5 gap-2 mb-1" key={idx}>
            <input
              className="border rounded px-2 py-1"
              placeholder={`Activité ${idx + 1}`}
              value={activite.designation}
              onChange={e => handleActiviteChange(idx, 'designation', e.target.value)}
            />
            <select
              className="border rounded px-2 py-1"
              value={activite.jour}
              onChange={e => handleActiviteChange(idx, 'jour', e.target.value)}
            >
              <option value="">Jour</option>
              {jours.map(jour => (
                <option key={jour} value={jour}>
                  {jour}
                </option>
              ))}
            </select>
            <input
              className="border rounded px-2 py-1"
              type="time"
              value={activite.horaireDebut}
              onChange={e => handleActiviteChange(idx, 'horaireDebut', e.target.value)}
            />
            <input
              className="border rounded px-2 py-1"
              type="time"
              value={activite.horaireFin}
              onChange={e => handleActiviteChange(idx, 'horaireFin', e.target.value)}
            />
          </div>
        ))}
      </div>
      <div>
        <label className="block font-semibold">Total des sommes à payer</label>
        <input
          type="number"
          min={0}
          max={9999}
          className="border rounded px-2 py-1 mt-1 w-20"
          name="total"
          value={form.total}
          onChange={handleFormChange}
        />
        <span className="ml-1">€</span>
      </div>
      <div>
        <label className="block font-semibold">Mode de règlement</label>
        <div className="flex gap-4 mt-1">
          <label>
            <input
              type="radio"
              name="modeReglement"
              value="comptant"
              checked={form.modeReglement === 'comptant'}
              onChange={handleFormChange}
            />{' '}
            Comptant
          </label>
          <label>
            <input
              type="radio"
              name="modeReglement"
              value="3fois"
              checked={form.modeReglement === '3fois'}
              onChange={handleFormChange}
            />{' '}
            3 fois*
          </label>
        </div>
      </div>
      <div>
        <label className="block font-semibold">Date de paiement</label>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span>2: du</span>
          <input
            type="number"
            min={1}
            max={31}
            step={1}
            name="datePaiementDebut1"
            value={form.datePaiementDebut1}
            onChange={handleFormChange}
            className="border rounded px-1 py-1 w-12 text-center"
            maxLength={2}
            placeholder="__"
          />
          <span>au</span>
          <input
            type="number"
            min={1}
            max={31}
            step={1}
            name="datePaiementFin1"
            value={form.datePaiementFin1}
            onChange={handleFormChange}
            className="border rounded px-1 py-1 w-12 text-center"
            maxLength={2}
            placeholder="__"
          />
          <span>/</span>
          <input
            type="number"
            min={1}
            max={12}
            step={1}
            name="moisPaiement1"
            value={form.moisPaiement1}
            onChange={handleFormChange}
            className="border rounded px-1 py-1 w-12 text-center"
            maxLength={2}
            placeholder="__"
          />
          <span>/</span>
          <select
            className="border rounded px-1 py-1 w-20 text-center"
            name="anneePaiement1"
            onChange={handleFormChange}
            defaultValue={form.saison.split('-')[0]}
          >
            {form.saison.split('-').map(annee => (
              <option key={annee} value={annee}>
                {annee}
              </option>
            ))}
          </select>
          <span className="w-full"></span>
          <span>3: du</span>
          <input
            type="number"
            min={1}
            max={31}
            step={1}
            name="datePaiementDebut2"
            value={form.datePaiementDebut2}
            onChange={handleFormChange}
            className="border rounded px-1 py-1 w-12 text-center"
            maxLength={2}
            placeholder="__"
          />
          <span>au</span>
          <input
            type="number"
            min={1}
            max={31}
            step={1}
            name="datePaiementFin2"
            value={form.datePaiementFin2}
            onChange={handleFormChange}
            className="border rounded px-1 py-1 w-12 text-center"
            maxLength={2}
            placeholder="__"
          />
          <span>/</span>

          <input
            type="number"
            min={1}
            max={12}
            step={1}
            name="moisPaiement2"
            value={form.moisPaiement2}
            onChange={handleFormChange}
            className="border rounded px-1 py-1 w-12 text-center"
            maxLength={2}
            placeholder="__"
          />
          <span>/</span>
          <select
            className="border rounded px-1 py-1 w-20 text-center"
            name="anneePaiement2"
            onChange={handleFormChange}
            defaultValue={form.saison.split('-')[1]}
          >
            {form.saison.split('-').map(annee => (
              <option key={annee} value={annee}>
                {annee}
              </option>
            ))}
          </select>
        </div>
      </div>

    </div>
  );
}
