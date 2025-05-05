"use server"
import { promises as fs } from 'fs';
import path from 'path';
import { MAIN_CATEGORIES } from '@/types/categories';
import { groupSimilarActivities } from '@/lib/utils/activity';
import { Activity } from '@/types/activity';
import { MPT } from '@/types/maisons';
import HeroSection from './components/HomepageClient/HeroSection';
import MapSection from './components/HomepageClient/MapSection';
import GuideSection from './components/HomepageClient/GuideSection';
import CategorySection from './components/HomepageClient/CategorySection';
import FeaturedMPTs from './components/HomepageClient/FeaturedMPTs';
import FeaturedActivities from './components/FeaturedActivities/FeaturedActivities';
import InfoSection from './components/HomepageClient/InfoSection';
import HowItWorksSection from './components/HomepageClient/HowItWorksSection';
import { cache } from 'react';


const getStatistics = cache(function getStatistics(mpts: MPT[], activities: Activity[]) {
  const uniquePublics = new Set(activities.map(activity => activity.public).filter(Boolean));
  const uniqueSubCategories = new Set(
    activities.map(activity => activity.subCategory).filter(Boolean)
  );

  const activitiesByCategory: Record<string, number> = {};
  MAIN_CATEGORIES.forEach(category => {
    activitiesByCategory[category] = activities.filter(a => a.category === category).length;
  });

  const mptsByArea: Record<string, number> = {};
  mpts.forEach(mpt => {
    const addressParts = mpt.address.split(' ');
    const postalCode = addressParts.find(part => /^\d{5}$/.test(part));
    if (postalCode) {
      const area = postalCode.substring(0, 3);
      mptsByArea[area] = (mptsByArea[area] || 0) + 1;
    }
  });

  return {
    totalMPTs: mpts.length,
    totalActivities: activities.length,
    uniqueActivities: groupSimilarActivities(activities).length,
    uniquePublics: uniquePublics.size,
    uniqueSubCategories: uniqueSubCategories.size,
    activitiesByCategory,
    mptsByArea,
  };
});

const getData = cache(async function getData(): Promise<{ mpts: MPT[]; activities: Activity[] }> {
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

export default async function Home() {
  const { mpts, activities } = await getData();
  const statistics = getStatistics(mpts, activities);

  const groupedActivities = groupSimilarActivities(activities);

  const featuredMPTs = [...mpts]
    .sort((a, b) => b.activities.length - a.activities.length)
    .slice(0, 6);

  const maxActivities = 8;
  const randomActivities = groupedActivities
    .sort(() => Math.random() - 0.5)
    .slice(0, maxActivities);

  const activitiesByCategory: Record<string, Activity[]> = {};
  MAIN_CATEGORIES.forEach(category => {
    const categoryActivities = activities.filter(activity => activity.category === category);

    const groupedCategoryActivities = groupSimilarActivities(categoryActivities);

    activitiesByCategory[category] = groupedCategoryActivities.slice(0, 4);
  });

  return (
    <div className="bg-gray-50">
      <HeroSection statistics={statistics} />
      <MapSection />
      <GuideSection />
      <HowItWorksSection statistics={statistics} />
      <CategorySection activities={activities} activitiesByCategory={activitiesByCategory} />
      <FeaturedMPTs featuredMPTs={featuredMPTs} activities={activities} />
      <FeaturedActivities groupedActivities={randomActivities} />
      <InfoSection />
    </div>
  );
}
