'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import QuartierDetail from './QuartierDetail';
import MaisonDetail from './MaisonDetail';
import { MPT, MPT_NUMBERS, Quartier } from './types';
import { QUARTIER_STYLES } from '@/lib/helpers/quartierStyles';

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

interface QuartierMapProps {
  width?: number;
  height?: number;
  mptData: MPT[];
  quartierData: Quartier[];
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

export default function QuartierMap({ width = 800, height = 600, mptData, quartierData }: QuartierMapProps) {
  const [selectedQuartier, setSelectedQuartier] = useState<string | null>(null);
  const [selectedMpt, setSelectedMpt] = useState<MPT | null>(null);

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

  const mptPositions: { x: number; y: number }[] = [];
  mptData.forEach((mpt: MPT) => {
    if (!mpt.coordinates) return;

    const mptNumber = MPT_NUMBERS.find(m => m.id === mpt.id)?.number;
    if (!mptNumber) return;

    const x = (mpt.coordinates.lng - minX) * scale + offsetX;
    const y = height - ((mpt.coordinates.lat - minY) * scale + offsetY);
    mptPositions.push({ x, y });
  });

  const handleMptClick = (mpt: MPT) => {
    setSelectedMpt(mpt);
  };

  return (
    <div className="w-full min-w-[320px] relative">
      {selectedMpt && (
        <MaisonDetail mpt={selectedMpt} onClose={() => setSelectedMpt(null)} />
      )}
      {selectedQuartier && (
        <QuartierDetail quartierName={selectedQuartier} onClose={() => setSelectedQuartier(null)} />
      )}
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {data.features.map(quartierData => {
          const quartierName = quartierData.properties.name;
          const style = QUARTIER_STYLES[quartierName as keyof typeof QUARTIER_STYLES] || {
            fill: '#CCCCCC',
            stroke: '#999999',
            text: '#000000',
          };

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

          const centroid = calculateCentroid(quartierData.geometry.coordinates[0]);
          let textX = (centroid[0] - minX) * scale + offsetX;
          let textY = height - ((centroid[1] - minY) * scale + offsetY);

          const mptRadius = 12;
          const textMargin = 20;
          let foundPosition = false;
          let offset = 0;
          const maxOffset = 50;
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

          return (
            <g key={quartierName}>
              <path
                id={`quartier-${quartierName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                d={d}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth="1"
                cursor="pointer"
                data-quartier={quartierName}
                onClick={() => setSelectedQuartier(quartierName)}
              />
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#FFFFFF"
                fontSize="14"
                fontWeight="bold"
                stroke="#000000"
                strokeWidth="0.5"
                paintOrder="stroke"
              >
                {quartierName.toUpperCase()}
              </text>
            </g>
          );
        })}
        {mptData.map((mpt: MPT) => {
          if (!mpt.coordinates) return null;

          const mptNumber = MPT_NUMBERS.find(m => m.id === mpt.id)?.number;
          if (!mptNumber) return null;

          const x = (mpt.coordinates.lng - minX) * scale + offsetX;
          const y = height - ((mpt.coordinates.lat - minY) * scale + offsetY);

          return (
            <g 
              key={mpt.id} 
              data-mpt-id={mpt.id}
              onClick={() => handleMptClick(mpt)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={x}
                cy={y}
                r="12"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#000000"
                fontSize="14"
                fontWeight="bold"
              >
                {mptNumber}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

