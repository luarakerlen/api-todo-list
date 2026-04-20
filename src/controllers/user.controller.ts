import { Request, Response } from 'express';
import { CreateUserDto } from '../dtos';
import { UserService } from '../services';
import { onError } from '../utils';

/**
 * Controller responsável por gerenciar requisições HTTP relacionadas a usuários.
 * 
 * Atua como camada de entrada da API, recebendo requests,
 * repassando para o service e retornando responses HTTP.
 */
export class UserController {
    constructor(private userService: UserService) { }

    /**
     * Cria um novo usuário no sistema.
     * 
     * @route POST /users
     * @body {CreateUserDto} req.body - Dados do usuário (nome, email, senha)
     * 
     * @returns {201} Object - Usuário criado com sucesso
     */
    public async createUser(req: Request, res: Response) {

        try {
            const userData: CreateUserDto = req.body;

            const result = await this.userService.createUser(userData);

            return res.status(201).json({
                status: "ok",
                message: "Created!",
                data: result.toJSON()
            });

        } catch (error) {
            return onError(error, res)
        }
    }
}