import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

interface ProjectCardProps {
  id: number;
  name: string;
  img?: string;
}

export function ProjectCard({ id, name, img }: ProjectCardProps) {
  return (
    <article className="flex flex-col rounded-lg border border-border bg-card shadow-sm overflow-hidden ">
      
      <div className="relative h-48 w-full bg-muted flex items-center justify-center">
        {img ? (
          <Image
            src={img}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <ImageIcon className="h-16 w-16 text-muted-foreground/40" strokeWidth={1.5} />
        )}
      </div>

   
      <div className="flex flex-col p-4 gap-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        
        <Button
          asChild
         
        >
          <Link href={`/projects/${id}`}>Ver proyecto</Link>
        </Button>
      </div>
    </article>
  );
}
