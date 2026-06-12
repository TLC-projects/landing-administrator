export interface ContentFilters {
  search?: string;
  blocked?: boolean;
}

export interface ContentResource {
  id: string;
  url: string;
  contentId: string;
}

export interface Content {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  duration: string;
  blocked: boolean;
  resources: ContentResource[];
  objectives?: string;
  performance?: string;
  brochureUrl?: string;
}
