import {
  MAIN_CATEGORIES,
  SUB_CATEGORIES,
  ACTIVITY_TYPE_MAPPING,
  MainCategory,
} from '@/types/categories';
import { Activity } from '@/types/activity';

/**
 * Normalise une catégorie en supprimant les espaces superflus et en uniformisant les apostrophes
 */
function normalizeCategory(category: string): string {
  return category
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[']/g, "'")
    .replace(/[’]/g, "'");
}

/**
 * Détermine la sous-catégorie appropriée pour une activité
 * en fonction de son nom et de sa catégorie principale
 */
export function determineSubCategory(activity: {
  name: string;
  category: string;
  originalCategory?: string;
}): string | null {
  const activityName = activity.name.trim().toLowerCase();
  const normalizedCategory = normalizeCategory(activity.category);
  const normalizedOriginalCategory = activity.originalCategory
    ? normalizeCategory(activity.originalCategory)
    : null;

  const normalizedMainCategories = MAIN_CATEGORIES.map(cat => normalizeCategory(cat));

  if (normalizedOriginalCategory && normalizedMainCategories.includes(normalizedOriginalCategory)) {
    const mainCategory = MAIN_CATEGORIES.find(
      cat => normalizeCategory(cat) === normalizedOriginalCategory
    ) as MainCategory;
    return determineSubCategoryByKeywords(activityName, mainCategory);
  }

  if (!normalizedMainCategories.includes(normalizedCategory)) {
    return null;
  }

  const mainCategory = MAIN_CATEGORIES.find(
    cat => normalizeCategory(cat) === normalizedCategory
  ) as MainCategory;

  return determineSubCategoryByKeywords(activityName, mainCategory);
}

/**
 * Détermine la sous-catégorie en fonction des mots-clés
 */
function determineSubCategoryByKeywords(
  activityName: string,
  mainCategory: MainCategory
): string | null {
  for (const [keyword, mapping] of Object.entries(ACTIVITY_TYPE_MAPPING)) {
    if (activityName.includes(keyword.toLowerCase()) && mapping.category === mainCategory) {
      return mapping.subCategory;
    }
  }

  switch (mainCategory) {
    case 'Activités physiques, détente':
      if (activityName.includes('yoga') || activityName.includes('meditation')) {
        return 'Yoga';
      } else if (
        activityName.includes('judo') ||
        activityName.includes('karate') ||
        activityName.includes('aikido') ||
        activityName.includes('capoeira') ||
        activityName.includes('taekwondo') ||
        activityName.includes('boxe')
      ) {
        return 'Arts martiaux';
      } else if (
        activityName.includes('gym') ||
        activityName.includes('pilates') ||
        activityName.includes('stretching')
      ) {
        return 'Gymnastique';
      } else if (
        activityName.includes('fitness') ||
        activityName.includes('cardio') ||
        activityName.includes('musculation')
      ) {
        return 'Fitness';
      } else if (
        activityName.includes('foot') ||
        activityName.includes('basket') ||
        activityName.includes('volley') ||
        activityName.includes('handball')
      ) {
        return 'Sports collectifs';
      } else if (
        activityName.includes('tennis') ||
        activityName.includes('natation') ||
        activityName.includes('athlétisme')
      ) {
        return 'Sports individuels';
      } else if (
        activityName.includes('relax') ||
        activityName.includes('bien-être') ||
        activityName.includes('massage')
      ) {
        return 'Relaxation';
      }
      break;

    case 'Langues et alphabétisation':
      if (activityName.includes('français')) {
        return 'Français';
      } else if (activityName.includes('anglais')) {
        return 'Anglais';
      } else if (activityName.includes('espagnol')) {
        return 'Espagnol';
      } else if (activityName.includes('alphabétisation')) {
        return 'Alphabétisation';
      }
      break;

    case 'Activités musicales':
      if (activityName.includes('guitare') || activityName.includes('violon')) {
        return 'Instruments à cordes';
      } else if (
        activityName.includes('flûte') ||
        activityName.includes('saxophone') ||
        activityName.includes('clarinette')
      ) {
        return 'Instruments à vent';
      } else if (activityName.includes('batterie') || activityName.includes('percussion')) {
        return 'Percussions';
      } else if (
        activityName.includes('chant') ||
        activityName.includes('voix') ||
        activityName.includes('chorale')
      ) {
        return 'Chant';
      } else if (activityName.includes('éveil musical')) {
        return 'Éveil musical';
      }
      break;

    case 'Danse':
      if (activityName.includes('classique')) {
        return 'Danse classique';
      } else if (activityName.includes('contemporain')) {
        return 'Danse contemporaine';
      } else if (
        activityName.includes('salon') ||
        activityName.includes('tango') ||
        activityName.includes('valse')
      ) {
        return 'Danses de salon';
      } else if (activityName.includes('hip-hop') || activityName.includes('street')) {
        return 'Danses urbaines';
      } else if (
        activityName.includes('oriental') ||
        activityName.includes('africain') ||
        activityName.includes('flamenco')
      ) {
        return 'Danses du monde';
      } else if (activityName.includes('éveil')) {
        return 'Éveil à la danse';
      }
      break;

    case 'Activités artistiques':
      if (activityName.includes('peinture')) {
        return 'Peinture';
      }
      break;

    case 'Littérature et société, théâtre et cirque':
      if (activityName.includes('théâtre')) {
        return 'Théâtre';
      }
      break;

    case 'Loisirs':
      if (activityName.includes('jeux')) {
        return 'Jeux de société';
      }
      break;

    case "Technologie de l'information, sciences et divers":
      if (activityName.includes('informatique')) {
        return 'Informatique, internet et EPI';
      }
      break;
  }

  return SUB_CATEGORIES[mainCategory].slice(-1)[0];
}

/**
 * Catégorise une liste d'activités en attribuant des sous-catégories appropriées
 */
export function categorizeActivities(activities: Activity[]): Activity[] {
  return activities
    .filter(activity => {
      const name = activity.name.toLowerCase();
      const category = activity.category.toLowerCase();
      if (
        name === 'libelleactivité' ||
        category === 'libelletheme1' ||
        name === 'nomactivité' ||
        category === 'nomtheme'
      ) {
        return false;
      }
      return true;
    })
    .map(activity => {
      if (activity.originalCategory && activity.originalSubCategory) {
        const normalizedOriginalCategory = normalizeCategory(activity.originalCategory);
        const normalizedMainCategories = MAIN_CATEGORIES.map(cat => normalizeCategory(cat));

        if (normalizedMainCategories.includes(normalizedOriginalCategory)) {
          const mainCategory = MAIN_CATEGORIES.find(
            cat => normalizeCategory(cat) === normalizedOriginalCategory
          ) as MainCategory;

          if (SUB_CATEGORIES[mainCategory].includes(activity.originalSubCategory)) {
            return {
              ...activity,
              category: mainCategory,
              subCategory: activity.originalSubCategory,
            };
          }
        }
      }

      const subCategory = determineSubCategory(activity);

      if (subCategory === null) {
        return null;
      }

      return {
        ...activity,
        subCategory,
      };
    })
    .filter((activity): activity is Activity => activity !== null);
}

/**
 * Génère un tableau de statistiques des activités par catégorie et sous-catégorie
 */
export function generateCategoryStats(activities: Activity[]) {
  const stats: Record<string, Record<string, number>> = {};

  MAIN_CATEGORIES.forEach(category => {
    stats[category] = {};
    SUB_CATEGORIES[category].forEach(subCategory => {
      stats[category][subCategory] = 0;
    });
  });

  activities.forEach(activity => {
    const mainCategory = activity.category as MainCategory;
    const subCategory = activity.subCategory || 'Autre';

    if (stats[mainCategory] && stats[mainCategory][subCategory] !== undefined) {
      stats[mainCategory][subCategory]++;
    } else if (stats[mainCategory]) {
      stats[mainCategory]['Autre'] = (stats[mainCategory]['Autre'] || 0) + 1;
    }
  });

  return stats;
}
