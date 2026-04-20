import * as dotenv from 'dotenv';
dotenv.config();

import { JwtPayload, sign } from 'jsonwebtoken';

interface JwtUserPayload {
    id: string,
    username: string
}
export class JwtService {
    //header. payload. signature

    public createToken(data: JwtUserPayload) {
        const token = sign(data, process.env.JWT_SECRET as string);

        return token;
    }

    public validateToken() {

    }
}