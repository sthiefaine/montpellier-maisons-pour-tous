export function OpeningStatusSkeleton() {
  return (
    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
      <div className="relative w-4 h-4">
        <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
