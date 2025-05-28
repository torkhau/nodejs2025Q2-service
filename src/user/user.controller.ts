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
import { IsUUIDPipe } from 'src/pipes';
import { CreateUserDto, ResponseUserDto, UpdatePasswordDto } from './dto';
import { User } from './interfaces';
import { UserByIdPipe } from './pipes';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private toDTO(user: User): ResponseUserDto {
    const { password: _password, ...rest } = user;

    return rest;
  }

  @Get()
  async findAll() {
    const users = await this.userService.getAllUsers();
    return users.map(this.toDTO.bind(this));
  }

  @Get(':id')
  findOne(@Param('id', IsUUIDPipe, UserByIdPipe) user: User) {
    return this.toDTO(user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);

    return this.toDTO(user);
  }

  @Put(':id')
  async update(
    @Param('id', IsUUIDPipe, UserByIdPipe) user: User,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    if (user.password !== updateUserDto.oldPassword)
      throw new ForbiddenException('Password is wrong');

    user.password = updateUserDto.newPassword;

    const updatedUser = await this.userService.updateUser(user);

    return this.toDTO(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', IsUUIDPipe, UserByIdPipe) user: User) {
    await this.userService.deleteUser(user);
  }
}
