
import express, { Request, Response } from 'express';
import { authController } from '../container/auth.container';


export class AuthRoutes {
    public static bind() {
        const router = express.Router();

        router.post("/auth/login", (req: Request, res: Response) => {
            authController.login(req, res);
        })

        return router;
    }
}