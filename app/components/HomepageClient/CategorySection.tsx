'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity } from '@/types/activity';
import { MAIN_CATEGORIES } from '@/types/categories';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import CategoryIcon from '@/app/components/Icons/Category/Category';
import { HomeIcon } from '@heroicons/react/24/outline';
import Badge from '@/app/components/Badge/Badge';

interface CategorySectionProps {
  activities: Activity[];
  activitiesByCategory: Record<string, Activity[]>;
}

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getUniqueSubCategoryKey = (subCategory: string, category: string, index: number): string => {
  return `${category}_${subCategory}_${index}`;
};

export default function CategorySection({
  activities,
  activitiesByCategory,
}: CategorySectionProps) {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex(prev => (prev === MAIN_CATEGORIES.length - 1 ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Explorer par Catégorie</h2>
          <Link
            href="/activites"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <span>Toutes les activités</span>
            <ChevronRightIcon className="h-5 w-5 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500">
          {MAIN_CATEGORIES.map((category, index) => (
            <div
              key={category}
              className={`${index === currentCategoryIndex ? 'block' : 'hidden'}`}
            >
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <CategoryIcon category={category} className="h-10 w-10 text-blue-500" />
                    <h3 className="text-2xl font-bold ml-3">{category}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{getCategoryDescription(category)}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array.from(
                      new Set(
                        activities.filter(a => a.category === category).map(a => a.subCategory)
                      )
                    )
                      .slice(0, 6)
                      .map((subCategory, subIndex) => (
                        <Badge
                          key={getUniqueSubCategoryKey(subCategory, category, subIndex)}
                          type="subcategory"
                          value={subCategory}
                          className="hover:bg-indigo-200 transition-colors duration-200"
                        />
                      ))}
                    {activities.filter(a => a.category === category).length > 6 && (
                      <Badge
                        type="category"
                        value="plus"
                        className="bg-gray-100 text-gray-800 border-gray-200"
                      >
                        +
                        {Array.from(
                          new Set(
                            activities.filter(a => a.category === category).map(a => a.subCategory)
                          )
                        ).length - 6}{' '}
                        autres
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Link
                      href={`/activites?category=${encodeURIComponent(category)}`}
                      className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-700 to-blue-700 hover:from-indigo-800 hover:to-blue-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <span className="text-white font-medium">Découvrir</span>
                      <ChevronRightIcon className="h-5 w-5 ml-2 text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 flex flex-wrap gap-3 items-start content-start rounded-bl-xl">
                  {activitiesByCategory[category]?.slice(0, 4).map(activity => (
                    <Link
                      key={activity.id}
                      href={`/activites/${activity.id}`}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 w-full"
                    >
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {capitalizeFirstLetter(activity.name)}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <HomeIcon className="h-4 w-4 mr-1" />
                        <span>{capitalizeFirstLetter(activity.mptName)}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activity.subCategory && (
                          <Badge
                            type="subcategory"
                            value={activity.subCategory}
                            className="hover:bg-indigo-200 transition-colors duration-200"
                          />
                        )}
                        {activity.public && (
                          <Badge
                            type="public"
                            value={activity.public}
                            className="hover:bg-green-200 transition-colors duration-200"
                          />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center p-4">
            {MAIN_CATEGORIES.map((category, index) => (
              <button
                key={category}
                onClick={() => setCurrentCategoryIndex(index)}
                className={`h-3 w-3 rounded-full mx-1 ${
                  index === currentCategoryIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                } transition-colors`}
                aria-label={`Voir catégorie ${category}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    Sport:
      'Des activités sportives variées pour tous les niveaux et tous les âges, du fitness à la danse en passant par les sports collectifs.',
    Danse:
      'Explorez différents styles de danse, de la classique au hip-hop, avec des cours adaptés à tous les niveaux.',
    'Arts créatifs':
      "Développez votre créativité à travers la peinture, le dessin, la poterie et d'autres formes d'expression artistique.",
    Musique:
      "Des cours d'instruments, du chant, des ateliers d'écriture musicale et des ensembles pour tous les âges.",
    Théâtre:
      "Découvrez l'art dramatique, l'improvisation et l'expression corporelle dans une ambiance conviviale.",
    Langues:
      'Apprenez de nouvelles langues et découvrez différentes cultures avec nos cours pour tous niveaux.',
    'Activités physiques':
      'Gardez la forme avec nos activités physiques adaptées à tous les niveaux et tous les âges.',
    Solidarité:
      "Participez à des activités d'entraide et de solidarité pour renforcer le lien social dans votre quartier.",
    'Bien-être':
      'Prenez soin de vous avec nos activités de relaxation, méditation et bien-être physique et mental.',
    Informatique:
      'Initiez-vous ou perfectionnez-vous aux outils numériques, à la programmation et aux nouvelles technologies.',
    Environnement:
      'Participez à des ateliers et projets écologiques pour prendre soin de notre planète et de notre cadre de vie.',
    Cuisine:
      'Apprenez à cuisiner de nouvelles recettes, des techniques culinaires et découvrez des saveurs du monde entier.',
  };

  return (
    descriptions[category] ||
    "Découvrez une multitude d'activités adaptées à tous les âges et tous les niveaux dans les Maisons Pour Tous de Montpellier."
  );
}
