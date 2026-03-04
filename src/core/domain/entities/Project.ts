export class Project {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description?: string
  ) {}

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }

  getDescription() {
    return this.description
  }
}