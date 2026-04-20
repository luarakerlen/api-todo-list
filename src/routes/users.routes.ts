import express, { Request, Response } from 'express';
import { userController } from '../container/user.container';

export class UsersRoutes {

    public static bind() {
        const router = express.Router();
        /**
* @route GET /health/users
* @description Endpoint de verificação de saúde da API
* 
* Utilizado para validar se a aplicação está online e respondendo corretamente.
* Pode ser usado por serviços de monitoramento, deploy ou testes de infraestrutura.
* 
* @returns {200} { status: string } - Retorna status "ok" se a API estiver funcionando
*/
        router.get("/health/users", (_: Request, res: Response) => {
            res.status(200).json({ status: "ok" });
        });

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