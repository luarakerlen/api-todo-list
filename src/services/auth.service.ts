import { User as UserEntity } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UserRepository } from '../database';
import { LoginDto } from '../dtos';
import { User } from '../models';
import { HTTPError } from '../utils';
import { JwtService } from './jwt.service';

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  public async authenticateUser(data: LoginDto) {

    const currentUser = await this.userRepository.findUserByEmail(data);

    if (!currentUser) {
      throw new HTTPError(401, 'E-mail ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(data.password, currentUser.password);

    if (!isPasswordValid) {
      throw new HTTPError(401, 'E-mail ou senha inválidos');
    }

    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;

    if (!secret || !expiresIn) {
      throw new Error(
        'As variáveis de ambiente JWT_SECRET e JWT_EXPIRES_IN devem estar configuradas.',
      );
    }

    const token = this.jwtService.createToken({
      id: currentUser.id,
      username: currentUser.name
    });

    return {
      token,
      user: this.mapToModel(currentUser).toJSON()
    }
  }

  private mapToModel(userDB: UserEntity): User {
    return new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.createdAt,
      userDB.updatedAt,
    );
  }
}
