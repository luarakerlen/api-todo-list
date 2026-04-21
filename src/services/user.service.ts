import { User as UserEntity } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../database';
import { CreateUserDto } from '../dtos';
import { User } from '../models';
import { JwtService } from './jwt.service';

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
  public async createUser(user: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userRepository.createUser({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });

    return this.mapToModel(newUser);
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
