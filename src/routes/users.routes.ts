import express, { Request, Response } from 'express';
import { UserService } from '../services';
import { UserController } from './../controllers';
import { UserRepository } from './../database';

export class UsersRoutes {

    public static bind() {
        const router = express.Router();
        const userController = new UserController(new UserService(new UserRepository()));

        /**
         * @route POST /users
         * @description Endpoint responsável por criar um novo usuário no sistema
         * 
         * Recebe os dados do usuário (name, email e password),
         * envia para o UserController que processa a criação e persiste no banco de dados.
         * 
         * @body {string} name - Nome do usuário
         * @body {string} email - Email do usuário
         * @body {string} password - Senha do usuário
         * 
         * @returns {201} { object } - Usuário criado com sucesso
         * @returns {500} { error: string } - Erro interno do servidor
         */
        router.post("/users", async (req: Request, res: Response) => {
            userController.createUser(req, res);
        })

        return router
    }
}