import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
 interface  IUserRequest {
    name:string;
    email:string;
    admin?:boolean;
    password:string;
 }

 class CreateUserService {
    async execute( { name, email, admin, password} : IUserRequest ){
        const userRepository = getCustomRepository(UsersRepositories);

        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await userRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new Error("User Already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        })

        await userRepository.save(user);

        return user;
    }
 }

 export { CreateUserService };