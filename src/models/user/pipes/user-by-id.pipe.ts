import { Injectable } from '@nestjs/common';
import { ByIdPipe } from 'src/common';
import { User } from '../interfaces';
import { UserService } from '../user.service';

@Injectable()
export class UserByIdPipe extends ByIdPipe<User> {
  constructor(service: UserService) {
    super(service);
  }
}
