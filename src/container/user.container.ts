import { JwtService } from './../services/jwt.service';
//Padrão utilizado para buildar o fluxo de maneira profissional
//Para chamada no routes ficar limpa

import { UserController } from "../controllers/user.controller";
import { UserService } from "../services";
import { UserRepository } from './../database/user.repository';

const jwtService = new JwtService();
const userRepository = new UserRepository();
const userService = new UserService(userRepository, jwtService);
const userController = new UserController(userService);

export { userController };
