'use client';

import Image from 'next/image';
import Link from 'next/link';

const Balloon = ({
  color,
  size,
  delay,
  position,
}: {
  color: string;
  size: string;
  delay: number;
  position: string;
}) => (
  <div
    className={`absolute z-0 ${position} ${size} rounded-full ${color} animate-float`}
    style={{ animationDelay: `${delay}s` }}
  />
);

const Arrow = () => (
  <svg
    className="w-8 h-8 ml-4 group-hover:translate-x-4 transition-transform duration-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

export default function GuideSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Ballons */}
        <Balloon color="bg-pink-300" size="w-12 h-12" delay={0} position="top-10 left-10" />
        <Balloon color="bg-purple-300" size="w-16 h-16" delay={1} position="top-20 right-20" />
        <Balloon color="bg-blue-300" size="w-14 h-14" delay={2} position="bottom-10 left-20" />
        <Balloon color="bg-yellow-300" size="w-10 h-10" delay={1.5} position="bottom-20 right-10" />
        <Balloon color="bg-green-300" size="w-8 h-8" delay={0.5} position="top-40 left-40" />
        <Balloon color="bg-red-300" size="w-20 h-20" delay={2.5} position="bottom-40 right-40" />
        <Balloon color="bg-indigo-300" size="w-12 h-12" delay={1.2} position="top-60 left-60" />
        <Balloon color="bg-orange-300" size="w-14 h-14" delay={0.8} position="bottom-60 right-60" />

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 relative z-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Guide des Maisons Pour Tous 2024-2025
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Découvrez notre guide complet des activités et services proposés dans les Maisons Pour
              Tous de Montpellier.
            </p>
            <div className="relative group flex items-center">
              <Link
                href="/guide-maisons-pour-tous-2024-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-md text-white visited:text-white bg-blue-600 hover:bg-blue-700 transition-colors relative z-20 no-underline"
              >
                Télécharger le guide
              </Link>
              <Arrow />
            </div>
          </div>
          <div className="md:w-1/2 perspective-1000 relative z-20 flex items-center justify-center">
            <div className="relative w-40 h-60 mx-auto transform transition-transform duration-300 hover:rotate-y-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg" />
              <Image
                width={160}
                height={240}
                src="/guide-cover.png"
                alt="Couverture du guide des Maisons Pour Tous 2024-2025"
                className="rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
