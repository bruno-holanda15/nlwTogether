import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"


class CreateTagService{
    async execute(name:string) {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        if (!name) {
            throw new Error("Incorrect name!");
        }

        // Select * from tags where name = "nome inserido"
        const tagAlreadyExists = await tagsRepositories.findOne({
            name
        })

        // caso exista tag com mesmo nome, retorna um error
        if (tagAlreadyExists) {
            throw new Error("Tag already exists");    
        }

        const tag = tagsRepositories.create({
            name
        });

        await tagsRepositories.save(tag);

        return tag;

    }
}

export { CreateTagService }