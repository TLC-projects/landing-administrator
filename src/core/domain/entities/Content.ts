export interface ContentResource {
    id: number
    url: string
    content_id: number
}

export interface Content {
    id: number
    section_id: number
    title: string
    description: string
    duration: string
    blocked: string
    resources: ContentResource[]
}
