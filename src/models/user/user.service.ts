import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/user';
import { Repository } from 'typeorm';
import { BaseService } from '../abstract';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create({ login, password }: CreateUserDto): Promise<User> {
    const timestamp = Date.now();

    return await super.create({
      login,
      password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }

  async update(id: string, data: Pick<User, 'password'>): Promise<User> {
    const { version } = await this.getById(id);

    return await super.update(id, {
      version: version + 1,
      updatedAt: Date.now(),
      password: data.password,
    });
  }
}
