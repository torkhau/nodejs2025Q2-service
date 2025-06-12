import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateIf } from 'class-validator';
import { Album } from '../interfaces';

interface ICreateAlbumDto extends Omit<Album, 'id'> {}

export class CreateAlbumDto implements ICreateAlbumDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber()
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  artistId: string | null;
}
