import { IsBoolean, IsString } from 'class-validator';
import { Artist } from '../interfaces';
import { Type } from 'class-transformer';

interface ICreateArtistDto extends Omit<Artist, 'id'> {}

export class CreateArtistDto implements ICreateArtistDto {
  @IsString()
  name: string;

  @Type(() => Boolean)
  @IsBoolean()
  grammy: boolean;
}
