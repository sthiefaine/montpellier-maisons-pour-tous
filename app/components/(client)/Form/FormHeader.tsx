import React from 'react';
import FormStepper from './FormStepper';
import { FormData } from '@/types/form';

interface FormHeaderProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
  seasons: string[];
  onShowPdfPreview?: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: FormData;
}

export default function FormHeader({
  selectedYear,
  onYearChange,
  seasons,
  onShowPdfPreview,
  currentStep,
  setCurrentStep,
  formData,
}: FormHeaderProps) {
  return (
    <div className="sticky top-14 z-40 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <select
            value={selectedYear}
            onChange={e => onYearChange(e.target.value)}
            className="px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {seasons.map(season => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>

          <div className="hidden md:block flex-1 mx-4">
            <FormStepper currentStep={currentStep} setCurrentStep={setCurrentStep} formData={formData} noShadow />
          </div>

          {onShowPdfPreview && (
            <button
              onClick={onShowPdfPreview}
              className="inline-flex items-center px-3 py-1.5 text-sm border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Afficher PDF
            </button>
          )}
        </div>
      </div>
      <div className="md:hidden">
        <FormStepper currentStep={currentStep} setCurrentStep={setCurrentStep} formData={formData} />
      </div>
    </div>
  );
}
