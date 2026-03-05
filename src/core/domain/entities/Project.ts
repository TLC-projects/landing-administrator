import { Section } from "./Section"


export class Project {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description?: string,
    public readonly sections?: Section[]
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

  getSections() {
    return this.sections
  }
}