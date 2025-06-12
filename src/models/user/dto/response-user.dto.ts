import { User } from '../interfaces';

export interface ResponseUserDto extends Omit<User, 'password'> {}
