import { IsString } from 'class-validator';
import { Tokens } from '../interfaces';

export class RefreshTokenDto implements Pick<Tokens, 'refreshToken'> {
  @IsString()
  refreshToken: string;
}
