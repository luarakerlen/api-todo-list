import express, { Response, Request } from 'express';
import { userController } from "../container";
export class AuthRoutes {
    public static bind() {
        const router = express.Router();


        router.get("/users/auth", async (req: Request, res: Response) => {

        })
    }
}