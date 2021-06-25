import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";


class ListUserReceiveComplimentsController{
    async handle (request: Request, response: Response){
        const { user_id } = request;

        const complimentsService = new ListUserReceiveComplimentsService();
        const compliments = await complimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUserReceiveComplimentsController }