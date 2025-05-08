import React from 'react';

interface PdfPreviewProps {
  pdfUrl: string | null;
  live: boolean;
}

export default function PdfPreview({ pdfUrl, live }: PdfPreviewProps) {
  return (
    <div className="flex-1 w-full min-w-[320px] flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Aperçu PDF</h2>
      {live ? (
        pdfUrl ? (
          <iframe
            src={pdfUrl}
            width="100%"
            height="700"
            style={{ border: '1px solid #888', borderRadius: 8, marginTop: 24 }}
            title="Aperçu PDF"
          />
        ) : (
          <div className="text-gray-400">Aucun PDF généré pour l'instant.</div>
        )
      ) : (
        <div className="text-gray-400">Active le rendu live pour voir l'aperçu PDF ici.</div>
      )}
    </div>
  );
} 