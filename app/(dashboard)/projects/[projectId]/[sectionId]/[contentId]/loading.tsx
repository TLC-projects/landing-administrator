import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <Skeleton className="h-4 w-full max-w-2xl" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
        <div className="mt-6 space-y-3">
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-10 w-full max-w-md" />
        </div>
      </div>
    </div>
  );
}
