import React from 'react';

interface SignatureFormProps {
  faitA: string;
  signature: string;
  dateSignature: string;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SignatureForm({
  faitA,
  signature,
  dateSignature,
  handleFormChange,
}: SignatureFormProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Signature et date</h2>
      <div className="flex gap-4">
        <div>
          <label className="block font-semibold">Fait à</label>
          <input
            className="border rounded px-2 py-1 mt-1"
            name="faitA"
            value={faitA}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label className="block font-semibold">Signature</label>
          <input
            className="border rounded px-2 py-1 mt-1"
            name="signature"
            value={signature}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label className="block font-semibold">Date</label>
          <input
            className="border rounded px-2 py-1 mt-1"
            name="dateSignature"
            value={dateSignature}
            onChange={handleFormChange}
            type="text"
            placeholder="JJ/MM/AAAA"
          />
        </div>
      </div>
    </div>
  );
} 