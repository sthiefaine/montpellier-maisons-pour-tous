'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';

const PRESET_IMAGES = [
  { label: 'Fiche inscription MPT - page 1', value: '/MPT-Fiche-inscription-MPT_page-0001.jpg' },
  { label: 'Fiche inscription MPT - page 2', value: '/MPT-Fiche-inscription-MPT_page-0002.jpg' },
];

export default function TestCoordonneesImage() {
  const [coords, setCoords] = useState<{ x: number; y: number; px: number; py: number } | null>(
    null
  );
  const [showPopup, setShowPopup] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [pendingImg, setPendingImg] = useState<string>(PRESET_IMAGES[0].value);
  const imgRef = useRef<HTMLImageElement>(null);

  // Gestion du clic sur l'image
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) * (img.naturalWidth / img.width));
    const y = Math.round(
      img.naturalHeight - (e.clientY - rect.top) * (img.naturalHeight / img.height)
    );
    setCoords({ x, y, px: e.clientX - rect.left, py: e.clientY - rect.top });
    setShowPopup(true);
  };

  const handleCopy = () => {
    if (coords) {
      navigator.clipboard.writeText(`x: ${coords.x}, y: ${coords.y}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPendingImg(url);
      setShowPopup(false);
    }
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPendingImg(e.target.value);
    setShowPopup(false);
  };

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    setImgSrc(pendingImg);
    setShowPopup(false);
    setCoords(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 relative">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Test des coordonnées sur l'image du PDF
        </h1>
        <form
          onSubmit={handleValidate}
          className="mb-6 flex flex-col md:flex-row gap-4 items-center bg-gray-100 p-4 rounded-lg shadow"
        >
          <div className="flex flex-col gap-2">
            <label className="font-medium">Image pré-sélectionnée :</label>
            <select
              value={pendingImg.startsWith('blob:') ? '' : pendingImg}
              onChange={handlePresetChange}
              className="border rounded px-2 py-1"
            >
              {PRESET_IMAGES.map(img => (
                <option key={img.value} value={img.value}>
                  {img.label}
                </option>
              ))}
              <option value="">(Aucune - image importée)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Ou importer une image :</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 mt-4 md:mt-0"
          >
            Valider l'image
          </button>
        </form>
        {imgSrc && (
          <div className="mb-4 overflow-auto relative rounded-lg border border-gray-300 bg-white p-2">
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Aperçu PDF"
              style={{
                maxWidth: '100%',
                border: '1px solid #888',
                cursor: 'crosshair',
                borderRadius: 8,
              }}
              onClick={handleClick}
            />
            {showPopup && coords && (
              <div
                style={{
                  position: 'absolute',
                  left: coords.px,
                  top: coords.py,
                  background: 'white',
                  border: '1px solid #333',
                  borderRadius: 8,
                  padding: 12,
                  zIndex: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  transform: 'translate(-50%, -120%)',
                }}
              >
                <button
                  onClick={() => setShowPopup(false)}
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 8,
                    background: 'none',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: 16,
                    cursor: 'pointer',
                  }}
                  aria-label="Fermer"
                >
                  ×
                </button>
                <div className="mb-2">
                  <strong>x:</strong> {coords.x}, <strong>y:</strong> {coords.y}
                </div>
                <button
                  onClick={handleCopy}
                  className="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Copier dans le presse-papier
                </button>
              </div>
            )}
          </div>
        )}
        <p className="mt-6 text-gray-500 text-sm">
          Les coordonnées affichées sont prêtes à être utilisées avec pdf-lib (origine en bas à
          gauche).
        </p>
      </div>
    </div>
  );
}
