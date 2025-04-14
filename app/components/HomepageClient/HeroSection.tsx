'use client';

import React, { useState, useEffect } from 'react';
import { StatisticsType } from '@/types';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface HeroSectionProps {
  statistics: StatisticsType;
}

const SimpleNumberAnimation = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const duration = 1000;

  useEffect(() => {
    let startValue = 0;
    const endValue = Number(value);
    const startTime = Date.now();

    const updateValue = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        setDisplayValue(Math.floor(startValue + progress * (endValue - startValue)));
        requestAnimationFrame(updateValue);
      } else {
        setDisplayValue(endValue);
      }
    };

    requestAnimationFrame(updateValue);

    return () => {
      setDisplayValue(endValue);
    };
  }, [value, duration]);

  return <>{displayValue}</>;
};

const SUBTITLES = [
  (count: React.ReactNode) => (
    <>Découvrez l&apos;activité faite pour vous parmi {count} possibilités.</>
  ),
  (count: React.ReactNode) => <>Trouvez ce qui vous fait vibrer parmi nos {count} activités !</>,
  (count: React.ReactNode) => <>Parmi {count} activités, il y en a forcément une pour vous.</>,
  (count: React.ReactNode) => (
    <>Explorez plus de {count} activités et trouvez celle qui vous correspond parfaitement.</>
  ),
  (count: React.ReactNode) => <>{count} façons de bouger, créer, respirer... Trouvez la vôtre.</>,
  (count: React.ReactNode) => <>Choisissez parmi {count} activités celle qui vous ressemble.</>,
];

export default function HeroSection({ statistics }: HeroSectionProps) {
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentSubtitle(prev => (prev + 1) % SUBTITLES.length);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="relative inset-0">
        <div className="inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Découvrez les <SimpleNumberAnimation value={statistics.totalMPTs} /> Maisons Pour Tous
            de Montpellier
          </h1>
          <div className="h-16 mb-8">
            {' '}
            <p
              className={`text-xl text-blue-100 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              {SUBTITLES[currentSubtitle](
                <SimpleNumberAnimation value={statistics.uniqueActivities} />
              )}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/maisons-pour-tous"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Explorer les Maisons
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/activites"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Voir les activités
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
