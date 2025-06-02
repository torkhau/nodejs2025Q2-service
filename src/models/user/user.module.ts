import { Module } from '@nestjs/common';
import { UserByIdPipe } from './pipes';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserByIdPipe],
})
export class UserModule {}
