import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest{
    tag_id:string;
    user_sender:string;
    user_receiver:string;
    message:string
}

class CreateComplimentService{
    async execute ({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {

        const createComplimentRepository = getCustomRepository(ComplimentsRepositories);
        const userRepository = getCustomRepository(UsersRepositories);

        if (user_sender === user_receiver) {
            throw new Error("Incorrect User receiver!");
        }

        const userReceiverExists = await userRepository.findOne(user_receiver);

        if (!userReceiverExists) {
            throw new Error("User does not exist!");
        }

        const compliment = await createComplimentRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        await createComplimentRepository.save(compliment);

        return compliment;

    }
}

export { CreateComplimentService }