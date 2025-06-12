import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(protected readonly service: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto) {
    await this.service.signup(createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.service.login(createUserDto);
  }

  @Post('refresh ')
  async refresh() {}
}
