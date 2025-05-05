import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function SubHeaderSkeleton() {
  return (
    <div className="sticky top-[50px] z-30 bg-white shadow-sm">
      <div className="container mx-auto max-w-6xl px-4 py-3">
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              disabled
              placeholder="Chargement..."
              className="w-full px-4 py-2 pl-10 pr-10 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg animate-pulse"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
