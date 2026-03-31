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
} from "@/src/components/ui";
import { Check, ChevronsUpDown, Eye, EyeOff, Funnel } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

type StatusOption = "visible" | "blocked" | null;

const STATUS_OPTIONS = {
  visible: {
    label: "Visible",
    value: false,
    icon: Eye,
  },
  blocked: {
    label: "Oculto",
    value: true,
    icon: EyeOff,
  },
};

export const CalendarFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  const blockedParam = searchParams.get("blocked");

  const currentBlocked: StatusOption =
    blockedParam === "true"
      ? "blocked"
      : blockedParam === "false"
        ? "visible"
        : null;

  const [selectedStatus, setSelectedStatus] =
    useState<StatusOption>(currentBlocked);

  useEffect(() => {
    setSelectedStatus(currentBlocked);
  }, [currentBlocked]);

  const hasFilterApplied = selectedStatus !== null;

  const handleApplyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedStatus === null) {
      params.delete("blocked");
    } else {
      params.set("blocked", STATUS_OPTIONS[selectedStatus].value.toString());
    }

    params.delete("page");
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

  const getLabel = selectedStatus
    ? STATUS_OPTIONS[selectedStatus].label
    : "Filtrar";
  const Icon = selectedStatus ? STATUS_OPTIONS[selectedStatus].icon : Funnel;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full md:w-55 h-10 justify-between"
        >
          <span className="flex items-center gap-2 text-sm">
            <Icon className="h-4 w-4" />
            {getLabel}
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto md:w-65 p-4 space-y-4">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Estado del evento
          </Label>

          <Command>
            <CommandEmpty>No hay resultados</CommandEmpty>
            <CommandGroup>
              {Object.entries(STATUS_OPTIONS).map(([key, option]) => {
                const OptionIcon = option.icon;
                return (
                  <CommandItem
                    key={key}
                    onSelect={() => setSelectedStatus(key as StatusOption)}
                  >
                    {selectedStatus === key && (
                      <Check className="mr-2 h-4 w-4 text-primary" />
                    )}
                    <OptionIcon className="mr-2 h-4 w-4" />
                    {option.label}
                  </CommandItem>
                );
              })}
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
