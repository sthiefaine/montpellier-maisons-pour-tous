'use client';
import React, { useState, useEffect } from 'react';
import InitStep from './steps/InitStep';
import HouseSelectionStep from './steps/HouseSelectionStep';
import AdherentStep from './steps/AdherentStep';
import ActivitiesStep from './steps/ActivitiesStep';

import FormHeader from './FormHeader';
import MineurStep from './steps/MineurStep';
import AutorisationStep from './steps/AutorisationStep';
import SignatureStep from './steps/SignatureStep';
import EndStep from './steps/EndStep';
import FormStepper from './FormStepper';
import FormFooter from './FormFooter';
import PdfImagesPreview from './PdfImagesPreview';
import { generatePdf } from '@/utils/generatePdf';
import { FormData } from '@/types/form';



export default function CompleteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const getCurrentSeason = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Si nous sommes en septembre ou après, la saison est l'année en cours - l'année suivante
    if (currentMonth >= 9) {
      return `${currentYear}-${currentYear + 1}`;
    } else {
      return `${currentYear - 1}-${currentYear}`;
    }
  };

  const [formData, setFormData] = useState<FormData>({
    id: crypto.randomUUID(),
    version: 1,
    surnom: '',
    favori: false,
    formType: '',
    selectedHouse: '',
    maison: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: '',
    mineur: false,
    communeNaissance: '',
    departementNaissance: '',
    adresse: '',
    codePostal: '',
    ville: '',
    telephone: '',
    email: '',
    acceptationInformations: true,
    saison: getCurrentSeason(),
    carteReseau: true,
    activites: [
      {
        designation: '',
        jour: '',
        horaireDebut: '',
        horaireFin: '',
        prix: 0,
      },
    ],
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
      nbEnfants: '',
    },
    consentement: true,
    paiementsAdmin: [],
  });

  // 2024-2025, 2025-2026
  const seasons = Array.from({ length: 2 }, (_, i) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const baseYear = currentMonth >= 9 ? currentYear + 1 : currentYear;
    return `${baseYear - 1 + i}-${baseYear + i}`;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('currentForm');
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Sauvegarder le formulaire actuel dans le localStorage
      localStorage.setItem('currentForm', JSON.stringify(formData));
    }
  }, [formData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      // Sauvegarder le formulaire actuel avant de quitter
      if (formData.nom || formData.prenom) {
        const savedForms = localStorage.getItem('savedForms');
        const forms = savedForms ? JSON.parse(savedForms) : [];
        const formToSave = {
          ...formData,
          createdAt: new Date().toISOString()
        };
        forms.push(formToSave);
        localStorage.setItem('savedForms', JSON.stringify(forms));
      }
      window.location.href = '/completer-pdf';
    }
  };

  const handleQuit = () => {
    if (typeof window !== 'undefined') {
      // Sauvegarder le formulaire actuel avant de quitter
      if (formData.nom || formData.prenom) {
        const savedForms = localStorage.getItem('savedForms');
        const forms = savedForms ? JSON.parse(savedForms) : [];
        const formToSave = {
          ...formData,
          createdAt: new Date().toISOString()
        };
        forms.push(formToSave);
        localStorage.setItem('savedForms', JSON.stringify(forms));
      }
      window.location.href = '/completer-pdf';
      localStorage.removeItem('currentForm');
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const pdfUrl = await generatePdf(formData);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    }
  };

    const handleYearChange = (year: string) => {
      setFormData({
        ...formData,
        saison: year
      });
  };

  const handleShowPdfPreview = async () => {
    try {
      setShowPdfPreview(true)
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <InitStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return <HouseSelectionStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <AdherentStep formData={formData} setFormData={setFormData} />;
      case 4:
        return <ActivitiesStep formData={formData} setFormData={setFormData} />;
      case 5:
        return <MineurStep formData={formData} setFormData={setFormData} />;
      case 6:
        return <AutorisationStep formData={formData} setFormData={setFormData} />;
      case 7:
        return <SignatureStep formData={formData} setFormData={setFormData} />;
      case 8:
        return <EndStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <FormHeader
        selectedYear={formData.saison}
        onYearChange={handleYearChange}
        seasons={seasons}
        onShowPdfPreview={currentStep > 1 ? handleShowPdfPreview : undefined}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        formData={formData}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pb-24 px-2">{renderStep()}</main>

      {/* Footer */}
      <FormFooter
        currentStep={currentStep}
        onBack={handleBack}
        onNext={handleNext}
        onQuit={handleQuit}
        formData={formData}
      />

      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-[99]">
          <div className="bg-white rounded-lg w-[95vw] h-[95vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Aperçu du formulaire</h3>
              <button
                onClick={() => {
                  setShowPdfPreview(false);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              <PdfImagesPreview formData={formData} mode="modal" />
            </div>
            <div className="flex justify-end space-x-4 p-4 border-t">
              <button
                onClick={() => {
                  setShowPdfPreview(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Fermer
              </button>
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Télécharger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
