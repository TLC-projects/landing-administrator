import { Eye, EyeOff } from 'lucide-react';
import { Switch } from '@components/ui';

interface BlockedToogleProps {
  blocked: boolean;
  setIsBlocked: (v: boolean) => void;
  isViewMode?: boolean;
}

export function BlockedToogle({ blocked, setIsBlocked, isViewMode }: BlockedToogleProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-accent">
          {!blocked ? <Eye className="size-4 text-primary" /> : <EyeOff className="size-4 text-muted-foreground" />}
        </div>
        <div className="flex flex-col">
          <label htmlFor="visibility" className="text-sm font-medium text-foreground">
            Visibilidad del contenido
          </label>
          <span className="text-xs text-muted-foreground">
            {!blocked ? 'El contenido será visible' : 'El contenido estará oculto'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className={`text-xs font-medium ${!blocked ? 'text-primary' : 'text-muted-foreground'}`}>
          {!blocked ? 'Visible' : 'Oculto'}
        </span>
        <Switch id="visibility" checked={blocked} onCheckedChange={setIsBlocked} disabled={isViewMode} />
      </div>
    </div>
  );
}
