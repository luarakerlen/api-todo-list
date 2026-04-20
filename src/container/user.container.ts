//Padrão utilizado para buildar o fluxo de maneira profissional
//Para chamada no routes ficar limpa

import { JwtService } from './../services';
import { UserRepository } from './../database';
import { UserController } from "../controllers";
import { UserService } from "../services";

const jwtService = new JwtService();
const userRepository = new UserRepository();
const userService = new UserService(userRepository, jwtService);
const userController = new UserController(userService);

export { userController };

