import { Activity } from '@/types/activity';

/**
 * Groupe les activités similaires pour éviter les doublons visuels
 * (même activité, même MPT, mais jours différents)
 */
export function groupSimilarActivities(
  activities: Activity[]
): (Activity & { multipleSchedules?: Activity['schedule'][] })[] {
  const groupedMap = new Map<string, Activity[]>();

  activities.forEach(activity => {
    const key = `${activity.name.toLowerCase().trim()}_${activity.mptId}`;

    if (!groupedMap.has(key)) {
      groupedMap.set(key, []);
    }

    groupedMap.get(key)?.push(activity);
  });

  const consolidatedActivities: (Activity & {
    multipleSchedules?: Activity['schedule'][];
  })[] = [];

  groupedMap.forEach(group => {
    if (group.length === 1) {
      consolidatedActivities.push(group[0]);
    } else {
      const base = group[0];

      const schedules = group
        .map(a => a.schedule)
        .filter(
          (schedule): schedule is NonNullable<Activity['schedule']> =>
            schedule !== undefined && schedule !== null && typeof schedule === 'object'
        );

      const dayOrder = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

      schedules.sort((a, b) => {
        const dayA = a.day || '';
        const dayB = b.day || '';
        return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
      });

      const consolidatedActivity: Activity & { multipleSchedules?: Activity['schedule'][] } = {
        ...base,
        multipleSchedules: schedules,
      };

      consolidatedActivities.push(consolidatedActivity);
    }
  });

  return consolidatedActivities;
}

/**
 * Compter le nombre total d'activités uniques
 * (après regroupement des activités similaires)
 */
export function countUniqueActivities(activities: Activity[]): number {
  return groupSimilarActivities(activities).length;
}

/**
 * Obtenir les statistiques des activités par catégorie
 */
export function getActivityStatsByCategory(activities: Activity[]): Record<string, number> {
  const stats: Record<string, number> = {};

  activities.forEach(activity => {
    const category = activity.category;
    stats[category] = (stats[category] || 0) + 1;
  });

  return stats;
}

/**
 * Obtenir la liste des types de public disponibles
 */
export function getAvailablePublics(activities: Activity[]): string[] {
  return Array.from(
    new Set(activities.map(activity => activity.public).filter(Boolean) as string[])
  ).sort();
}

/**
 * Obtenir la liste des jours où des activités sont proposées
 */
export function getAvailableDays(activities: Activity[]): string[] {
  const dayOrder = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const days = Array.from(
    new Set(activities.map(activity => activity.schedule?.day).filter(Boolean) as string[])
  );

  return days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
}
