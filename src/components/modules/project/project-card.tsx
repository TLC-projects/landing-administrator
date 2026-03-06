import Link from "next/link";
import { Folder, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, Button } from "@/src/components/ui";

interface ProjectCardProps {
  id: string;
  title: string;
  description?: string;
}

export function ProjectCard({ id, title, description }: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-1">
        <div className="flex items-start gap-4 mb-4">
          <div className="rounded-lg bg-primary/10 p-3 shrink-0">
            <Folder className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-2">{title}</CardTitle>
            {description && (
              <CardDescription className="line-clamp-2">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
        <Button asChild variant="ghost" className="w-full justify-between mt-auto">
          <Link href={`/projects/${id}`}>
            Ver proyecto
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
    </Card>
  );
}
