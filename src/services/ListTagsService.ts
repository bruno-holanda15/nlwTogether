import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories"
import { classToPlain } from "class-transformer";

class ListTagsService{
    async execute() {
        const tagsRespositories = getCustomRepository(TagsRepositories);
        
        const tags = await tagsRespositories.find();

        // Cria novos objetos com o Expose, a partir da entity com a lib class-transformer utilizando essa função classToPlain
        return classToPlain(tags);
    }
}

export { ListTagsService }