import { AppBreadcrumb } from './app-breadcrumb';

interface AppTitleProps {
  title: string;
  description?: string;
  breadcrumb?: {
    label: string;
    href?: string;
  }[];
  action?: React.ReactNode;
}

export const AppTitle: React.FC<AppTitleProps> = ({ title, description, breadcrumb, action }) => {
  return (
    <div className="space-y-3">
      {breadcrumb && <AppBreadcrumb breadcrumb={breadcrumb} />}
      <div className="flex justify-between items-center">
        <div className="js-page-title">
          <p className="text-muted-foreground text-sm">{description}</p>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};
