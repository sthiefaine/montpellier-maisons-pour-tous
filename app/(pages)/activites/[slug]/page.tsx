import { promises as fs } from 'fs';
import path from 'path';
import { Activity } from '@/types/activity';
import { MPT } from '@/types/maisons';
import { notFound } from 'next/navigation';
import {
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  TrophyIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Badge from '@/app/components/Badge/Badge';
import FeaturedActivities from '@/app/components/FeaturedActivities/FeaturedActivities';

interface ActivityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getData(): Promise<{ activities: Activity[]; mpts: MPT[] }> {
  try {
    const activitiesData = await fs.readFile(
      path.join(process.cwd(), 'data/activities.json'),
      'utf8'
    );
    const mptData = await fs.readFile(path.join(process.cwd(), 'data/mpt.json'), 'utf8');
    return {
      activities: JSON.parse(activitiesData),
      mpts: JSON.parse(mptData),
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return {
      activities: [],
      mpts: [],
    };
  }
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { activities, mpts } = await getData();
  const slug = (await params).slug;
  const activity = activities.find(a => a.id === slug);

  if (!activity) {
    notFound();
  }

  const mpt = mpts.find(m => m.id === activity.mptId);

  const similarActivities = activities
    .filter(a => a.id !== activity.id) // Exclure l'activité actuelle
    .map(a => {
      let score = 0;

      if (a.category === activity.category) {
        score += 3;
      }

      if (a.subCategory === activity.subCategory) {
        score += 2;
      }

      if (a.mptId === activity.mptId) {
        score += 2;
      }

      if (a.public === activity.public) {
        score += 1;
      }

      if (a.level?.value === activity.level?.value) {
        score += 1;
      }

      if (
        a.age?.min === activity.age?.min ||
        a.age?.max === activity.age?.max ||
        a.age?.text === activity.age?.text
      ) {
        score += 1;
      }

      return { ...a, score };
    })
    .filter(a => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{activity.name}</h1>
              <p className="text-blue-100 text-lg font-medium">{mpt?.name}</p>
            </div>
            <div className="flex space-x-2 text-sm">
              <Link 
                href="/" 
                className="bg-white/60 hover:bg-white/80 text-blue-900 px-3 py-1 rounded transition-colors"
              >
                Accueil
              </Link>
              <span className="text-blue-200">/</span>
              <Link
                href="/activites"
                className="bg-white/60 hover:bg-white/80 text-blue-900 px-3 py-1 rounded transition-colors"
              >
                Activités
              </Link>
              <span className="text-blue-200">/</span>
              <span className="bg-blue-900/80 text-white px-3 py-1 rounded font-medium">
                {activity.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Localisation</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{mpt?.name}</p>
                    <p className="text-gray-600">{mpt?.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Informations</h2>
              <div className="space-y-4">
                {activity.schedule && (
                  <div className="flex items-start">
                    <ClockIcon className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Horaires</p>
                      <div className="mt-1">
                        <div className="inline-flex flex-row flex-nowrap items-center text-sm px-3 py-1 rounded-full border bg-purple-100 text-purple-800 border-purple-200">
                          <span className="font-medium">{activity.schedule.day}</span>
                          {activity.schedule.startTime && (
                            <span className="ml-2">
                              de {activity.schedule.startTime}
                              {activity.schedule.endTime && ` à ${activity.schedule.endTime}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activity.multipleSchedules && activity.multipleSchedules.length > 0 && (
                  <div className="flex items-start">
                    <ClockIcon className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Horaires multiples</p>
                      <div className="mt-1 space-y-1">
                        {activity.multipleSchedules.map((schedule, index) => (
                          <div
                            key={index}
                            className="inline-flex flex-row flex-nowrap items-center text-sm px-3 py-1 rounded-full border bg-purple-100 text-purple-800 border-purple-200"
                          >
                            <span className="font-medium">{schedule.day}</span>
                            {schedule.startTime && (
                              <span className="ml-2">
                                de {schedule.startTime}
                                {schedule.endTime && ` à ${schedule.endTime}`}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activity.public && (
                  <div className="flex items-start">
                    <UserGroupIcon className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Public</p>
                      <div className="mt-1">
                        <div className="inline-flex flex-row flex-nowrap items-center text-sm px-3 py-1 rounded-full border bg-green-100 text-green-800 border-green-200">
                          <span className="font-medium">{activity.public}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activity.age && Object.keys(activity.age).length > 0 && (
                  <div className="flex items-start">
                    <UserGroupIcon className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Âge</p>
                      <div className="mt-1">
                        {activity.age.text ? (
                          <div className="inline-flex flex-row flex-nowrap items-center text-sm px-3 py-1 rounded-full border bg-green-100 text-green-800 border-green-200">
                            <span className="font-medium">{activity.age.text}</span>
                          </div>
                        ) : (
                          <div className="inline-flex flex-row flex-nowrap items-center text-sm px-3 py-1 rounded-full border bg-green-100 text-green-800 border-green-200">
                            <span className="font-medium">
                              {activity.age.min ? `À partir de ${activity.age.min} ans` : ''}
                              {activity.age.max
                                ? (activity.age.min ? " jusqu'à " : "Jusqu'à ") +
                                  `${activity.age.max} ans`
                                : ''}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activity.level && (
                  <div className="flex items-start">
                    <TrophyIcon className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Niveau</p>
                      <div className="mt-1">
                        <div className="inline-flex flex-row flex-nowrap items-center text-sm px-3 py-1 rounded-full border bg-amber-100 text-amber-800 border-amber-200">
                          <span className="font-medium">{activity.level.value}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activity.price && (
                  <div className="flex items-start">
                    <CreditCardIcon className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Tarif</p>
                      <p className="text-gray-600">{activity.price}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <div className="prose max-w-none">
              <div className="flex gap-2 mb-4">
                <Badge type="category" value={activity.category} />
                <Badge type="subcategory" value={activity.subCategory} />
              </div>
              <p className="text-gray-600">
                {activity.category} - {activity.subCategory}
              </p>
            </div>
          </div>
        </div>

        {similarActivities.length > 0 && (
          <div className="mt-16 overscroll-x-contain">
            <FeaturedActivities
              groupedActivities={similarActivities}
              title="Ces activités pourraient vous plaire"
              subtitle="Découvrez d'autres activités similaires"
              maxItems={6}
            />
          </div>
        )}

        <div className="mt-8">
          <div className="flex space-x-2 text-sm">
            <Link 
              href="/" 
              className="bg-white/60 hover:bg-white/80 text-blue-900 px-3 py-1 rounded transition-colors"
            >
              Accueil
            </Link>
            <span className="text-blue-200">/</span>
            <Link
              href="/activites"
              className="bg-white/60 hover:bg-white/80 text-blue-900 px-3 py-1 rounded transition-colors"
            >
              Activités
            </Link>
            <span className="text-blue-200">/</span>
            <span className="bg-blue-900/80 text-white px-3 py-1 rounded font-medium">{activity.name}</span>
          </div>
        </div>
      </div>
    </>
  );
}
