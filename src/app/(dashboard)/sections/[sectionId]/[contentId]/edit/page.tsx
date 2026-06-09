import { getContentService } from '@core/infrastructure/config/content-dependency';

import { AppTitle, Shell } from '@/src/components/layouts';
import { ContentForm } from '@/src/components/modules/content-form/content-form';

export async function generateMetadata({
  params
}: {
  params: Promise<{ projectId: string; sectionId: string; contentId: string }>;
}) {
  const { contentId } = await params;
  return {
    title: `Editar Contenido ${contentId} | Content Administrator`,
    description: `Editar el contenido ${contentId}`
  };
}
interface EditContentPageProps {
  params: Promise<{ projectId: string; sectionId: string; contentId: string }>;
}

export default async function EditContentPage({ params }: EditContentPageProps) {
  const sectionId = (await params).sectionId;
  const contentId = (await params).contentId;

  const contentService = await getContentService();
  const content = await contentService.getContentById(contentId);

  return (
    <Shell>
      <AppTitle title="Editar Contenido" description="Modifica los campos necesarios para actualizar el contenido." />
      <div className="mt-6">
        <ContentForm sectionId={sectionId} mode="edit" content={content} />
      </div>
    </Shell>
  );
}
