'use client';

import React from 'react';
import Link from 'next/link';
import { Activity } from '@/types/activity';

import {
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import Badge from '@/app/components/Badge/Badge';
type ActivityCardProps = {
  activity: Activity & {
    multipleSchedules?: Activity['schedule'][];
  };
  showMPT?: boolean;
};

export default function ActivityCard({ activity, showMPT = true }: ActivityCardProps) {
  // Vérifier si l'activité a plusieurs horaires
  const hasMultipleSchedules = activity.multipleSchedules && activity.multipleSchedules.length > 1;

  // Obtenir les jours uniques si multiple schedules avec leurs horaires
  const getDaySchedules = () => {
    if (!hasMultipleSchedules || !activity.multipleSchedules) return {};

    const daySchedules: Record<string, Activity['schedule'][]> = {};

    activity.multipleSchedules.forEach(schedule => {
      if (schedule && schedule.day) {
        if (!daySchedules[schedule.day]) {
          daySchedules[schedule.day] = [];
        }
        daySchedules[schedule.day].push(schedule);
      }
    });

    return daySchedules;
  };

  const daySchedules = getDaySchedules();
  const uniqueDays = Object.keys(daySchedules);

  // Fonction pour obtenir l'abréviation du jour
  const getDayAbbreviation = (day: string): string => {
    const dayMap: Record<string, string> = {
      lundi: 'LUN',
      mardi: 'MAR',
      mercredi: 'MER',
      jeudi: 'JEU',
      vendredi: 'VEN',
      samedi: 'SAM',
      dimanche: 'DIM',
    };

    return dayMap[day.toLowerCase()] || day.substring(0, 3).toUpperCase();
  };

  // Fonction pour formater l'heure (supprime les minutes si elles sont égales à 00)
  const formatHour = (time: string): string => {
    if (!time) return '';

    // Normaliser le format d'heure
    const normalizedTime = time.replace(/:/g, 'h');

    // Si le format est HHhMM
    if (normalizedTime.includes('h')) {
      const [hours, minutes] = normalizedTime.split('h');
      return minutes === '00' ? `${hours}h` : normalizedTime;
    }

    return time;
  };

  // Fonction pour formater les horaires d'un jour
  const formatDaySchedules = (schedules: Activity['schedule'][]) => {
    if (!schedules || schedules.length === 0) return '';

    return schedules
      .map(schedule => {
        if (!schedule) return '';

        const startTime = schedule.startTime ? formatHour(schedule.startTime) : '';
        const endTime = schedule.endTime ? formatHour(schedule.endTime) : '';

        if (startTime && endTime) {
          return `${startTime} à ${endTime}`;
        } else if (startTime) {
          return `à partir de ${startTime}`;
        }
        return '';
      })
      .filter(Boolean)
      .join(' / ');
  };

  return (
    <div className="relative h-full">
      <Link
        href={`/activites/${activity.id}`}
        className="block h-full transition-all duration-300 hover:-translate-y-1 focus:outline-none"
      >
        <div className="rounded-xl overflow-hidden h-full flex flex-col bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="pt-3 pb-2 px-4 flex justify-between items-start bg-gradient-to-r from-gray-50 to-white">
            <div className="flex-grow min-w-0">
              <h3 className="font-semibold text-sm text-gray-900 truncate first-letter:uppercase pr-4">
                {activity.name}
              </h3>

              {showMPT && activity.mptName && (
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  <HomeIcon className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span className="truncate first-letter:uppercase">{activity.mptName}</span>
                </div>
              )}
            </div>

            <div
              onClick={e => e.stopPropagation()}
              className="flex-shrink-0 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <div className="p-1.5 text-xs rounded-full hover:bg-indigo-50 transition-colors">
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          <div className="max-h-[42px] px-4 pb-3 pt-1 flex flex-col">
            <div className="flex items-center flex-wrap gap-1.5 mb-2">
              <Badge type="category" value={activity.category} className="truncate w-fit">
                {activity.category}
              </Badge>
              {activity.subCategory && (
                <Badge type="subcategory" value={activity.subCategory} className="truncate w-fit">
                  {activity.subCategory}
                </Badge>
              )}
            </div>

            <div className="flex items-center flex-wrap gap-1.5">
              {activity.public && (
                <Badge type="public" value={activity.public} className="truncate w-fit">
                  <UserGroupIcon className="h-3 w-3 mr-0.5 flex-shrink-0" />
                  <span className="truncate">{activity.public}</span>
                </Badge>
              )}

              {activity.level && (
                <Badge type="level" value={activity.level.value} className="truncate w-fit">
                  <AcademicCapIcon className="h-3 w-3 mr-0.5 flex-shrink-0" />
                  <span className="truncate">{activity.level.value}</span>
                </Badge>
              )}
            </div>

            <div className="mt-2">
              {hasMultipleSchedules ? (
                uniqueDays.length > 1 ? (
                  <div>
                    <div className="flex items-center mb-2 text-xs text-gray-700 font-medium">
                      <CalendarDaysIcon className="h-3.5 w-3.5 mr-1 flex-shrink-0" />

                      <div className="flex flex-wrap gap-1.5">
                        {Object.keys(daySchedules).map(day => (
                          <div
                            key={day}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                          >
                            {getDayAbbreviation(day)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Cas avec un seul jour, mais plusieurs horaires
                  <div>
                    {Object.entries(daySchedules).map(([day, schedules]) => (
                      <div key={day} className="flex items-center text-xs text-gray-600">
                        <CalendarDaysIcon className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                        <div className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-md font-medium mr-1.5 flex-shrink-0">
                          {getDayAbbreviation(day)}
                        </div>
                        <span className="truncate">{formatDaySchedules(schedules)}</span>
                      </div>
                    ))}
                  </div>
                )
              ) : activity.schedule ? (
                // Cas avec un seul horaire
                <div className="flex items-center text-xs text-gray-600">
                  <CalendarDaysIcon className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  {activity.schedule.day && (
                    <div className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-md font-medium mr-1.5 flex-shrink-0">
                      {getDayAbbreviation(activity.schedule.day)}
                    </div>
                  )}
                  <span className="truncate">
                    {activity.schedule.startTime && activity.schedule.endTime
                      ? `${formatHour(
                          activity.schedule.startTime
                        )} à ${formatHour(activity.schedule.endTime)}`
                      : activity.schedule.startTime
                        ? `à partir de ${formatHour(activity.schedule.startTime)}`
                        : 'Horaire non spécifié'}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
