import React from 'react';
import { FormData } from '@/types/form';

interface FormFooterProps {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  onQuit: () => void;
  formData: FormData;
}

export default function FormFooter({
  currentStep,
  onBack,
  onNext,
  onQuit,
  formData,
}: FormFooterProps) {
  const handleNext = () => {
    if (currentStep === 4 && !formData.mineur && formData.dateNaissance !== '') {
      onNext();
      onNext();
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    // Si on est à l'étape 6 (après Mineur) et que l'adhérent est mineur, on revient à l'étape 4
    if (currentStep === 6 && formData.mineur) {
      onBack();
      onBack();
    } else {
      onBack();
    }
  };

  const handleRestart = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const handleNew = () => {
    if (typeof window !== 'undefined') {
      // Sauvegarder le formulaire actuel
      const savedForms = localStorage.getItem('savedForms');
      const forms = savedForms ? JSON.parse(savedForms) : [];
      const formToSave = {
        ...formData,
        createdAt: new Date().toISOString(),
      };
      forms.push(formToSave);
      localStorage.setItem('savedForms', JSON.stringify(forms));

      // Créer un nouveau formulaire avec un nouvel ID et version 1
      const newForm = {
        ...formData,
        id: crypto.randomUUID(),
        version: 1,
        nom: '',
        prenom: '',
        dateNaissance: '',
        sexe: '',
        mineur: false,
        communeNaissance: '',
        departementNaissance: 0,
        adresse: '',
        codePostal: '',
        ville: '',
        telephone: '',
        email: '',
        acceptationInformations: false,
        activites: [],
        total: 0,
        modeReglement: '',
        faitA: '',
        dateSignature: '',
        signature: '',
        representantLegal1: {
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
        },
        representantLegal2: {
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
        },
        domiciliation: {
          domicile1: false,
          domicile2: false,
          gardeAlternee: false,
        },
        personnes: [],
        personnesAccident: [],
        personnesHabilitees: [],
        soussigneNom: '',
        soussignePrenom: '',
        autorisationSortie: 'autorise',
        droitImage: 'autorise',
        aps: 'apte',
        caf: {
          allocataire: false,
          numeroAllocataire: '',
          nbEnfants: 0,
        },
        consentement: false,
        paiementsAdmin: [],
      };
      localStorage.setItem('currentForm', JSON.stringify(newForm));
      window.location.reload();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-[1]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onQuit}
            className="inline-flex items-center px-1 py-1.5 text-sm border border-red-600 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Quitter
          </button>
          <button
            type="button"
            onClick={handleNew}
            className="inline-flex items-center px-1 py-1.5 text-sm border border-green-600 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Nouveau
          </button>
        </div>
        <div className="flex items-center space-x-3">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-1 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Retour
            </button>
          )}
          {currentStep === 8 ? (
            <button
              type="button"
              onClick={handleRestart}
              className="px-1 py-1.5 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Recommencer
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-1 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continuer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
