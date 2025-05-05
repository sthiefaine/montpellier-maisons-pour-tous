import { promises as fs } from 'fs';
import path from 'path';
import { MPT } from '@/types/maisons';
import { Activity } from '@/types/activity';
import { MAIN_CATEGORIES } from '@/types/categories';
import ActivitiesListClient from '@/app/components/(client)/Activites/Activities';
import { cache } from 'react';

interface ActivitiesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    subcategory?: string;
    public?: string;
    mpt?: string;
    level?: string;
    day?: string;
  }>;
}

const getData = cache(async (): Promise<{ mpts: MPT[]; activities: Activity[] }> => {
  try {
    const mptData = await fs.readFile(path.join(process.cwd(), 'data/mpt.json'), 'utf8');
    const activitiesData = await fs.readFile(
      path.join(process.cwd(), 'data/activities.json'),
      'utf8'
    );

    return {
      mpts: JSON.parse(mptData),
      activities: JSON.parse(activitiesData),
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return {
      mpts: [],
      activities: [],
    };
  }
});

export const revalidate = 3600; // TODO update with tag when API is ready

export default async function ActivitiesPage({ searchParams }: ActivitiesPageProps) {
  const params = await searchParams;
  const { mpts, activities } = await getData();

  const preFilteredActivities = activities.filter(activity => {
    if (params.category && activity.category !== params.category) return false;
    if (params.subcategory && activity.subCategory !== params.subcategory) return false;
    if (params.mpt && activity.mptId !== params.mpt) return false;
    return true;
  });

  const subCategoriesByCategory: Record<string, string[]> = {};
  MAIN_CATEGORIES.forEach(category => {
    const subCategories = Array.from(
      new Set(
        activities
          .filter((activity: Activity) => activity.category === category)
          .map((activity: Activity) => activity.subCategory)
      )
    ).filter(Boolean) as string[];

    subCategoriesByCategory[category] = subCategories;
  });

  const allPublics = Array.from(
    new Set(activities.map((activity: Activity) => activity.public).filter(Boolean))
  ) as string[];

  const allLevels = ['débutant', 'intermédiaire', 'confirmé', 'tous niveaux'];

  const allDays = Array.from(
    new Set(
      activities
        .filter((activity: Activity) => activity.schedule?.day)
        .map((activity: Activity) => activity.schedule?.day)
        .filter(Boolean)
    )
  ) as string[];

  return (
    <ActivitiesListClient
      mpts={mpts}
      activities={preFilteredActivities}
      subCategoriesByCategory={subCategoriesByCategory}
      allPublics={allPublics}
      allLevels={allLevels}
      allDays={allDays}
      initialSearchParams={{
        search: params.search || '',
        category: params.category || '',
        subcategory: params.subcategory || '',
        public: params.public || '',
        mpt: params.mpt || '',
        level: params.level || '',
        day: params.day || '',
      }}
    />
  );
}