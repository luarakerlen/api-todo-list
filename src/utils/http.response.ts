import { Response } from "express";

interface HTTPResponseProps {
  res: Response;
  statusCode: number;
  message: string;
  data?: any;
  details?: any;
}

export function HTTPResponse({ res, statusCode, message, data, details }: HTTPResponseProps) {
  const success = statusCode >= 200 && statusCode < 300;

  return res.status(statusCode).json({
    success,
    message,
    data,
    details,
  });
}