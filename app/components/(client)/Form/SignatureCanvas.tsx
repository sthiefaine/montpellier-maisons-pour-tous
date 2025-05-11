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

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Si une signature existe, la charger sur le canvas
    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = value;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Définir la taille du canvas avec un ratio plus élevé pour une meilleure qualité
    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Définir la taille physique du canvas
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;

    // Ajuster la taille d'affichage
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Configurer le contexte
    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const getTouchPosition = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
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
      const signatureData = canvas.toDataURL('image/png', 1.0);
      onChange(signatureData);
    }
  };

  const startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x, y } = getTouchPosition(e);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawingMode(true);
    setIsDrawing(true);
    setIsFocused(true);

    setLastX(x);
    setLastY(y);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
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

  const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getTouchPosition(e);

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

    const signatureData = canvas.toDataURL('image/png', 1.0);
    onChange(signatureData);
  };

  const stopDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureData = canvas.toDataURL('image/png', 1.0);
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
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full border border-gray-200 rounded cursor-crosshair touch-none"
        style={{ aspectRatio: '2.5/1' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawingTouch}
        onTouchMove={drawTouch}
        onTouchEnd={stopDrawingTouch}
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
