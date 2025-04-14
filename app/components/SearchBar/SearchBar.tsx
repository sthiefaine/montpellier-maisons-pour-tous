'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MPT } from '@/types/maisons';
import { Activity } from '@/types/activity';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Badge from '@/app/components/Badge/Badge';

interface SearchBarProps {
  mpts: MPT[];
  activities: Activity[];
}

export default function SearchBar({ mpts, activities }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const renderSearchResults = () => {
    if (!searchQuery || !showResults) return null;

    const filteredMPTs = mpts.filter(mpt =>
      mpt.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredActivities = activities.filter(activity =>
      activity.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredMPTs.length === 0 && filteredActivities.length === 0) {
      return (
        <div className="absolute top-full left-0 w-full bg-white rounded-b-lg shadow-lg border border-gray-200 mt-1">
          <div className="p-4 text-center text-gray-500">Aucun résultat trouvé</div>
        </div>
      );
    }

    return (
      <div className="absolute top-full left-0 w-full bg-white rounded-b-lg shadow-lg border border-gray-200 mt-1 max-h-[50dvh] overflow-y-auto">
        {filteredMPTs.length > 0 && (
          <div className="p-2">
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Maisons Pour Tous</h3>
            <ul className="space-y-1">
              {filteredMPTs.slice(0, 3).map(mpt => (
                <li key={mpt.id}>
                  <Link
                    href={`/maisons-pour-tous/${mpt.slug}`}
                    className="block p-1.5 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="font-medium">{mpt.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 ml-6">{mpt.address}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {filteredActivities.length > 0 && (
          <div className="p-2 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Activités</h3>
            <ul className="space-y-1">
              {filteredActivities.slice(0, 5).map(activity => (
                <li key={activity.id}>
                  <Link
                    href={`/activites/${activity.id}`}
                    className="block p-1.5 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="font-medium">{activity.name}</span>
                      <Badge type="category" value={activity.category} className="ml-2">
                        {activity.category}
                      </Badge>
                    </div>
                    <div className="flex items-center ml-6 mt-0.5">
                      <span className="text-xs text-gray-500">{activity.mptName}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {filteredActivities.length > 5 && (
              <Link
                href={`/activites?search=${encodeURIComponent(searchQuery)}`}
                className="block text-xs text-blue-500 hover:text-blue-700 mt-1 text-center font-medium"
              >
                Voir plus de résultats...
              </Link>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Rechercher une MPT ou une activité..."
          className="w-full px-4 py-2 pl-10 pr-10 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        {searchQuery && (
          <button
            onClick={e => {
              e.preventDefault();
              setSearchQuery('');
            }}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={e => {
            e.preventDefault();
            setShowResults(!showResults);
          }}
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 ${!searchQuery ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!searchQuery}
        >
          {showResults ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {searchQuery && showResults && renderSearchResults()}
    </div>
  );
}
