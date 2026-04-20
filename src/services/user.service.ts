import { User as UserEntity } from '@prisma/client';

import prismaRepository from '../database/prisma.repository';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../models';
import bcrypt from 'bcrypt';

export class UserService {
  constructor() { }

  public async createUser(user: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await prismaRepository.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    return this.mapToModel(newUser);
  }

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
