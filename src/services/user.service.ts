import { User as UserEntity } from '@prisma/client';

import { ExternalService } from '.';
import prismaRepository from '../database/prisma.repository';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../models';
import * as bcrypt from 'bcrypt';

export class UserService {
  constructor(private externalService?: ExternalService) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await prismaRepository.user.create({
      data: {
        name: dto.name,
        email: dto.email,
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
