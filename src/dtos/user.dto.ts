/**
 * Dados necessários para criação de usuário.
 */
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}