import { IsOptional, IsString } from 'class-validator';
import { Tokens } from '../interfaces';

export class RefreshTokenDto implements Pick<Tokens, 'refreshToken'> {
  @IsOptional()
  @IsString()
  refreshToken: string;
}
