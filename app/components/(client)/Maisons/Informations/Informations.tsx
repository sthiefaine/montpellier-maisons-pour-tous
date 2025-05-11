'use client';

import { MPT } from '@/types/maisons';
import { ClockIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { OpeningStatus } from '../OpeningStatus/OpeningStatus';
import { Suspense } from 'react';
import { OpeningStatusSkeleton } from '../OpeningStatus/OpeningStatusSkeleton';
import DetailFicheInscription from '@/app/components/DetailFicheInscription';

interface InformationsProps {
  mpt: MPT;
}

export function Informations({ mpt }: InformationsProps) {
  return (
    <div className="space-y-8">
      {/* Horaires */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center">
          <ClockIcon className="w-6 h-6 mr-2 text-blue-600" />
          Horaires d'ouverture
        </h2>

        <Suspense fallback={<OpeningStatusSkeleton />}>
          <OpeningStatus mpt={mpt} />
        </Suspense>

        <div className="space-y-1">
          {Object.entries(mpt.openingHours).map(([day, schedule]) => (
            <div
              key={day}
              className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0"
            >
              <span className="font-medium text-gray-700">{day}</span>
              <div className="flex flex-col items-end">
                {schedule.slots.map((slot, index) => (
                  <span
                    key={index}
                    className={`font-medium ${slot.toLowerCase().includes('fermé') ? 'text-red-600' : 'text-green-600'}`}
                  >
                    {slot}
                  </span>
                ))}
                {schedule.comments && (
                  <span
                    className={`text-sm ${schedule.comments.toLowerCase().includes('ferm') ? 'text-red-600' : 'text-gray-500'}`}
                  >
                    {schedule.comments}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coordonnées */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center">
          <PhoneIcon className="w-6 h-6 mr-2 text-blue-600" />
          Coordonnées
        </h2>
        <div className="space-y-2">
          {mpt.phone && (
            <p className="text-gray-600">
              Téléphone :{' '}
              <a href={`tel:${mpt.phone}`} className="text-blue-600 hover:underline">
                {mpt.phone}
              </a>
            </p>
          )}
          {mpt.email && (
            <p className="text-gray-600">
              Email :{' '}
              <a href={`mailto:${mpt.email}`} className="text-blue-600 hover:underline">
                {mpt.email}
              </a>
            </p>
          )}
          <DetailFicheInscription />
        </div>
      </div>
    </div>
  );
}
