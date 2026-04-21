import { prisma } from "./prisma.repository";

import { CreateUserDto, LoginDto } from "../dtos";

/**
 * Repository responsável por todas as operações de banco relacionadas a Usuário.
 * 
 * Esta classe abstrai o Prisma e centraliza o acesso à entidade User,
 * evitando que a camada de Service dependa diretamente do ORM.
 */
export class UserRepository {
    /**
     * Cria um novo usuário no banco de dados.
     * 
     * @param data - Dados necessários para criação do usuário (nome, email, senha)
     * @returns Usuário criado retornado pelo Prisma
     */
    async createUser(data: CreateUserDto) {
        return prisma.user.create({
            data
        })
    }

    async findUserByEmail(data: LoginDto) {
        return prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
    }
}