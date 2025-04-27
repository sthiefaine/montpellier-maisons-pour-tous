'use client';

import { useEffect, useRef, useState } from 'react';
import { QUARTIER_STYLES } from '@/lib/helpers/quartierStyles';
import mptData from '@/data/mpt.json';
import quartierData from '@/data/sav/montpellier_quartiers.json';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import QuartierDetail from './QuartierDetail';
import { MPT, MPT_NUMBERS, QUARTIERS } from './types';

interface QuartierMapProps {
  width?: number;
  height?: number;
}

type Coordinate = [number, number];
type Ring = Coordinate[];
type Polygon = Ring[];
type MultiPolygon = Polygon[];

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

export default function QuartierMap({ width = 800, height = 600 }: QuartierMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedMPT, setSelectedMPT] = useState<{
    x: number;
    y: number;
    name: string;
    address: string;
    slug: string;
  } | null>(null);
  const [selectedQuartier, setSelectedQuartier] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const data = quartierData as unknown as GeoJSON;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    data.features.forEach(feature => {
      feature.geometry.coordinates.forEach(ring => {
        ring.forEach(([x, y]) => {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        });
      });
    });

    const scaleX = width / (maxX - minX);
    const scaleY = height / (maxY - minY);
    const scale = Math.min(scaleX, scaleY);
    const offsetX = (width - (maxX - minX) * scale) / 2;
    const offsetY = (height - (maxY - minY) * scale) / 2;

    const paths: { path: SVGPathElement; text: SVGTextElement; quartierName: string }[] = [];
    const mptPositions: { x: number; y: number }[] = [];

    // D'abord, stocker les positions des MPT
    mptData.forEach((mpt: MPT) => {
      if (!mpt.coordinates) return;

      const mptNumber = MPT_NUMBERS.find(m => m.id === mpt.id)?.number;
      if (!mptNumber) return;

      const x = (mpt.coordinates.lng - minX) * scale + offsetX;
      const y = height - ((mpt.coordinates.lat - minY) * scale + offsetY);
      mptPositions.push({ x, y });
    });

    data.features.forEach(quartierData => {
      const quartierName = quartierData.properties.name;
      const style = QUARTIER_STYLES[quartierName as keyof typeof QUARTIER_STYLES] || {
        fill: '#CCCCCC',
        stroke: '#999999',
        text: '#000000',
      };

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const d = quartierData.geometry.coordinates
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

      path.setAttribute('id', `quartier-${quartierName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
      path.setAttribute('d', d);
      path.setAttribute('fill', style.fill);
      path.setAttribute('stroke', style.stroke);
      path.setAttribute('stroke-width', '1');
      path.setAttribute('cursor', 'pointer');
      path.addEventListener('click', () => {
        console.log('quartierName', quartierName);
        setSelectedQuartier(quartierName);
        setSelectedMPT(null);
      });
      svg.appendChild(path);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      const centroid = calculateCentroid(quartierData.geometry.coordinates[0]);
      let textX = (centroid[0] - minX) * scale + offsetX;
      let textY = height - ((centroid[1] - minY) * scale + offsetY);

      // Vérifier les chevauchements avec les MPT
      const mptRadius = 12; // Rayon du cercle des MPT
      const textMargin = 20; // Marge de sécurité

      // Trouver une position sans chevauchement
      let foundPosition = false;
      let offset = 0;
      const maxOffset = 50; // Décalage maximum à essayer

      // Position spéciale pour Les Cévennes et Port Marianne
      const isBottomPosition = quartierName === 'Les Cévennes' || quartierName === 'Port Marianne';
      const baseOffset = isBottomPosition ? 30 : -30;

      while (!foundPosition && offset < maxOffset) {
        const testY = textY + baseOffset + (isBottomPosition ? offset : -offset);
        const hasOverlap = mptPositions.some(mpt => {
          const distance = Math.sqrt(Math.pow(textX - mpt.x, 2) + Math.pow(testY - mpt.y, 2));
          return distance < mptRadius + textMargin;
        });

        if (!hasOverlap) {
          textY = testY;
          foundPosition = true;
        }
        offset += 5;
      }

      text.setAttribute('x', textX.toString());
      text.setAttribute('y', textY.toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', '#FFFFFF');
      text.setAttribute('font-size', '14');
      text.setAttribute('font-weight', 'bold');
      text.setAttribute('stroke', '#000000');
      text.setAttribute('stroke-width', '0.5');
      text.setAttribute('paint-order', 'stroke');
      text.textContent = quartierName.toUpperCase();

      paths.push({ path, text, quartierName });
    });

    // Dessiner les MPT
    mptData.forEach((mpt: MPT) => {
      if (!mpt.coordinates) return;

      const mptNumber = MPT_NUMBERS.find(m => m.id === mpt.id)?.number;
      if (!mptNumber) return;

      const x = (mpt.coordinates.lng - minX) * scale + offsetX;
      const y = height - ((mpt.coordinates.lat - minY) * scale + offsetY);

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());
      circle.setAttribute('r', '12');
      circle.setAttribute('fill', '#FFFFFF');
      circle.setAttribute('stroke', '#000000');
      circle.setAttribute('stroke-width', '1.5');
      circle.setAttribute('cursor', 'pointer');
      circle.addEventListener('click', () => {
        setSelectedMPT({ x, y, name: mpt.name, address: mpt.address, slug: mpt.slug });
      });
      svg.appendChild(circle);

      const number = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      number.setAttribute('x', x.toString());
      number.setAttribute('y', y.toString());
      number.setAttribute('text-anchor', 'middle');
      number.setAttribute('dominant-baseline', 'central');
      number.setAttribute('fill', '#000000');
      number.setAttribute('font-size', '14');
      number.setAttribute('font-weight', 'bold');
      number.setAttribute('cursor', 'pointer');
      number.addEventListener('click', () => {
        setSelectedMPT({ x, y, name: mpt.name, address: mpt.address, slug: mpt.slug });
      });
      number.textContent = mptNumber.toString();
      svg.appendChild(number);
    });

    // Ajouter les noms des quartiers en dernier
    paths.forEach(({ text }) => {
      svg.appendChild(text);
    });
  }, [width, height]);

  return (
    <div className="w-full min-w-[320px] relative">
      {selectedMPT && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setSelectedMPT(null)} />
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-xl min-w-[200px]">
              <div className="flex justify-between items-start mb-1">
                <div className="text-sm font-semibold text-gray-900">{selectedMPT.name}</div>
                <button
                  onClick={() => setSelectedMPT(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="text-xs text-gray-500 mb-2">{selectedMPT.address}</div>
              <Link
                href={`/maisons-pour-tous/${selectedMPT.slug}`}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
              >
                Voir la fiche
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </>
      )}
      {selectedQuartier && (
        <QuartierDetail quartierName={selectedQuartier} onClose={() => setSelectedQuartier(null)} />
      )}
      <svg ref={svgRef} className="w-full h-auto" preserveAspectRatio="xMidYMid meet" />
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

