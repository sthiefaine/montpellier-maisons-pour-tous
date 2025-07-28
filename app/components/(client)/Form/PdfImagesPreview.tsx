'use client';

import React, { useEffect, useState } from 'react';
import { FormData } from '@/types/form';
import { generatePdf } from '@/utils/generatePdf';
import fiche1 from '@/public/MPT-Fiche-inscription-MPT_page-0001.jpg';
import fiche2 from '@/public/MPT-Fiche-inscription-MPT_page-0002.jpg';
import Image from 'next/image';

interface PdfImagesPreviewProps {
  formData: FormData;
  mode?: 'miniature' | 'modal';
}

export default function PdfImagesPreview({ formData, mode = 'miniature' }: PdfImagesPreviewProps) {
  const [loading, setLoading] = useState(true);
  const [pageImages, setPageImages] = useState<string[]>([]);

  useEffect(() => {
    const generatePdfPreview = async () => {
      try {
        const url = await generatePdf(formData);
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
          const viewport = page.getViewport({ scale: mode === 'modal' ? 2 : 0.5 });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({
            canvasContext: context!,
            viewport: viewport,
            canvas: canvas,
          } as any).promise;

          const imageData = canvas.toDataURL('image/png');
          images.push(imageData);
        }

        setPageImages(images);
      } catch (error) {
        setPageImages([]);
      } finally {
        setLoading(false);
      }
    };

    generatePdfPreview();
  }, [formData, mode]);

  if (mode === 'modal') {
    return (
      <div className="flex flex-col items-center gap-8 w-full">
        {loading ? (
          <>
            <div className="w-full max-w-xl bg-gray-100 rounded shadow-md flex items-center justify-center overflow-hidden mb-4">
              <Image
                src={fiche1}
                alt="Aperçu fiche 1"
                className="w-full object-contain"
                width={800}
                height={1132}
                priority
              />
            </div>
            <div className="w-full max-w-xl bg-gray-100 rounded shadow-md flex items-center justify-center overflow-hidden">
              <Image
                src={fiche2}
                alt="Aperçu fiche 2"
                className="w-full object-contain"
                width={800}
                height={1132}
                priority
              />
            </div>
          </>
        ) : pageImages.length > 0 ? (
          <>
            <div className="w-full max-w-xl bg-gray-100 rounded shadow-md flex items-center justify-center overflow-hidden mb-4">
              <img src={pageImages[0]} alt="Page 1" className="w-full object-contain" />
            </div>
            <div className="w-full max-w-xl bg-gray-100 rounded shadow-md flex items-center justify-center overflow-hidden">
              <img src={pageImages[1]} alt="Page 2" className="w-full object-contain" />
            </div>
          </>
        ) : (
          <div className="text-red-500">Erreur lors de la génération du PDF</div>
        )}
      </div>
    );
  }

  // mode miniature (par défaut)
  return (
    <div className="flex gap-4 justify-center items-center">
      {loading ? (
        <>
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
        </>
      ) : pageImages.length > 0 ? (
        <>
          <div className="w-28 h-40 bg-gray-100 rounded shadow-md flex items-center justify-center transform -rotate-6 transition-transform hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden">
            <img src={pageImages[0]} alt="Page 1" className="w-full h-full object-contain" />
          </div>
          <div className="w-28 h-40 bg-gray-100 rounded shadow-md flex items-center justify-center transform rotate-6 transition-transform hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden">
            <img src={pageImages[1]} alt="Page 2" className="w-full h-full object-contain" />
          </div>
        </>
      ) : (
        <div className="text-red-500">Erreur lors de la génération du PDF</div>
      )}
    </div>
  );
}
