import { IsBoolean, IsString } from 'class-validator';
import { Artist } from '../interfaces';

interface ICreateArtistDto extends Omit<Artist, 'id'> {}

export class CreateArtistDto implements ICreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
