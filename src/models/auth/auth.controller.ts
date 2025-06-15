import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto';

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
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.service.refresh(refreshTokenDto);
  }
}
