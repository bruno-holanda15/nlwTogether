import { Request, Response } from "express";
import { ListTagByNameService } from "../services/ListTagByNameService";


class ListTagByNameController{
    async handle(request:Request, response: Response) {
        const  name  = request.params.name;

        const tagByNameService = new ListTagByNameService();

        const tag = await tagByNameService.execute(name);

        if(!tag) {
            return response.json(`Not found tag with name ${name}`)
        }

        return response.json(tag);
    }

}

export { ListTagByNameController }