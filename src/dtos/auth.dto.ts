// src/dtos/auth.dto.ts
import { UserDto } from './user.dto';

/**
 * Representa um usuário autenticado no sistema.
 * A senha nunca deve ser exposta aqui.
 */
export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  user: UserDto;
}
