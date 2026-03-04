import { Project } from "@core/domain/entities/Project"
import { ProjectDto } from "./project-dto"

export class ProjectMapper {

  static toEntity(dto: ProjectDto): Project {
    return new Project(
      dto.id,
      dto.name,
      dto.description
    )
  }

  static toEntities(dtos: ProjectDto[]): Project[] {
    return dtos.map(dto => this.toEntity(dto))
  }

}