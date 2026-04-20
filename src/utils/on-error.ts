import { Response } from "express";

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
