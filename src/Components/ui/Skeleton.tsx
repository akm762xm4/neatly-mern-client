interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

const Skeleton = ({ className = "", children }: SkeletonProps) => {
  return (
    <div
      className={`bg-gray-200 dark:bg-slate-700 animate-pulse rounded-md ${className}`}
    >
      {children && children}
    </div>
  );
};

export default Skeleton;
