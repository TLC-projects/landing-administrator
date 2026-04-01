import { Skeleton } from "@components/ui";

export default function CalendarLoading() {
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="border shadow rounded-md px-3 pt-5 pb-3 flex flex-col md:flex-row items-start gap-4">
        <Skeleton className="h-10 w-full md:max-w-xl" />
        <Skeleton className="h-10 w-36 ml-auto" />
      </div>

      {/* Toggle + Nuevo */}
      <div className="flex justify-end gap-2">
        <Skeleton className="h-9 w-44" />
        <Skeleton className="h-9 w-36" />
      </div>

      {/* Tabla */}
      <div className="rounded-md border">
        {/* Header */}
        <div className="bg-muted grid grid-cols-5 gap-4 px-4 py-3">
          {["ID", "Nombre del evento", "Fecha", "Estado", "Acciones"].map((col) => (
            <Skeleton key={col} className="h-4 w-24" />
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 px-4 py-4 border-t">
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 pt-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
}