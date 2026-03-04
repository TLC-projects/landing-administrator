export interface ContentApiResponse {
    id: number
    section_id: number
    title: string
    description: string
    duration: string
    blocked: string
    resources: ContentResourceApiResponse[]
}

export interface ContentResourceApiResponse {
    id: number
    url: string
    content_id: number
}