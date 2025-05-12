import { Fragment } from 'react';
import { stepsData } from '@/data/formData';
import { FormData } from '@/types/form';

interface FormStepperProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: FormData;
  noShadow?: boolean;
}

export default function FormStepper({ currentStep, setCurrentStep, formData, noShadow }: FormStepperProps) {
  return (
    <div className={`sticky top-14 z-40 bg-white ${noShadow ? '' : 'shadow-sm'} h-16`}>
      <div
        className="flex justify-center px-1 sm:px-4 lg:px-8 overflow-x-auto overscroll-x-none scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex flex-row items-end py-2 min-w-max">
          {stepsData.map((step, idx) => {
            const isDisabled =
              step.number === 5 && !formData.mineur && formData.dateNaissance !== '';
            return (
              <Fragment key={step.number}>
                <div className="flex flex-col items-center min-w-[38px]">
                  <button
                    onClick={() => !isDisabled && setCurrentStep(step.number)}
                    className={`flex items-center justify-center ${
                      isDisabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : currentStep === step.number
                          ? 'text-blue-400'
                          : currentStep > step.number
                            ? 'text-blue-600'
                            : 'text-gray-400'
                    } hover:text-blue-800 transition-colors`}
                    style={{ minWidth: 38 }}
                    disabled={isDisabled}
                  >
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        isDisabled
                          ? 'bg-gray-100 text-gray-300'
                          : currentStep === step.number
                            ? 'bg-blue-400 text-white'
                            : currentStep > step.number
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-400 border border-gray-200'
                      }`}
                    >
                      {step.number}
                    </div>
                  </button>
                  <span
                    className={`block text-[10px] sm:text-xs leading-tight text-center whitespace-nowrap mt-1 ${
                      isDisabled
                        ? 'text-gray-300'
                        : currentStep === step.number
                          ? 'text-blue-400'
                          : currentStep > step.number
                            ? 'text-blue-600'
                            : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < stepsData.length - 1 && (
                  <div
                    className={`h-1 w-2 sm:w-4 self-center mb-4 ${
                      isDisabled
                        ? 'bg-gray-100'
                        : currentStep > step.number
                          ? 'bg-blue-600'
                          : currentStep === step.number
                            ? 'bg-blue-400'
                            : 'bg-gray-200'
                    }`}
                    style={{ borderRadius: 2 }}
                  ></div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
