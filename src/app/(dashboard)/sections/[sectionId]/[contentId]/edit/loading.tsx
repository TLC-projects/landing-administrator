import { Skeleton } from "@/src/components/ui";


export default function Loading() {
    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <Skeleton className="h-8 w-52" />
                <Skeleton className="h-4 w-72" />
            </div>

            <div className="mt-6 flex flex-col gap-8 lg:w-3/5">
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-32 w-full" />
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-1.5 w-24 rounded-full" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-48 w-full rounded-lg" />
                        <Skeleton className="h-4 w-28" />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-border/60 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-9 rounded-lg" />
                            <div className="flex flex-col gap-1.5">
                                <Skeleton className="h-4 w-44" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Skeleton className="h-3 w-10" />
                            <Skeleton className="h-6 w-11 rounded-full" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/40 pt-6">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-36" />
                </div>
            </div>
        </div>
    );
}