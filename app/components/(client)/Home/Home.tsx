'use client';

import React from 'react';
import { MPT, Activity, StatisticsType } from '@/types';
import CategorySection from '../../HomepageClient/CategorySection';
import FeaturedMPTs from '../../HomepageClient/FeaturedMPTs';
import FeaturedActivities from '@/app/components/FeaturedActivities/FeaturedActivities';
import HeroSection from '../../HomepageClient/HeroSection';

type HomeClientProps = {
  mpts: MPT[];
  activities: Activity[];
  featuredMPTs: MPT[];
  featuredActivities: Activity[];
  activitiesByCategory: Record<string, Activity[]>;
  statistics: StatisticsType;
  groupedActivities: Activity[];
};

export default function HomeClient({
  activities,
  featuredMPTs,
  activitiesByCategory,
  statistics,
  groupedActivities,
}: HomeClientProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection statistics={statistics} />

      <div className="container mx-auto px-4 py-12">
        <CategorySection activities={activities} activitiesByCategory={activitiesByCategory} />

        <FeaturedMPTs featuredMPTs={featuredMPTs} activities={activities} />

        <FeaturedActivities groupedActivities={groupedActivities} />
      </div>
    </div>
  );
}
