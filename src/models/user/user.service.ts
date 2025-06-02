import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { BaseService } from '../abstract';
import { CreateUserDto } from './dto';
import { User } from './interfaces';

@Injectable()
export class UserService extends BaseService<User> {
  async create({ login, password }: CreateUserDto): Promise<User> {
    const timestamp = Date.now();
    const newUser: User = {
      id: v4(),
      login,
      password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.items.push(newUser);

    return newUser;
  }

  async update(id: string, data: Pick<User, 'password'>): Promise<User> {
    const index = this.items.findIndex((user) => id === user.id);

    const oldUser = { ...this.items[index] };

    this.items[index] = {
      ...oldUser,
      ...data,
      version: oldUser.version + 1,
      updatedAt: Date.now(),
    };

    return this.items[index];
  }
}
