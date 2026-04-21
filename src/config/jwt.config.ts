import * as dotenv from 'dotenv';
dotenv.config();

import { SignOptions } from "jsonwebtoken";

export const getJwtOptions = (): SignOptions => {


    console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);
    const expiresIn = process.env.JWT_EXPIRES_IN;

    if (!expiresIn) {
        throw new Error("JWT_EXPIRES_IN não definido");
    }
    const isValid = /^(\d+)([smhd])$/.test(expiresIn);

    if (!isValid) {
        throw new Error(
            "JWT_EXPIRES_IN inválido. Use formatos como: 1d, 2h, 30m, 10s"
        );
    }
    return {
        expiresIn: (expiresIn) as SignOptions["expiresIn"],
    }
}