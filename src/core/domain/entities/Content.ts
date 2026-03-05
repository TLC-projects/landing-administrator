export interface Resources {
    id: string;
    url: string;
    content_id: string
}

export interface Content {
    id: string;
    section_id: string;
    title: string;
    description: string;
    duration: string;
    blocked: boolean;
    resources?: Resources[]
}