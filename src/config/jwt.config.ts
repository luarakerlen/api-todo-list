import { SignOptions } from "jsonwebtoken";

export const getJwtOptions = (): SignOptions => {

    const expiresIn = process.env.JWT_EXPIRES_IN;

    if (!expiresIn) {
        throw new Error("JWT_EXPIRES_IN não definido");
    }

    return {
        expiresIn: (expiresIn) as SignOptions["expiresIn"],
    }
}