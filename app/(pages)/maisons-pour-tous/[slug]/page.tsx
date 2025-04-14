import { promises as fs } from 'fs';
import path from 'path';
import { MPT } from '@/types/maisons';
import { Activity } from '@/types/activity';
import { notFound } from 'next/navigation';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import ActivitiesListClient from '@/app/components/(client)/Activites/Activities';
import { MAIN_CATEGORIES } from '@/types/categories';

interface MPTPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{mpt.name}</h1>
              <p className="text-blue-100 text-lg font-medium mb-4">
                {mptActivities.length} activité
                {mptActivities.length !== 1 ? 's' : ''} disponible
                {mptActivities.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="flex space-x-2 text-sm">
              <Link href="/" className="text-white hover:text-blue-200 transition-colors">
                Accueil
              </Link>
              <span className="text-blue-300">/</span>
              <Link
                href="/maisons-pour-tous"
                className="text-white hover:text-blue-200 transition-colors"
              >
                Maisons Pour Tous
              </Link>
              <span className="text-blue-300">/</span>
              <span className="font-medium">{mpt.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Informations</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPinIcon className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Adresse</p>
                  <p className="text-gray-600">{mpt.address}</p>
                </div>
              </div>

              {mpt.phone && (
                <div className="flex items-start">
                  <PhoneIcon className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Téléphone</p>
                    <p className="text-gray-600">{mpt.phone}</p>
                  </div>
                </div>
              )}

              {mpt.email && (
                <div className="flex items-start">
                  <EnvelopeIcon className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{mpt.email}</p>
                  </div>
                </div>
              )}

              {mpt.openingHours && (
                <div className="flex items-start">
                  <ClockIcon className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Horaires d'ouverture</p>
                    <div className="text-gray-600">
                      {Object.entries(mpt.openingHours).map(([day, schedule]) => (
                        <p key={day} className="mb-1">
                          <span className="font-medium">{day}:</span> {schedule.slots.join(', ')}
                          {schedule.comments && ` (${schedule.comments})`}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Localisation</h2>
            <div className="aspect-w-16 aspect-h-9"></div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Activités proposées</h2>
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
        </div>
      </div>
    </>
  );
}
