'use client';

import React from 'react';
import Link from 'next/link';
import { MPT } from '@/types/maisons';
import { Activity } from '@/types/activity';
import {
  HomeIcon,
  MapPinIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { unstable_ViewTransition as ViewTransition } from 'react';

type MaisonsCardProps = {
  mpt: MPT;
  activities: Activity[];
};

export default function MaisonsCard({ mpt, activities }: MaisonsCardProps) {
  const mptActivities = activities.filter(activity => activity.mptId === mpt.id);

  const formatAddress = (address: string) => {
    if (!address) return 'Adresse non disponible';

    return address.replace(/\d{5} .+/, '').trim();
  };

  const getColorClass = (id: string): string => {
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-emerald-500 to-green-600',
      'from-orange-500 to-amber-600',
      'from-purple-500 to-violet-600',
      'from-red-500 to-pink-600',
      'from-cyan-500 to-sky-600',
    ];
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const activityCategories = Array.from(
    new Set(mptActivities.map(activity => activity.category))
  ).slice(0, 3);

  const formatOpeningHours = () => {
    if (!mpt.openingHours || Object.keys(mpt.openingHours).length === 0) {
      return 'Horaires non disponibles';
    }

    const days = Object.keys(mpt.openingHours);
    if (days.length === 0) return 'Horaires non disponibles';

    const firstDay = days[0];
    const slots = mpt.openingHours[firstDay]?.slots || [];

    if (slots.length === 0) return 'Horaires variables';

    return (
      <span>
        <span className="font-medium">{firstDay}:</span> {slots.join(' et ')}
        {days.length > 1 && ' (+ autres jours)'}
      </span>
    );
  };

  return (
    <Link href={`/maisons-pour-tous/${mpt.slug}`} className="block h-full no-underline hover:no-underline">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col group relative">
        <div
          className={`bg-gradient-to-r ${getColorClass(
            mpt.id
          )} p-4 text-white relative overflow-hidden`}
        >
          <div className="absolute top-2 right-2">
            <div className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </div>
          </div>

          <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full transform translate-x-4 -translate-y-4"></div>
          <div className="absolute bottom-0 right-8 w-8 h-8 bg-white opacity-10 rounded-full transform translate-y-4"></div>

          <div className="relative z-10">
            <div className="flex items-center">
              <HomeIcon className="h-5 w-5 mr-2" />
              <ViewTransition name={`mpt-title-${mpt.id}`}>
                <h2 className="text-xl font-bold mt-1 mb-2 group-hover:translate-x-2 group-hover:underline transition-transform duration-300 truncate">
                  {mpt.codeMPT}
                </h2>
              </ViewTransition>
            </div>

            <div className="flex items-start">
              <ViewTransition name={`mpt-address-${mpt.id}`}>
                <MapPinIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-xs opacity-90 line-clamp-1">{formatAddress(mpt.address)}</p>
              </ViewTransition>
            </div>
          </div>
        </div>

        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <ViewTransition name={`mpt-activities-${mpt.id}`}>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {mptActivities.length} activités
                </span>
              </ViewTransition>

              {activityCategories.map(category => (
                <span
                  key={category}
                  className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="flex items-start text-gray-600 mb-3">
              <ClockIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-xs">{formatOpeningHours()}</div>
            </div>

            {mptActivities.length > 0 && (
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-gray-500 mb-1">Quelques activités :</h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  {Array.from(
                    new Set(mptActivities.slice(0, 3).map(activity => activity.name))
                  ).map(activityName => (
                    <li key={activityName} className="truncate">
                      • {activityName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
