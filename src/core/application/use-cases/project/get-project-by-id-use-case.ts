import { Project } from "@core/domain/entities/Project";
import { ProjectRepository } from "@core/domain/interfaces/project-repository";

export class GetProjectByIdUseCase {
    constructor(private projectRepository: ProjectRepository) { }

    async execute(id: string): Promise<Project | null> {
        try {
            if (!id) return null;
            return await this.projectRepository.getProjectById(id);
        } catch (error) {
            console.log('Error to get project by id', error);
            return null
        }
    }
}