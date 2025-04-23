'use client';

import { useState } from 'react';
import { QUARTIER_STYLES } from '@/lib/helpers/quartierStyles';
import mptData from '@/data/mpt.json';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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

const MPT_NUMBERS = [
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

export default function MapLegend() {
  const [expandedQuartiers, setExpandedQuartiers] = useState<Set<string>>(new Set());

  const toggleQuartier = (quartierName: string) => {
    setExpandedQuartiers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(quartierName)) {
        newSet.delete(quartierName);
      } else {
        newSet.add(quartierName);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white/95 rounded-lg p-2 shadow-sm border border-gray-100">
      <div className="space-y-1">
        {QUARTIERS.map(quartier => {
          const style = QUARTIER_STYLES[quartier.name as keyof typeof QUARTIER_STYLES] || {
            fill: '#CCCCCC',
            stroke: '#999999',
            text: '#000000',
          };
          const isExpanded = expandedQuartiers.has(quartier.name);

          return (
            <div
              key={quartier.name}
              className="relative rounded-lg overflow-hidden"
              style={{ border: `1px solid ${style.fill}` }}
            >
              <button
                onClick={() => toggleQuartier(quartier.name)}
                className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 transition-colors"
              >
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: style.fill,
                    border: `1px solid ${style.fill}`,
                  }}
                />
                <span className="font-bold text-sm text-gray-700 flex-1 text-left">
                  {quartier.name}
                </span>
                {isExpanded ? (
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                )}
              </button>
              {isExpanded && (
                <div className="p-2 bg-gray-50">
                  <div className="flex flex-col gap-1">
                    {quartier.mpts.map(mptNumber => {
                      const mpt = mptData.find(
                        m => MPT_NUMBERS.find(mn => mn.id === m.id)?.number === mptNumber
                      );
                      if (!mpt) return null;

                      let displayName = mpt.name.replace('Maison pour tous ', '');

                      return (
                        <div key={mpt.id} className="flex items-center gap-1 text-xs text-gray-600">
                          <span className="font-medium min-w-[1rem]">{mptNumber}.</span>
                          <span>{displayName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
