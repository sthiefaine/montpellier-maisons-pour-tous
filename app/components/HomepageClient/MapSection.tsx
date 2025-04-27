import MapLegend from '../Maps/MapLegend';
import mptData from '@/data/mpt.json';
import quartierData from '@/data/sav/montpellier_quartiers.json';
import tramData from '@/data/sav/montpellier_LigneTram.json';
import tramData5 from '@/data/sav/montpellier_LigneTram_5.json';
import { Quartier, TramData } from '../Maps/types';
import QuartierMap from '../Maps/QuartierMap';
import TramAnimation from '../Maps/TramAnimation';

export default function MapSection() {
  const adaptedTramData5 = {
    type: 'FeatureCollection',
    features: (tramData5 as any)[0].features.map((feature: any) => ({
      type: 'Feature',
      geometry: feature.geometry,
      properties: {
        id_lignes_sens: `5-${feature.properties.num}`,
        reseau: 'TAM',
        mode: 'TRAM',
        nom_ligne: feature.properties.nom,
        num_exploitation: 5,
        sens: 'A',
        fonctionnement: 'O',
        code_couleur: '#E5174B',
      },
    })),
  };

  // Fusionner les données des tramways
  const combinedTramData = {
    ...tramData,
    features: [...(tramData as unknown as TramData).features, ...adaptedTramData5.features],
  };

  return (
    <section className="relative w-full bg-gray-50 pb-12 md:pb-0">
      <TramAnimation />
      <div className="pt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900">Carte des quartiers</h2>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4">
              <QuartierMap
                mptData={mptData}
                quartierData={quartierData as unknown as Quartier[]}
                tramData={combinedTramData as unknown as TramData}
              />
            </div>
            <div className="w-full md:w-1/4">
              <MapLegend mptData={mptData} tramData={combinedTramData as unknown as TramData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
