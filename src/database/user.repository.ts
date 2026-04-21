import { PrismaClient } from "@prisma/client";
import { CreateUserDto, LoginDto } from "../dtos";

/**
 * Repository responsável por todas as operações de banco relacionadas a Usuário.
 * 
 * Esta classe abstrai o Prisma e centraliza o acesso à entidade User,
 * evitando que a camada de Service dependa diretamente do ORM.
 */
export class UserRepository {
    constructor(private prisma: PrismaClient) { }
    /**
     * Cria um novo usuário no banco de dados.
     * 
     * @param data - Dados necessários para criação do usuário (nome, email, senha)
     * @returns Usuário criado retornado pelo Prisma
     */
    async createUser(data: CreateUserDto) {
        return this.prisma.user.create({
            data
        })
    }

    async findUserByEmail(data: LoginDto) {
        return this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
    }
}