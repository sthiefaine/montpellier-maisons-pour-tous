import { promises as fs } from 'fs';
import path from 'path';
import { MPT } from '@/types/maisons';
import { Activity } from '@/types/activity';
import MPTListClient from '@/app/components/(client)/Maisons/Maisons';
import MPTHeader from '@/app/components/(client)/Maisons/MPTHeader';
import { NEIGHBORHOODS } from '@/helpers/neighborhoods';

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

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function MPTPage({ searchParams }: PageProps) {
  const { mpts, activities } = await getData();

  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || '';

  const mptCount = mpts.length;

  const neighborhoodStats = NEIGHBORHOODS.map(neighborhood => {
    const mptCount = mpts.filter(mpt => neighborhood.mpts.some(m => m.name === mpt.codeMPT)).length;
    return {
      name: neighborhood.name,
      count: mptCount,
    };
  }).filter(stat => stat.count > 0);

  return (
    <>
      <MPTHeader mptCount={mptCount} />
      <MPTListClient
        mpts={mpts}
        activities={activities}
        initialSearch={search}
        stats={{
          mptCount,
          areaCount: neighborhoodStats.length,
          totalActivities: activities.length,
        }}
      />
    </>
  );
}
