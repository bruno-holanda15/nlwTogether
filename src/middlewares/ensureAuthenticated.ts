import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub:string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    //pegando o token pela request
    const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).end();
    }

    //pegando o segundo valor do array e atribuindo ao const token
    const [,token] = authToken.split(" ");

    try {
        //Validar se o token está válido e desestruturando o retorno para pegar o id do user e passar para const sub
        const { sub } = verify( token , '78fa0b254837b57079d48db5d5d25330') as IPayload;

        // Passando dentro do request o atributo user_id associado no @types que criamos dentro do src
        request.user_id = sub;
        return next();

    } catch (error) {
        return response.status(401).end();
    }
}