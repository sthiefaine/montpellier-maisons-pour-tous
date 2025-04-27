'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

import { MAIN_CATEGORIES } from '@/types/categories';
import CategoryIcon from '@/app/components/Icons/Category/Category';
import ActivityCard from '@/app/components/Cards/Activity/Activity';

import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { MPT } from '@/types/maisons';
import { Activity } from '@/types/activity';

type SearchFilters = {
  search: string;
  category: string;
  subcategory: string;
  public: string;
  mpt: string;
  level: string;
  day: string;
};

interface ActivitiesListClientProps {
  mpts: MPT[];
  activities: Activity[];
  subCategoriesByCategory: Record<string, string[]>;
  allPublics: string[];
  allLevels: string[];
  allDays: string[];
  initialSearchParams?: SearchFilters;
  hideHeader?: boolean;
}

export default function ActivitiesListClient({
  mpts,
  activities,
  subCategoriesByCategory,
  allPublics,
  allLevels,
  allDays,
  initialSearchParams = {
    search: '',
    category: '',
    subcategory: '',
    public: '',
    mpt: '',
    level: '',
    day: '',
  },
  hideHeader = false,
}: ActivitiesListClientProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialSearchParams);
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch =
        !filters.search ||
        activity.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        activity.mptName.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = !filters.category || activity.category === filters.category;
      const matchesSubCategory = !filters.subcategory || activity.subCategory === filters.subcategory;
      const matchesPublic = !filters.public || activity.public === filters.public;
      const matchesMPT = !filters.mpt || activity.mptId === filters.mpt;
      const matchesLevel = !filters.level || activity.level?.value === filters.level;
      const matchesDay = !filters.day || (activity.schedule && activity.schedule.day === filters.day);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubCategory &&
        matchesPublic &&
        matchesMPT &&
        matchesLevel &&
        matchesDay
      );
    });
  }, [activities, filters]);

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      subcategory: '',
      public: '',
      mpt: '',
      level: '',
      day: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideHeader && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Activités</h1>
                <p className="text-blue-100 text-lg font-medium mb-4">
                  {activities.length} activités disponibles dans les Maisons Pour Tous
                </p>
              </div>
              <div className="flex space-x-2 text-sm">
                <Link 
                  href="/" 
                  className="bg-white/60 hover:bg-white/80 text-blue-900 px-3 py-1 rounded transition-colors"
                >
                  Accueil
                </Link>
                <span className="text-blue-200">/</span>
                <span className="bg-blue-900/80 text-white px-3 py-1 rounded font-medium">Activités</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Rechercher une activité..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={filters.search}
                onChange={e => updateFilter('search', e.target.value)}
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

              {filters.search && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => updateFilter('search', '')}
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
            <div className="hidden md:flex items-center space-x-4 flex-wrap">
              <div className="relative">
                <CategoryIcon
                  category="default"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                />
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none bg-white"
                  value={filters.category}
                  onChange={e => updateFilter('category', e.target.value)}
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

              {filters.category && subCategoriesByCategory[filters.category]?.length > 0 && (
                <div className="relative">
                  <select
                    className="pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none bg-white"
                    value={filters.subcategory}
                    onChange={e => updateFilter('subcategory', e.target.value)}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="">Toutes les sous-catégories</option>
                    {subCategoriesByCategory[filters.category].map(subcategory => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="relative">
                <UserGroupIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none bg-white"
                  value={filters.public}
                  onChange={e => updateFilter('public', e.target.value)}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">Tous les publics</option>
                  {allPublics.map(publicType => (
                    <option key={publicType} value={publicType}>
                      {publicType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <AcademicCapIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none bg-white"
                  value={filters.level}
                  onChange={e => updateFilter('level', e.target.value)}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">Tous les niveaux</option>
                  {allLevels.map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative group">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white">
                  <span>Plus de filtres</span>
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </button>
                <div className="hidden group-hover:block absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="px-4 py-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jour</label>
                    <select
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent text-sm"
                      value={filters.day}
                      onChange={e => updateFilter('day', e.target.value)}
                    >
                      <option value="">Tous les jours</option>
                      {allDays.map(day => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>

                  {!hideHeader && (
                    <div className="px-4 py-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maison Pour Tous
                      </label>
                      <select
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent text-sm"
                        value={filters.mpt}
                        onChange={e => updateFilter('mpt', e.target.value)}
                      >
                        <option value="">Toutes les MPT</option>
                        {mpts.map(mpt => (
                          <option key={mpt.id} value={mpt.id}>
                            {mpt.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  <span>Réinitialiser</span>
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="md:hidden mt-4 flex flex-col space-y-3 pb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  value={filters.category}
                  onChange={e => updateFilter('category', e.target.value)}
                >
                  <option value="">Toutes les catégories</option>
                  {MAIN_CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {filters.category && subCategoriesByCategory[filters.category]?.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sous-catégorie
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    value={filters.subcategory}
                    onChange={e => updateFilter('subcategory', e.target.value)}
                  >
                    <option value="">Toutes les sous-catégories</option>
                    {subCategoriesByCategory[filters.category].map(subcategory => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Public</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  value={filters.public}
                  onChange={e => updateFilter('public', e.target.value)}
                >
                  <option value="">Tous les publics</option>
                  {allPublics.map(publicType => (
                    <option key={publicType} value={publicType}>
                      {publicType}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  value={filters.level}
                  onChange={e => updateFilter('level', e.target.value)}
                >
                  <option value="">Tous les niveaux</option>
                  {allLevels.map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jour</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  value={filters.day}
                  onChange={e => updateFilter('day', e.target.value)}
                >
                  <option value="">Tous les jours</option>
                  {allDays.map(day => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              {!hideHeader && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maison Pour Tous
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    value={filters.mpt}
                    onChange={e => updateFilter('mpt', e.target.value)}
                  >
                    <option value="">Toutes les MPT</option>
                    {mpts.map(mpt => (
                      <option key={mpt.id} value={mpt.id}>
                        {mpt.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {!hideHeader && (
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredActivities.length}{' '}
              {filteredActivities.length === 1 ? 'activité trouvée' : 'activités trouvées'}
              {filters.search && ` pour "${filters.search}"`}
              {filters.category && ` dans la catégorie ${filters.category}`}
              {filters.subcategory && ` > ${filters.subcategory}`}
            </p>
          </div>
        )}

        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredActivities.map((activity, index) => (
                <div key={`${activity.id}-${index}`} className="h-full" style={{ height: `200px` }}>
                  <ActivityCard activity={activity} showMPT={true} />
                </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex justify-center items-center bg-blue-100 text-blue-600 p-3 rounded-full mb-4">
              <CalendarIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aucune activité trouvée</h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche ou de filtrage.
            </p>
            <button
              onClick={() => {
                setFilters({
                  search: '',
                  category: '',
                  subcategory: '',
                  public: '',
                  mpt: '',
                  level: '',
                  day: '',
                });
              }}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              <XMarkIcon className="h-5 w-5 mr-2" />
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {(filters.search || filters.category || filters.subcategory || filters.public || filters.level || filters.day || filters.mpt) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">{filteredActivities.length} résultats</div>
            <button
              onClick={resetFilters}
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
