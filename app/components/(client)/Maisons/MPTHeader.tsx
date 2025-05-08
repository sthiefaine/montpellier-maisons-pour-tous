'use client';

import { unstable_ViewTransition as ViewTransition } from 'react';
import { MPT } from '@/types/maisons';
import Link from 'next/link';

interface MPTHeaderProps {
  mpt?: MPT;
  activitiesCount?: number;
  isDetailPage?: boolean;
  mptCount?: number;
}

export default function MPTHeader({ mpt, activitiesCount, isDetailPage = false, mptCount }: MPTHeaderProps) {
  const displayName = mpt?.name.toLowerCase().replace('maison pour tous', '');

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            {mpt ? (
              <ViewTransition name={`mpt-title-${mpt.id}`}>
                <h1 className="mpt-title text-3xl md:text-4xl font-bold mb-2">{mpt.name}</h1>
              </ViewTransition>
            ) : (
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Maisons Pour Tous</h1>
            )}
            {!isDetailPage && mptCount !== undefined && (
              <p className="text-blue-100 text-lg font-medium">
                {mptCount} Maison{mptCount > 1 ? 's' : ''} Pour Tous à Montpellier
              </p>
            )}
            {activitiesCount !== undefined && (
              <ViewTransition name={`mpt-activities-${mpt?.id}`}>
                <p className="text-blue-100 text-lg font-medium mb-4">
                  {activitiesCount} activité{activitiesCount !== 1 ? 's' : ''} disponible{activitiesCount !== 1 ? 's' : ''}
                </p>
              </ViewTransition>
            )}
          </div>
        </div>
        <div className="mt-4">
          <div className="flex space-x-2 text-sm">
            <Link
              href="/"
              className="bg-white/60 hover:bg-white/80 text-blue-900 px-3 py-1 rounded transition-colors"
            >
              Accueil
            </Link>
            <span className="text-blue-200">/</span>
            <Link
              href="/maisons-pour-tous"
              className="bg-blue-900/80 text-white px-3 py-1 rounded font-medium"
            >
              Maisons
            </Link>
            {isDetailPage && mpt && (
              <>
                <span className="text-blue-200">/</span>
                <span className="bg-blue-900/80 text-white px-3 py-1 rounded font-medium">
                  {displayName}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}