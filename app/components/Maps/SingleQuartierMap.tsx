'use client';

import { useEffect, useRef } from 'react';
import { QUARTIER_STYLES } from '@/lib/helpers/quartierStyles';
import quartierData from '@/data/sav/montpellier_quartiers.json';
import { MPT, MPT_NUMBERS, QUARTIERS } from './types';

interface SingleQuartierMapProps {
  mpt: MPT;
  width?: number;
  height?: number;
}

type Coordinate = [number, number];
type Ring = Coordinate[];
type Polygon = Ring[];

interface GeoJSONFeature {
  type: string;
  properties: {
    name: string;
    commune: string;
  };
  geometry: {
    type: string;
    coordinates: Polygon;
  };
}

interface GeoJSON {
  type: string;
  name: string;
  features: GeoJSONFeature[];
}

export default function SingleQuartierMap({ mpt, width = 400, height = 300 }: SingleQuartierMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Trouver le numéro de la MPT
    const mptNumber = MPT_NUMBERS.find(m => m.id === mpt.id)?.number;
    if (!mptNumber) return;

    // Trouver le quartier correspondant
    const quartier = QUARTIERS.find(q => q.mpts.includes(mptNumber));
    if (!quartier) return;

    const svg = svgRef.current;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const data = quartierData as unknown as GeoJSON;
    const quartierFeature = data.features.find(f => f.properties.name === quartier.name);
    if (!quartierFeature) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    quartierFeature.geometry.coordinates.forEach(ring => {
      ring.forEach(([x, y]) => {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });
    });

    const scaleX = width / (maxX - minX);
    const scaleY = height / (maxY - minY);
    const scale = Math.min(scaleX, scaleY);
    const offsetX = (width - (maxX - minX) * scale) / 2;
    const offsetY = (height - (maxY - minY) * scale) / 2;

    const style = QUARTIER_STYLES[quartier.name as keyof typeof QUARTIER_STYLES] || {
      fill: '#CCCCCC',
      stroke: '#999999',
      text: '#000000',
    };

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = quartierFeature.geometry.coordinates
      .map(ring => {
        return ring
          .map(([x, y], i) => {
            const scaledX = (x - minX) * scale + offsetX;
            const scaledY = height - ((y - minY) * scale + offsetY);
            return `${i === 0 ? 'M' : 'L'} ${scaledX} ${scaledY}`;
          })
          .join(' ');
      })
      .join(' Z ');

    path.setAttribute('d', d);
    path.setAttribute('fill', style.fill);
    path.setAttribute('stroke', style.stroke);
    path.setAttribute('stroke-width', '1');
    svg.appendChild(path);

    // Ajouter le point pour la MPT
    if (mpt.coordinates) {
      const x = (mpt.coordinates.lng - minX) * scale + offsetX;
      const y = height - ((mpt.coordinates.lat - minY) * scale + offsetY);

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());
      circle.setAttribute('r', '8');
      circle.setAttribute('fill', '#FFFFFF');
      circle.setAttribute('stroke', '#000000');
      circle.setAttribute('stroke-width', '2');
      svg.appendChild(circle);

      const marker = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      marker.setAttribute('x', x.toString());
      marker.setAttribute('y', y.toString());
      marker.setAttribute('text-anchor', 'middle');
      marker.setAttribute('dominant-baseline', 'central');
      marker.setAttribute('fill', '#000000');
      marker.setAttribute('font-size', '12');
      marker.setAttribute('font-weight', 'bold');
      marker.textContent = '📍';
      svg.appendChild(marker);
    }

    // Ajouter le nom du quartier
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const centroid = calculateCentroid(quartierFeature.geometry.coordinates[0]);
    const textX = (centroid[0] - minX) * scale + offsetX;
    const textY = height - ((centroid[1] - minY) * scale + offsetY);

    text.setAttribute('x', textX.toString());
    text.setAttribute('y', textY.toString());
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', style.text);
    text.setAttribute('font-size', '14');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('stroke', '#FFFFFF');
    text.setAttribute('stroke-width', '2');
    text.setAttribute('paint-order', 'stroke');
    text.textContent = quartier.name.toUpperCase();
    svg.appendChild(text);
  }, [mpt, width, height]);

  return (
    <div className="w-full h-full min-h-[300px] bg-gray-50 rounded-lg overflow-hidden">
      <svg ref={svgRef} className="w-full h-full" preserveAspectRatio="xMidYMid meet" />
    </div>
  );
}

function calculateCentroid(coords: Ring): Coordinate {
  let x = 0;
  let y = 0;
  const len = coords.length;

  for (let i = 0; i < len; i++) {
    x += coords[i][0];
    y += coords[i][1];
  }

  return [x / len, y / len];
} 