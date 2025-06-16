import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/db/user';
import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { RefreshTokenDto } from './dto';
import { Tokens } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signup({ login, password }: CreateUserDto): Promise<User> {
    const salt = Number(this.configService.get('CRYPT_SALT') || '10');
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.userService.create({ login, password: hashedPassword });
  }

  async login({ login, password }: CreateUserDto): Promise<Tokens> {
    const user = await this.userService.getByLogin(login);

    if (!user)
      throw new ForbiddenException('Authentication information is incorrect.');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new ForbiddenException('Authentication information is incorrect.');

    return await this.generateTokens(user);
  }

  async refresh({ refreshToken }: RefreshTokenDto): Promise<Tokens> {
    try {
      const { userId } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      });

      const user = await this.userService.getById(userId);

      return this.generateTokens(user);
    } catch (error) {
      throw new ForbiddenException('Refresh token is invalid');
    }
  }

  private async generateTokens({ id, login }: User): Promise<Tokens> {
    const payload = { userId: id, login };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
