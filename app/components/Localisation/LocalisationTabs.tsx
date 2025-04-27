'use client';

import { MPT } from '@/types/maisons';
import MapLibre from '@/app/components/(client)/Map/MapLibre';
import maplibregl from 'maplibre-gl';
import { memo, useState } from 'react';
import { MapPinIcon, MapIcon } from '@heroicons/react/24/outline';

interface LocalisationTabsProps {
  mpt: MPT;
  mapStyle: maplibregl.StyleSpecification;
}

function LocalisationTabs({ mpt, mapStyle }: LocalisationTabsProps) {
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(null);
        },
        error => {
          setError("Impossible d'obtenir votre position");
          console.error('Erreur de géolocalisation:', error);
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par votre navigateur");
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Localisation</h2>
        </div>
        <button
          onClick={handleLocate}
          disabled={isMapLoading}
          className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${
            isMapLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <MapPinIcon className="w-5 h-5" />
          Me localiser
        </button>
      </div>
      {error && <p className="text-red-600 text-sm text-right">{error}</p>}
      <div className="w-full space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPinIcon className="w-5 h-5" />
          <p>{mpt.address}</p>
        </div>
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
          {mpt.coordinates ? (
            <MapLibre
              coordinates={mpt.coordinates}
              mapStyle={mapStyle}
              userLocation={userLocation || undefined}
              onMapReady={() => setIsMapLoading(false)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Aucune coordonnée disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(LocalisationTabs);
