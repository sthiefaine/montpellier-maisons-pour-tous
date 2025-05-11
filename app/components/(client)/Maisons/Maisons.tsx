'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MPT } from '@/types/maisons';
import { Activity } from '@/types/activity';
import MPTCard from '@/app/components/Cards/Maisons/Maisons';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { NEIGHBORHOODS } from '@/helpers/neighborhoods';
import { MAIN_CATEGORIES } from '@/types/categories';

type MaisonsClientProps = {
  mpts: MPT[];
  activities: Activity[];
  initialSearch: string;
  stats: {
    mptCount: number;
    areaCount: number;
    totalActivities: number;
  };
};

export default function MaisonsClient({
  mpts,
  activities,
  initialSearch,
  stats,
}: MaisonsClientProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'activities'>('name');
  const [showFilters, setShowFilters] = useState(false);

  const filteredMPTs = useMemo(() => {
    let result = [...mpts];

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter(
        mpt =>
          mpt.name.toLowerCase().includes(searchTermLower) ||
          mpt.address.toLowerCase().includes(searchTermLower) ||
          mpt.codeMPT.toLowerCase().includes(searchTermLower)
      );
    }

    if (selectedNeighborhood) {
      const neighborhood = NEIGHBORHOODS.find(n => n.name === selectedNeighborhood);
      if (neighborhood) {
        result = result.filter(mpt => {
          const mptName = mpt.codeMPT;
          return neighborhood.mpts.some(m => m.name === mptName);
        });
      }
    }

    if (selectedCategory) {
      result = result.filter(mpt => {
        return mpt.activities.some(activity => {
          const activityData = activities.find(a => a.id === activity);
          return activityData?.category === selectedCategory;
        });
      });
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.codeMPT.localeCompare(b.codeMPT));
    } else if (sortBy === 'activities') {
      result.sort((a, b) => b.activities.length - a.activities.length);
    }

    return result;
  }, [mpts, searchTerm, selectedNeighborhood, selectedCategory, sortBy, activities]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Rechercher une Maison, adresse..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            <button
              className="md:hidden flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              <span>Filtres {showFilters ? 'masquer' : 'afficher'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none bg-white"
                  value={selectedNeighborhood}
                  onChange={e => setSelectedNeighborhood(e.target.value)}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">Tous les quartiers</option>
                  {NEIGHBORHOODS.map(neighborhood => (
                    <option key={neighborhood.name} value={neighborhood.name}>
                      {neighborhood.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <HomeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">Toutes les catégories</option>
                  {MAIN_CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'name' | 'activities')}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="name">Trier par nom</option>
                  <option value="activities">Trier par nombre d&apos;activités</option>
                </select>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="md:hidden mt-4 flex flex-col space-y-3 pb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quartier</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  value={selectedNeighborhood}
                  onChange={e => setSelectedNeighborhood(e.target.value)}
                >
                  <option value="">Tous les quartiers</option>
                  {NEIGHBORHOODS.map(neighborhood => (
                    <option key={neighborhood.name} value={neighborhood.name}>
                      {neighborhood.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie d&apos;activité
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                >
                  <option value="">Toutes les catégories</option>
                  {MAIN_CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trier par</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'name' | 'activities')}
                >
                  <option value="name">Nom</option>
                  <option value="activities">Nombre d&apos;activités</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredMPTs.length}{' '}
            {filteredMPTs.length === 1 ? 'Maison Pour Tous trouvée' : 'Maisons Pour Tous trouvées'}
            {searchTerm && ` pour "${searchTerm}"`}
            {selectedNeighborhood && ` dans le quartier ${selectedNeighborhood}`}
          </p>
        </div>

        {filteredMPTs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMPTs.map(mpt => (
              <MPTCard key={mpt.id} mpt={mpt} activities={activities} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex justify-center items-center bg-blue-100 text-blue-600 p-3 rounded-full mb-4">
              <HomeIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aucune Maison Pour Tous trouvée</h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche ou de filtrage.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedNeighborhood('');
                setSelectedCategory('');
                setSortBy('name');
              }}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              <XMarkIcon className="h-5 w-5 mr-2" />
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {(searchTerm || selectedNeighborhood || selectedCategory) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">{filteredMPTs.length} résultats</div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedNeighborhood('');
                setSelectedCategory('');
                setSortBy('name');
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
