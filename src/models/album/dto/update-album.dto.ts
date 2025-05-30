import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Album } from '../interfaces';

interface IUpdateAlbumDTO extends Partial<Omit<Album, 'id'>> {}

export class UpdateAlbumDto implements IUpdateAlbumDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null;
}
