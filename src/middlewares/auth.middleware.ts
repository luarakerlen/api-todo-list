import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../services';
import { HTTPResponse } from '../utils';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return HTTPResponse({
        res,
        statusCode: 401,
        message: 'Token não fornecido',
      });
    }

    const partsJWT = authHeader.split(' ');
    const [bearer, token] = partsJWT;

    if (partsJWT.length !== 2) {
      return HTTPResponse({
        res,
        statusCode: 401,
        message: 'Erro no formato do token',
      });
    }

    if (!/^Bearer$/i.test(bearer)) {
      return HTTPResponse({
        res,
        statusCode: 401,
        message: 'Token nao é do tipo Bearer',
      });
    }

    const jwtService = new JwtService();

    const decoded = jwtService.verifyToken(token);

    req.user = {
      id: decoded.id,
      username: decoded.username,
    };

    return next();
  } catch (error) {
    return HTTPResponse({
      res,
      statusCode: 401,
      message: 'Token inválido ou expirado',
    });
  }
};
