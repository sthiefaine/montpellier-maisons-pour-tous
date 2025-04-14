'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Activity } from '@/types/activity';
import ActivityCard from '@/app/components/Cards/Activity/Activity';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface FeaturedActivitiesProps {
  groupedActivities: Activity[];
  title?: string;
  subtitle?: string;
  maxItems?: number;
}

export default function FeaturedActivities({
  groupedActivities,
  title = 'Découvrez nos activités',
  subtitle = "Explorez notre sélection d'activités populaires",
  maxItems = 50,
}: FeaturedActivitiesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const filteredActivities = useMemo(() => {
    const shuffled = [...groupedActivities].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, maxItems);
  }, [groupedActivities, maxItems]);

  useEffect(() => {
    const updateDimensions = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const scrollWidth = scrollContainerRef.current.scrollWidth;

        setMaxScroll(Math.max(0, scrollWidth - containerWidth));

        if (window.innerWidth < 640) {
          setCardWidth(260);
        } else if (window.innerWidth < 1024) {
          setCardWidth(280);
        } else {
          setCardWidth(300);
        }
      }
    };

    setScrollPosition(0);

    setTimeout(updateDimensions, 100);

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [filteredActivities]);

  useEffect(() => {
    if (!autoScrollEnabled || maxScroll <= 0) return;

    const interval = setInterval(() => {
      setScrollPosition(prev => {
        const nextPosition = prev + cardWidth + 16;
        return nextPosition > maxScroll ? 0 : nextPosition;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [maxScroll, autoScrollEnabled, cardWidth]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [scrollPosition]);

  const scrollPrev = () => {
    setScrollPosition(prev => {
      const newPosition = prev - (cardWidth + 16);
      return Math.max(0, newPosition);
    });
  };

  const scrollNext = () => {
    setScrollPosition(prev => {
      const newPosition = prev + (cardWidth + 16);
      return Math.min(maxScroll, newPosition);
    });
  };

  return (
    <section className="py-14 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-500">{subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={scrollPrev}
                disabled={scrollPosition === 0}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Précédent"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={scrollNext}
                disabled={scrollPosition >= maxScroll}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Suivant"
              >
                <ArrowRightIcon className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative mx-auto"
          onMouseEnter={() => setAutoScrollEnabled(false)}
          onMouseLeave={() => setAutoScrollEnabled(true)}
        >
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredActivities.length > 0 ? (
              filteredActivities.map(activity => (
                <div
                  key={activity.id}
                  className="snap-start flex-none px-2 first:pl-4 last:pr-4"
                  style={{ width: `${cardWidth}px`, height: `200px` }}
                >
                  <div className="h-full">
                    <ActivityCard activity={activity} />
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full py-10 text-center text-gray-500">
                Aucune activité trouvée dans cette catégorie.
              </div>
            )}
          </div>

          <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 max-w-2xl mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden flex-grow">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{
                width: `${maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
