import MapLegend from '../Maps/MapLegend';
import mptData from '@/data/mpt.json';
import quartierData from '@/data/sav/montpellier_quartiers.json';
import { Quartier } from '../Maps/types';
import QuartierMap from '../Maps/QuartierMap';


export default function MapSection() {
  return (
    <section className="w-full bg-gray-50 pt-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900">Carte des quartiers</h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/4">
            <QuartierMap 
              mptData={mptData} 
              quartierData={quartierData as unknown as Quartier[]} 
            />
          </div>
          <div className="w-full md:w-1/4">
            <MapLegend mptData={mptData} />
          </div>
        </div>
      </div>
    </section>
  );
}
