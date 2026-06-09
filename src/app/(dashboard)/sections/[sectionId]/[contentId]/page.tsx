import { getContentService } from '@core/infrastructure/config/content-dependency';

import { AppTitle, Shell } from '@/src/components/layouts';
import { ContentForm } from '@/src/components/modules/content-form/content-form';

export async function generateMetadata({
  params
}: {
  params: Promise<{ projectId: string; sectionId: string; contentId: string }>;
}) {
  const { sectionId, contentId } = await params;
  return {
    title: `Contenido ${contentId} - Sección ${sectionId} | Content Administrator`,
    description: `Ver detalles del contenido ${contentId}`
  };
}

interface ContentPageProps {
  params: Promise<{ projectId: string; sectionId: string; contentId: string }>;
}

export default async function ContentPage({ params }: ContentPageProps) {
  const sectionId = (await params).sectionId;
  const contentId = (await params).contentId;

  const contentService = await getContentService();
  const content = await contentService.getContentById(contentId);

  return (
    <Shell>
      <AppTitle
        title={`Contenido ${contentId}`}
        description={`Visualiza la información del contenido y edítalo si necesitas realizar cambios.`}
      />
      <div className="space-y-2">
        <ContentForm sectionId={sectionId} mode="view" content={content} />
      </div>
    </Shell>
  );
}
