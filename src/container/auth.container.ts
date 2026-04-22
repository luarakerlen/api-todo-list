import { PrismaClient } from "@prisma/client";
import { AuthController } from "../controllers/auth.controller";
import { AuthService, JwtService } from "../services";
import { UserRepository } from "../repositories";

const userRepository = new UserRepository();
const jwtService = new JwtService();
const authService = new AuthService(userRepository, jwtService);
const authController = new AuthController(authService);

export { authController };