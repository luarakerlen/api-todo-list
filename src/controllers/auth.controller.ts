import { Response } from "express";
import { AuthService } from "../services";
import { LoginRequest } from './../dtos/auth.dto';
import { HTTPResponse, onError } from "../utils";

export class AuthController {
    constructor(private authService: AuthService) { }

    public login = async (req: LoginRequest, res: Response) => {

        try {
            const { email, password } = req.body;

            const result = await this.authService.authenticateUser({
                email,
                password
            });

            return HTTPResponse({
                res,
                statusCode: 200,
                message: "Autenticação realizada com sucesso.",
                data: result
            });

        } catch (error) {
            return onError(error, res)
        }
    }
}