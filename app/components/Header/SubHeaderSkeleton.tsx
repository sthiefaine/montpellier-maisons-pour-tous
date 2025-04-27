export function SubHeaderSkeleton() {
  return (
    <div className="sticky top-[50px] z-30 bg-white shadow-sm">
      <div className="container mx-auto max-w-6xl px-4 py-3">
        <div className="relative">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="h-6 w-full bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
