const SkeletonTaskCard = () => {
  return (
    <div className="card animate-pulse space-y-4">
      <div className="h-4 w-2/3 bg-gray-300 dark:bg-slate-700 rounded" />
      <div className="h-3 w-full bg-gray-300 dark:bg-slate-700 rounded" />
      <div className="h-3 w-5/6 bg-gray-300 dark:bg-slate-700 rounded" />
      <div className="h-6 w-24 bg-gray-300 dark:bg-slate-700 rounded mt-2" />
    </div>
  );
};

export default SkeletonTaskCard;
