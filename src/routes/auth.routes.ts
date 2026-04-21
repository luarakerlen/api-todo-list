
import express from 'express';
import { body } from 'express-validator';
import { dataValidation } from '../middlewares';
import { authController } from '../container';

export class AuthRoutes {
    public static bind() {
        const router = express.Router();

        /**
         * @route POST /auth/login
         * @description Endpoint responsável por autenticar um usuário e gerar um token JWT
         * 
         * Recebe as credenciais do usuário (email e password),
         * envia para o AuthController que processa a autenticação, verifica as credenciais
         * e retorna um token JWT se as credenciais forem válidas.
         * 
         * @body {string} email - Email do usuário
         * @body {string} password - Senha do usuário
         * 
         * @returns {200} { token: string } - Token JWT gerado com sucesso
         * @returns {401} { error: string } - Credenciais inválidas
         * @returns {500} { error: string } - Erro interno do servidor
         */
        router.post("/auth/login",
            /*  #swagger.tags = ['Auth']
                #swagger.description = 'Endpoint responsável por autenticar um usuário e gerar um token JWT. Recebe as credenciais do usuário (email e password), envia para o AuthController que processa a autenticação, verifica as credenciais e retorna um token JWT se as credenciais forem válidas.'

                #swagger.security = []

                #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/loginSchema"
                            }
                        }
                    }
                }

                #swagger.responses[200] = {
                    description: 'Autenticação realizada com sucesso.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/loginResponse'
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

                #swagger.responses[401] = {
                    description: 'Credenciais inválidas.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error401CredentialsResponse'
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
                body('email').isEmail(),
                body('password').isString().isLength({ min: 6 })
            ]),
            authController.login
        )

        return router;
    }
}