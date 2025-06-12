import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Artist } from '../interfaces';

interface IUpdateArtistDTO extends Partial<Omit<Artist, 'id'>> {}

export class UpdateArtistDto implements IUpdateArtistDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}
