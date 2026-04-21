import * as dotenv from 'dotenv';
dotenv.config();

import { sign } from 'jsonwebtoken';
import { getJwtOptions } from '../config';

interface JwtUserPayload {
    id: string,
    username: string
}
export class JwtService {
    //header. payload. signature

    public createToken(data: JwtUserPayload) {

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET não está definido");
        }

        const token = sign(
            data,
            secret,
            getJwtOptions()// <-SignOptions
        );

        return token;
    }

    public validateToken() {

    }
}