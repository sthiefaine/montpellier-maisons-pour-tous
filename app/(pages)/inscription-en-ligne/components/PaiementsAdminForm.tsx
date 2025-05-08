import React from 'react';

interface PaiementAdmin {
  mode: string;
  date: string;
}

interface PaiementsAdminFormProps {
  paiements: PaiementAdmin[];
  handlePaiementChange: (index: number, field: keyof PaiementAdmin, value: string) => void;
}

export default function PaiementsAdminForm({ paiements, handlePaiementChange }: PaiementsAdminFormProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2 text-blue-700">Cadre réservé à l'administration</h2>
      <table className="w-full border border-blue-900 text-sm">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="border border-blue-900 px-2 py-1 text-left"> </th>
            <th className="border border-blue-900 px-2 py-1 text-left">Mode de règlement</th>
            <th className="border border-blue-900 px-2 py-1 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {paiements.map((p, idx) => (
            <tr key={idx} className="bg-blue-50">
              <td className="border border-blue-900 px-2 py-1">Paiement {idx + 1}</td>
              <td className="border border-blue-900 px-2 py-1">
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={p.mode}
                  onChange={e => handlePaiementChange(idx, 'mode', e.target.value)}
                  placeholder="Chèque, CB, etc."
                />
              </td>
              <td className="border border-blue-900 px-2 py-1">
                <input
                  className="border rounded px-2 py-1 w-full"
                  type="date"
                  value={p.date}
                  onChange={e => handlePaiementChange(idx, 'date', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 