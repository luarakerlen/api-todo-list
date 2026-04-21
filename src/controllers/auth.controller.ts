import { Response } from "express";
import { AuthService } from "../services";
import { LoginRequest } from './../dtos/auth.dto';
import { HTTPResponse } from "../utils";

export class AuthController {
    constructor(private authService: AuthService) { }

    public async login(req: LoginRequest, res: Response) {

        try {
            const { email, password } = req.body;

            const result = await this.authService.authenticateUser({
                email,
                password
            });

            return HTTPResponse({
                res,
                statusCode: 201,
                message: "Criado!",
                data: result
            });

        } catch (error) {

        }
    }
}