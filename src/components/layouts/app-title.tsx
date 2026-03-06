import { LucideIcon } from "lucide-react";

interface AppTitleProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

export const AppTitle: React.FC<AppTitleProps> = ({ 
  title, 
  description, 
  icon: Icon,
  action 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="js-page-title flex-1">
          <div className="flex items-center gap-3">
            {Icon && (
              <Icon className="h-6 w-6 text-muted-foreground shrink-0" />
            )}
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {title}
              </h1>
              {description && (
                <p className="text-muted-foreground text-sm">{description}</p>
              )}
            </div>
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
};
