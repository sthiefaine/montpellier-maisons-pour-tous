import { promises as fs } from 'fs';
import path from 'path';
import { MPT } from '@/types/maisons';
import { Activity } from '@/types/activity';
import { notFound } from 'next/navigation';
import ActivitiesListClient from '@/app/components/(client)/Activites/Activities';
import ActivitiesSkeleton from '@/app/components/(client)/Activites/ActivitiesSkeleton';
import { MAIN_CATEGORIES } from '@/types/categories';
import { Informations } from '@/app/components/(client)/Maisons/Informations/Informations';
import LocalisationTabs from '@/app/components/Localisation/LocalisationTabs';
import MPTHeader from '@/app/components/(client)/Maisons/MPTHeader';
import { cache, Suspense } from 'react';

interface MPTPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getMapStyle = cache(async () => {
  const data = await fs.readFile(path.join(process.cwd(), 'data/map/style.json'), 'utf8');
  return JSON.parse(data) as maplibregl.StyleSpecification;
});

async function getData(): Promise<{ mpts: MPT[]; activities: Activity[] }> {
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
}

export default async function MPTPage({ params }: MPTPageProps) {
  const { mpts, activities } = await getData();
  const mapStyle = await getMapStyle();
  const resolvedParams = await params;
  const mpt = mpts.find(m => m.slug === resolvedParams.slug);

  if (!mpt) {
    notFound();
  }

  const mptActivities = activities.filter(activity => activity.mptId === mpt.id);

  const subCategoriesByCategory: Record<string, string[]> = {};
  MAIN_CATEGORIES.forEach(category => {
    const subCategories = Array.from(
      new Set(
        mptActivities
          .filter(activity => activity.category === category)
          .map(activity => activity.subCategory)
      )
    ).filter(Boolean) as string[];

    subCategoriesByCategory[category] = subCategories;
  });

  const allPublics = Array.from(
    new Set(mptActivities.map(activity => activity.public).filter(Boolean))
  ) as string[];

  const allLevels = ['débutant', 'intermédiaire', 'confirmé', 'tous niveaux'];

  const allDays = Array.from(
    new Set(
      mptActivities
        .filter(activity => activity.schedule?.day)
        .map(activity => activity.schedule?.day)
        .filter(Boolean)
    )
  ) as string[];

  return (
    <>
      <MPTHeader mpt={mpt} activitiesCount={mptActivities.length} isDetailPage />
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Informations mpt={mpt} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <LocalisationTabs mpt={mpt} mapStyle={mapStyle} />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Activités proposées</h2>
          <Suspense fallback={<ActivitiesSkeleton />}>
            <ActivitiesListClient
              mpts={[mpt]}
              activities={mptActivities}
              subCategoriesByCategory={subCategoriesByCategory}
              allPublics={allPublics}
              allLevels={allLevels}
              allDays={allDays}
              initialSearchParams={{
                search: '',
                category: '',
                subcategory: '',
                public: '',
                mpt: mpt.id,
                level: '',
                day: '',
              }}
              hideHeader={true}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
