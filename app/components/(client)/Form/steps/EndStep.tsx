'use client';

import { useEffect, useState } from 'react';
import { FormData } from '@/types/form';
import { generatePdf } from '@/utils/generatePdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import fiche1 from '@/public/MPT-Fiche-inscription-MPT_page-0001.jpg';
import fiche2 from '@/public/MPT-Fiche-inscription-MPT_page-0002.jpg';
import Image from 'next/image';

interface EndStepProps {
  formData: FormData;
}

export default function EndStep({ formData }: EndStepProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageImages, setPageImages] = useState<string[]>([]);

  useEffect(() => {
    const generatePdfPreview = async () => {
      try {
        const url = await generatePdf(formData);
        setPdfUrl(url);

        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
          import.meta.url
        ).toString();

        const response = await fetch(url);
        const pdfData = await response.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

        const images: string[] = [];
        for (let i = 1; i <= 2; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.5 });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({
            canvasContext: context!,
            viewport: viewport,
          }).promise;

          const imageData = canvas.toDataURL('image/png');
          images.push(imageData);
        }

        setPageImages(images);
      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    generatePdfPreview();
  }, [formData]);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const nomCapitalized = capitalizeFirstLetter(formData.nom);
  const prenomCapitalized = capitalizeFirstLetter(formData.prenom);
  const stringNom =
    nomCapitalized.length > 0 || prenomCapitalized.length > 0
      ? ' de ' + nomCapitalized + ' ' + prenomCapitalized
      : '';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Inscription terminée !</h1>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Téléchargez le PDF {stringNom}
          </h2>
          <p className="text-gray-600 mb-4">
            Imprimez la fiche d'inscription et la remettez à votre maison pour tous
          </p>
          <div className="flex justify-center items-center gap-4 mb-6">
            {loading ? (
              <div className="flex gap-4">
                <div className="w-28 h-40 bg-gray-100 rounded shadow-md flex items-center justify-center transform -rotate-6 transition-transform hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden">
                  <Image
                    src={fiche1}
                    alt="Aperçu fiche 1"
                    className="w-full h-full object-contain"
                    width={112}
                    height={160}
                    priority
                  />
                </div>
                <div className="w-28 h-40 bg-gray-100 rounded shadow-md flex items-center justify-center transform rotate-6 transition-transform hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden">
                  <Image
                    src={fiche2}
                    alt="Aperçu fiche 2"
                    className="w-full h-full object-contain"
                    width={112}
                    height={160}
                    priority
                  />
                </div>
              </div>
            ) : pageImages.length > 0 ? (
              <div className="flex gap-4">
                <div className="w-28 h-40 bg-gray-100 rounded shadow-md flex items-center justify-center transform -rotate-6 transition-transform hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden">
                  <img src={pageImages[0]} alt="Page 1" className="w-full h-full object-contain" />
                </div>
                <div className="w-28 h-40 bg-gray-100 rounded shadow-md flex items-center justify-center transform rotate-6 transition-transform hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden">
                  <img src={pageImages[1]} alt="Page 2" className="w-full h-full object-contain" />
                </div>
              </div>
            ) : (
              <div className="text-red-500">Erreur lors de la génération du PDF</div>
            )}
          </div>
          <button
            type="button"
            onClick={() => pdfUrl && window.open(pdfUrl, '_blank')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
            disabled={!pdfUrl}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Télécharger
          </button>
        </div>
      </div>
    </div>
  );
}
