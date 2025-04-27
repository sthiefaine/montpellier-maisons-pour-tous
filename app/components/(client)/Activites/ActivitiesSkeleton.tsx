export default function ActivitiesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
} 