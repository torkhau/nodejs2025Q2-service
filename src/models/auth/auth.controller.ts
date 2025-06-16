import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreateUserDto } from '../user/dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(protected readonly service: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.service.signup(createUserDto);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() createUserDto: CreateUserDto) {
    return this.service.login(createUserDto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    if (!refreshTokenDto.refreshToken)
      throw new UnauthorizedException('No refreshToken in body');

    return this.service.refresh(refreshTokenDto);
  }
}
