import { PrismaClient } from "@prisma/client";
import { AuthController } from "../controllers/auth.controller";
import { UserRepository } from "../database";
import { AuthService, JwtService } from "../services";

const userRepository = new UserRepository(new PrismaClient);
const jwtService = new JwtService();
const authService = new AuthService(userRepository, jwtService);
const authController = new AuthController(authService);

export { authController };