export interface ContentResource {
  id: number
  url: string
  content_id: number
}

export class Content {
  constructor(
    //clases de dominio son publicos para que puedan ser accedidos directamente, pero el bloqueado se maneja con métodos para asegurar la lógica de negocio
    public readonly id: number,
    public readonly sectionId: number,
    public readonly title: string,
    public readonly description: string,
    public readonly duration: string,
    private readonly _blocked: boolean,
    public readonly resources: ContentResource[],
    public readonly objectives?: string,
    public readonly performance?: string,
  ) {}

  isBlocked(): boolean {
    return this._blocked
  }

  isVisible(): boolean {
    return !this._blocked
  }

  hasResource(): boolean {
    return this.resources.length > 0
  }

  getMainResourceUrl(): string | null {
    return this.resources[0]?.url ?? null
  }

  block(): Content {
    return new Content(this.id, this.sectionId, this.title, this.description, this.duration, true, this.resources)
  }

  unblock(): Content {
    return new Content(this.id, this.sectionId, this.title, this.description, this.duration, false, this.resources)
  }
  
}
