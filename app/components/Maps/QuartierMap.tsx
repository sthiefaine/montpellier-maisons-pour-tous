'use client';

import { useState } from 'react';
import QuartierDetail from './QuartierDetail';
import MaisonDetail from './MaisonDetail';
import { MPT, MPT_NUMBERS, Quartier, TramData } from './types';
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
  tramData?: TramData;
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

function getMptPositionAdjustment(mptNumber: number): number {
  const adjustments: Record<number, number> = {
    3: -5,
    4: 10,
    22: -5,
  };

  return adjustments[mptNumber] || 0;
}

export default function QuartierMap({
  width = 800,
  height = 600,
  mptData,
  quartierData,
  tramData,
}: QuartierMapProps) {
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
  // Trier les MPT par numéro pour assurer un ordre cohérent
  const sortedMptData = [...mptData].sort((a, b) => {
    const numA = MPT_NUMBERS.find(m => m.id === a.id)?.number || 0;
    const numB = MPT_NUMBERS.find(m => m.id === b.id)?.number || 0;
    return numA - numB;
  });

  sortedMptData.forEach((mpt: MPT) => {
    if (!mpt.coordinates) return;

    const mptNumber = MPT_NUMBERS.find(m => m.id === mpt.id)?.number;
    if (!mptNumber) return;

    const x = (mpt.coordinates.lng - minX) * scale + offsetX;
    const y = height - ((mpt.coordinates.lat - minY) * scale + offsetY);
    
    const adjustedX = x + getMptPositionAdjustment(mptNumber);
    mptPositions.push({ x: adjustedX, y });
  });

  const handleMptClick = (mpt: MPT) => {
    setSelectedMpt(mpt);
  };

  return (
    <div className="w-full min-w-[320px] relative space-y-4">
      {selectedMpt && <MaisonDetail mpt={selectedMpt} onClose={() => setSelectedMpt(null)} />}
      {selectedQuartier && (
        <QuartierDetail quartierName={selectedQuartier} onClose={() => setSelectedQuartier(null)} />
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ userSelect: 'none' }}
      >
        {/* Formes des quartiers */}
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

          return (
            <g key={`quartier-shape-${quartierName}`}>
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
            </g>
          );
        })}

        {/* Lignes de tramway */}
        {tramData?.features.map((line, index) => {
          const lineIndex = tramData.features
            .slice(0, index)
            .filter(l => l.properties.num_exploitation !== line.properties.num_exploitation).length;

          const points = line.geometry.coordinates
            .map(([x, y]) => {
              // Appliquer le décalage uniquement si c'est une ligne différente
              const offset = lineIndex * 2;
              const scaledX = (x - minX) * scale + offsetX + offset;
              const scaledY = height - ((y - minY) * scale + offsetY);
              return `${scaledX},${scaledY}`;
            })
            .join(' ');

          return (
            <g
              key={`tram-${line.properties.id_lignes_sens}-${line.properties.num_exploitation}-${index}`}
            >
              <polyline
                points={points}
                fill="none"
                stroke={line.properties.code_couleur}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
            </g>
          );
        })}

        {/* Cercles des MPTs */}
        {mptData.map((mpt: MPT) => {
          if (!mpt.coordinates) return null;

          const mptNumber = MPT_NUMBERS.find(m => m.id === mpt.id)?.number;
          if (!mptNumber) return null;

          const x = (mpt.coordinates.lng - minX) * scale + offsetX;
          const y = height - ((mpt.coordinates.lat - minY) * scale + offsetY);
          
          const adjustedX = x + getMptPositionAdjustment(mptNumber);

          return (
            <g
              key={`mpt-shape-${mpt.id}`}
              data-mpt-id={mpt.id}
              onClick={() => handleMptClick(mpt)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={adjustedX}
                cy={y}
                r="12"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="1.5"
              />
            </g>
          );
        })}

        {/* Textes (noms des quartiers et numéros des MPTs) */}
        <g>
          {/* Noms des quartiers */}
          {data.features.map(quartierData => {
            const quartierName = quartierData.properties.name;
            const centroid = calculateCentroid(quartierData.geometry.coordinates[0]);
            let textX = (centroid[0] - minX) * scale + offsetX;
            let textY = height - ((centroid[1] - minY) * scale + offsetY);

            const mptRadius = 12;
            const textMargin = 20;
            let foundPosition = false;
            let offset = 0;
            const maxOffset = 50;
            const isBottomPosition =
              quartierName === 'Les Cévennes' || quartierName === 'Port Marianne';
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
              <g key={`quartier-text-${quartierName}`}>
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

          {/* Numéros des MPTs */}
          {mptData.map((mpt: MPT) => {
            if (!mpt.coordinates) return null;

            const mptNumber = MPT_NUMBERS.find(m => m.id === mpt.id)?.number;
            if (!mptNumber) return null;

            const x = (mpt.coordinates.lng - minX) * scale + offsetX;
            const y = height - ((mpt.coordinates.lat - minY) * scale + offsetY);
            const adjustedX = x + getMptPositionAdjustment(mptNumber);

            return (
              <g key={`mpt-text-${mpt.id}`}>
                <text
                  x={adjustedX}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#000000"
                  fontSize="14"
                  fontWeight="bold"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                >
                  {mptNumber}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
