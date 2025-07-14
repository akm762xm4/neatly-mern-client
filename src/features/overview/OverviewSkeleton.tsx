import Skeleton from "../../Components/ui/Skeleton";

const OverviewSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex ">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="ml-auto w-10 h-10 rounded-full" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 2 }).map((_, idx) => (
          <Skeleton key={idx} className="h-20" />
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 py-8 ">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} className="h-16" />
        ))}
      </div>

      {/* Task Calendar + Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        {/* Calendar Box */}
        <Skeleton className="h-[350px]" />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="" />
          ))}
          {/* </Skeleton> */}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <div className="h-5 w-1/3 bg-muted rounded-md" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14" />
        ))}
      </div>
    </div>
  );
};

export default OverviewSkeleton;
