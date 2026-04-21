import { UserDto } from "../dtos";

export interface LoginResponseDto {
    token: string;
    user: UserDto;
}