import { Skeleton } from "@components/ui";


export const ProfileSkeleton = () => (
  <div className="flex items-center gap-1.5 p-2 py-1">
    <Skeleton className="h-8 w-8 rounded-full" />
    <div className="sm:grid hidden flex-1 text-left gap-1 text-sm leading-tight text-inherit">
      <Skeleton className="h-4 w-24 rounded-sm" />
      <Skeleton className="h-3 w-18 rounded-sm" />
    </div>
  </div>
);
