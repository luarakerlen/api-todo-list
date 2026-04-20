// src/dtos/auth.dto.ts
import { UserDto } from './user.dto';

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  user: UserDto;
}
