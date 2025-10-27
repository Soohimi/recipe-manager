export function RecipeSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 w-3/4 rounded" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 w-full rounded" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 w-5/6 rounded" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 w-1/2 rounded mt-4" />
      </div>
    </div>
  );
}
