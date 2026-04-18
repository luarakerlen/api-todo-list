export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  userId: string;
  name?: string;
  email?: string;
}
