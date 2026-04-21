import { Response } from "express";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { HTTPError } from "./http.error";
import { HTTPResponse } from "./http.response";

export function onError(error: unknown, res: Response): Response {
  if (error instanceof HTTPError) {
    return HTTPResponse({
      res,
      statusCode: error.statusCode,
      message: error.message,
      details: error.details,
    });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    let statusCode = 500
    let message = "Internal server error"
    let details = error.message

    if (error.code === 'P2002') {
      message = "Falha de validação: valor duplicado"
      details = `${error.meta?.target} já existe.`;
      statusCode = 409;
    }

    return HTTPResponse({
      res,
      statusCode,
      message,
      details,
    });
  }

  return HTTPResponse({
    res,
    statusCode: 500,
    message: "Internal server error",
    details: [
      {
        type: "system",
        field: "unknown",
        description: (error as Error).toString(),
        location: (error as Error).name,
      },
    ],
  });
}
