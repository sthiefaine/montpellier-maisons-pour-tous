/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { MPT } from '@/types/maisons';
import { useEffect, useState } from 'react';

function normalizeDayName(day: string): string {
  return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
}

function parseTime(time: string): number {
  const [hours, minutes] = time.split(':').map(num => parseInt(num) || 0);
  return hours * 60 + minutes;
}

interface OpeningStatusProps {
  mpt: MPT;
}

interface StatusResult {
  isOpen: boolean;
  closingTime?: number;
  nextOpening?: {
    day: string;
    time: number;
    isTemporary: boolean;
  } | null;
  currentDay: string;
  currentTime: Date;
}

export function OpeningStatus({ mpt }: OpeningStatusProps) {
  const [currentStatus, setCurrentStatus] = useState<StatusResult | null>(null);

  const getCurrentStatus = (now: Date): StatusResult => {
    const currentDay = normalizeDayName(now.toLocaleDateString('fr-FR', { weekday: 'long' }));
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const todaySchedule = mpt.openingHours[currentDay];
    if (!todaySchedule) {
      const days = Object.keys(mpt.openingHours);
      const currentDayIndex = days.indexOf(currentDay);
      
      for (let i = 1; i <= 7; i++) {
        const nextDayIndex = (currentDayIndex + i) % 7;
        const nextDay = days[nextDayIndex];
        const nextDaySchedule = mpt.openingHours[nextDay];
        
        if (nextDaySchedule) {
          const firstSlot = nextDaySchedule.slots.find(
            slot => !slot.toLowerCase().includes('fermé')
          );
          if (firstSlot) {
            const [start] = firstSlot.split('-').map(t => t.trim());
            return {
              isOpen: false,
              nextOpening: {
                day: nextDay,
                time: parseTime(start),
                isTemporary: false,
              },
              currentDay,
              currentTime: now,
            };
          }
        }
      }
      
      return { isOpen: false, nextOpening: null, currentDay, currentTime: now };
    }

    let tempClosureEnd = null;
    if (todaySchedule.comments) {
      const match = todaySchedule.comments.match(/fermée entre (\d+)h(\d+)? et (\d+)h(\d+)?/i);
      
      if (match) {
        const [, startHour, startMin, endHour, endMin] = match;
        const closureStart = parseInt(startHour) * 60 + (startMin ? parseInt(startMin) : 0);
        const closureEnd = parseInt(endHour) * 60 + (endMin ? parseInt(endMin) : 0);
        
        if (currentTime >= closureStart && currentTime <= closureEnd) {
          tempClosureEnd = closureEnd;
        }
      }
    }

    for (const slot of todaySchedule.slots) {
      if (slot.toLowerCase().includes('fermé')) {
        continue;
      }

      const [startTime, endTime] = slot.split('-').map(t => t.trim());
      const start = parseTime(startTime);
      const end = parseTime(endTime);

      if (currentTime >= start && currentTime <= end) {
        return { isOpen: true, closingTime: end, currentDay, currentTime: now };
      }
    }

    let nextOpening = null;
    const days = Object.keys(mpt.openingHours);
    const currentDayIndex = days.indexOf(currentDay);
    
    if (tempClosureEnd) {
      nextOpening = {
        day: currentDay,
        time: tempClosureEnd,
        isTemporary: true,
      };
    } else {
      for (const slot of todaySchedule.slots) {
        if (!slot.toLowerCase().includes('fermé')) {
          const [start] = slot.split('-').map(t => t.trim());
          if (parseTime(start) > currentTime) {
            nextOpening = {
              day: currentDay,
              time: parseTime(start),
              isTemporary: false,
            };
            break;
          }
        }
      }

      if (!nextOpening) {
        for (let i = 1; i <= 7; i++) {
          const nextDayIndex = (currentDayIndex + i) % 7;
          const nextDay = days[nextDayIndex];
          const nextDaySchedule = mpt.openingHours[nextDay];
          
          if (nextDaySchedule) {
            const firstSlot = nextDaySchedule.slots.find(
              slot => !slot.toLowerCase().includes('fermé')
            );
            if (firstSlot) {
              const [start] = firstSlot.split('-').map(t => t.trim());
              nextOpening = {
                day: nextDay,
                time: parseTime(start),
                isTemporary: false,
              };
              break;
            }
          }
        }
      }
    }

    return { isOpen: false, nextOpening, currentDay, currentTime: now };
  };

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      setCurrentStatus(getCurrentStatus(now));
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, [mpt]);

  if (!currentStatus) {
    return (
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const { isOpen, closingTime, nextOpening, currentDay, currentTime } = currentStatus;

  return (
    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
      {isOpen ? (
        <>
          <div className="relative w-4 h-4">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse" />
            <div className="absolute inset-0.5 bg-green-400 rounded-full animate-ping" />
          </div>
          <div>
            <p className="font-medium text-green-600">
              {currentDay} : Ouvert
              {closingTime && (
                <span className="text-sm text-gray-600 ml-2">
                  (Fermeture à {Math.floor(closingTime / 60)}h
                  {closingTime % 60 === 0 ? '' : closingTime % 60})
                </span>
              )}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="relative w-4 h-4">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse" />
            <div className="absolute inset-0.5 bg-red-400 rounded-full animate-ping" />
          </div>
          <div>
            <p className="font-medium text-red-600">
              {currentDay} : Actuellement fermé
              {nextOpening?.isTemporary &&
                ` jusqu'à ${Math.floor(nextOpening.time / 60)}h${nextOpening.time % 60 === 0 ? '' : nextOpening.time % 60}`}
            </p>
            {nextOpening && !nextOpening.isTemporary && (
              <p className="text-sm text-gray-600">
                {nextOpening.day === currentDay
                  ? `Réouverture à ${Math.floor(nextOpening.time / 60)}h${nextOpening.time % 60 === 0 ? '' : nextOpening.time % 60}`
                  : `Réouverture ${nextOpening.day.toLowerCase()} à ${Math.floor(nextOpening.time / 60)}h${nextOpening.time % 60 === 0 ? '' : nextOpening.time % 60}`}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
