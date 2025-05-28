import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { User } from '../interfaces';
import { UserService } from '../user.service';

@Injectable()
export class UserByIdPipe implements PipeTransform<string, Promise<User>> {
  constructor(private readonly userService: UserService) {}

  async transform(id: string): Promise<User> {
    const user = await this.userService.getById(id);

    if (!user) throw new NotFoundException(`User with id "${id}" not found`);

    return user;
  }
}
