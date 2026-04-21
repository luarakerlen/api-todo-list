import { Request } from "express";

/**
 * Representa um usuário autenticado no sistema.
 * A senha nunca deve ser exposta aqui.
 */
export interface LoginDto {
  email: string;
  password: string;
}

export type LoginRequest = Request<{}, {}, LoginDto>;