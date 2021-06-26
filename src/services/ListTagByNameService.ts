import { getCustomRepository, IsNull } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"


class ListTagByNameService{
    async execute(name: string) {
        const tagsRespositories = getCustomRepository(TagsRepositories);

        const tag = await tagsRespositories.findOne({
            where: {
                name
            }
        })

        return tag;
    }

}

export { ListTagByNameService }