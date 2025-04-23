'use client';

import React, { useEffect, useState } from 'react';
import { MPT } from '@/types/maisons';
import { Activity } from '@/types/activity';
import SearchBar from '@/app/components/SearchBar/SearchBar';

let globalData: { mpts: MPT[]; activities: Activity[] } | null = null;

export default function SubHeader() {
  const [data, setData] = useState<{ mpts: MPT[]; activities: Activity[] } | null>(globalData);
  const [isLoading, setIsLoading] = useState(!globalData);

  useEffect(() => {
    if (!globalData) {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/data');
          const result = await response.json();
          globalData = result;
          setData(result);
        } catch (error) {
          console.error('Erreur lors du chargement des données:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-2xl h-10 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-[50px] z-30 bg-white shadow-sm">
      <div className="container mx-auto max-w-6xl px-4 py-3">
        <div className="relative">
          <SearchBar mpts={data?.mpts || []} activities={data?.activities || []} />
        </div>
      </div>
    </div>
  );
}
