import React from 'react';

export default function CoordonneesImageInteractive() {
  const [coords, setCoords] = React.useState<{
    x: number;
    y: number;
    px: number;
    py: number;
  } | null>(null);
  const [showPopup, setShowPopup] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x_img = Math.round((e.clientX - rect.left) * (img.naturalWidth / img.width));
    const y_img = Math.round(
      img.naturalHeight - (e.clientY - rect.top) * (img.naturalHeight / img.height)
    );
    // Conversion image -> PDF
    const x_pdf = Math.round(x_img * (595.22 / 1241));
    const y_pdf = Math.round(y_img * (842 / 1755));
    setCoords({ x: x_pdf, y: y_pdf, px: e.clientX - rect.left, py: e.clientY - rect.top });
    setShowPopup(true);
    console.log('Coordonnées PDF : x:', x_pdf, 'y:', y_pdf);
  };

  const handleCopy = () => {
    if (coords) {
      navigator.clipboard.writeText(`x: ${coords.x}, y: ${coords.y}`);
    }
  };

  return (
    <div className="mb-6 w-full flex flex-col items-center relative">
      <img
        ref={imgRef}
        src="/MPT-Fiche-inscription-MPT_page-0002.jpg"
        alt="Aperçu PDF interactif"
        style={{ maxWidth: '100%', border: '1px solid #888', cursor: 'crosshair', borderRadius: 8 }}
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
      <p className="text-gray-400 text-xs mt-2">
        Clique sur l'image pour obtenir les coordonnées (origine en bas à gauche, pdf-lib).
      </p>
    </div>
  );
} 