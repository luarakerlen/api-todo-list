import { User as UserEntity } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import { hashSync } from 'bcrypt';
import { UserRepository } from '../database';
import { LoginDto, CreateUserDto } from '../dtos';
import { User } from '../models';
import { JwtService } from './jwt.service';
import { Result } from '../types/result.type';
import { LoginResponse } from '../types/auth.types';

/**
 * Service responsável pelas regras de negócio relacionadas a Usuário.
 * 
 * Camada intermediária entre Controller e Repository.
 * Responsável por:
 * - Criação de usuário
 * - Hash de senha
 * - Mapeamento de entidade
 */
export class UserService {

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }
  /**
   * Cria um novo usuário no sistema.
   * 
   * @param dto - Dados necessários para criação do usuário
   * @returns Usuário criado no formato de domínio (User)
   */
  public async createUser(data: CreateUserDto): Promise<User> {
    const hashedPassword = await hashSync(data.password, 8);

    const newUser = await this.userRepository.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return this.mapToModel(newUser);
  }

  /**
 * Realiza a autenticação de um usuário no sistema.
 * 
 * Fluxo:
 * - Recebe email e senha via DTO
 * - Busca o usuário no banco pelo email
 * - Compara a senha informada com a senha criptografada (hash) armazenada
 * - Se válido, gera um token JWT para autenticação
 * 
 * @param data - Dados de login (email e senha)
 * @returns Objeto contendo:
 * - code: status da operação (200 ou 401)
 * - message: mensagem descritiva
 * - data: token JWT (em caso de sucesso)
 */
  public async login(data: LoginDto): Promise<Result<LoginResponse>> {
    const currentUser = await this.userRepository.findUserByEmail(data);

    if (!currentUser) {
      return {
        code: 401,
        message: "Invalid username or password!"
      }
    }

    const validUser = await bcrypt.compare(data.password, currentUser.password);
    if (!validUser) {
      return {
        code: 401,
        message: "Invalid username or password!"
      }
    }

    const token = this.jwtService.createToken({
      id: currentUser.id,
      username: currentUser.name
    });

    return {
      code: 200,
      message: "User successfully logged",
      data: {
        token
      }
    }
  }
  /**
   * Converte a entidade retornada do banco (Prisma) para o modelo de domínio.
   * 
   * @param entity - Usuário vindo do Prisma
   * @returns Instância de User (modelo da aplicação)
   */
  private mapToModel(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.email,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
