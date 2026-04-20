//Padrão utilizado para buildar o fluxo de maneira profissional
//Para chamada no routes ficar limpa

import { UserRepository } from './../database';
import { UserController } from "../controllers";
import { UserService } from "../services";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export { userController };
