// Components/SkeletonNoteCard.tsx
import Skeleton from "../../Components/ui/Skeleton";

const SkeletonNoteCard = () => {
  return (
    <div className="card space-y-3">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  );
};

export default SkeletonNoteCard;
