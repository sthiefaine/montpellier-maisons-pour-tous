'use client';

import { useState } from 'react';
import { QUARTIER_STYLES } from '@/helpers/quartierStyles';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { QUARTIERS, MPT_NUMBERS, TramData } from './types';
import { MPT } from '@/types/maisons';

type MapLegendProps = {
  mptData: MPT[];
  tramData?: TramData;
};

export default function MapLegend({ mptData, tramData }: MapLegendProps) {
  const [expandedQuartiers, setExpandedQuartiers] = useState<Set<string>>(new Set());
  const [expandedTram, setExpandedTram] = useState<boolean>(false);

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

  // Regrouper les lignes de tram par numéro d'exploitation
  const tramLines =
    tramData?.features.reduce(
      (acc, line) => {
        const num = line.properties.num_exploitation;
        if (!acc[num]) {
          acc[num] = {
            num,
            color: line.properties.code_couleur,
            name: line.properties.nom_ligne,
          };
        }
        return acc;
      },
      {} as Record<number, { num: number; color: string; name: string }>
    ) || {};

  return (
    <div className="bg-white/95 rounded-lg p-2 shadow-sm border border-gray-100">
      <div className="space-y-1 max-h-[80vh] overflow-y-auto">
        {/* Section des lignes de tramway */}
        {Object.values(tramLines).length > 0 && (
          <div className="relative rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => setExpandedTram(!expandedTram)}
              className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-sm text-gray-700 flex-1 text-left">
                Lignes de tramway
              </span>
              {expandedTram ? (
                <ChevronDownIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
              )}
            </button>
            {expandedTram && (
              <div className="p-2 bg-gray-50">
                <div className="flex flex-col gap-2">
                  {Object.values(tramLines).map(line => (
                    <div key={line.num} className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-sm flex-shrink-0"
                        style={{
                          backgroundColor: line.color,
                          border: `1px solid ${line.color}`,
                        }}
                      />
                      <span className="text-sm text-gray-700">Ligne {line.num}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section des quartiers */}
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
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{
                    backgroundColor: style.fill,
                    border: `1px solid ${style.fill}`,
                  }}
                />
                <span className="font-bold text-sm text-gray-700 flex-1 text-left truncate">
                  {quartier.name}
                </span>
                {isExpanded ? (
                  <ChevronDownIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
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
                          <span className="font-medium min-w-[1rem] flex-shrink-0">
                            {mptNumber}.
                          </span>
                          <span className="truncate">{displayName}</span>
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
