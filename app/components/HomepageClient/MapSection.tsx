import QuartierMap from '../QuartierMap';
import MapLegend from '../MapLegend';

export default function MapSection() {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Carte des quartiers</h2>
        <div className="overflow-x-auto">
          <div className="min-w-fit">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <QuartierMap />
              </div>
              <div className="col-span-1">
                <MapLegend />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
