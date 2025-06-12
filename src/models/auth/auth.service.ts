import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signup({ login, password }: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      password,
      this.configService.get<number>('CRYPT_SALT'),
    );

    await this.userService.create({ login, password: hashedPassword });
  }

  async login({ login, password }: CreateUserDto) {
    const user = await this.userService.getByLogin(login);

    if (!user)
      throw new ForbiddenException('Authentication information is incorrect.');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new ForbiddenException('Authentication information is incorrect.');

    const payload = { userId: user.id, login: user.login };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get<string>('TOKEN_EXPIRE_TIME'),
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
        secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      }),
    };
  }
}
