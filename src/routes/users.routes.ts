import express from 'express';
import { body } from 'express-validator';
import { dataValidation } from '../middlewares';
import { userController } from '../container';

export class UsersRoutes {
    public static bind() {
        const router = express.Router();
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
        router.post("/users",
            /*  #swagger.tags = ['Users']
                #swagger.description = 'Endpoint responsável por criar um novo usuário no sistema. Recebe os dados do usuário (name, email e password), envia para o UserController que processa a criação e persiste no banco de dados.'

                #swagger.security = []
                
                #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/createUserSchema"
                            }
                        }
                    }
                }

                #swagger.responses[201] = {
                    description: 'Usuário criado com sucesso.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/createUserResponse'
                            }
                        }
                    }
                }

                #swagger.responses[400] = {
                    description: 'Requisição inválida, com detalhes dos erros de validação.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error400Response'
                            }
                        }
                    }
                }

                #swagger.responses[409] = {
                    description: 'Conflito, email já existe.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error409Response'
                            }
                        }
                    }
                }

                #swagger.responses[500] = {
                    description: 'Erro interno do servidor.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error500Response'
                            }
                        }
                    }
                }
            */
            dataValidation([
                body('name').isString().isLength({ min: 1 }),
                body('email').isEmail(),
                body('password').isString().isLength({ min: 6 })
            ]),
            userController.createUser
        )

        return router;
    }
}