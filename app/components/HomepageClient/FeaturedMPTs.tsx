'use client';

import React from 'react';
import Link from 'next/link';
import { MPT } from '@/types/maisons';
import { Activity } from '@/types/activity';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import MPTCard from '@/app/components/Cards/Maisons/Maisons';

interface FeaturedMPTsProps {
  featuredMPTs: MPT[];
  activities: Activity[];
}

export default function FeaturedMPTs({ featuredMPTs, activities }: FeaturedMPTsProps) {
  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Maisons Pour Tous populaires
          </h2>
          <Link
            href="/mpt"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <span>Toutes les maisons</span>
            <ChevronRightIcon className="h-5 w-5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMPTs.map(mpt => (
            <div key={mpt.id}>
              <MPTCard mpt={mpt} activities={activities} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
