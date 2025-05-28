import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IsUUIDPipe } from 'src/common/pipes';
import { BaseController } from '../abstract';
import { CreateUserDto, ResponseUserDto, UpdatePasswordDto } from './dto';
import { User } from './interfaces';
import { UserByIdPipe } from './pipes';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends BaseController<User, ResponseUserDto> {
  constructor(protected override readonly service: UserService) {
    super(service);
  }

  toDTO(user: User): ResponseUserDto {
    const { password: _password, ...rest } = user;

    return rest;
  }

  @Get(':id')
  findOne(@Param('id', IsUUIDPipe, UserByIdPipe) user: User) {
    return this.toDTO(user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.service.create(createUserDto);

    return this.toDTO(user);
  }

  @Put(':id')
  async update(
    @Param('id', IsUUIDPipe, UserByIdPipe) user: User,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    if (user.password !== updateUserDto.oldPassword)
      throw new ForbiddenException('Password is wrong');

    const updatedUser = await this.service.update(user.id, {
      password: updateUserDto.newPassword,
    });

    return this.toDTO(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', IsUUIDPipe, UserByIdPipe) user: User) {
    await this.service.delete(user.id);
  }
}
