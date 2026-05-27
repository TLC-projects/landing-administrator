
import { Section } from "@/src/core/domain/entities/section";
import { SectionRepository } from "@core/domain/interfaces/section-repository";

export class GetSectionByIdUseCase {
    constructor(private sectionRepository: SectionRepository) { }

    async execute(id: string): Promise<Section | null> {
        try {
            if (!id) return null;
            return await this.sectionRepository.getSectionById(id);
        } catch (error) {
            console.log('Error to get section by id', error);
            return null
        }
    }
}