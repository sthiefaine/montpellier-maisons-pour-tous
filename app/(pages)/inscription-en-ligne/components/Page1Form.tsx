import React from 'react';
import AdherentForm from './AdherentForm';
import ActivitesForm, { Activite } from './ActivitesForm';
import SignatureForm from './SignatureForm';
import PaiementsAdminForm from './PaiementsAdminForm';
import { PaiementAdmin, FormData } from '../page';

interface Page1FormProps {
  form: FormData;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleActiviteChange: (index: number, field: keyof Activite, value: string) => void;
  paiementsAdmin: PaiementAdmin[];
  handlePaiementAdminChange: (index: number, field: string, value: string) => void;
}

export default function Page1Form({
  form,
  handleFormChange,
  handleActiviteChange,
  paiementsAdmin,
  handlePaiementAdminChange,
}: Page1FormProps) {
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Informations adhérent</h2>
        <AdherentForm form={form} handleFormChange={handleFormChange} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Activités et Maisons pour tous</h2>
        <ActivitesForm
          form={form}
          handleFormChange={handleFormChange}
          handleActiviteChange={handleActiviteChange}
        />
      </div>
      <SignatureForm
        faitA={form.faitA}
        signature={form.signature}
        dateSignature={form.dateSignature}
        handleFormChange={handleFormChange}
      />
      <PaiementsAdminForm
        paiements={paiementsAdmin}
        handlePaiementChange={handlePaiementAdminChange}
      />
    </>
  );
}
