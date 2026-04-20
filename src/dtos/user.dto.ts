/**
 * Dados necessários para criação de usuário.
 */
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

/**
 * Representa um usuário autenticado no sistema.
 * A senha nunca deve ser exposta aqui.
 */
export interface UserDto {
  id: string;
  name: string;
  email: string;
}
