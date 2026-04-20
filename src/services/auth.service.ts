import { User as UserEntity } from '@prisma/client';
import prismaRepository from '../database/prisma.repository';
import { HTTPError } from '../utils';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken'; // Importamos o SignOptions para tipagem correta
import { LoginDto, LoginResponseDto } from '../dtos';
import { User } from '../models';

export class AuthService {
  constructor() { }

  public async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const userDB = await prismaRepository.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!userDB) {
      throw new HTTPError(401, 'E-mail ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, userDB.password);

    if (!isPasswordValid) {
      throw new HTTPError(401, 'E-mail ou senha inválidos');
    }

    const userModel = this.mapToModel(userDB);

    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;

    if (!secret || !expiresIn) {
      throw new Error(
        'As variáveis de ambiente JWT_SECRET e JWT_EXPIRES_IN devem estar configuradas.',
      );
    }

    const signOptions: SignOptions = {
      expiresIn: expiresIn as any,
    };

    const token = jwt.sign(
      { id: userDB.id, email: userDB.email },
      secret,
      signOptions,
    );

    return {
      token,
      user: userModel.toJSON(),
    };
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
