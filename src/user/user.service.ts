import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto';
import { User } from './interfaces';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    const timestamp = Date.now();
    const newUser: User = {
      id: v4(),
      login,
      password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.users.push(newUser);

    return newUser;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async updateUser(user: User): Promise<User> {
    const index = this.users.findIndex(({ id }) => id === user.id);

    this.users[index] = {
      ...user,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    return this.users[index];
  }

  async deleteUser(user: User): Promise<void> {
    const index = this.users.findIndex(({ id }) => user.id === id);

    this.users.splice(index, 1);
  }
}
