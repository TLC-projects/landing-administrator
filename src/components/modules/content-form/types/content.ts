export interface Content {
    id: string;
    title: string;
    description: string;
    duration: string;
    imageUrl?: string;
    objectives?: string;
    performance?: string;
    isVisible: boolean;
    projectId: string;
    sectionId: string;
    createdAt?: string;
    updatedAt?: string;
};

export type ContentFormModes = 'create' | 'edit' | 'view';