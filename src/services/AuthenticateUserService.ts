import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateService {
    email:string;
    password:string
}

class AuthenticateUserService{
    async execute( { email, password }:IAuthenticateService) {
        const usersRespositories = getCustomRepository(UsersRepositories);

        const user = await usersRespositories.findOne({
            email
        })

        if (!user) {
            throw Error("Email/Password incorrect!");
        }

        const verifyPassword = await compare(password, user.password);

        if (!verifyPassword) {
            throw Error("Email/Password incorrect!");
        }

        //Gera o token
        const token = sign({
            email: user.email
        }, "78fa0b254837b57079d48db5d5d25330", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;

    }
}

export { AuthenticateUserService }