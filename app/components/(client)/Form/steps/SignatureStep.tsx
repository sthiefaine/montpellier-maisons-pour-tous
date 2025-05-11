import { Dispatch, SetStateAction, useEffect } from 'react';
import { FormData } from '@/types/form';
import { villes } from '@/data/formData';
import SignatureCanvas from '../SignatureCanvas';

interface SignatureStepProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

export default function SignatureStep({ formData, setFormData }: SignatureStepProps) {
  useEffect(() => {
    if (!formData.dateSignature) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setFormData(prev => ({ ...prev, dateSignature: formattedDate }));
    }
  }, [formData.dateSignature, setFormData]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Signature</h1>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Signature */}
          <div className="relative">
            <SignatureCanvas
              value={formData.signature || ''}
              onChange={value => setFormData(prev => ({ ...prev, signature: value }))}
            />
            <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
              Signature
            </label>
          </div>

          <div className="space-y-6">
            {/* Fait à */}
            <div className="relative">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer"
                placeholder=" "
                value={formData.faitA || ''}
                onChange={e => setFormData(prev => ({ ...prev, faitA: e.target.value }))}
                id="fait-a"
                list="villes-list"
              />
              <label
                htmlFor="fait-a"
                className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
              >
                Fait à
              </label>
              <datalist id="villes-list">
                {villes.map(ville => (
                  <option key={ville} value={ville} />
                ))}
              </datalist>
            </div>

            {/* Le */}
            <div className="relative">
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 peer"
                value={formData.dateSignature || ''}
                onChange={e => setFormData(prev => ({ ...prev, dateSignature: e.target.value }))}
                id="date-signature"
              />
              <label
                htmlFor="date-signature"
                className="absolute left-3 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm bg-white px-1"
              >
                Le
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
