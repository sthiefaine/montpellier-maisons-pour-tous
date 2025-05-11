'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapLibreSkeleton } from './MapLibreSkeleton';

interface MapLibreProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  mapStyle: maplibregl.StyleSpecification;
  userLocation?: {
    lat: number;
    lng: number;
  };
  onMapReady?: () => void;
}

const bounds: maplibregl.LngLatBoundsLike = [
  [3.738, 43.524], // Southwest coordinates
  [4.018, 43.706], // Northeast coordinates
];

export default function MapLibre({
  coordinates,
  mapStyle,
  userLocation,
  onMapReady,
}: MapLibreProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [coordinates.lng, coordinates.lat],
      zoom: 15,
      maxBounds: bounds,
      maxZoom: 18,
    });

    map.current.on('load', () => {
      setIsLoading(false);
      onMapReady?.();
    });

    new maplibregl.Marker({
      color: 'green',
    })
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates, mapStyle]);

  useEffect(() => {
    if (!userLocation) return;

    if (map.current) {
      const marker = new maplibregl.Marker({
        color: '#0000FF',
      })
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(map.current);

      map.current?.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 15,
        duration: 1000,
      });

      return () => {
        if (marker) {
          marker.remove();
        }
      };
    }
  }, [userLocation]);

  return (
    <div className="relative w-full h-full">
      <div className={`absolute inset-0 ${isLoading ? 'block' : 'hidden'}`}>
        <MapLibreSkeleton />
      </div>
      <div ref={mapContainer} className={`w-full h-full ${isLoading ? 'hidden' : 'block'}`} />
    </div>
  );
}
