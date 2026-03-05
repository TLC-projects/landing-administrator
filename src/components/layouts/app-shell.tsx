import { cn } from "@/src/lib/utils";

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Shell: React.FC<ContentProps> = ({ children, className }) => {
  return <section className={cn("h-full w-full space-y-5", className)}>{children}</section>;
};
