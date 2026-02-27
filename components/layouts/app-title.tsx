interface AppTitleProps {
  title: string;
  description?: string;
}

export const AppTitle: React.FC<AppTitleProps> = ({ title, description }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="js-page-title">
          <p className="text-muted-foreground text-sm">{description}</p>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        </div>
      </div>
    </div>
  );
};
