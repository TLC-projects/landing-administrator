"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Command,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  Label,
} from "@/components/ui";
import { Check, ChevronsUpDown, Eye, EyeOff, Funnel } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

type StatusOption = "true" | "false" | null;

export const ContentFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  // 🔹 Normalizamos correctamente el valor desde la URL
  const currentBlocked: StatusOption =
    searchParams.get("blocked") === "true"
      ? "true"
      : searchParams.get("blocked") === "false"
        ? "false"
        : null;

  // 🔹 Estado temporal dentro del popover
  const [selectedStatus, setSelectedStatus] =
    useState<StatusOption>(currentBlocked);

  // 🔹 Sync cuando cambia la URL
  useEffect(() => {
    setSelectedStatus(currentBlocked);
  }, [currentBlocked]);

  const hasFilterApplied = selectedStatus !== null;

  const handleApplyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedStatus === null) {
      params.delete("blocked");
    } else {
      params.set("blocked", selectedStatus);
    }

    params.delete("page"); // reset paginación

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setOpen(false);
  }, [selectedStatus, searchParams, pathname, router]);

  const cleanFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("blocked");
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setSelectedStatus(null);
    setOpen(false);
  };

  const getLabel = useMemo(() => {
    if (currentBlocked === "true") return "Visible";
    if (currentBlocked === "false") return "Oculto";
    return null;
  }, [currentBlocked]);

  const getIcon = (value: StatusOption) => {
    if (value === "true") return <Eye className="h-4 w-4 text-green-600" />;
    if (value === "false") return <EyeOff className="h-4 w-4" />;
    return <Funnel className="h-4 w-4 text-muted-foreground" />;
  };

  console.log("selectedStatus", selectedStatus);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full md:w-55 h-10 justify-between"
        >
          <span className="flex items-center gap-2 text-sm">
            {getIcon(currentBlocked)}
            {getLabel ?? "Filtrar"}
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto md:w-65 p-4 space-y-4">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Estado del contenido
          </Label>

          <Command>
            <CommandEmpty>No hay resultados</CommandEmpty>

            <CommandGroup>
              {/* Visible */}
              <CommandItem onSelect={() => setSelectedStatus("true")}>
                {selectedStatus === "true" ? (
                  <Check className="mr-2 h-4 w-4 text-primary" />
                ) : null}
                <Eye className="mr-2 h-4 w-4" />
                Visible
              </CommandItem>

              {/* Oculto */}
              <CommandItem onSelect={() => setSelectedStatus("false")}>
                {selectedStatus === "false" ? (
                  <Check className="mr-2 h-4 w-4 text-primary" />
                ) : null}
                <EyeOff className="mr-2 h-4 w-4" />
                Oculto
              </CommandItem>
            </CommandGroup>
          </Command>
        </div>

        {hasFilterApplied && (
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={cleanFilters}>
              Limpiar
            </Button>
            <Button size="sm" onClick={handleApplyFilters}>
              Aplicar filtros
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
