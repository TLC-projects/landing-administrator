import { AppTitle, Shell } from '@/src/components/layouts';
import { ContentForm } from '@/src/components/modules/content-form';

export async function generateMetadata({ params }: { params: Promise<{ projectId: string; sectionId: string }> }) {
  const { sectionId } = await params;
  return {
    title: `Crear Contenido - Sección ${sectionId} | Content Administrator`,
    description: 'Crear un nuevo contenido'
  };
}

interface NewContentPageProps {
  params: Promise<{ projectId: string; sectionId: string }>;
}

export default async function NewContentPage({ params }: NewContentPageProps) {
  const sectionId = (await params).sectionId;

  return (
    <Shell>
      <AppTitle
        title="Crear contenido"
        description="Completa la información del contenido que deseas agregar a esta sección."
      />
      <div className="mt-6">
        <ContentForm sectionId={sectionId} mode="create" />
      </div>
    </Shell>
  );
}
