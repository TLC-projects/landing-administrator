import { Eye, EyeOff } from "lucide-react";
import { Switch } from "@components/ui";

interface VisibilityToggleProps {
  blocked: boolean;
  onChange: (v: boolean) => void;
}

export function VisibilityToggle({ blocked, onChange }: VisibilityToggleProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-accent">
          {!blocked ? <Eye className="size-4 text-primary" /> : <EyeOff className="size-4 text-muted-foreground" />}
        </div>
        <div className="flex flex-col">
          <label htmlFor="cal-blocked" className="text-sm font-medium text-foreground">
            Visibilidad del evento
          </label>
          <span className="text-xs text-muted-foreground">
            {!blocked ? "El evento será visible" : "El evento estará oculto"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className={`text-xs font-medium ${!blocked ? "text-primary" : "text-muted-foreground"}`}>
          {!blocked ? "Visible" : "Oculto"}
        </span>
        <Switch id="cal-blocked" checked={!blocked} onCheckedChange={(v) => onChange(!v)} />
      </div>
    </div>
  );
}