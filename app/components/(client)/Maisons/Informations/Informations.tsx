'use client';

import { MPT } from '@/types/maisons';
import { formatOpeningHours } from '@/app/utils/formatOpeningHours';

interface InformationsProps {
  mpt: MPT;
}

export function Informations({ mpt }: InformationsProps) {
  return (
    <div className="space-y-8">
      {/* Horaires */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Horaires d'ouverture</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries(mpt.openingHours).map(([day, schedule]) => (
            <div key={day} className="flex flex-col">
              <span className="font-semibold">{day}</span>
              <div className="flex flex-col">
                {schedule.slots.map((slot, index) => (
                  <span key={index} className="text-gray-600">
                    {slot}
                  </span>
                ))}
                {schedule.comments && (
                  <span className="text-sm text-gray-500">{schedule.comments}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coordonnées */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Coordonnées</h2>
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
        </div>
      </div>
    </div>
  );
} 