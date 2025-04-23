'use client';

import { useEffect, useRef, useState } from 'react';
import { QUARTIER_STYLES } from '@/lib/helpers/quartierStyles';
import mptData from '@/data/mpt.json';
import quartierData from '@/data/sav/montpellier_quartiers.json';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface MPT {
  id: string;
  name: string;
  address: string;
  slug: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

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

interface MPTWithNumber {
  id: string;
  number: number;
}

const MPT_NUMBERS: MPTWithNumber[] = [
  { id: 'mpt-maison-pour-tous-andre-chamson', number: 1 },
  { id: 'mpt-maison-pour-tous-antoine-de-saint-exupery', number: 2 },
  { id: 'mpt-maison-pour-tous-fanfonne-guillierme', number: 3 },
  { id: 'mpt-maison-pour-tous-francois-villon', number: 4 },
  { id: 'mpt-maison-pour-tous-marcel-pagnol', number: 5 },
  { id: 'mpt-maison-pour-tous-paul-emile-victor', number: 6 },
  { id: 'mpt-maison-pour-tous-albert-camus', number: 7 },
  { id: 'mpt-maison-pour-tous-michel-colucci', number: 8 },
  { id: 'mpt-maison-pour-tous-albert-dubout', number: 9 },
  { id: 'mpt-maison-pour-tous-rosa-lee-parks', number: 10 },
  { id: 'mpt-maison-pour-tous-albertine-sarrazin', number: 11 },
  { id: 'mpt-maison-pour-tous-frederic-chopin', number: 12 },
  { id: 'mpt-maison-pour-tous-george-sand', number: 13 },
  { id: 'mpt-maison-pour-tous-joseph-ricome-et-theatre-gerard-philipe', number: 14 },
  { id: 'mpt-maison-pour-tous-voltaire', number: 15 },
  { id: 'mpt-maison-pour-tous-georges-brassens', number: 16 },
  { id: 'mpt-maison-pour-tous-leo-lagrange', number: 17 },
  { id: 'mpt-maison-pour-tous-marie-curie', number: 18 },
  { id: 'mpt-maison-pour-tous-louis-feuillade', number: 19 },
  { id: 'mpt-maison-pour-tous-melina-mercouri', number: 20 },
  { id: 'mpt-maison-pour-tous-frida-kahlo', number: 21 },
  { id: 'mpt-maison-pour-tous-lescoutaire', number: 22 },
  { id: 'mpt-maison-pour-tous-jean-pierre-caillens', number: 23 },
  { id: 'mpt-maison-pour-tous-boris-vian', number: 24 },
];

const QUARTIERS = [
  {
    name: 'Les Cévennes',
    mpts: [1, 2, 3, 4, 5, 6],
  },
  {
    name: "Croix d'Argent",
    mpts: [7, 8],
  },
  {
    name: 'Hôpitaux-Facultés',
    mpts: [9, 10],
  },
  {
    name: 'Centre',
    mpts: [11, 12, 13, 14, 15],
  },
  {
    name: 'Mosson',
    mpts: [16, 17, 18, 19],
  },
  {
    name: 'Port Marianne',
    mpts: [20, 21],
  },
  {
    name: "Près d'Arènes",
    mpts: [22, 23, 24],
  },
];

export default function QuartierMap({ width = 800, height = 600 }: QuartierMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedMPT, setSelectedMPT] = useState<{
    x: number;
    y: number;
    name: string;
    address: string;
    slug: string;
  } | null>(null);

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
      const baseOffset = isBottomPosition ? 30 : -30; // Commencer en bas ou en haut

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
    <div className="w-full min-w-[428px] relative">
      {selectedMPT && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-xl min-w-[200px]">
            <div className="text-sm font-semibold text-gray-900 mb-1">{selectedMPT.name}</div>
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
