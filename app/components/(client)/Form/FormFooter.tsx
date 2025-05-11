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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-[1]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          type="button"
          onClick={onQuit}
          className="inline-flex items-center px-3 py-1.5 text-sm border border-red-600 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Quitter
        </button>
        <div className="flex items-center space-x-3">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Retour
            </button>
          )}
          {currentStep === 8 ? (
            <button
              type="button"
              onClick={handleRestart}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Recommencer
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {'Continuer'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
