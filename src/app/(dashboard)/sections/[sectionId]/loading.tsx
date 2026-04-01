import { Skeleton } from "@/src/components/ui";

export default function Loading() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <Skeleton className="h-4 w-full max-w-2xl" />
      </div>
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}
