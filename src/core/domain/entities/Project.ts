import { Section } from "./Section"


export interface Project {
  id: string;
  name: string;
  description?: string;
  sections?: Section[]
}