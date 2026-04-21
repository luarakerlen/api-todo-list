//Padrão utilizado para buildar o fluxo de maneira profissional
//Para chamada no routes ficar limpa

import { PrismaClient } from '@prisma/client';
import { UserController } from "../controllers";
import { UserService } from "../services";
import { UserRepository } from './../database';

const userRepository = new UserRepository(new PrismaClient());
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export { userController };

