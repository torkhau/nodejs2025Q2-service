import { IsString } from 'class-validator';
import { User } from '../interfaces';

interface ICreateUserDto extends Pick<User, 'login' | 'password'> {}

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
