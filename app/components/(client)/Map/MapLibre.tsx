'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface MapLibreProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  style: maplibregl.StyleSpecification;
}

export default function MapLibre({ coordinates, style }: MapLibreProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [showAttribution, setShowAttribution] = useState(false);
  const attributionControl = useRef<maplibregl.AttributionControl | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const bounds = [
      [3.738, 43.524],
      [4.018, 43.706],
    ] as maplibregl.LngLatBoundsLike;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: style,
      center: [coordinates.lng, coordinates.lat],
      zoom: 16,
      maxZoom: 18,
      minZoom: 6,
      maxBounds: bounds,
      pitch: 25,
      bearing: 0
    });

    // Créer le contrôle d'attribution mais ne pas l'ajouter à la carte
    attributionControl.current = new maplibregl.AttributionControl({
      compact: true
    });

    new maplibregl.Marker()
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, [coordinates, style]);

  const toggleAttribution = () => {
    if (!map.current || !attributionControl.current) return;

    if (showAttribution) {
      // Supprimer le contrôle
      const controlElement = map.current.getContainer().querySelector('.maplibregl-ctrl-attrib');
      if (controlElement) {
        controlElement.remove();
      }
    } else {
      // Ajouter le contrôle
      map.current.addControl(attributionControl.current);
    }

    setShowAttribution(!showAttribution);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
      <div 
        ref={mapContainer} 
        className="absolute inset-0 w-full h-full"
      />
      <button
        onClick={toggleAttribution}
        className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
        title={showAttribution ? "Masquer la légende" : "Afficher la légende"}
      >
        <InformationCircleIcon className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
} 