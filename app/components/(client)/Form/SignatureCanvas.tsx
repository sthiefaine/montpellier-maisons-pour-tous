import React, { useRef, useState, useEffect } from 'react';

interface SignatureCanvasProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SignatureCanvas({ value, onChange }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isFocused) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x, y } = getMousePosition(e);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawingMode(!isDrawingMode);
    setIsDrawing(!isDrawingMode);

    if (!isDrawingMode) {
      setLastX(x);
      setLastY(y);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      const signatureData = canvas.toDataURL('image/png');
      onChange(signatureData);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isFocused || !isDrawingMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getMousePosition(e);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    if (!isDrawingMode) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureData = canvas.toDataURL('image/png');
    onChange(signatureData);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange('');
    setIsFocused(false);
    setIsDrawingMode(false);
  };

  const importMacSignature = async () => {
    try {
      // @ts-expect-error - L'API Signatures est spécifique à macOS
      const signature = await window.Signatures?.showSignaturePanel();
      if (signature) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const signatureData = canvas.toDataURL('image/png');
          onChange(signatureData);
          setIsFocused(true);
        };
        img.src = signature;
      }
    } catch (error) {
      console.error("Erreur lors de l'importation de la signature:", error);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md p-2 bg-white max-w-xs relative">
      {!isFocused && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-2 p-4">
          <button
            type="button"
            onClick={() => {
              setIsFocused(true);
            }}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Dessiner ma signature
          </button>
          <button
            type="button"
            onClick={() => {
              importMacSignature();
            }}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Importer depuis le Mac
          </button>
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={200}
        height={80}
        className="w-full border border-gray-200 rounded cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div className="flex items-center mt-2">
        {isDrawingMode && (
          <div className="text-sm text-gray-500 flex-1">Cliquez pour stopper le dessin</div>
        )}
        <button
          type="button"
          onClick={clearSignature}
          className="text-sm text-red-600 hover:text-red-800 ml-auto"
        >
          Effacer
        </button>
      </div>
    </div>
  );
}
